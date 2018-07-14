//
//  StaticMethods.swift
//  Courseware
//
//  Created by John Ayers on 6/25/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit

enum StaticMethods {
    static func doesWebDirectoryExist(_ dir: String) -> Bool {
        let combined = documentsDirectory.appendingPathComponent(dir, isDirectory: true)
        do {
            _ = try FileManager.default.contentsOfDirectory(at: combined, includingPropertiesForKeys: nil)
            return true
        } catch {
            return false
        }
    }
    
    static func createJavaScriptFile(lessonName: String, aircraft: String) -> Bool{
        let js = "$(function(){window.location.href = \"Index.html?lessonName=\(aircraft)_\(lessonName)_CBT\";});"
        let file = documentsDirectory.appendingPathComponent("lesson.js")
        do {
            try js.write(to: file, atomically: false, encoding: .utf8)
        } catch {
            print("error writing file: \(error)")
            return false
        }
        return true
    }
    
    static let documentsDirectory = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).first!
}
