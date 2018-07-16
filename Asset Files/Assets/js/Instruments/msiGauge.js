// ***********************************************************************
// ** Jason Willis                                                      **
// ** Used in T1AMachSpeedIndicator.html                                **
// ** Jan 2017                                                          **
// ***********************************************************************

var knobMSI = $('#knobMSI');
var btnMSI = $('#pushMSI');
var guage = $('#imgBug');
var angle = 0;
var minangle = -360;
var maxangle = 360;
var lastXMSI = 70;
var lastYMSI = 322;
var blMouseMove = true;
var blShow = true;
var intAngleCount = 230;
//var intGreenArrow = 360;
var intNextNumber = 0;
var intThousandsCount = 0;
var intTenThousandsCount = 0;
var rollTenThousandsLast = 0;
var strDirection = "";
var lastNum = 0;
var intTempState;
var intKnobIncrement = 0;
var intAltitude = 250;
var intDegrees = 0;

/* On click reset, displays bug and sets to default values. */
function resetMSIButton() {
    intKnobIncrement = 0;
    //currentKnots = 250;
    intDegrees = 50;
    moveGauge(250);

    $('.currentMSIValue').text(250); // set knots value
    // Show/Hide bug
    $('#imgBug').css("transform:rotate(50deg)");
    var bugVisibility = $('.bugVisible');
    if (bugVisibility.css("visibility") == "hidden") {
        bugVisibility.css("visibility", "visible")
    } else {
        bugVisibility.css("visibility", "hidden")
    }
}

// Rotate knob 
function moveKnob(direction) {
    $('.bugVisible').css("visibility", "visible");
        if (direction == 'up') {
            strDirection = "up";
            intKnobIncrement++;
            if ((angle + 2) <= maxangle) {
                angle = angle + 0.01;
                angle = +(angle.toFixed(2));
                setAngle();
            }
        }
        else if (direction == 'down') {
            intKnobIncrement--;
            strDirection = "down";
            if ((angle - 2) >= minangle) {
                angle = angle - 0.01;
                setAngle();
            }
        }
    }

// Set knob rotation increments (15 ticks per rotation)
function setAngle() {
    // rotate knob, browser variations 
    btnMSI.css({
        '-moz-transform': 'rotate(' + (angle * 200) + 'deg)',
        '-webkit-transform': 'rotate(' + (angle * 200) + 'deg)',
        '-o-transform': 'rotate(' + (angle * 200) + 'deg)',
        '-ms-transform': 'rotate(' + (angle * 200) + 'deg)',
        'transform': 'rotate(' + (angle * 200) + 'deg)'
    });
            
    // setting increment or speed of knob turn
    var intKnots = (intKnobIncrement / 12) + 250; // set to 15 ticks per knob rotation
    // Move Bug    
    moveGauge(intKnots);
    // Display knots on right (truncate for integer)   
    $('.currentMSIValue').text(intKnots.toFixed());
}

// Set bug motion defined by knots range, display gauge not uniform
function moveGauge(currentKnots) {
    // setting increment based on knot value, broken up by gauge position ticks
    intDegrees = 50;
    if (currentKnots < 60 || currentKnots > 420) {  // hide bug when below 60 or above 420
        guage.hide();
    } else {
        guage.show();
        if ((currentKnots > 199) && (currentKnots < 251)) {
            intDegrees = (currentKnots - 200);// starting @ 250knots
        }
        else if ((currentKnots > 119) && (currentKnots < 200))
        {
            intDegrees = (currentKnots - 200) * 1.15;
        }
        else if ((currentKnots > 59) && (currentKnots < 120)) {
            intDegrees = (currentKnots - 213);
        }
        else if ((currentKnots > 250) && (currentKnots < 300)) {
            intDegrees = (currentKnots - 191) * .84;
        }
        else if ((currentKnots > 299) && (currentKnots < 351)) {
            intDegrees = (currentKnots - 161) * .66;
        }
        else if ((currentKnots > 350) && (currentKnots < 401)) {
            intDegrees = (currentKnots - 104) * .51;
        }
        else if ((currentKnots > 400) && (currentKnots < 421)) {
            intDegrees = (currentKnots + 32) * .35;
        }
    }
    // rotate knob, browser variations
    guage.css({
        '-moz-transform': 'rotate(' + intDegrees + 'deg)',
        '-webkit-transform': 'rotate(' + intDegrees + 'deg)',
        '-o-transform': 'rotate(' + intDegrees + 'deg)',
        '-ms-transform': 'rotate(' + intDegrees + 'deg)',
        'transform': 'rotate(' + intDegrees + 'deg)'
    });
    // Display Current Knots and intDegrees values for fine tuning during testing
    //$('.deBug').html("Current Knots = " + currentKnots + "<br /> intDegrees = " + intDegrees);
}

