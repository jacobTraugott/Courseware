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
var hudBankState = 'init'; // init, bankScale, bankArrow, sideSlipIndicator
var ivvState = 0;
var fpmClick = $(this).index();
var lastClicked;
var fpmUpperRange, fpmBottomOfSymbol, fpmCenterOfSymbol, fpmTopOfSymbol, fpmLowerRange;
var fpmTest = 0;
var ufcpMaskState = "initial";  // , mask2, mask3
//var fpmTest = $('#fpmBar').offset().top;
var firstTriangleImages, secondTriangleImages, switchCockPitImages, baseTriangleShimmy;
var tempNum;
//var clicks = $(this).data('clicks');  // used for ccip button sequence
// Backup Control Panel
//var activeFreqInteger = $('#activeFreqInteger').text(),    // Start 108
//    activeFreqDecimal = $('#activeFreqDecimal').text(),    //          .80   
//    standbyFreqInteger = $('#standbyFreqInteger').text(),  // Start 112 
//    standbyFreqDecimal = $('#standbyFreqDecimal').text(),  //          .80 
var activeFreqWindow = $('#activeFreqWindow').text(),
    standbyFreqWindow = $('#standbyFreqWindow').text(),
    standbyRadial = $('#standbyRadial').text(),         // Start 103 deg
    standbyBearing = $('#standbyBearing').text();        // Start --- deg

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

    // ref: T38_SO1106_CBT_UFCPSymbolBackground_465_245.htm
    // Show default background
    $('#myGaugeUFCPSymbolBackgroundBLK').show();

    // Show highlight button
    //$('#topArrowHighlightBorder').show();
    //$('#middleArrowHighlightBorder').show();
    //$('#bottomArrowHighlightBorder').show();
    //$('#rtnButtonHighlightBorder').hide();

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

    //// ref: Convert_Nav_Backup_640_655
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

    //// ref: T38_SO1109_CBT_HUD_FPMPos
    $('#fpmJustRed').show();
    $('#fpmJustGreenWhole').show();
    $('#fpmNoGreen').hide();
    $('#fpmJustYellow').show();
    // Remove red/yellow after a beat on open
    fpmOpenState = setTimeout(function () {
        $('#fpmJustRed').hide();
        $('#fpmJustYellow').hide();
        $('#fpmBar')
    }, 500);
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
    } else {
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

    // Backup Control Panel - Convert_Nav_Backup_640_655.htm
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

    // HUD Bank
    $('#bankScaleFocus').hide();
    $('#bankArrowFocus').hide();
    $('#sideSlipFocus').hide();
    $('#cockPitBankView').hide();
    $('#hSplitTriangle').hide();
    $('#vSplitTriangle').hide();
    $('#topTriangle').hide();
    $('#baseTriangle').hide();

    /* UFCP HUD Page1 */
    $('#cock').hide();

    // HUD IVV Scale
    //$('#cockPitFameGlass').hide();
    //$('#cockPitHUDVertView').hide();
    $('#cockPitBackGround').hide();
    $('#cockPitHUD750View').hide();
    $('#cockPitHUD1500View').hide();
    //$('#triangleTick').hide();

    // HUD FPMPos - T38_SO1109_CBT_HUD_FPMPos_b9_970_650
    $('#fpmJustRed').hide();
    $('#fpmNoGreen').hide();
    $('#fpmJustYellow').hide();

    /* On Open of p01096_b9_982_669.htm */
    // Hide
    $('#pipperXL').hide();
    $('#pipperXR').hide();

    /* On Open of p46446_b9_546_626..htm */
    // Hide
    $('#focusCircle').hide();
    $('#focusCircle').hide();

    /* On Open of P46398_509_501.htm */
    $('#ufcpMask2').hide();
    $('#ufcpMask3').hide();

    /* On Open of CCIP_Sequence_552_619.htm */
    $('#pickle').hide();

}  // End clearAll()

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

//// ref: Convert_Nav_Backup_640_655
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

//// Backup Control Panel - Convert_Nav_Backup_640_655.htm 
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
    hideArrows();
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
    hideArrows();
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

//Subtract 1   
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
// Subtract 0.05
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

