/* ------------------------------------------------------------------------------- |
/ T38 Gauge: three arrows                                                          |
/ Jason Willis - Started Dec 2017                                                  |
/ Create Collapsible Region Ctrl+M+H/Ctrl+M+U.                                     |
/ -------------------------------------------------------------------------------- | */

var diamondPosition = 3;
var midArrowLabel = "BLK";
var bottomArrowAsterix = "on";
var mdfState = 'tZone';
var bcpState = "off"; // on, rad, brg
var tempNum;
// Backup Control Panel
//var activeFreqInteger = $('#activeFreqInteger').text(),    // Start 108
//    activeFreqDecimal = $('#activeFreqDecimal').text(),    //          .80   
//    standbyFreqInteger = $('#standbyFreqInteger').text(),  // Start 112 
//    standbyFreqDecimal = $('#standbyFreqDecimal').text(),  //          .80 
var activeFreqWindow = $('#activeFreqWindow').text(),
    standbyFreqWindow = $('#standbyFreqWindow').text(),
    standbyRadial = $('#standbyRadial').text(),         // Start 103 deg
    standbyBearing = $('#standbyBearing').text();        // Start --- deg

//console.log('activeFreqWindow: ' + activeFreqWindow + '\nactiveFreqWindow type: ' + typeof activeFreqWindow);
//console.log('Converted: ' + parseFloat(activeFreqWindow) + '\nconverted type: ' + typeof parseFloat(activeFreqWindow));

$(document).ready(function () {
    clearAll();
    //Open documents with these elements hidden
    // ref: T38_SO1106_CBT_UFCPInc-Dec5_500_550.htm
    $('#toggleIncrementDiamondPos1').hide();
    $('#toggleIncrementDiamondPos4').hide();
    // ref: T38_SO1106_CBT_UFCPNavsource_550_550.htm
    $('#rtnHighlightBorder').hide();
    $('#toggleReadout').hide();
    // ref: T38_SO1106_CBT_UFCIncDec28_550_550.htm
    $('#twoHighlightBorder').hide();
    $('#myGaugeUFCPNavIncDec28').hide();
    // ref: T38_SO1106_CBT_UFCPSymbolBackground_465_245.htm
    $('#rtnButtonHighlightBorder').hide();
    
    // Show default background
    $('#myGaugeUFCPSymbolBackgroundBLK').show();

    // ref: T1A/T38_SO1107_CBT_Zones2_b9_440_550.htm
    $('#mdfMenu').show();
    $('#mdfMenuBtn').show();

    // Hide Borders
    $('#mdfZoneBtn').hide();
    $('#mdfTZoneBtn').hide();
    $('#mdfViewZoneBtn').hide();
    $('#mdfNoFlyBtn').hide();
    $('#mdfHSDBtn').hide();
    $('#mdfNoFlyBtn').hide();

    //// ref: T38_SO1107_CBT_WPNRelVel_XXX_YYY
    // Show
    $('#mdfDashCorRelease').show();
    $('#mdfDashCorReleaseBtn').show();
    // Hide 
    $('#mdfDashCorRestore').hide();
    $('#mdfDashCorRestoreBtn').hide();

    //// ref: T38_SO1107_CBT_NewPFL
    $('#cpOff').show();
    $('#cpToggleOn').show();
    $('#cpToggleOff').show();
    $('#cpToggleRad').show();
    $('#cpToggleBrg').show();
    // Hide Arrows
    $('#leftOuterArrow').hide();
    $('#rightOuterArrow').hide();
    $('#leftInnerArrow').hide();
    $('#rightInnerArrow').hide();
    
    //// ref: T38_SO1107_CBT_ICAO-alphanumeric
    // Show
    $('#mdfDashAlpha').show();
    $('#mdfDashAlphaBtn').show();

    //// ref: T38_SO1107_CBT_Testmenu
    // Show
    $('#mfdMenu1').show();
    $('#mfdMenu2Btn').show();


});

