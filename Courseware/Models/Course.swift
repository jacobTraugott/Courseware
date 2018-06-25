//
//  Course.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import Foundation

struct Course {
    let fileName: String
    let displayName: String
    let aircraft: String
    let url: URL
    
    init(fileName: URL) {
        self.fileName = fileName.lastPathComponent
        let components = self.fileName.split(separator: "_")
        self.aircraft = components.count > 1 ?  components[0].description : ""
        self.displayName = components.count > 2 ?  components[1].description : ""
        self.url = fileName
    }
    
    init(fileName: String, displayName: String, aircraft: String) throws {
        self.fileName = fileName
        self.displayName = displayName
        self.aircraft = aircraft
        let optUrl = URL(string: fileName)
        guard let newUrl = optUrl else {
            throw CourseErrors.badURL
        }
        self.url = newUrl
    }
}

enum CourseErrors: Error {
    case badURL
}
