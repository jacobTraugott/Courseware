// ***********************************************************************
// ** Jason Willis                                                      **
// ** Used in BaroAlt.html, T1AMachSpeedIndicator.html                  **
// ** Dec 2016                                                          **
// ***********************************************************************

var knobBaro = $('#knobBaro');
var knobAlt = $('#knobAlt');
var btnBaro = $('#pushBaro');
var btnAlt = $('#pushAlt');
var gauge = $('.greenArrow');
var angle = 135;
var minangle = -360;
var maxangle = 360;
var lastXBaro = 70;
var lastYBaro = 322;
var lastXAlt = 405;
var lastYAlt = 520;
var strAltThousands = "23";
var strAltHundreds = "000";
var blMouseMove = true;
var blShow = true;
var intAltCount = 0;
var intGreenArrow = 360;
var intAltitude = 25000;
var intAltIncrement = 0;
var intIncrement = 0;
var intNextNumber = 0;
var intThousandsCount = 0;
var intTenThousandsCount = 0;
var rollTenThousandsLast = 0;
var strDirection = "";
var lastNum = 0;
var mediaLocation = "Content/Instruments/T1AAltimeter/";

function resetBaroButton() {
    // reset Barometer to std (29.92)
    $('.currentBaroValue').text("29.92");
    $('.digit-tenThousand').show();
    // reset green Alt text value to 25000
    $('.digit-tenThousand').css({
        "position":"absolute",
        "top":"4px",
        "left":"1px",
        "width":"25px",
        "background": "url('" + mediaLocation + "T1_Alt_GNumbers_Large.png')0 -30px", /*Starting Position "2"*/
        "background-repeat":"repeat-y",
        "color":"transparent",
    });

    $('.digit-thousand').css({
        "position":"absolute",
        "top":"4px",
        "left":"16px",
        "width":"25px",
        "background": "url('" + mediaLocation + "T1_Alt_GNumbers_Large.png')0 -117px", /*Starting Position "5"*/
        "background-repeat": "repeat-y",
        "color": "transparent",
        "padding-right":"2px"
    });
    
    $('.digit-hundred').css({
        "position":"absolute",
        "top":"2px",
        "left":"32px",
        "width":"15px",
        "background": "url('" + mediaLocation + "T1_Alt_GNumbers_Small.png')0 18px", /*Starting Position "0"*/
        "background-repeat":"repeat-y",
        "color":"transparent",  /*set to transparent so text isn't visible but spacing is*/
        "padding-right":"2px"
    });
    
    //"$('.digit-ten').text("0 0");
    $('.digit-ten').text("0 0");

    // Reset green arrow position
    $('.greenArrow').css({ "transform": "rotate(0deg)" });
    angle = 135;
    //intAltitude = 25000;
    intGreenArrow = 360;
    intIncrement = 0;
    intAltIncrement = 0;
    intThousandsCount = 0;
    intTenThousandsCount = 0;
}

function moveKnob(direction, knobName) {
    switch(knobName){
        case "Baro":
            lastNum = intIncrement;
            if (direction == 'up') {
                strDirection = "up";
                intIncrement++;
                intAltIncrement++;
                //if ((angle + 2) <= maxangle) {
                //    angle = angle + 0.01;
                //    angle = +(angle.toFixed(2));
                    setAngle(knobName);
                //}
            }
            else if (direction == 'down') {
                intIncrement--;
                intAltIncrement--;
                strDirection = "down";
                //if ((angle - 2) >= minangle) {
                //    angle = angle - 0.01;
                    //intAltitude = intAltitude - 10;
                    setAngle(knobName);
                //}
            }
            var strValue = "0";
            strValue = intAltitude.toString(); //((pc/18)+250).toString();  // adjusted value for center display, starting at 250(00)
            //$('.digit-tenThousand').text(strValue.substr(0, 1));
            //$('.digit-thousand').text(strValue.substr(1, 1));
            break;
        case "Alt":
            if (direction == 'up') {
                intAltCount++;
                if ((angle + 2) <= maxangle) {
                    angle = angle + 0.01;
                    setAngle(knobName);
                }
            }
            else if (direction == 'down') {
                intAltCount--;
                if ((angle - 2) >= minangle) {
                    angle = angle - 0.01;
                    setAngle(knobName);
                }
            }
            break;
    }
}

