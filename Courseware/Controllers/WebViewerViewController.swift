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
    
    var edgeCloseSwipeGesture: UIScreenEdgePanGestureRecognizer!
    var panCloseSwipeGesture: UIPanGestureRecognizer!
    var lessonSwipeGesture: UIPanGestureRecognizer!
    
    private let backJSFunction = "var media = $(\"#media div\").length; $('#progressbar').attr(\"value\", currentFrameIndex - 1); value = $(\"#progressbar\").attr(\"value\");if (media < 1) { $(\"#media\").hide(); } else { $(\"#media\").show(); } if (currentFrameIndex == 1) { $(\"a.backBtn\").prop(\"disabled\", true).attr('style', 'background-position: -106px -72px'); } progressBarCbt(); MoveBackward();"
    
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
        print("Lesson: \(lessonURL.absoluteString)")
        webViewer.loadFileURL(lessonURL, allowingReadAccessTo: documentsDirectory)
        webViewer.navigationDelegate = self
        webViewer.uiDelegate = self
        webViewer.scrollView.bounces = false
        webViewer.isUserInteractionEnabled = true
        
        webViewer.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webViewer)
        
        edgeCloseSwipeGesture = UIScreenEdgePanGestureRecognizer(target: self, action: #selector(closeLesson(_:)))
        edgeCloseSwipeGesture.edges = .left
        edgeCloseSwipeGesture.maximumNumberOfTouches = 1
        edgeCloseSwipeGesture.delegate = self
        edgeCloseSwipeGesture.cancelsTouchesInView = true
        view.addGestureRecognizer(edgeCloseSwipeGesture)
        
        panCloseSwipeGesture = UIPanGestureRecognizer(target: self, action: #selector(closeLessonFromScreenPan(_:)))
        panCloseSwipeGesture.delegate = self
        panCloseSwipeGesture.minimumNumberOfTouches = 2
        panCloseSwipeGesture.maximumNumberOfTouches = 2
        panCloseSwipeGesture.cancelsTouchesInView = true
        view.addGestureRecognizer(panCloseSwipeGesture)

        lessonSwipeGesture = UIPanGestureRecognizer(target: self, action: #selector(moveLessonProgress(_:)))
        lessonSwipeGesture.delegate = self
        lessonSwipeGesture.maximumNumberOfTouches = 1
        lessonSwipeGesture.cancelsTouchesInView = false
        view.addGestureRecognizer(lessonSwipeGesture)
        
    }
    
    @objc func closeLesson(_ sender: UIScreenEdgePanGestureRecognizer) {
        let dX = abs(sender.translation(in: self.view).x / self.view.bounds.width)
        if dX >= 0.25 {
            closeWindow()
        }
    }
    
    @objc func closeLessonFromScreenPan(_ sender: UIPanGestureRecognizer) {
        let speed = sender.velocity(in: self.view).x
        let dX = abs(sender.translation(in: self.view).x / self.view.bounds.width)
        let swipeLeft = speed > 0
        
        if swipeLeft && dX >= 0.25 {
            closeWindow()
        }
    }
    
    @objc func moveLessonProgress(_ sender: UIPanGestureRecognizer) {
        let speed = sender.velocity(in: self.view).x
        let dX = abs(sender.translation(in: self.view).x / self.view.bounds.width)
        let swipeLeft = speed > 0
        
        if sender.state == .ended && dX > 0.1 {
            if swipeLeft {
                //user is going back in the lesson
                self.webViewer.evaluateJavaScript(backJSFunction, completionHandler: nil)
            } else {
                //user is advancing the lesson
                self.webViewer.evaluateJavaScript("MoveForwardFromHotspot();", completionHandler: nil)
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
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldBeRequiredToFailBy otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        
        if gestureRecognizer == lessonSwipeGesture && otherGestureRecognizer != lessonSwipeGesture {
            return false
        } else if gestureRecognizer == edgeCloseSwipeGesture && otherGestureRecognizer == lessonSwipeGesture {
            return false
        } else if gestureRecognizer == panCloseSwipeGesture {
            return false
        } else {
            return true
        }
    }
}

extension WebViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("recieved message")
        guard let payload = message.body as? [String : Any],
            let msg = payload["message"], let msgAction = msg as? String else {
                return
        }
        if msgAction == "exitCourse" {
            self.closeWindow()
        }
    }
}