// Toggle borders
$('#myHighlightBorder').click(function () {
    if (diamondPosition == 3) { // 3 is showing when 1 & 4 are hidden, hide 3 & show 4, 
        $('#toggleIncrementDiamondPos3').hide(); // toggle Increment view/hide
        $('#toggleIncrementDiamondPos4').show();
        diamondPosition = 4; //set new condition
            
    } else if (diamondPosition == 4) { // 4 is showing when 1 & 3 are hidden, show 1 & hide 4
        $('#toggleIncrementDiamondPos1').show();
        $('#toggleIncrementDiamondPos4').hide();
        diamondPosition = 1;
    } else if (diamondPosition == 1) { // 1 is showing when 3 & 4 are hidden, show 3 and hide 1
        $('#toggleIncrementDiamondPos1').hide();
        $('#toggleIncrementDiamondPos3').show();
        $('#toggleIncrementDiamondPos4').hide();
        diamondPosition = 3;
    }
});

// T38_SO1106_CBT_UFCPNavsource_550_550.htm 
$('#rArrowHighlightBorder').click(function () {
    $('#rtnHighlightBorder').show();
    $('#rArrowHighlightBorder').hide();
    // toggle background img
    $('#myGaugeUFCPNav').hide();
    $('#toggleReadout').show();
});
$('#rtnHighlightBorder').click(function () {
    $('#rtnHighlightBorder').hide();
    $('#rArrowHighlightBorder').show();

    //background
    $('#toggleReadout').hide();
    $('#myGaugeUFCPNav').show();
    $('#myGaugeUFCPSymbolBackgroundNoAsterix').hide();
});

// T38_SO1106_CBT_UFCIncDec28_465_245.htm
$('#eightHighlightBorder').click(function () {
    $('#eightHighlightBorder').hide();
    $('#twoHighlightBorder').show();

    //background
    $('#toggleNavIncDec28').hide();
    $('#myGaugeUFCPNavIncDec28').show();
});
$('#twoHighlightBorder').click(function () {
    $('#eightHighlightBorder').show();
    $('#twoHighlightBorder').hide();

    //background
    $('#toggleNavIncDec28').show();
    $('#myGaugeUFCPNavIncDec28').hide();
});

// T38_SO1106_CBT_UFCPSymbolBackground_465_245.htm - Top Arrow & RTN
$('#topArrowHighlightBorder').click(function () {
    // Button Border Swap
    $('#topArrowHighlightBorder').hide();
    $('#middleArrowHighlightBorder').hide();
    $('#bottomArrowHighlightBorder').hide();
    $('#rtnButtonHighlightBorder').show();
    
    clearAll();
    $('#myGaugeUFCPSymbolBackgroundRTN').show();
    midArrowLabel = "BLK";
});
$('#rtnButtonHighlightBorder').click(function () {
    // Button Border Swap
    $('#rtnButtonHighlightBorder').hide();
    $('#topArrowHighlightBorder').show();
    $('#middleArrowHighlightBorder').show();
    $('#bottomArrowHighlightBorder').show();
    
    //background
    clearAll();
    $('#myGaugeUFCPSymbolBackgroundBLK').show();
    midArrowLabel = "BLK";
});

// UFCPSymbolBackground - Middle Arrow toggle four
$('#middleArrowHighlightBorder').click(function () {
    if (midArrowLabel == "BLK") { // Default BLK when opened, toggle to ABV
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundABV').show();
        midArrowLabel = "ABV"; //set new condition
    } else if (midArrowLabel == "ABV") { // Toggle from ABV to BLW
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundBLW').show();
        midArrowLabel = "BLW";
    } else if (midArrowLabel == "BLW") { // Toggle from BLW to NOR
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundNOR').show();
        midArrowLabel = "NOR";
    } else if (midArrowLabel == "NOR") { // Toggle from NOR to BLK
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundBLK').show();
        midArrowLabel = "BLK";
    }
    bottomArrowAsterix = "on"
    //console.log("Asterix = on");
});

// UFCPSymbolBackground - Bottom Arrow & RTN
$('#bottomArrowHighlightBorder').click(function () {
    if (bottomArrowAsterix == "on") {
        bottomArrowAsterix = "off";
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundNoAsterix').show();
    } else  {
        bottomArrowAsterix = "on";
        // Background
        clearAll();
        $('#myGaugeUFCPSymbolBackgroundBLK').show();
    }
})

