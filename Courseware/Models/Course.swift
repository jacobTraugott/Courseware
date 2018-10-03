//
//  Course.swift
//  Courseware
//
//  Created by John Ayers on 6/17/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import Foundation

struct Course: Comparable, Equatable {
    
    let fileName: String
    let displayName: String
    let aircraft: String
    let url: URL
    let program: Program
    
    init(fileName: URL) {
        self.fileName = fileName.lastPathComponent
        if fileName.lastPathComponent.split(separator: "_").count == 4 {
            //this should be an old version file
            //we'll keep this in for now to support the Vance tablets
            let components = self.fileName.split(separator: "_")
            self.aircraft = components.count > 1 ?  components[0].description : ""
            self.displayName = components.count > 2 ?  components[1].description : ""
            self.program = .T6_UPT
        } else {
            let rpaString = "RPA_RIQ_"
            if self.fileName.contains(rpaString) {
                let splitName = fileName.lastPathComponent.replacingOccurrences(of: rpaString, with: "")
                let comps = splitName.split(separator: "_")
                self.program = Program.fromString(comps[0].description)
                self.aircraft = "RPA_RIQ"
                self.displayName = comps.count > 2 ? comps[1].description : ""
            } else {
                let components = self.fileName.split(separator: "_")
                self.program = Program.fromString(components[0].description)
                self.aircraft = components.count > 2 ?  components[1].description : ""
                self.displayName = components.count > 3 ?  components[2].description : ""
                
            }
        }
        self.url = fileName
    }
    
    init(fileName: String, displayName: String, aircraft: String, program: Program) throws {
        guard program != .undefined else {
            throw CourseErrors.badProgram
        }
        
        self.fileName = fileName
        self.displayName = displayName
        self.aircraft = aircraft
        self.program = program
        let optUrl = URL(string: fileName)
        guard let newUrl = optUrl else {
            throw CourseErrors.badURL
        }
        self.url = newUrl
    }
    
    static func ==(lhs: Course, rhs: Course) -> Bool {
        let displayBool = lhs.displayName == rhs.displayName
        let aircraftBool = lhs.aircraft == rhs.aircraft
        let programBool = lhs.program == rhs.program
        
        return (displayBool && aircraftBool && programBool)
    }
    
    static func < (lhs: Course, rhs: Course) -> Bool {
        if lhs.program == rhs.program {
            if lhs.aircraft == rhs.aircraft {
                if lhs.displayName == rhs.displayName {
                    return false
                } else if lhs.displayName < rhs.displayName {
                    return true
                } else {
                    return false
                }
                
            } else if (lhs.aircraft < rhs.aircraft) {
                return true
            } else {
                return false
            }
        } else if (lhs.program.rawValue < rhs.program.rawValue) {
            return true
        } else {
            return false
        }
    }
}

enum CourseErrors: Error {
    case badURL
    case badProgram
}
