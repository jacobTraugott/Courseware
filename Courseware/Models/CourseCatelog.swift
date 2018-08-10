//
//  CourseCatelog.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import Zip

class CourseCatelog {
    var allCourses = [Course]()
    private(set) var hasAssetsFile: Bool = false
    private let courseScanDirectory: URL = StaticMethods.documentsDirectory
    private let tempDirectory: URL = StaticMethods.tempDirectory
    private let mediaDirectory = (StaticMethods.tempDirectory).appendingPathComponent("Content")
    //TODO: When we update the custom extension, this needs to change
    private let fileExtension = "zip"
    private let assetsFile = "Assets.zip"
    private let assetsDirectory = "Assets"
    private var courseURLs: [String:URL] = [:]
    private let ioQueue: OperationQueue = {
        let queue = OperationQueue()
        queue.maxConcurrentOperationCount = 1
        return queue
    }()
    
    @discardableResult func createItem(fileName: URL) -> Course {
        let newItem = Course(fileName: fileName)
        allCourses.append(newItem)
        return newItem
    }
    
    func loadCourses(completion: @escaping ([Course]) -> Void) {
        ioQueue.addOperation { //[weak self] in
            var courses: [Course] = []
            var foundCourseURLs: [String:URL] = [:]
            defer {
                OperationQueue.main.addOperation {
                    self.courseURLs = foundCourseURLs
                    self.allCourses = courses
                    completion(courses)
                }
            }
            
            guard var urls: [URL] = try? FileManager.default.contentsOfDirectory(at: self.courseScanDirectory, includingPropertiesForKeys: [], options: []) else {
                return
            }

            DispatchQueue.global().async {
                if (!StaticMethods.doesWebDirectoryExist(self.assetsDirectory)) {
                    
                    //TODO: When we change the extension, update this line of code
                    if (urls.filter { $0.lastPathComponent == self.assetsFile }).count == 0 {
                        if let bundleURL = Bundle.main.url(forResource: "Assets", withExtension: "zip") {
                            do {
                                print("Bundle: \(bundleURL)")
                                let newUrl = self.tempDirectory.appendingPathComponent(self.assetsFile)
                                print("New URL: \(newUrl)")
                                try FileManager.default.copyItem(at: bundleURL, to: newUrl)
                                urls.append(newUrl)
                            } catch {
                                print("Error copying bundle: \(error)")
                            }
                        }
                    }
                    
                    guard let assetsPackage = (urls.filter { $0.lastPathComponent == self.assetsFile }).first else {
                        self.hasAssetsFile = false
                        return
                    }
                    
                    self.hasAssetsFile = true
                
                    do {
                        try Zip.unzipFile(assetsPackage, destination: self.tempDirectory, overwrite: true, password: nil)
                    } catch {
                        print("failed to unzip assets")
                        print("error: \(error)")
                    }
                    if StaticMethods.doesWebDirectoryExist(self.assetsDirectory) {
                        print("Worked")
                    } else {
                        print("Fuck")
                    }   
                }
            }
            
            //Generate a new array of courses from the zip files on disk
            for url in urls {
                print(url.path)
                guard url.pathExtension == self.fileExtension else { continue }
                guard url.lastPathComponent != self.assetsFile else {
                    DispatchQueue.global().async {
                        self.removeFile(fromPath: url.absoluteString, useMediaDirectory: false)
                    }
                    continue
                }
                let course = Course(fileName: url)
                courses.append(course)
            }
        }
    }
    
    func openCourse(index: Int, courseName: String, aircraft: String) -> URL? {
        let dispatchGroup = DispatchGroup()
        var shouldReturnJS: Bool = false
        var shouldReturnZip: Bool = false
        let courseURL = self.allCourses[index].url
        let trainingType = StaticMethods.isFileCBTorIBT(url: courseURL)
        guard trainingType != .none else {
            return nil
        }
        let isCBT = trainingType == .cbt
        dispatchGroup.enter()
        DispatchQueue.global().async {
            shouldReturnJS = StaticMethods.createJavaScriptFile(lessonName: courseName, aircraft: aircraft, isCBT: isCBT)
            dispatchGroup.leave()
        }
        //TODO: Need to add support by exchanging the getXML file from bundles as needed
        // How are we going to differentiate the courses? We may need to artificially preface the file names
        // with the program that they support.  Using that, we could strip it at unzip since the folder would
        // remain the same.  To be determined.
        dispatchGroup.enter()
        DispatchQueue.global().async {
            do {
                let oldCopy = self.mediaDirectory.appendingPathComponent(courseURL.lastPathComponent).absoluteString
                self.removeFile(fromPath: oldCopy)
                //TODO: Add the password for the zip file
                try Zip.unzipFile(courseURL, destination: self.mediaDirectory, overwrite: true, password: nil)
                shouldReturnZip = true
            } catch {
                print("Error during unzip: \(error)")
                shouldReturnZip = false
            }
            dispatchGroup.leave()
        }
        
        dispatchGroup.wait()
        
        if shouldReturnZip && shouldReturnJS {
            let htmlPath = tempDirectory.appendingPathComponent("Home.html")
            return htmlPath
        } else {
            return nil
        }
    }
    
    private func removeFile(fromPath: String, useMediaDirectory: Bool = true) {
        let passedFileURL = URL(string: fromPath)
        guard let passedFile = passedFileURL else {
            return
        }
        let toSplit = passedFile.lastPathComponent
        let split = toSplit.split(separator: ".")
        guard split.count > 0 else {
            return
        }
        guard let contents = split.first else {
            return
        }
        let contentString: String
        if useMediaDirectory {
            contentString = String(contents)
        } else {
            contentString = toSplit
        }
        let dirToParse: URL
        if useMediaDirectory {
            dirToParse = mediaDirectory.appendingPathComponent(contentString)
        } else {
//            dirToParse = courseScanDirectory.appendingPathComponent(contentString)
            dirToParse = tempDirectory.appendingPathComponent(contentString)
        }
        
        do {
            let fileManager = FileManager()
            print(dirToParse.absoluteString)
            if StaticMethods.doesWebDirectoryExist(contentString) {
            let files = try fileManager.contentsOfDirectory(at: dirToParse, includingPropertiesForKeys: nil)
            if (files.count > 0) {
                for file in files {
                    print("removing item: \(file)")
                    try fileManager.removeItem(at: file)
                }
            }
            print("removing the directory")
            try fileManager.removeItem(at: dirToParse)
                print("got past that shit, now game on!")
            } else {
                if !useMediaDirectory {
                    print("removing single item")
                    try fileManager.removeItem(at: dirToParse)
                    print("success, removed")
                } else {
                    print("Nothing to remove, moving on")
                }
            }
            
        }
        catch {
            print("Error removing file that should exist: \(error)")
            return
        }
    }
}