//// CBT HUD Bank
//var hudBankState = 'init'; // init, bankScale, bankArrow, sideSlipIndicator
//var firstTriangleImages, secondTriangleImages, switchCockPitImages;

$('li#bankScale').click(function () {
    clearAll();
    bankArrowStopFunction();  // cancel bankArrow setTimout if has not fired
    sideSlipStopFunction(baseTriangleShimmy);
    $('#cockPitBankView').hide();

    hudBankState = 'bankScale'; // init, bankScale, bankArrow, sideSlipIndicator
    console.log('Inside BankScale: hudBankState = ' + hudBankState);

    // Initial Setup
    $('#cockpitLevelView').show();
    $('.textDisplay').html('<span class="textDisplayTitle">Bank Scale</span><br /><br />The curved bank scale has tick marks that indicate 0, 10, 20, 30, and 45 degrees of bank. The position of the scale remains static on the HUD dispaly.');
    $('#bankScaleFocus').show();
})

$('li#bankArrow').click(function () {
    clearAll();
    sideSlipStopFunction(baseTriangleShimmy);
    hudBankState = 'bankArrow'; // init, bankScale, bankArrow, sideSlipIndicator

    //// Initial Setup
    // textConsole
    $('.textDisplay').html('<span class="textDisplayTitle">Bank Arrow</span><br /><br />The bank arrow is the small triangle above the slip indicator.  The arrow moves along the curved scale indicating bank angles up to 45&deg;. At <span id="textColor">bank angles greater than 45&deg;</span>, the outer half of the bank and slip symbol is blanked and remains fixed at the 45&deg; mark on the scale.');
    $('#hSplitTriangle').show();
    // cockPitContainer
    $('#cockpitLevelView').show();
    $('#bankArrowFocus').css({ 'top': '410px', 'right': '244px', 'position': 'absolute' });
    $('#bankArrowFocus').show();

    // reanimate (Clicked li again)
    $('#bankArrow').toggle().toggle();
    $('#vSplitTriangle').toggle().toggle();
    $('#cockPitBankView').toggle().toggle();

    // Switch out First Set of Triangle Images
    firstTriangleImages = setTimeout(function () {
        $('#hSplitTriangle').hide();
        $('#topTriangle').show();
    }, 1750);

    // Switch out Second Set of Triangle Images
    secondTriangleImages = setTimeout(function () {
        $('#topTriangle').hide();
        $('#vSplitTriangle').show();
    }, 2250);
    
    // Switch Level View to Banked after 2.25 seconds
    switchCockPitImages = setTimeout(function() {
        $('#cockpitLevelView').hide();
        $('#cockPitBankView').show();
        $('#bankArrowFocus').css({ 'top': '384px', 'right':'196px', 'position': 'absolute' });
    }, 2250);

})

$('li#sideSlip').click(function () {
    clearAll();
    bankArrowStopFunction();  // cancel bankArrow setTimout if has not fired
    hudBankState = 'sideSlipIndicator'; // init, bankScale, bankArrow, sideSlipIndicator
    console.log('hudBankState: ' + hudBankState);
    $('.textDisplay').html('<span class="textDisplayTitle">Side Slip Indicator</span><br /><br />The side slipe (yaw) indicator functions the same as on the EADI. The symbol moves with the bank arrow and stays alighned with it in coordinated flight. When in a slip, the symbol, will move <span id="textColor"> right and left</span> to indicate the yaw direction. The amount of yaw is read relative to the bank arrow on the scale.' );

    // reanimate (Clicked li again)
    $('#baseTriangle').toggle().toggle();

    // Set top & base Triangles 
    $('#topTriangle').show();
    $('#baseTriangle').show();

    // Set cockPitContainer
    $('#cockpitLevelView').show();
    $('#bankArrowFocus').css({ 'top': '410px', 'right': '244px', 'position': 'absolute' });
    $('#bankArrowFocus').show();
})

$('li#bankScale').focus(function () {
    clearTimeout(firstTriangleImages);
});

// Cancel setTimeout in bankArrow
function bankArrowStopFunction() {
    clearTimeout(firstTriangleImages);
    clearTimeout(secondTriangleImages);
    clearTimeout(switchCockPitImages);
}
// Cancel setTimeout in sideSlip
function sideSlipStopFunction() {
    clearTimeout(baseTriangleShimmy);
}