// Clear Gauge Background Images
function clearAll() {
    $('#myGaugeUFCPSymbolBackgroundBLK').hide();
    $('#myGaugeUFCPSymbolBackgroundABV').hide();
    $('#myGaugeUFCPSymbolBackgroundBLW').hide();
    $('#myGaugeUFCPSymbolBackgroundNoAsterix').hide();
    $('#myGaugeUFCPSymbolBackgroundNOR').hide();
    $('#myGaugeUFCPSymbolBackgroundRTN').hide();

    // T38_SO1107 hide images
    $('#mdfMenu').hide();
    $('#mdfZone').hide();
    $('#mdfZone').hide();
    $('#mdfNoFly').hide();
    $('#mdfHSD').hide();
    $('#mdfViewZoneTZ').hide();
    $('#mdfViewZoneNF').hide();
    $('#mdfTZone').hide();
    $('#mdfRTN').hide();

    // t38_SO1107 hide buttons
    $('#mdfZoneBtn').hide();
    $('#mdfMenuBtn').hide();
    $('#mdfZoneBtn').hide();
    $('#mdfTZoneBtn').hide();
    $('#mdfNoFlyBtn').hide();
    $('#mdfViewZoneBtn').hide();
    $('#mdfViewZoneTZBtn').hide();
    $('#mdfViewZoneNFBtn').hide();   
    $('#mdfHSDBtn').hide();
    $('#mdfRTNBtn').hide();

    // T38_SO1107_CBT_WPNRelVel hide 
    $('#mdfDashCorRelease').hide();
    $('#mdfDashCorRestore').hide();
    $('#mdfDashCorRestoreBtn').hide();
    $('#mdfDashCorReleaseBtn').hide();

    // T38_SO1107_CBT_ICAO-alphanumeric hide 
    $('#mdfDashAlpha').hide();
    $('#mdfDashNum').hide();
    $('#mdfDashAlphaBtn').hide();
    $('#mdfDashNumBtn').hide();

    // T38_SO1107_CBT_Testmenu hide
    // background images
    $('#mfdMenu1').hide();
    $('#mfdMenu2').hide();
    $('#mfdTest').hide();
    $('#mfdDSCIN').hide();

    // buttons
    $('#mdfMenuBtn').hide();
    $('#mfdMenu1Btn').hide();
    $('#mfdMenu2Btn').hide();
    $('#mfdTestTopLeftBtn').hide();
    $('#mfdTestBottomRightBtn').hide();
    $('#mfdDSCINBtn').hide();
    $('#mfdBackBtn').hide();
    $('#mfdMenuBtn').hide();

    // Backup Control Panel - T38_SO1107_CBT_NewPFL_640_655.htm
    // background images
    $('#cpOff').hide();
    $('#cpOn').hide();
    $('#cpRad').hide();
    $('#cpBrg').hide();

    // displays
    $('#activeFreqWindow').hide();
    $('#standbyFreqWindow').hide();
    $('#standbyRadial').hide();
    $('#standbyBearing').hide();

    // buttons (hot spots)
    //$('#cp').hide();

    // freqDisplay
    $('.freqReadout').hide();
    $('#active').hide();
    $('#activeFreqInteger').hide();
    $('#activeFreqDecimal').hide();
    $('#standbyFreqInteger').hide();
    $('#standbyFreqDecimal').hide();
    $('#standbyRadial').hide();
    $('#standbyBearing').hide();
}   


// Toggle MDF Button Borders 
// MenuButton onclick
$('#mdfMenuBtn').click(function () {
    console.log('mdfMenuBtn');
    // Show/hide gauge
    clearAll();
    $('#mdfZone').show();
    //$('#mdfMenu').hide();
    // Show/hide button border
    $('#mdfZoneBtn').show();
    $('#mdfMenuBtn').hide();
});

