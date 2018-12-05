//
//  CourseListViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import WebKit

class CourseListViewController: UITableViewController {
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
        let cell = tableView.dequeueReusableCell(withIdentifier: courseCellID, for: indexPath) as! CourseCell
        let course = courses[indexPath.row]
        cell.aircraft.text = course.aircraft
        cell.courseName.text = course.displayName
        cell.displayName = course.displayName
        cell.aircraftText = course.aircraft
        cell.index = indexPath.row
        cell.program = course.program
        cell.programLabel.text = course.program.description
        cell.courseCatelog = courseCatelog
        cell.doneLoadingAction = presentCourse(_:)
        cell.failedToLoadAction = failedToPresentCourse(_:)
        cell.activity.stopAnimating()
        cell.activity.isHidden = true
        return cell
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 50
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("initiated course opening from tableView delegate")
        if let cell = tableView.cellForRow(at: indexPath) {
            let courseCell = cell as! CourseCell
            DispatchQueue.main.async {
                print("hide button, starting activity spinner")
                courseCell.activity.isHidden = false
                courseCell.activity.startAnimating()
                courseCell.takeCourseButton.isHidden = true
                print("ran through activity start code")
            }
            DispatchQueue.global().async {
                courseCell.openCourse(courseObject: self.courseCatelog.allCourses[indexPath.row])
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let course = courses[indexPath.row]
            courses.remove(at: indexPath.row)
            courseCatelog.removeCoursewareFile(fromURL: course.url)
            tableView.deleteRows(at: [indexPath], with: .automatic)
        }
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
    
    func presentCourse(_ url: URL) -> Void {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let webVC: WebViewController = storyboard.instantiateViewController(withIdentifier: "webViewForCourse") as! WebViewController
        webVC.lessonURL = url
        webVC.modalTransitionStyle = .flipHorizontal
        self.present(webVC, animated: true, completion: nil)
    }
    
    func failedToPresentCourse(_ msg: String) -> Void {
        let alert = UIAlertController(title: "Unable to find file", message: "An error occurred while opening courseware.  Please notify your tech guru", preferredStyle: .alert)
        let okAction = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(okAction)
        self.present(alert, animated: true, completion: nil)
    }
}