// Knob rotation based on XY mouse movement
function rotateMSIButton() {
    knobMSI.mousemove(function (event) {
        var intX = event.pageX;
        var intY = event.pageY;
        if (lastYMSI == intY) {
            if (intY > 523) {
                if (lastXMSI < intX) {
                    moveKnob('down');
                } else {
                    moveKnob('up');
                }
            } else {
                if (lastXMSI < intX) {
                    moveKnob('up');
                } else {
                    moveKnob('down');
                }
            }
        }
        else if (intX > 229) {
            if (lastYMSI < intY) {
                moveKnob('up');
            }
            else {
                moveKnob('down');
            }
        }
        else {
            if (lastYMSI < intY) {
                moveKnob('down');
            }
            else {
                moveKnob('up');
            }
        }
        lastYMSI = intY;
        lastXMSI = intX;
        blMouseMove = true;
        // Use to find center coordinates of knob
        //$('.currentMSIValue').text("x = " + intX + "\ny = " + intY);
    });
}

function removeMSIRotation() {
    knobMSI.unbind("mousemove");
}
//Lines below added by Michael Lopez 1/23/2017

    var showImage = 0;
function btnNextTempImage() {
    $(".msiButtonPressedImg").show();
    showImage++;
    if (showImage == 3) {
        showImage = 0;
    }
    var imagePath = ["Content/Instruments/T1AMachSpeedIndicator_462_585/T1_MSI_RAT.png", "Content/Instruments/T1AMachSpeedIndicator_462_585/T1_MSI_SAT.png", "Content/Instruments/T1AMachSpeedIndicator_462_585/T1_MSI_ISA.png"];
    $("#tempImage img").attr("src", imagePath[showImage]);


    //switch (showImage) {
    //    case 1:
    //        $(".msiTempImg img").attr("src", "Assets/img/T1_MSI_RAT.png");
    //        break;
    //    case 2:
    //        $(".msiTempImg img").attr("src", "Assets/img/T1_MSI_SAT.png");
    //        break;
    //    case 3:
    //        $(".msiTempImg img").attr("src", "Assets/img/T1_MSI_TAS.png");
    //        break;
    //}
};
function btnDownHide() {
    $(".msiButtonPressedImg").hide();

}

/* Set Media Path for End Users */
function setMediaPath() {
    var mediaChange = " ";
    try {
        mediaChange = GetMediaPath() + "\\Instruments\\T1AMachSpeedIndicator_462_585\\";
    }
    catch (e) { mediaChange = ""; }
    if (mediaChange.length > 30) {
        mediaLocation = mediaChange;
        $("#imgBug img").attr('background-image', "url('" + mediaLocation + "T1_MSI_Bug.png");
        $("#MSI img").attr('background-image', "url('" + mediaLocation + "T1_MSI_Base.png");
        $("#bugKnotSymbol img").attr('src', mediaLocation + "T1_MSI_KnotsSymb.png");
        $("#pushMSI img").attr('src', mediaLocation + "T1_MSI_Dial.png");
        $("#pressedButton").attr('src', "url('" + mediaLocation + "T1_MSI_TempPress.png");
        $("#displayTAS").attr('src', "url('" + mediaLocation + "T1_MSI_TAS.png");
        $("#tempImage").attr('src', "url('" + mediaLocation + "T1_MSI_RAT.png");
    }
}