////  ref: t38_so1107_cbt_zones2_b9_440_550
// Zone Button onClick 
$('#mdfZoneBtn').click(function () {
    console.log('mdfZoneBtn');
    clearAll();
    // Show/hide gauge
    if (mdfState == 'noFly') {
        // Show/hide gauge
        $('#mdfTZone').hide();
        $('#mdfNoFly').show();
    }
    else {
        $('#mdfTZone').show();
        $('#mdfNoFly').hide();        
    }
    //$('#mdfTZone').show();
    // Show/hide button border
    $('#mdfViewZoneBtn').show();
    $('#mdfHSDBtn').show();
    $('#mdfTZoneBtn').show();
    // Toggle mdfState
    mdfStateToggle();
});
// T-Zone Button onClick
$('#mdfTZoneBtn').click(function () {
    //console.log('mdfTZoneBtn');
    clearAll();
    //console.log('Before conditional: mdfState = ' + mdfState);
    if (mdfState == 'tZone') {
        // Show/hide gauge
        $('#mdfTZone').show();
        $('#mdfNoFly').hide();
    }
    else {
        $('#mdfNoFly').show();
        $('#mdfTZone').hide();
    }
    // Show/hide button border
    $('#mdfViewZoneBtn').show();
    $('#mdfHSDBtn').show();
    $('#mdfNoFlyBtn').show();
    $('#mdfMenuBtn').hide();
    // Toggle mdfState
    mdfStateToggle();
});
// T-Zone Button onClick
$('#mdfNoFlyBtn').click(function () {
    //console.log('mdfNoFlyBtn');
    clearAll();
    //console.log('Before conditional: mdfState = ' + mdfState);
    if (mdfState == 'tZone') {
        // Show/hide gauge
        $('#mdfTZone').show();
        $('#mdfNoFly').hide();
    }
    else {
        $('#mdfNoFly').show();
        $('#mdfTZone').hide();
    }
    // Show/hide button border
    $('#mdfViewZoneBtn').show();
    $('#mdfHSDBtn').show();
    $('#mdfNoFlyBtn').show();
    $('#mdfMenuBtn').hide();
    // Toggle mdfState
    mdfStateToggle();
});
// Zone Button onClick 
$('#mdfHSDBtn').click(function () {
    console.log('mdfHSDBtn');
    clearAll();
    // Show/hide gauge
    $('#mdfMenu').show();
    // Show/hide button button
   // $('#mdfMenuBtn').show();
    $('#mdfHSDBtn').hide();
    $('#mdfMenuBtn').show();
    $('#mdfViewZoneBtn').hide();
    $('#mdfTZoneBtn').hide();
});
// mdfViewZoneBorder Button onClick 
$('#mdfViewZoneBtn').click(function () {
    console.log('mdfViewZoneBtn');
    clearAll();
    // show/hide gauge
    if (mdfState == 'noFly') {
        // Show/hide gauge
        $('#mdfZoneBtn').hide();
        $('#mdfViewZoneBtn').hide();
        $('#mdfViewZoneTZ').show();
        
    }
    else {
        $('#mdfViewZoneNF').show();
        $('#mdfNoFly').hide();
        //$('#mdfViewZoneTZ').show();
        //$('#mdfNoFly').hide();
    }
    $('#mdfRTNBtn').show();
    $('#mdfMenubtn').hide();
});
// viewZone_NF Button onClick 
$('#mdfRTNBtn').click(function () {
    console.log('mdfRTNBtn');
    clearAll();
    // Show/hide gauge
    if (mdfState == 'noFly') {
        // Show/hide gauge
        $('#mdfTZone').show();
        $('#mdfTZoneBtn').show();
        $('#mdfViewZoneBtn').show();
        $('#mdfHSDBtn').show();

    }
    else {
        $('#mdfNoFly').show();
        $('#mdfTZoneBtn').show();
        $('#mdfViewZoneBtn').show();
        $('#mdfHSDBtn').show();        
    }
    // Show/hide button border
   // $('#mdfViewZoneBorder').show();
   // $('#mdfHSDBorder').show();
   // $('#mdfMenuBorder').hide();
});

//// ref: T38_SO1107_CBT_WPNRelVel
// Toggle img and btn
$('#mdfDashCorReleaseBtn').click(function () {
    clearAll();
        $('#mdfDashCorRestore').show();
        $('#mdfDashCorRestoreBtn').show();
});
$('#mdfDashCorRestoreBtn').click(function () {
    clearAll();
    $('#mdfDashCorRelease').show();
    $('#mdfDashCorReleaseBtn').show();

});