//// VVI Scale
$('#ivvClick').click(function () {
    clearAll();
    $('#cockPitFameGlass').show();
    $('#cockPitHUDVertView').show();
    // Two states: motionless with border | short vertical animation without border
    if (ivvState == 1) {
        $('#triangleTick').css({ 'border': 'solid 3px orange', 'animation': 'none' });
        ivvState = 0;
    } else {
        $('#triangleTick').css({ 'border': 'none', 'animation': 'moveTickerInitial 4s forwards' });
        ivvState = 1;
    }
    $('#triangleTick').toggle().toggle();

})

$('li#750FPM').click(function () {
    clearAll();
    // Hide initial view
    $('#cockPitFameGlass').hide();
    $('#cockPitHUDVertView').hide();
    // display / scroll HUD 750 View
    $('#cockPitBackGround').show();
    $('#cockPitHUD750View').show();
    $('#cockPitHUD750View').css({ 'animation': 'hud750View 2s forwards' });
    $('#cockPitHUD750View').toggle().toggle();
    
    $('#triangleTick').css({ 'border': 'none', 'animation': 'moveTicker750 3s forwards' });
    $('#triangleTick').toggle().toggle();
})

$('li#1500FPM').click(function () {
    clearAll();
    // Hide initial view
    $('#cockPitFameGlass').hide();
    $('#cockPitHUDVertView').hide();
    // display / scroll HUD 1500 View
    $('#cockPitBackGround').show();
    $('#cockPitHUD1500View').show();
    $('#cockPitHUD1500View').css({ 'border': 'none', 'animation': 'hud1550View 3s forwards' });
    $('#cockPitHUD1500View').toggle().toggle();

    $('#triangleTick').css({ 'border': 'none', 'animation': 'moveTicker1500 3s forwards' });
    $('#triangleTick').toggle().toggle();
})


