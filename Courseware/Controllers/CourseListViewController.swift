//
//  CourseListViewController.swift
//  Courseware
//
//  Created by John Ayers on 6/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import UIKit
import WebKit

class CourseListViewController: UITableViewController, UISearchResultsUpdating, UISearchBarDelegate {
    
    var courses: [Course] = []
    var filteredCourses: [Course] = []
    let courseCatelog = CourseCatelog()
    let courseCellID: String = "CourseCellID"
    var searchResultController = UISearchController()
    var searchBar: UISearchBar!
    var searchView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        definesPresentationContext = true
        addRefreshControl()
        addSearchController()
        reloadCourses()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        UIViewController.attemptRotationToDeviceOrientation()
    }
    
    override var shouldAutorotate: Bool {
        return true
    }
    
    private func addRefreshControl() {
        refreshControl = UIRefreshControl()
        refreshControl?.addTarget(self, action: #selector(handleRefresh(_:)), for: .valueChanged)
    }
    
    private func addSearchController() {
        searchResultController = ({
            let controller = UISearchController(searchResultsController: nil)
            controller.searchResultsUpdater = self
            controller.dimsBackgroundDuringPresentation = false
            controller.searchBar.sizeToFit()
            tableView.tableHeaderView = controller.searchBar
            searchView = controller.searchBar
            return controller
        })()
        searchResultController.searchBar.delegate = self
    }
    
    private func refillFilteredCourses() {
        filteredCourses = courses.map { $0 }
        self.tableView.reloadData()
    }
    
    func updateSearchResults(for searchController: UISearchController) {
        if let searchText = searchResultController.searchBar.text?.lowercased() {
            guard searchText.trimmingCharacters(in: .whitespacesAndNewlines).count > 0 else {
                refillFilteredCourses()
                return
            }
            filteredCourses.removeAll(keepingCapacity: false)
            filteredCourses = courses.filter { $0.displayName.lowercased().contains(searchText) || $0.aircraft.lowercased().contains(searchText) || $0.program.description.lowercased().contains(searchText)
            }
            
            self.tableView.reloadData()
        } else {
            refillFilteredCourses()
        }
    }
    
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        searchResultController.isActive = false
        refillFilteredCourses()
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if searchResultController.isActive {
            return filteredCourses.count
        } else {
            return courses.count
        }
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: courseCellID, for: indexPath) as? CourseCell else {
            return UITableViewCell()
        }
        let course: Course
        if searchResultController.isActive {
            course = filteredCourses[indexPath.row]
        } else {
            course = courses[indexPath.row]
        }
        cell.courseURL = course.url
        cell.aircraft.text = course.aircraft
        cell.courseName.text = course.displayName
        cell.displayName = course.displayName
        cell.aircraftText = course.aircraft
        cell.programLabel.text = course.program.description
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
                let courseObject = self.searchResultController.isActive ? self.filteredCourses[indexPath.row] : self.courseCatelog.allCourses[indexPath.row]
                courseCell.openCourse(courseObject: courseObject)
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let course: Course
            let indexToRemove: Int
            if searchResultController.isActive {
                course = filteredCourses[indexPath.row]
                filteredCourses.remove(at: indexPath.row)
                indexToRemove = courses.firstIndex(of: course) ?? indexPath.row
            } else {
                course = courses[indexPath.row]
                indexToRemove = indexPath.row
            }
            //let course = courses[indexPath.row]
            //courses.remove(at: indexPath.row)
            courses.remove(at: indexToRemove)
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
        filteredCourses = courses.map { $0 }
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
