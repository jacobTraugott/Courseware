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
    private(set) static var currentProgram: Program = .undefined
    private static let courseScanDirectory: URL = StaticMethods.documentsDirectory
    private static let tempDirectory: URL = StaticMethods.tempDirectory
    private static let mediaDirectory = (StaticMethods.tempDirectory).appendingPathComponent("Content")
    private static let xmlDirectory = (StaticMethods.tempDirectory).appendingPathComponent("Assets/js/app")
    private static let customExt = "acware"
    
    private static let fileExtensions = ["zip", "acware"]
    private let assetsFile = "Assets.zip"
    private let assetsDirectory = "Assets"
    private var courseURLs: [String:URL] = [:]
    private let ioQueue: OperationQueue = {
        let queue = OperationQueue()
        queue.maxConcurrentOperationCount = 1
        return queue
    }()
    
    private static let phraseA = "I am the very model of a modern major general"
    private static let phraseB = "I've information vegetable, animal, and mineral"
    private static let phraseC = "I know the kings of England, and I quote the fights historical"
    private static let phraseD = "From Marathon to Waterloo, in order categorical"
    private static let phraseE = "I'm very well acquainted, too, with matters mathematical"
    private static let phraseF = "I understand equations, both the simple and quadratical"
    private static let phraseG = "About binomial theorem I'm teeming with a lot o' news"
    private static let phraseH = "With many cheerful facts about the square of the hypotenuse"
    private static var phrases: [String] {
        get {
            return [phraseA, phraseB, phraseC, phraseD, phraseE, phraseF, phraseG, phraseH]
        }
    }
    
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
            
            guard var urls: [URL] = try? FileManager.default.contentsOfDirectory(at: CourseCatelog.courseScanDirectory, includingPropertiesForKeys: [], options: []) else {
                return
            }

            DispatchQueue.global().async {
                if (!StaticMethods.doesWebDirectoryExist(self.assetsDirectory)) {
                    
                    if (urls.filter { $0.lastPathComponent == self.assetsFile }).count == 0 {
                        if let bundleURL = Bundle.main.url(forResource: "Assets", withExtension: "zip") {
                            do {
                                print("Bundle: \(bundleURL)")
                                let newUrl = CourseCatelog.tempDirectory.appendingPathComponent(self.assetsFile)
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
                        try Zip.unzipFile(assetsPackage, destination: CourseCatelog.tempDirectory, overwrite: true, password: nil)
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
                var goodExtension = false
                for ext in CourseCatelog.fileExtensions {
                    if url.pathExtension == ext {
                        goodExtension = true
                        continue
                    }
                }
                guard goodExtension else { continue }
//                guard url.pathExtension == self.fileExtension else { continue }
                guard url.lastPathComponent != self.assetsFile else {
                    DispatchQueue.global().async {
                        CourseCatelog.removeFile(fromPath: url.absoluteString, useMediaDirectory: false)
                    }
                    continue
                }
                let course = Course(fileName: url)
                courses.append(course)
            }
            
            courses.sort(by: { (a, b) -> Bool in
                //return a.displayName < b.displayName
                return a < b
            })
        }
    }
    
    func openCourse(index: Int, courseName: String, aircraft: String) -> URL? {
        let dispatchGroup = DispatchGroup()
        var shouldReturnJS: Bool = false
        var shouldReturnZip: Bool = false
        let courseURL = self.allCourses[index].url
        let courseProgram = self.allCourses[index].program
        let trainingType = StaticMethods.isFileCBTorIBT(url: courseURL)
        guard trainingType != .none else {
            return nil
        }
        let isCBT = trainingType == .cbt
        Zip.addCustomFileExtension(CourseCatelog.customExt)
        dispatchGroup.enter()
        DispatchQueue.global().async {
            shouldReturnJS = StaticMethods.createJavaScriptFile(lessonName: courseName, aircraft: aircraft, isCBT: isCBT)
            dispatchGroup.leave()
        }
        
        dispatchGroup.enter()
        DispatchQueue.global().async {
            CourseCatelog.moveXML(program: courseProgram)
            dispatchGroup.leave()
        }
        
        dispatchGroup.enter()
        DispatchQueue.global().async {
            do {
                let oldCopy = CourseCatelog.mediaDirectory.appendingPathComponent(courseURL.lastPathComponent).absoluteString
                CourseCatelog.removeFile(fromPath: oldCopy)
                
                try Zip.unzipFile(courseURL, destination: CourseCatelog.mediaDirectory, overwrite: true, password: CourseCatelog.phrases[5])
                shouldReturnZip = true
            } catch {
                print("Error during unzip: \(error)")
                shouldReturnZip = false
            }
            dispatchGroup.leave()
        }
        
        dispatchGroup.wait()
        
        if shouldReturnZip && shouldReturnJS {
            let htmlPath = CourseCatelog.tempDirectory.appendingPathComponent("Home.html")
            return htmlPath
        } else {
            return nil
        }
    }
    
    static func openCourse(fromURL url: URL) -> URL? {
        let course = Course(fileName: url)
        let dispatchGroup = DispatchGroup()
        var shouldReturnJS: Bool = false
        var shouldReturnZip: Bool = false
        let trainingType = StaticMethods.isFileCBTorIBT(url: url)
        guard trainingType != .none else {
            return nil
        }
        let isCBT = trainingType == .cbt
        Zip.addCustomFileExtension(CourseCatelog.customExt)
        dispatchGroup.enter()
        DispatchQueue.global().async {
            shouldReturnJS = StaticMethods.createJavaScriptFile(lessonName: course.displayName, aircraft: course.aircraft, isCBT: isCBT)
            dispatchGroup.leave()
        }
        
        dispatchGroup.enter()
        DispatchQueue.global().async {
            moveXML(program: course.program)
            dispatchGroup.leave()
        }
        
        dispatchGroup.enter()
        DispatchQueue.global().async {
            do {
                let oldCopy = CourseCatelog.mediaDirectory.appendingPathComponent(url.lastPathComponent).absoluteString
                CourseCatelog.removeFile(fromPath: oldCopy)
                
                try Zip.unzipFile(url, destination: CourseCatelog.mediaDirectory, overwrite: true, password: CourseCatelog.phrases[5])
                shouldReturnZip = true
            } catch {
                print("Error during unzip: \(error)")
                shouldReturnZip = false
            }
            dispatchGroup.leave()
        }
        
        dispatchGroup.wait()
        
        if currentProgram == .undefined {
            return nil
        }
        
        if shouldReturnZip && shouldReturnJS {
            do {
                try FileManager.default.copyItem(at: url, to: CourseCatelog.courseScanDirectory.appendingPathComponent(url.lastPathComponent))
            } catch {
                print(error)
            }
            let htmlPath = CourseCatelog.tempDirectory.appendingPathComponent("Home.html")
            return htmlPath
        } else {
            return nil
        }
    }
    
    private static func moveXML(program: Program) {
        guard program != .undefined else {
            print("undefined")
            return
        }
        
        if CourseCatelog.currentProgram == program {
            print("same program")
            return
        }
        
        if let newBundle = Bundle.main.url(forResource: program.getBundleName, withExtension: "js") {
            do {
                // Have to rename the file or this won't work
                CourseCatelog.removeXMLFile()
                try FileManager.default.copyItem(at: newBundle, to: CourseCatelog.xmlDirectory.appendingPathComponent("getXML.js"))
                CourseCatelog.currentProgram = program
            } catch {
                print("Error copying bundle: \(error)")
            }
        } else {
            print("Bundle not set, we done fucked up here")
            return
        }
    }
    
    private static func removeXMLFile() {
        do {
            let fm = FileManager()
            try fm.removeItem(at: CourseCatelog.xmlDirectory.appendingPathComponent("getXML.js"))
        } catch {
            print("what the fuck?? this should have fucking worked! fuck you!")
        }
    }
    
    private static func removeFile(fromPath: String, useMediaDirectory: Bool = true) {
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
            dirToParse = CourseCatelog.mediaDirectory.appendingPathComponent(contentString)
        } else {
//            dirToParse = courseScanDirectory.appendingPathComponent(contentString)
            dirToParse = CourseCatelog.tempDirectory.appendingPathComponent(contentString)
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