/* When a row is clicked T38_SO1109_CBT_HUD_FPMPos */
$('#fpmTable tr:eq(1)').click(function () {
    clearAll();
    console.log('fpmRow Clicked: ' + $(this).index());
    fpmClick = $(this).index();
    console.log('fpmClick: ' + fpmClick);
    console.log('type: ' + typeof (fpmClick));
    fpmTableClicked(fpmClick);
    lastClicked = fpmClick;
    console.log('lastClicked: ' + lastClicked);
    //console.log("offset: " + fpmTest);
    fpmTest = $('#fpmBar').offset().top;
    console.log('Case1onClick: ' + fpmTest);
})
$('#fpmTable tr:eq(2)').click(function () {
    clearAll();
    console.log('fpmRow Clicked: ' + $(this).index());
    fpmClick = $(this).index();
    console.log('fpmClick: ' + fpmClick);
    console.log('type: ' + typeof (fpmClick));
    fpmTableClicked(fpmClick);
    fpmTest = $('#fpmBar').offset().top;
    console.log("offset: " + fpmTest);
    fpmTest = $('#fpmBar').offset().top;
    console.log('Case2onClick: ' + fpmTest);
})
$('#fpmTable tr:eq(3)').click(function () {
    clearAll();
    console.log('fpmRow Clicked: ' + $(this).index());
    fpmClick = $(this).index();
    console.log('fpmClick: ' + fpmClick);
    console.log('type: ' + typeof (fpmClick));
    fpmTableClicked(fpmClick);
})
$('#fpmTable tr:eq(4)').click(function () {
    clearAll();
    console.log('fpmRow Clicked: ' + $(this).index());
    fpmClick = $(this).index();
    console.log('fpmClick: ' + fpmClick);
    console.log('type: ' + typeof (fpmClick));
    fpmTableClicked(fpmClick);
})
$('#fpmTable tr:eq(5)').click(function () {
    clearAll();
    console.log('fpmRow Clicked: ' + $(this).index());
    fpmClick = $(this).index();
    console.log('fpmClick: ' + fpmClick);
    console.log('type: ' + typeof (fpmClick));
    fpmTableClicked(fpmClick);
})

 
function fpmTableClicked(element) {
    //if (element == 1) {
    //    var startPos = '202px';
    //    $('fpmBar').animate({ top:'400px'})
    //}
    switch (element) {
        case 1:
            fpmTest = $('#fpmBar').offset().top;
            console.log('Last Clicked Case 1: ' + fpmTest);
            // Animate fpmBar vertically
            //// Need to change 0% start position based on eq().  
            // http://old.marcofolio.net/css/css3_animations_and_their_jquery_equivalents.html
            $('#fpmBar').css({ 'border': 'none', 'animation': 'fpmUpperRange 3s forwards' });
            $('#fpmBar').toggle().toggle();

            // Timer to delay Upper Range Limit display
            fpmOpenState = setTimeout(function () {
                $('#fpmJustRed').show();
            }, 1500);
            setTimeout(function () {
                $('#fpmNoGreen').show();
            }, 2500);
            //$('#fpmBar').css({ 'border':'dashed 3px pink'});
            
            break;
        case 2:
            fpmTest = $('#fpmBar').offset().top;
            console.log('Last Clicked Case 2: ' + fpmTest);

            $('#fpmJustRed').show();

            $('#fpmBar').css({ 'border': 'none', 'animation': 'fpmBottomOfSymbol 2s forwards' });
            $('#fpmBar').toggle().toggle();

            // Timer to delay Upper Range Limit display
            fpmOpenState = setTimeout(function () {
                $('#fpmNoGreen').hide();
            }, 1500);

            break;
        case 3:
            fpmTest = $('#fpmBar').offset().top;
            console.log('Last Clicked Case 3: ' + fpmTest);

            $('#fpmNoGreen').hide();

            // Animate fpmBar vertically
            $('#fpmBar').css({ 'border': 'none', 'animation': 'fpmCenterOfSymbol 2s forwards' });
            $('#fpmBar').toggle().toggle();
            
            break;
        case 4:
            fpmTest = $('#fpmBar').offset().top;
            console.log('Last Clicked Case 4: ' + fpmTest);

            $('#fpmNoGreen').hide();

            // Animate fpmBar vertically
            $('#fpmBar').css({ 'border': 'none', 'animation': 'fpmTopOfSymbol 2s forwards' });
            $('#fpmBar').toggle().toggle();

            // Timer to delay Top of Symbol display
            fpmOpenState = setTimeout(function () {
                $('#fpmJustYellow').show();
            }, 1500);

            break;
        case 5:
            fpmTest = $('#fpmBar').offset().top;
            console.log('Last Clicked Case 5: ' + fpmTest);

            $('#fpmJustYellow').show();

            // Animate fpmBar vertically
            $('#fpmBar').css({ 'border': 'none', 'animation': 'fpmLowerRange 3s forwards' });
            $('#fpmBar').toggle().toggle();

            // Timer to delay Lower Range Limit display
            fpmOpenState = setTimeout(function () {
                $('#fpmNoGreen').show();
            }, 2000);

            break;
        default: $('#fpmBar').css('');
    }
}

/* On Open of p01096_b9_982_669.htm */
// 1
setTimeout(function () {
    showX();
}, 4000);
setTimeout(function () {
    hideX();
}, 4500);
// 2
setTimeout(function () {
    showX();
}, 5000);
setTimeout(function () {
    hideX();
}, 5500);
// 3
setTimeout(function () {
    showX();
}, 6000);
setTimeout(function () {
    hideX();
}, 6500);
// 4
setTimeout(function () {
    showX();
}, 7000);
setTimeout(function () {
    hideX();
}, 7500);
// 5
setTimeout(function () {
    showX();
}, 8000);
setTimeout(function () {
    hideX();
}, 8500);
// 6
setTimeout(function () {
    showX();
}, 9000);

// Used to toggle X
function hideX() {
        $('#pipperXL').hide();
        $('#pipperXR').hide();
}
function showX() {
        $('#pipperXL').show();
        $('#pipperXR').show();
}
/* END of p01096_b9_982_669.htm */