//// ref: T38_SO1107_CBT_Testmenu
// Some future function here
$('#').click(function () {
});

//// ref: T38_SO1107_CBT_NewPFL
// Some future function here
$('#').click(function () {
});

//// ref: T38_SO1107_CBT_ICAO-alphanumeric
// Toggle img and btn
$('#mdfDashAlphaBtn').click(function () {
    clearAll();
    $('#mdfDashNum').show();
    $('#mdfDashNumBtn').show();
});
$('#mdfDashNumBtn').click(function () {
    clearAll();
    $('#mdfDashAlpha').show();
    $('#mdfDashAlphaBtn').show();
});

//// ref: T38_SO1107_CBT_Testmenu
// Menu 1 btn behavior
$('#mfdMenu1Btn').click(function () {
    clearAll();
    $('#mfdMenu1').show();
    $('#mfdMenu2Btn').show();
});
$('#mfdMenu2Btn').click(function () {
    clearAll();
    $('#mfdMenu2').show();
    $('#mfdMenu1Btn').show();
    $('#mfdTestTopLeftBtn').show();
});
$('#mfdTestTopLeftBtn').click(function () {
    clearAll();
    $('#mfdTest').show();
    $('#mfdMenuBtn').show();
    $('#mfdDSCINBtn').show();
});
$('#mfdTestBottomRightBtn').click(function () {
    clearAll();
    $('#mfdTest').show();
    $('#mfdMenuBtn').show();
    $('#mfdDSCINBtn').show();
});

$('#mfdMenuBtn').click(function () {
    clearAll();
    $('#mfdMenu1').show();
    $('#mfdMenu2Btn').show();
});
$('#mfdDSCINBtn').click(function () {
    clearAll();
    $('#mfdDSCIN').show();
    $('#mfdBackBtn').show();
    $('#mfdMenuBtn').show();
    $('#mfdTestBottomRightBtn').show();
});
$('#mfdBackBtn').click(function () {
    clearAll();
    $('#mfdTest').show();
    $('#mfdMenuBtn').show();
    $('#mfdDSCINBtn').show();
});

// toggle mdfState
function mdfStateToggle() {
    // Toggle State
    //console.log("Before Toggle: " + mdfState);
    mdfState == 'tZone' ? mdfState = 'noFly' : mdfState = 'tZone';
    //console.log("After Toggle: " + mdfState);
}

// Backup Control Panel - T38_SO1107_CBT_NewPFL_640_655.htm 
$('#cpToggleOff').click(function () {
    clearAll();
    bcpState = "off"; // on, rad, brg
    console.log("bcpState: " + bcpState);
    $('#cpOff').show();
    // freqReadout
    $('#freqReadout').hide();
    hideArrows();
});

$('#cpToggleOn').click(function () {
    clearAll();
    bcpState = "on"; 
    console.log("bcpState: " + bcpState);
    //console.log("standbyFreqInteger type: " + typeof Number(standbyFreqInteger));
    //console.log("standbyFreqDecimal type: " + typeof Number(standbyFreqDecimal));
    //console.log("Both: " + Number(standbyFreqInteger + standbyFreqDecimal).toFixed(2));
   // console.log("activeFreqInteger type: " + Number(activeFreqInteger));
    $('#cpOn').show();
    showArrows();
    $('.freqReadout').show();
    $('#active').show();
    $('#activeFreqWindow').show();
    $('#standbyFreqWindow').show();
});

$('#cpToggleRad').click(function () {
    clearAll();
    bcpState = "rad";
    console.log("bcpState: " + bcpState);
    showArrows();
    $('#cpRad').show();
    $('.freqReadout').show();
    $('#active').show();
    $('#activeFreqWindow').show();
    $('#standbyRadial').show();
});

$('#cpToggleBrg').click(function () {
    clearAll();
    bcpState = "brg";
    $('.triangle-down');
    console.log("bcpState: " + bcpState);
    showArrows();
    $('#cpBrg').show();
    $('.freqReadout').show();
    $('#active').show();
    $('#activeFreqWindow').show();
    $('#standbyBearing').show();
});

function showArrows() {
    $('#leftOuterArrow').show();
    $('#rightOuterArrow').show();
    $('#leftInnerArrow').show();
    $('#rightInnerArrow').show();
}

