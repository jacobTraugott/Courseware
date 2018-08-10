//
//  StaticMethods.swift
//  Courseware
//
//  Created by John Ayers on 6/25/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit

enum StaticMethods {
    static let documentsDirectory = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).first!
    static let tempDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
    
    static func doesWebDirectoryExist(_ dir: String) -> Bool {
        let combined = tempDirectory.appendingPathComponent(dir, isDirectory: true)
        do {
            _ = try FileManager.default.contentsOfDirectory(at: combined, includingPropertiesForKeys: nil)
            return true
        } catch {
            return false
        }
    }
    
    static func createJavaScriptFile(lessonName: String, aircraft: String, isCBT: Bool) -> Bool{
        let cbt: String = isCBT ? "CBT" : "IBT"
        let js = "$(function(){window.location.href = \"Index.html?lessonName=\(aircraft)_\(lessonName)_\(cbt)\";});"
        let file = tempDirectory.appendingPathComponent("lesson.js")
        do {
            try js.write(to: file, atomically: false, encoding: .utf8)
        } catch {
            print("error writing file: \(error)")
            return false
        }
        return true
    }
    
    static func isFileCBTorIBT(url: URL) -> TrainingType {
        let file = (url.lastPathComponent).lowercased()
        
        if file.contains("_cbt_") {
            return .cbt
        } else if file.contains("_ibt_") {
            return .ibt
        } else {
            return .none
        }
    }
}
