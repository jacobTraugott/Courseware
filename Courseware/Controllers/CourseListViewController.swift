//
//  CourseListViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import Zip

class CourseListViewController: UIViewController {
    
    let assetsDirectory = "Assets"
    let mediaDirectory = "Content"
    let documentsDirectory = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).first!
    
    @IBOutlet var labelFiles: UITextField!
    
    @IBAction func scanDirectory(_ sender: UIButton) {
        do {
            let fileURLs = try FileManager.default.contentsOfDirectory(at: documentsDirectory, includingPropertiesForKeys: nil)
            let zipFiles = fileURLs.filter({$0.pathExtension == "zip"})
            for file in zipFiles {
                print(file.absoluteString)
            }
            
            
            
        } catch {
        
        }
    }
    
    override func viewDidLoad() {
        labelFiles.text = documentsDirectory.absoluteString
        print(documentsDirectory.absoluteString)
    }
    
    func doesWebDirectoryExist(_ dir: String) -> Bool {
        let combined = documentsDirectory.appendingPathComponent(dir, isDirectory: true)
        do {
            _ = try FileManager.default.contentsOfDirectory(at: combined, includingPropertiesForKeys: nil)
            return true
        } catch {
            return false
        }
    }
}