function setAngle(knobName) {
    // rotate knob 
    switch (knobName) {    
        case "Baro":
            // One greenArrow revolution is 180.  This helps keep uniformity with sprite and gauge (in ticks)
            if (intIncrement > 180) {
                intIncrement = 0;
            }
            if (intIncrement < 0) {
                intIncrement = 180;
            }
            btnBaro.css({
                '-moz-transform': 'rotate(' + (intIncrement * 2) + 'deg)',
                '-webkit-transform': 'rotate(' + (intIncrement * 2) + 'deg)',
                '-o-transform': 'rotate(' + (intIncrement * 2) + 'deg)',
                '-ms-transform': 'rotate(' + (intIncrement * 2) + 'deg)',
                'transform': 'rotate(' + (intIncrement * 2) + 'deg)'
            });
            var newAngle = (intAltIncrement * 0.01) + 29.92;
            var baroRange = newAngle;
                //((angle / 720) * 159.57); // round to hundreths
            // initialize rollHundreds as zero
            //var rollHundreds = (+(baroRange.toFixed(2)) - 29.92);  //Adding '+' negates a string value, keeps as integer
            var intAltitude = (intAltIncrement * 5.555555) + 25000;  //initialize at 25K
            var intAltY = -((intIncrement * .889)) + 19;  // starting at zero, vertically on sprite
            var intLargeStart = -117;
            //var intAltY9000 = -(rollHundreds * 150.5) - 117; // - subtracts for initial '2' spot @Tenthousands place

            if ((baroRange > 21.999) && (baroRange < 32.01)) {
                var strValue = intAltitude.toString();
                intGreenArrow = intIncrement;
                $('.currentBaroValue').text(baroRange.toFixed(2));
                //$('.altValueHundreds').text(rollHundreds);
                moveGauge(intGreenArrow);
                moveGreenAltNumbers(intAltY, intLargeStart);
            }
            else { // Capping range from 22 - 32, stopping greenArrow, Baro value and sprite/guage
                if (intAltIncrement > 208) {
                    intIncrement = 32;
                    intAltIncrement = 208;
                }
                if (intAltIncrement < -792) {
                    intIncrement = 113;
                    intAltIncrement = -792;
                }
            }

            // Provide Data Display to help adjust knob, display data, and dials
            //$('.TempDisplay').html("<strong>intAltIncrement:</strong> " + intAltIncrement + "<br/><strong>baroRange:</strong> " +
            //    baroRange + "<br/><strong>intIncrement:</strong> " + intIncrement);

            break;

        case "Alt": 
            btnAlt.css({
                '-moz-transform': 'rotate(' + (intAltCount * 2) + 'deg)',
                '-webkit-transform': 'rotate(' + (intAltCount * 2) + 'deg)',
                '-o-transform': 'rotate(' + (intAltCount * 2) + 'deg)',
                '-ms-transform': 'rotate(' + (intAltCount * 2) + 'deg)',
                'transform': 'rotate(' + (intAltCount * 2) + 'deg)'
            });
            try {
                var intTickMultiplier = (intAltCount) * 11;  // To start at 23,000
                //var intTickMultiplier = ((intAltCount) +96 ) ;  // To start at 23,000
                var currentAlt = (intTickMultiplier + 23000).toFixed();
                //$('.altValueThousands').text(currentAlt.substring(0,2));
            } catch (e) {
                alert(e);
            }

            if ((parseInt(currentAlt.substring()) > 0) && (parseInt(currentAlt.substring()) < 60100)) {
                //var currentAlt = intAltitude.toString();
                    //intGreenArrow = intIncrement;
                if (currentAlt.length == 5) { //10,000+
                    $('.altValueThousands').text(currentAlt.substring(0, 2));
                    $('.altValueHundreds').text(currentAlt.substring(2, 3) + "00");
                }
                else if (currentAlt.length == 4)//9,999-999
                    {
                    $('.altValueThousands').text(currentAlt.substring(0, 1));
                    $('.altValueHundreds').text(currentAlt.substring(1, 2) + "00");
                    }
                    else {// < 1000 
                        $('.altValueThousands').text("0"); 
                        if (parseInt(currentAlt) > 99)// Three digits
                        {
                            $('.altValueHundreds').text(currentAlt.substring(0, 1) + "00");
                        }
                        else {
                            $('.altValueHundreds').text("000");
                        }
                    }
                } else {
                if (intTickMultiplier < -23000)//zero altitude
                    {
                            intAltCount = -2091;
                    }
                if (intTickMultiplier > 37000) {  //60,000 - 23,000
                        intAltCount = 3364;
                    }
                }

            //$('.TempDisplay').html("<strong>currentAlt:</strong> " + currentAlt +
            //    "<br /><strong>intAltCount</strong> " + intAltCount +
            //    "<br/><strong>intTickMultiplier:</strong> " + intTickMultiplier);
            break;
    }
}

