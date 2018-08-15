//
//  WebViewerViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import WebKit

class WebViewController: UIViewController, WKUIDelegate, WKNavigationDelegate, UIGestureRecognizerDelegate {
    let documentsDirectory = StaticMethods.tempDirectory
    var lessonURL: URL!
    var webViewer: WKWebView!
    var openedFromAppDelegate: Bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        let values = [UIInterfaceOrientation.landscapeLeft, UIInterfaceOrientation.landscapeRight]
//        let value = UIInterfaceOrientation.landscapeLeft.rawValue
//        UIDevice.current.setValue(value, forKey: "orientation")
        
        let prefs = WKPreferences()
        prefs.javaScriptEnabled = true
        
        let scriptSource = "var buttons = document.getElementsByClassName('exitBtn'); var button = buttons[0]; button.onclick = function() { window.webkit.messageHandlers.buttonPressed.postMessage({\"message\" : \"exitCourse\"}); };"
        let userContentController = WKUserContentController()
        let userScript = WKUserScript(source: scriptSource,
                                      injectionTime: .atDocumentEnd,
                                      forMainFrameOnly: false)
        userContentController.addUserScript(userScript)
        // Advertise that we support receiving messages. Post them in JavaScript via:
        // window.webkit.messageHandlers.buttonPressed.postMessage()
        userContentController.add(self, name: "buttonPressed")
        
        let webConfig = WKWebViewConfiguration()
        webConfig.preferences = prefs
        webConfig.userContentController = userContentController
        webViewer = WKWebView(frame: view.frame, configuration: webConfig)
        webViewer.contentMode = .scaleToFill
        webViewer.loadFileURL(lessonURL, allowingReadAccessTo: documentsDirectory)
        webViewer.navigationDelegate = self
        webViewer.uiDelegate = self
        webViewer.scrollView.bounces = false
        
        webViewer.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webViewer)
        
        let swipeGesture = UIScreenEdgePanGestureRecognizer(target: self, action: #selector(closeLesson(_:)))
        swipeGesture.edges = .left
        swipeGesture.delegate = self
        view.addGestureRecognizer(swipeGesture)
    }
    
    @objc func closeLesson(_ sender: UIScreenEdgePanGestureRecognizer) {
        let dX = sender.translation(in: view).x
        if sender.state == .ended {
            let fraction = abs(dX / view.bounds.width)
            if fraction >= 0.35 {
                closeWindow()
            }
        }
    }
    
    func closeWindow() {
        if openedFromAppDelegate {
            let app = UIApplication.shared.delegate as! AppDelegate
            let window = app.window
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let courseVC = storyboard.instantiateViewController(withIdentifier: "courseListVC") as! CourseListViewController
            window?.rootViewController = courseVC
            window?.makeKeyAndVisible()
            self.dismiss(animated: true, completion: nil)
        } else {
            self.dismiss(animated: true, completion: nil)
        }
    }
}

extension WebViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("recieved message")
        guard let payload = message.body as? [String: Any],
            let msg = payload["message"], let msgAction = msg as? String else {
                return
        }
        if msgAction == "exitCourse" {
            self.closeWindow()
        }
    }
}
