//
//  Programs.swift
//  Courseware
//
//  Created by John Ayers on 8/14/18.
//  Copyright © 2018 Blacksmith Developers. All rights reserved.
//

import Foundation

enum Program: Int, CustomStringConvertible {
    case T1_UPT = 0
    case T38_UPT = 1
    case T38_IFF = 2
    case T38_PIT = 3
    case T6_UPT = 4
    case T6_RIQ = 5
    case undefined = 6
    case T6_PIT = 7
    case T6_CSO = 8
    case ENJPPT_T38 = 9
    case ENJPPT_T6 = 10
    case ENJPPT_IFF = 11
    
    var description: String {
        switch self {
        case .T1_UPT:
            return "T1-UPT"
        case .T38_IFF:
            return "T38-IFF"
        case .T38_PIT:
            return "T38-PIT"
        case .T38_UPT:
            return "T38-UPT"
        case .T6_RIQ:
            return "T6-RIQ"
        case .T6_UPT:
            return "T6-UPT"
        case .undefined:
            return "Unsupported"
        case .T6_CSO:
            return "T6-CSO"
        case .T6_PIT:
            return "T6-PIT"
        case .ENJPPT_T6:
            return "ENJPPT-T6"
        case .ENJPPT_IFF:
            return "ENJPPT-IFF"
        case .ENJPPT_T38:
            return "ENJPPT-T38"
        }
    }
    
    var getBundleName: String {
        switch self {
        case .T1_UPT:
            return "(T1)getXML"
        case .T38_IFF:
            return "(IFF)getXML"
        case .T38_PIT:
            return "(T38-PIT)getXML"
        case .T38_UPT:
            return "(T38-UPT)getXML"
        case .T6_RIQ:
            return "(RPA)getXML"
        case .T6_UPT:
            return "(T6)getXML"
        case .undefined:
            return "Unsupported"
        case .T6_PIT:
            return "(T6P)getXML"
        case .T6_CSO:
            return "(T6C)getXML"
        case .ENJPPT_IFF:
            return "(ENJPPT-IFF)getXML"
        case .ENJPPT_T38:
            return "(ENJPPT-T38)getXML"
        case .ENJPPT_T6:
            return "(ENJPPT-T6)getXML"
        }
    }
    
    static func fromString(_ value: String) -> Program {
        let value = value.lowercased()
        if (value.contains("t1")) {
            return .T1_UPT
        }
        
        if (value.contains("enjppt")) {
            if (value.contains("iff")) {
                return .ENJPPT_IFF
            }
            if (value.contains("t38")) {
                return .ENJPPT_T38
            }
            if (value.contains("t6")) {
                return .ENJPPT_T6
            }
        }
        
        if (value.contains("t6")) {
            if (value.contains("upt")) {
                return .T6_UPT
            }
            if (value.contains("riq")) {
                return .T6_RIQ
            }
            if (value.contains("pit")) {
                return .T6_PIT
            }
            if (value.contains("cso")) {
                return .T6_CSO
            }
        }
        
        if (value.contains("t38")) {
            if (value.contains("iff")) {
                return .T38_IFF
            }
            if (value.contains("pit")) {
                return .T38_PIT
            }
            if (value.contains("upt")) {
                return .T38_UPT
            }
        }
        
        return .undefined
    }
}