function moveGauge(pGreenArrow, pBool) {
        gauge.css({
            '-moz-transform': 'rotate(' + (pGreenArrow * 2) + 'deg)',
            '-webkit-transform': 'rotate(' + (pGreenArrow * 2) + 'deg)',
            '-o-transform': 'rotate(' + (pGreenArrow * 2) + 'deg)',
            '-ms-transform': 'rotate(' + (pGreenArrow * 2) + 'deg)',
            'transform': 'rotate(' + (pGreenArrow * 2) + 'deg)'
        });
}

function moveGreenAltNumbers(pIntAltY, pLargeStart)
{
    // Display and scroll sprite in hundreds location once Barometer dial is turned.
    $('.digit-hundred').css({
        "background": "url('" + mediaLocation + "T1_Alt_GNumbers_Small.png') 0 " + pIntAltY + "px;",
        "background-repeat":"repeat-y",
        "color":"transparent"});
            
    if (intIncrement > 161 && intIncrement < 180) {
        if (intIncrement != lastNum) {
            if (intIncrement > lastNum) {
                intThousandsCount++;
            }
            else { intThousandsCount--; }
        }
        var intAltY900 = -(intThousandsCount * 1.6111111); //intCount range of 18 so 18 will be 29px
        rollTenThousandsLast = intNextNumber;
        intNextNumber = pLargeStart + intAltY900;

        $('.digit-thousand').css({
            "background": "url('" + mediaLocation + "T1_Alt_GNumbers_Large.png') 0 " + intNextNumber + "px;",
            "background-repeat": "repeat-y",
            "color": "transparent",
        });

        if ((intNextNumber < -406) || (intNextNumber > 172))
        { intThousandsCount = 0; }
        var rollTenDirection;
        var blMoveTens = false;
        if (((intNextNumber < -233) && (intNextNumber > -263)) || ((intNextNumber > 29) && (intNextNumber < 59))) {
            if (intNextNumber < rollTenThousandsLast)
            { intTenThousandsCount++; }
            else { intTenThousandsCount--; }
            blMoveTens = true;
        }
        if (blMoveTens) {
            var intAltY9000 = -(intTenThousandsCount * 1.6111111);
            var intNextTenThousand = -30 + intAltY9000;
            if (intNextTenThousand > 26) {
                $('.digit-tenThousand').hide();
            }
            else {

                $('.digit-tenThousand').css({
                    "background": "url('"+ mediaLocation +"T1_Alt_GNumbers_Large.png') 0 " + (intNextTenThousand) + "px;",
                    "background-repeat": "repeat-y",
                    "color": "transparent",
                    "visibility": "visible"
                });
            }
            //$('.digit-thousand').text("_");
            blMoveTens = false;
        }
    }
}

