//
//  CourseListViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import WebKit
import ZIPFoundation

class CourseListViewController: UITableViewController, WKUIDelegate, WKNavigationDelegate {
    var courses: [Course] = []
    let courseCatelog = CourseCatelog()
    let courseCellID: String = "CourseCellID"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        refreshControl = UIRefreshControl()
        refreshControl?.addTarget(self, action: #selector(handleRefresh(_:)), for: .valueChanged)
        reloadCourses()
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return courses.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: courseCellID, for: indexPath)
        let course = courses[indexPath.row]
        cell.textLabel?.text = course.displayName
        cell.detailTextLabel?.text = course.aircraft
        return cell
    }
    
    func reloadCourses() {
        refreshControl?.beginRefreshing()
        courseCatelog.loadCourses { (foundCourses) in
            self.courses = foundCourses
            self.refreshControl?.endRefreshing()
            self.tableView.reloadData()
        }
    }
    
    @objc func handleRefresh(_ sender: UIRefreshControl) {
        reloadCourses()
    }
    
    @IBAction func handleRescanButton(_ sender: UIBarButtonItem) {
        reloadCourses()
    }
    
    
    
//    let assetsDirectory = "Assets"
//    let mediaDirectory = "Content"
//    let documentsDirectory = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).first!
    
//    @IBOutlet var webViewer: WKWebView!
//    @IBOutlet var labelFiles: UITextField!
    /*@IBAction func scanDirectory(_ sender: UIButton) {
        do {
            let fileURLs = try FileManager.default.contentsOfDirectory(at: documentsDirectory, includingPropertiesForKeys: nil)
            let zipFiles = fileURLs.filter({$0.pathExtension == "zip"})
            for file in zipFiles {
                print(file.absoluteString)
            }
            let fileManager = FileManager()
            if doesWebDirectoryExist(assetsDirectory) == false, let asset = zipFiles.filter({$0.lastPathComponent == "Assets.zip"}).first {
                try fileManager.unzipItem(at: asset, to: documentsDirectory)
                if doesWebDirectoryExist(assetsDirectory) {
                    print("Worked")
                } else {
                    print("Fuck")
                }
            } else {
                print("Didn't enter assets if")
            }
            let media = documentsDirectory.appendingPathComponent(mediaDirectory, isDirectory: true)
            if doesWebDirectoryExist(mediaDirectory) == false {
                try FileManager.default.createDirectory(at: media, withIntermediateDirectories: false, attributes: nil)
            }
            
            let mediaFiles = zipFiles.filter({$0.lastPathComponent != "Assets.zip" })
            for file in mediaFiles{
                try fileManager.unzipItem(at: file, to: media)
            }
            
        } catch {
            print("error caught: \(error)")
        }
    }*/
    
//    @IBAction func viewWebPage(_ sender: UIButton) {
////        let index = documentsDirectory.appendingPathComponent("index.html", isDirectory: false)
//        //let query = URL(string: "?lessonName=T6_AE102_CBT", relativeTo: index)!
//
//        let prefs = WKPreferences()
//        prefs.javaScriptEnabled = true
//        let webConfig = WKWebViewConfiguration()
//        webConfig.preferences = prefs
//
//        webViewer = WKWebView(frame: view.bounds, configuration: webConfig)
//        let folderURL = documentsDirectory
////        let htmlPath = folderURL.appendingPathComponent("Index.html").path
//        let htmlPath = folderURL.appendingPathComponent("Home.html").path
//        let folderPath = folderURL.path
//        print(folderPath)
//        let baseURL = URL(fileURLWithPath: folderPath, isDirectory: true)
//        print(baseURL)
//        let htmlURL = URL(fileURLWithPath: htmlPath, isDirectory: false)
//        let lessonName = "T6_AE101_CBT"
//        if (createJavaScriptFile(lessonName: lessonName) == false){
//            print("unable to start, bad javascript file")
//            return
//        }
//        print(htmlURL.absoluteString)
//        print(lessonName)
//        if FileManager.default.fileExists(atPath: htmlPath) {
//            print("html exists")
//        } else {
//            print("html does not exist")
//        }
//
//        webViewer.loadFileURL(htmlURL, allowingReadAccessTo: documentsDirectory)
//        webViewer.navigationDelegate = self
//        webViewer.uiDelegate = self
//        self.view = webViewer
//    }


//    override func viewDidLoad() {
//        labelFiles.text = documentsDirectory.absoluteString
//        print(documentsDirectory.absoluteString)
//    }
    /*
    func doesWebDirectoryExist(_ dir: String) -> Bool {
        let combined = documentsDirectory.appendingPathComponent(dir, isDirectory: true)
        do {
            _ = try FileManager.default.contentsOfDirectory(at: combined, includingPropertiesForKeys: nil)
            return true
        } catch {
            return false
        }
    }
    
    func createJavaScriptFile(lessonName: String) -> Bool{
        let js = "$(function(){window.location.href = \"Index.html?lessonName=\(lessonName)\";});"
        let file = documentsDirectory.appendingPathComponent("lesson.js")
        do {
            try js.write(to: file, atomically: false, encoding: .utf8)
        } catch {
            print("error writing file: \(error)")
            return false
        }
        return true
    }*/
}
