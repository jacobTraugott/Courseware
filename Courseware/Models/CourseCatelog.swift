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
    
    private func retrieveFiles(at searchLocation: URL, performShallowSearch: Bool = true) -> [URL] {
        if performShallowSearch {
            guard let urls: [URL] = try? FileManager.default.contentsOfDirectory(at: CourseCatelog.courseScanDirectory, includingPropertiesForKeys: [], options: []) else {
                return []
            }
            return urls
        } else {
            guard let enumerator = FileManager.default.enumerator(at: searchLocation, includingPropertiesForKeys: nil) else {
                print("Unable to retrieve director enumerator")
                return []
            }
            
            var urls: [URL] = []
            for case let url as URL in enumerator {
                urls.append(url)
            }
            return urls
        }
    }
    
    func loadCourses(completion: @escaping ([Course]) -> Void) {
        let dispatchGroup = DispatchGroup()
        dispatchGroup.enter()
        var urls: [URL] = []
        DispatchQueue.global(qos: .default).async {
            urls = self.retrieveFiles(at: CourseCatelog.courseScanDirectory, performShallowSearch: false)
            dispatchGroup.leave()
        }
        dispatchGroup.wait()
        
        ioQueue.addOperation {
            var courses: [Course] = []
            var foundCourseURLs: [String:URL] = [:]
            defer {
                OperationQueue.main.addOperation {
                    self.courseURLs = foundCourseURLs
                    self.allCourses = courses
                    completion(courses)
                }
            }
            
            DispatchQueue.global().async {
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
                    print("Web Directory successfully created, program is working")
                } else {
                    print("There's a bug associated with creating the web directory from the Assets file.")
                }
            }
            
            //Generate a new array of courses from the zip files on disk
            for url in urls {
                print(url.path)
                var goodExtension = false
                
                goodExtension = CourseCatelog.fileExtensions.contains(url.pathExtension)
                guard goodExtension else { continue }
                guard url.lastPathComponent != self.assetsFile else {
                    DispatchQueue.global().async {
                        _ = CourseCatelog.removeFile(fromPath: url.absoluteString, useMediaDirectory: false)
                    }
                    continue
                }
                let course = Course(fileName: url)
                courses.append(course)
            }
            courses.sort(by: <)
        }
    }
    
    static func openCourse(fromURL url: URL, copySourceFileToLibrary: Bool = false) -> URL? {
        let course = Course(fileName: url)
        let dispatchGroup = DispatchGroup()
        var shouldReturnJS: Bool = false
        var shouldReturnZip: Bool = false
        let trainingType = StaticMethods.isFileCBTorIBT(url: url)
        guard trainingType != .none else {
            print("found bad training type, returning nil URL")
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
        var zipHadXMLFile = false
        DispatchQueue.global().async {
            do {
                let oldCopy = CourseCatelog.mediaDirectory.appendingPathComponent(url.lastPathComponent).absoluteString
                let dirForXML = CourseCatelog.removeFile(fromPath: oldCopy)
                CourseCatelog.removeXMLFile()
                try Zip.unzipFile(url, destination: CourseCatelog.mediaDirectory, overwrite: true, password: CourseCatelog.phrases[5])
                shouldReturnZip = true
                if let scan = dirForXML {
                    zipHadXMLFile = CourseCatelog.isXMLFilePresent(directory: scan)
                    if !zipHadXMLFile {
                        print("Zip File did not contain XML JS, grabbing local bundle")
                        CourseCatelog.moveXML(program: course.program)
                    } else {
                        print("Zip File had local XML JS")
                        let _ = CourseCatelog.moveInternalXML(directory: scan)
                    }
                }
            } catch {
                print("Error during unzip: \(error)")
                shouldReturnZip = false
            }
            dispatchGroup.leave()
        }
        
        dispatchGroup.wait()
        
        if shouldReturnZip && shouldReturnJS {
            if copySourceFileToLibrary {
                
                let fileManager = FileManager.default
                let copyLocation = CourseCatelog.courseScanDirectory.appendingPathComponent(url.lastPathComponent)
                let copyPath = copyLocation.path
                do {
                    if fileManager.fileExists(atPath: copyPath) {
                        print("File already exists at copy location, let's overwrite.")
                        try fileManager.removeItem(atPath: copyPath)
                        print("File successfully removed")
                    }
                }
                catch {
                    print("Error during delete file operation; file was marked as existing but could not delete? Error text: \(error)")
                }
                do {
                    print("Copying file from import to CW Docs Directory")
                    try fileManager.copyItem(at: url, to: copyLocation)
                } catch {
                    print("During copy operation, error occurred: \(error)")
                }
            }
            let htmlPath = CourseCatelog.tempDirectory.appendingPathComponent("Home.html")
            return htmlPath
        } else {
            return nil
        }
    }
    
    private static func isXMLFilePresent(directory url: URL) -> Bool {
        do {
            let files = try FileManager.default.contentsOfDirectory(atPath: url.path)
            let modFiles = files.map { return $0.lowercased() }
            return modFiles.contains("getxml.js")
        } catch {
            print(error)
            return false
        }
    }
    
    private static func moveInternalXML(directory url: URL) -> Bool {
        do {
            let xmlFile = "getXML.js"
            let fileToCopy = url.appendingPathComponent(xmlFile)
            print("Copying: \(fileToCopy)")
            try FileManager.default.copyItem(at: fileToCopy, to: CourseCatelog.xmlDirectory.appendingPathComponent("getXML.js"))
            print("Copy operation success")
            CourseCatelog.currentProgram = .undefined
            return true
        } catch {
            print("Well shit....this threw and error and should not have")
            return false
        }
    }
    
    private static func moveXML(program: Program) {
        guard program != .undefined else {
            print("undefined")
            return
        }
        
        if let newBundle = Bundle.main.url(forResource: program.getBundleName, withExtension: "js") {
            do {
                // Have to rename the file or this won't work
                print("Course XML Directory: \(CourseCatelog.xmlDirectory.absoluteString)")
                print("Copying getXML.JS file to XML Directory")
                try FileManager.default.copyItem(at: newBundle, to: CourseCatelog.xmlDirectory.appendingPathComponent("getXML.js"))
                print("getXML.JS file copied")
                CourseCatelog.currentProgram = program
                print("program set")
            } catch {
                print("Error copying getXML.js bundle: \(error)")
            }
        } else {
            print("getXML.js bundle not set, program not set")
            return
        }
    }

    private static func removeXMLFile() {
        do {
            let fm = FileManager()
            print("attempting getXML.js removal")
            try fm.removeItem(at: CourseCatelog.xmlDirectory.appendingPathComponent("getXML.js"))
            print("getXML.js removed, continuing")
        } catch {
            print("getXML.js removal failed, this is a problem")
        }
    }
    
    func removeCoursewareFile(fromURL: URL) {
        let filteredCourses = allCourses.filter { $0.url == fromURL }
        if filteredCourses.count >= 1 {
            print("found a course to remove, deleting from array")
            let course = filteredCourses.first!
            let index = allCourses.firstIndex(of: course)!
            allCourses.remove(at: index)
            do {
                print("deleting file...")
                try FileManager.default.removeItem(at: fromURL)
                print("delete was successful")
            } catch {
                print("Error encountered while deleting file: \(error)")
            }
        } else {
            print("no courses found to remove")
        }
    }
    
    private static func removeFile(fromPath: String, useMediaDirectory: Bool = true) -> URL? {
        let passedFileURL = URL(string: fromPath)
        guard let passedFile = passedFileURL else {
            return nil
        }
        let toSplit = passedFile.lastPathComponent
        let split = toSplit.split(separator: ".")
        guard split.count > 0 else {
            return nil
        }
        guard let contents = split.first else {
            return nil
        }
        
        let contentString: String
        if useMediaDirectory {
            if contents.contains(")") {
                //this can fail with old files that do not have the ) character
                let splitContents = contents.split(separator: ")")
                let workingString = splitContents[1]
                let courseDirectory = workingString.dropFirst()
                contentString = String(courseDirectory)
            } else {
                contentString = String(contents)
            }
        } else {
            contentString = toSplit
        }
        let dirToParse: URL
        let checkString: String
        if useMediaDirectory {
            dirToParse = CourseCatelog.mediaDirectory.appendingPathComponent(contentString)
            checkString = "Content/\(contentString)"
        } else {
            dirToParse = CourseCatelog.tempDirectory.appendingPathComponent(contentString)
            checkString = contentString
        }
        
        do {
            let fileManager = FileManager()
            print(dirToParse.absoluteString)
            if StaticMethods.doesWebDirectoryExist(checkString) {
                let files = try fileManager.contentsOfDirectory(at: dirToParse, includingPropertiesForKeys: nil)
                if (files.count > 0) {
                    for file in files {
                        try fileManager.removeItem(at: file)
                    }
                    print("Removed individual files from directory")
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
            return dirToParse
            
        }
        catch {
            print("Error removing file that should exist: \(error)")
            return nil
        }
    }
}
