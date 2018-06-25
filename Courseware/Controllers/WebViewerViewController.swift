//
//  WebViewerViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import WebKit

class WebViewerViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {
    let documentsDirectory = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).first!
    var lessonName: String!
    var webViewer: WKWebView!
    
    private func createJavaScriptPage() -> Bool {
        let js = "$(function(){window.location.href = \"Index.html?lessonName=\(lessonName)\";});"
        let file = documentsDirectory.appendingPathComponent("lesson.js")
        do {
            try js.write(to: file, atomically: false, encoding: .utf8)
        } catch {
            print("error writing file: \(error)")
            return false
        }
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if createJavaScriptPage() {
            let prefs = WKPreferences()
            prefs.javaScriptEnabled = true
            let webConfig = WKWebViewConfiguration()
            webConfig.preferences = prefs
            webViewer = WKWebView(frame: view.bounds, configuration: webConfig)
            let htmlPath = documentsDirectory.appendingPathComponent("Home.html").path
            let htmlURL = URL(fileURLWithPath: htmlPath, isDirectory: false)
            if FileManager.default.fileExists(atPath: htmlPath) {
                print("html exists")
            } else {
                print("html does not exist")
                //TODO: Need to return to previous view with error message
            }
            
            webViewer.loadFileURL(htmlURL, allowingReadAccessTo: documentsDirectory)
            webViewer.navigationDelegate = self
            webViewer.uiDelegate = self
            self.view = webViewer
        } else {
            //TODO: Need to return to previous view with error message
        }
    }
    
    
    @IBAction func closeLesson(_ sender: UIButton) {
        //TODO: Need to implement means of closing the view and returning to the table
    }
}