function hideArrows() {
    $('#leftOuterArrow').hide();
    $('#rightOuterArrow').hide();
    $('#leftInnerArrow').hide();
    $('#rightInnerArrow').hide();
}

////Subtract 1   
$('#leftOuterArrow').click(function () {
    if (bcpState == 'on') {  //  Freq Windows Range: [108.00 - 117.95]
        if (standbyFreqWindow > 109.00) { // Greater than or = to 108.00
            standbyFreqWindow = (standbyFreqWindow - 1).toFixed(2); // truncate string two decimal places
            $('#standbyFreqWindow').html(standbyFreqWindow); // pass string to HTML div

            //// Make a list of all activeFreqWindow values where standbyFreqWindow 
            //// changes from dashes to a value and integrate
        }
    }

    if ((bcpState == 'rad') || (bcpState == 'brg')) { // Adjust Active Frequency Window (Top Value) - 1
        if (activeFreqWindow > 109.00) { // Greater than or = to 108.00
            activeFreqWindow = (activeFreqWindow - 1).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        }
        console.log('AFW: ' + activeFreqWindow);
        console.log('standbyRadial: ' + standbyRadial);
        checkRadBear(activeFreqWindow);
    }

    //if (bcpState == 'brg') {
    //    console.log('AFW: ' + activeFreqWindow);
    //    console.log('standbyRadial: ' + standbyRadial);
    //    checkRadBear(activeFreqWindow);
    //}
})
//// Add 1
$('#rightOuterArrow').click(function () {  //  Freq Windows Range: [108.00 - 117.95]
    if (bcpState == 'on') { // Adjust Active Frequency Window (Top Value) + 1
        if (standbyFreqWindow < 117.00) { 
            standbyFreqWindow = (+standbyFreqWindow + +1).toFixed(2); // truncate string two decimal places
            $('#standbyFreqWindow').html(standbyFreqWindow); // pass string to HTML div
        }
    }

    if ((bcpState == 'rad') || (bcpState == 'brg')) { // Adjust Active Frequency Window (Top Value) + 1
        if (activeFreqWindow < 117.00) { // Greater than or = to 108.00
            activeFreqWindow = (+activeFreqWindow + +1).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        }
        console.log('AFW: ' + activeFreqWindow);
        console.log('standbyRadial: ' + standbyRadial);
        checkRadBear(activeFreqWindow);
    }

    //if (bcpState == 'brg') {
    //    console.log('AFW: ' + activeFreqWindow);
    //    console.log('standbyRadial: ' + standbyRadial);
    //    checkRadBear(activeFreqWindow);
    //}
})
//// Subtract 0.05
$('#leftInnerArrow').click(function () {  //  Freq Windows Range: [108.00 - 117.95]
    if (bcpState == 'on') { // Adjust Active Frequency Window (Top Value) + 1
        if (standbyFreqWindow > 108.00) { 
            standbyFreqWindow = (standbyFreqWindow - 0.05).toFixed(2); // truncate string two decimal places
            $('#standbyFreqWindow').html(standbyFreqWindow); // pass string to HTML div

            //// Make a list of all activeFreqWindow values where standbyFreqWindow 
            //// changes from dashes to a value and integrate
        } else { // decimal loops when Integer @ 108
            
            standbyFreqWindow = (standbyFreqWindow - 0.05).toFixed(2);  // truncate string to decimal places
            standbyFreqWindow++;
            $('#standbyFreqWindow').html(standbyFreqWindow);  // pass string to HTML div
        }
        console.log('AFW: ' + activeFreqWindow);
        console.log('standbyRadial: ' + standbyRadial);
        checkRadBear(activeFreqWindow);
    }

    if ((bcpState == 'rad') || (bcpState == 'brg')) { // Adjust Active Frequency Window (Top Value) - 0.05
        if (activeFreqWindow > 108.00) { // Greater than or = to 108.00
            activeFreqWindow = (activeFreqWindow - 0.05).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        } else { // decimal loops when Integer @ 108
            activeFreqWindow++;
            activeFreqWindow = (activeFreqWindow - 0.05).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        }
        console.log('AFW: ' + activeFreqWindow);
        console.log('standbyRadial: ' + standbyRadial);
        checkRadBear(activeFreqWindow);

    }

    //if (bcpState == 'brg') {
    //    console.log('AFW: ' + activeFreqWindow);
    //    console.log('standbyRadial: ' + standbyRadial);
    //    checkRadBear(activeFreqWindow);
    //}
})

