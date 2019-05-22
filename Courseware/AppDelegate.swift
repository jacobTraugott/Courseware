//
//  AppDelegate.swift
//  Courseware
//
//  Created by John Ayers on 6/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    
    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        if let window = self.window {
            var vc = window.rootViewController
            if (vc is UINavigationController) {
                vc = (vc as! UINavigationController).visibleViewController
            }
            
            if (vc is WebViewController) {
                return .landscape
            } else {
                return .all
            }
        } else {
            return .all
        }
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if let homeURL = CourseCatelog.openCourse(fromURL: url, copySourceFileToLibrary: true) {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let webVC: WebViewController = storyboard.instantiateViewController(withIdentifier: "webViewForCourse") as! WebViewController
            webVC.lessonURL = homeURL
            webVC.openedFromAppDelegate = true
            window?.rootViewController = webVC
            window?.makeKeyAndVisible()
            return true
        }
        
        return false
    }
}

