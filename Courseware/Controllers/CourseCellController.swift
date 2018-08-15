//
//  CourseCellController.swift
//  Courseware
//
//  Created by John Ayers on 6/25/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit

class CourseCell: UITableViewCell {
    @IBOutlet var activity: UIActivityIndicatorView!
    @IBOutlet var courseName: UILabel!
    @IBOutlet var aircraft: UILabel!
    @IBOutlet var programLabel: UILabel!
    @IBOutlet var takeCourseButton: UIButton!
    
    var program: Program!
    var aircraftText: String!
    var displayName: String!
    var index: Int!
    weak var courseCatelog: CourseCatelog!
    var doneLoadingAction: ((URL) -> Void)!
    var failedToLoadAction: ((String) -> Void)!
    
    @IBAction func takeCourse(_ sender: UIButton) {
        DispatchQueue.main.async {
            print("hide button, starting activity spinner")
            self.activity.isHidden = false
            self.activity.startAnimating()
            self.takeCourseButton.isHidden = true
            print("ran through activity start code")
        }
        DispatchQueue.global().async {
            self.openCourse()
        }
    }
    
    private func openCourse() {
        var url: URL?
        let dispatchGroup = DispatchGroup()
        print("entered dispatch group")
        dispatchGroup.enter()
        DispatchQueue.global().async {
            print("started opening course")
            url = self.courseCatelog.openCourse(index: self.index, courseName: self.displayName, aircraft: self.aircraftText)
            dispatchGroup.leave()
            print("done opening course")
        }
        dispatchGroup.wait()
        print("past dispatch group")
        DispatchQueue.main.async {
            print("stopping activity spinner, showing button")
            self.activity.isHidden = true
            self.activity.stopAnimating()
            self.takeCourseButton.isHidden = false
            print("ran through activity stop code")
        }
        
        if let goodUrl = url {
            print("good url, loading action")
            self.doneLoadingAction(goodUrl)
        } else {
            print("bad url, failure action")
            self.failedToLoadAction("Could not find \(self.displayName) in files.")
        }
    }
}
