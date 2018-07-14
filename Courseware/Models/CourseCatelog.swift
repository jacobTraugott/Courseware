//
//  CourseCatelog.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit

class CourseCatelog {
    var allCourses = [Course]()
    private(set) var hasAssetsFile: Bool = false
    private let courseScanDirectory: URL = StaticMethods.documentsDirectory //FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
    private let mediaDirectory = (StaticMethods.documentsDirectory).appendingPathComponent("Content")  //(FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!).appendingPathComponent("Content")
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
            
            guard let urls: [URL] = try? FileManager.default.contentsOfDirectory(at: self.courseScanDirectory, includingPropertiesForKeys: [], options: []) else {
                return
            }

            DispatchQueue.global().async {
                if (!StaticMethods.doesWebDirectoryExist(self.assetsDirectory)) {
                    guard let assetsPackage = (urls.filter { $0.lastPathComponent == self.assetsFile }).first else {
                        self.hasAssetsFile = false
                        return
                    }
                    
                    self.hasAssetsFile = true
                    try! FileManager().unzipItem(at: assetsPackage, to: self.courseScanDirectory)
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
                guard url.lastPathComponent != self.assetsFile else { continue }
                let course = Course(fileName: url)
                courses.append(course)
            }
        }
    }
    
    func openCourse(index: Int, courseName: String, aircraft: String) -> URL? {
        let dispatchGroup = DispatchGroup()
        var shouldReturnJS: Bool = false
        var shouldReturnZip: Bool = false
        
        dispatchGroup.enter()
        DispatchQueue.global().async {
            shouldReturnJS = StaticMethods.createJavaScriptFile(lessonName: courseName, aircraft: aircraft)
            dispatchGroup.leave()
        }

        dispatchGroup.enter()
        DispatchQueue.global().async {
            let courseURL = self.allCourses[index].url
            do {
                let oldCopy = self.mediaDirectory.appendingPathComponent(courseURL.lastPathComponent).absoluteString
                self.removeFile(fromPath: oldCopy)
                try FileManager().unzipItem(at: courseURL, to: self.mediaDirectory)
                shouldReturnZip = true
            } catch {
                print("Error during unzip: \(error)")
                shouldReturnZip = false
            }
            dispatchGroup.leave()
        }
        
        dispatchGroup.wait()
        
        if shouldReturnZip && shouldReturnJS {
            let htmlPath = courseScanDirectory.appendingPathComponent("Home.html")
            return htmlPath
        } else {
            return nil
        }
    }
    
    private func removeFile(fromPath: String) {
        let passedFile = (URL(string: fromPath)!.lastPathComponent).split(separator: ".").first
        guard let contents = passedFile else {
            return
        }
        let contentString = String(contents)
        let dirToParse = mediaDirectory.appendingPathComponent(contentString)
        
        do {
            let fileManager = FileManager()
            print(dirToParse.absoluteString)
            let files = try fileManager.contentsOfDirectory(at: dirToParse, includingPropertiesForKeys: nil)
            for file in files {
                print("removing item: \(file)")
//                try fileManager.removeItem(atPath: file)
                try fileManager.removeItem(at: file)
            }
            print("removing the directory")
            try fileManager.removeItem(at: dirToParse)
            print("got past that shit, now game on!")
        }
        catch {
            print("Error removing file that should exist: \(error)")
            return
        }
    }
    
    //TODO: Check to see if file/directory exists
    
    
}