$('#rightInnerArrow').click(function () {  //  Freq Windows Range: [108.00 - 117.95]
    if (bcpState == 'on') { // Adjust Active Frequency Window (Top Value) + 0.05
        if (standbyFreqWindow < 117.95) { 
            standbyFreqWindow = (+standbyFreqWindow + +0.05).toFixed(2); // truncate string two decimal places
            $('#standbyFreqWindow').html(standbyFreqWindow); // pass string to HTML div

            //// Make a list of all activeFreqWindow values where standbyFreqWindow 
            //// changes from dashes to a value and integrate
        } else { // decimal loops when Integer @ 117
            standbyFreqWindow--;
            standbyFreqWindow = (+standbyFreqWindow + +0.05).toFixed(2);  // truncate string to decimal places
            
            $('#standbyFreqWindow').html(standbyFreqWindow);  // pass string to HTML div
        }
    }

    if ((bcpState == 'rad') || (bcpState == 'brg')) { // Adjust Active Frequency Window (Top Value) + 1
        if (activeFreqWindow < 117.95) { 
            activeFreqWindow = (+activeFreqWindow + +0.05).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        } else { // decimal loops when Integer @ 117
            activeFreqWindow--;
            activeFreqWindow = (+activeFreqWindow + +0.05).toFixed(2); // truncate string two decimal places
            $('#activeFreqWindow').html(activeFreqWindow); // pass string to HTML div
        }
        //console.log("1: " + typeof activeFreqWindow);
        //console.log("2: " + typeof parseFloat(activeFreqWindow));
        console.log('AFW: ' + activeFreqWindow);
        console.log('standbyRadial: ' + standbyRadial);
        checkRadBear(activeFreqWindow);
        //$('#standbyRadial').html(standbyRadial);
    }

    //if (bcpState == 'brg') {
    //    console.log('AFW: ' + activeFreqWindow);
    //    console.log('standbyRadial: ' + standbyRadial);
    //    checkRadBear(activeFreqWindow);
    //}
})

function increment() {
    // case statement then ++
}

function decrement() {
    // case statement then --
}

//const myRadMap = [108.80, '103', 109.00, '050', 109.30, 'LOC', 110.20, '240', 112.50, '151', 112.90, '304', 114.80, '025', 115.10, '227', 117.50, '064'];

//var index = myRadMap.findIndex(myRadMap => myRadMap == activeFreqWindow);

//// Display Radial && Bearing values 
function checkRadBear(element) {
    //if (element == '108.80') {
    //    standbyRadial = '103';
    //}
    switch (element) {
        case '108.80':
            $('#standbyRadial').html('103&deg;');
            $('#standbyBearing').html('283&deg;');
            break;
        case '109.00':
            $('#standbyRadial').html('050&deg;');
            $('#standbyBearing').html('230&deg;');
            break;
        case '109.30':
            $('#standbyRadial').html('LOC');
            $('#standbyBearing').html('LOC');
            break;
        case '110.20':
            $('#standbyRadial').html('240&deg;');
            $('#standbyBearing').html('060&deg;');
            break;
        case '112.50':
            $('#standbyRadial').html('151&deg;');
            $('#standbyBearing').html('331&deg;');
            break;
        case '112.90':
            $('#standbyRadial').html('304&deg;');
            $('#standbyBearing').html('124&deg;');
            break;
        case '114.80':
            $('#standbyRadial').html('025&deg;');
            $('#standbyBearing').html('205&deg;');
            break;
        case '115.10':
            $('#standbyRadial').html('227&deg;');
            $('#standbyBearing').html('047&deg;');
            break;
        case '117.50':
            $('#standbyRadial').html('064&deg;');
            $('#standbyBearing').html('244&deg;');
            break;
        default: $('#standbyRadial').html('- - -&deg;');
            $('#standbyBearing').html('- - -&deg;');
    }
}