function rotateBaroButton() {
    knobBaro.mousemove(function (event) {
        var intX = event.pageX;
        var intY = event.pageY;
        if (lastYBaro == intY) {
            if (intY > 513) {
                if (lastXBaro < intX) {
                    moveKnob('down', 'Baro');
                } else {
                    moveKnob('up', 'Baro');
                }
            } else {
                if (lastXBaro < intX) {
                    moveKnob('up', 'Baro');
                } else {
                    moveKnob('down', 'Baro');
                }
            }
        }
        else if (intX > 56) {
            if (lastYBaro < intY) {
                moveKnob('up', 'Baro');
            }
            else {
                moveKnob('down', 'Baro');
            }
        }
        else {
            if (lastYBaro < intY) {
                moveKnob('down', 'Baro');
            }
            else {
                moveKnob('up', 'Baro');
            }
        }
                
        lastYBaro = intY;
        lastXBaro = intX;
        blMouseMove = true;
        //$('.currentBaroValue').text("x = " + intX + "\ny = " + intY);
    });
}

function removeBaroRotation() {
    knobBaro.unbind("mousemove");
}

function rotateAltButton() {
    knobAlt.mousemove(function (event) {
        var intX = event.pageX;
        var intY = event.pageY;
        if (lastYAlt == intY) {
            if (intY > 513) {
                if (lastXAlt < intX) {
                    moveKnob('down', 'Alt');
                } else {
                    moveKnob('up', 'Alt');
                }
            } else {
                if (lastXAlt < intX) {
                    moveKnob('up', 'Alt');
                } else {
                    moveKnob('down', 'Alt');
                }
            }
        }
        else if (intX > 392) {
            if (lastYAlt < intY) {
                moveKnob('up', 'Alt');
            }
            else {
                moveKnob('down', 'Alt');
            }
        }
        else {
            if (lastYAlt < intY) {
                moveKnob('down', 'Alt');
            }
            else {
                moveKnob('up', 'Alt');
            }
        }
                
        lastYAlt = intY;
        lastXAlt = intX;
        blMouseMove = true;
        //$('.currentAltValue').text("x = " + intX + "\ny = " + intY);
    });
}

function removeAltRotation() {
    knobAlt.unbind("mousemove");
}

/* Set Media Path for End Users */
function setMediaPath() {
    var mediaChange = " ";
    try {
        mediaChange = GetMediaPath() + "\\Instruments\\T1AAltimeter_480_585\\";
    }
    catch (e) { mediaChange = ""; }
    if (mediaChange.length > 30) {
        mediaLocation = mediaChange;
        $("#pushBaro img").attr('src', mediaLocation + "T1_Alt_LeftTop.png");
        $("#pushAlt img").attr('src', mediaLocation + "T1_Alt_RightTop.png");
        $("#greenArrowID img").attr('src', mediaLocation + "GreenArrow.png");
        $("#Barometer").attr('background-image', "url('" + mediaLocation + "T1_Alt_BaseFinal_Trimmed.png");
        $(".digit-ten").attr('background', "url('"+ mediaLocation +"T1_Alt_GNumbers_Small.png");
        $(".digit-one").attr('background', "url('" + mediaLocation + "T1_Alt_GNumbers_Small.png");
        $(".digit-hundred").attr('background', "url('" + mediaLocation + "T1_Alt_GNumbers_Small.png");
        $(".digit-thousand").attr('background', "url('" + mediaLocation + "T1_Alt_GNumbers_Large.png");
        $(".digit-tenThousand").attr('background', "url('" + mediaLocation + "T1_Alt_GNumbers_Large.png");
    }
}