/* On Open of p46446_b9_546_626.htm */
// 1
setTimeout(function () {
    showFocusCircle();
}, 500);
setTimeout(function () {
    hideFocusCircle();
}, 1000);
// 2
setTimeout(function () {
    showFocusCircle();
}, 1500);
setTimeout(function () {
    hideFocusCircle();
}, 2000);
// 3
setTimeout(function () {
    showFocusCircle();
}, 2500);
setTimeout(function () {
    hideFocusCircle();
}, 3000);
// 4
setTimeout(function () {
    showFocusCircle();
}, 3500);
setTimeout(function () {
    hideFocusCircle();
}, 4000);
// 5
setTimeout(function () {
    showFocusCircle();
}, 4500);
setTimeout(function () {
    hideFocusCircle();
}, 5000);
// 6
setTimeout(function () {
    showFocusCircle();
}, 5500);
setTimeout(function () {
    hideFocusCircle();
}, 6000);

// Used to toggle X
function hideFocusCircle() {
    $('#focusCircle').hide();
    $('#focusCircle').hide();
}
function showFocusCircle() {
    $('#focusCircle').show();
    $('#focusCircle').show();
}
/* END of p46446_b9_546_626.htm */


/* On Open of p31425_b9_982_669.htm */
// Toggle plane img
togglePlane();

// Used to toggle X
function togglePlane() {

    //for (var i = 0; i < 1000; i++) {
    //    setTimeout(function () {
    //        $('#togglePlane').show();
    //    }, 500);
    //    setTimeout(function () {
    //        $('#togglePlane').hide();
    //    }, 1000);
    //    i++;
    //    console.log("i: " + i);
    //} 
}
function showFocusCircle() {
    $('#focusCircle').show();
    $('#focusCircle').show();
}
/* END of p31425_b9_982_669.htm */

/* P46398_509_501.htm */

$('#ufcpHighlight').click(function () {
    
    if (ufcpMaskState == "initial") {
        $('#ufcpMask2').show();
        ufcpMaskState = "mask2";  

    } 
    else if (ufcpMaskState == "mask2") {
        $('#ufcpMask2').hide();
        $('#ufcpMask3').show();
        ufcpMaskState = "mask3";
    }
    else {
        $('#ufcpMask3').hide();
        ufcpMaskState = "initial";
    }
})

/* END of P46398_509_501.htm */

/* CCIP_Sequence_552_619.htm */

var x = document.getElementById("pickleTone");

function playAudio() {
    x.play();
}

$('#ccipButton').click(function () {
    var clicks = $(this).data('clicks');

    if (!clicks) {
        console.log("Clicks are even?  :  " + $(this).data('clicks'));
        $('#topCCIPCircle').addClass('rotateCircle');

        // Keep rotation and move ccipContainer right
        setTimeout(function () {
            //$('#topCCIPCircle').addClass('topCCIPCircle45');

            //$('#topCCIPCircle').css({ '-moz-transform': 'rotate(45deg)', '-moz-transform': 'rotate(45deg)', '-moz-transform': 'rotate(45deg)' });
            $('#topCCIPCircle45').addClass('ccipSlideRight');

            $('#topCCIPCircle, #ccipLine, #bottomCircle').addClass('ccipSlideRight');
        }, 1000);

        // Remove targetDiamond, rotate plane icon, slide target group down 
        setTimeout(function () {
            //$('#topCCIPCircle').removeClass('rotateCircle');

            $('#targetDiamond').hide();
            $('#ccipCircleGroup').addClass('ccipSlideDown');
        }, 4500);

        // Pickle and Tone
        setTimeout(function () {
            $('#pickle').show();
            playAudio();
        }, 8500);
        } else {
        // even clicks
        console.log("Clicks are odd?  :  " + clicks);
        $('#topCCIPCircle').removeClass('rotateCircle');
        $('#targetDiamond').show();
        $('#pickle').hide();

        $('#topCCIPCircle, #ccipLine, #bottomCircle').removeClass('ccipSlideRight');

        $('#ccipCircleGroup').removeClass('ccipSlideDown');
    }
    $(this).data("clicks", !clicks);  // https://stackoverflow.com/questions/14914372/registering-jquery-click-first-and-second-click
})


function rotate45() {
    // Safari, IE, Standard
    document.getElementById("#topCCIPCircle").style.webkitTransform = "rotate(45deg)";
    document.getElementById("#topCCIPCircle").style.msTransform = "rotate(45deg)";
    document.getElementById("#topCCIPCircle").style.Transform = "rotate(45deg)";
}


/* End of CCIP_Sequence_552_619.htm */
