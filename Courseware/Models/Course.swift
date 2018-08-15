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
    
    //let programs: [String] = ["T1-UPT", "T38-UPT", "T38-IFF", "T38-PIT", "T6-UPT", "T6-RIQ"]
    //let newFile = "(\(program))_\(url.lastPathComponent).\(customExtension)"
    //(T6-UPT)_T6_CO101_CBT_media.acware
}

enum CourseErrors: Error {
    case badURL
    case badProgram
}
