// ***********************************************************************
// ** Jason Willis & Michael Lopez                                      **
// ** Used in T1ARadioTuningUnit.html                                   **
// ** Feb 2017                                                          **
// ***********************************************************************
//   ****************Code added by Michael Lopez Feb 8 2017*************//
var knobCenterRTU1 = $("#knobCenterRTU1"),
    knobOuterRTU1 = $("#knobOuterRTU1"),
    btnMSI = $("#pushMSI"),
    guage = $("#imgBug"),
    knobInnerTicks = -1,
    knobOuterTicks = 0,
    lsk0Type, lsk1Type, lsk2Type, lsk3Type, lsk4Type,
    lsk0Left = 399,
    lsk0Right = 975,
    alpha = $("#lsk4Alpha"),
    lsk1Left, lsk1Right,
    lsk4Left = 11,
    lsk4Right = 9,
    alphaNum = 9,
    lsk4Alpha = "x",
    lsk2Left = 117,
    lsk2Right = 95,
    lsk3Left = 3,
    lsk3Right = 45.5,
    intOuterNum = 0,
    intInnerNum = 0,
    clicks = 0,
    angle = 0,
    minangle = -360,
    maxangle = 360,
    lastX = 325,
    lastY = 470,
    blMouseMove = true,
    blShow = true,
    intAngleCount = 230,
    strDirection = "",
    lastNum = 0,
    intKnobIncrement = 0,
    intAltitude = 250,
    intDegrees = 0,
    mouseClicks = 0,
    intLSK = 1,
    blPreSecondSelection = false,
    knobValue,
    intCenterTick = 1,
    intOuterTick = 0,
    blCenterKnob = false,
    resetTimeout,
    $objAllBtn = $("#btnOne, #btnTwo, #btnThree, #btnFour, #btnFive"),
    $objBtnOne = $("#btnOne"),
    $objBtnTwo = $("#btnTwo"),
    $objBtnThree = $("#btnThree"),
    $objBtnFour = $("#btnFour"),
    $objBtnFive = $("#btnFive"),
    $displayRow = $("li.frequency span.caret"),
    displayCombined = $("span.lsk1Value").html(),
    displayRight = displayCombined.split(".")[1],
    displayLeft = displayCombined.split(".")[0],
    postLsk1Left = 225,
    postLsk1Right = 00,
    intNumberOfTicks = 1,
    strScreenView = "Main",
        strAir2Air = "OFF",
        strInverse = "OFF",
        strTst = "OFF",
        strSquelch = "off", //on
        strTone = "off",
        strBfo = "OFF",
        strAdf = "ADF",
        strAnt = "ANT",
        strRtn = "RTN",
        strAdf1 = "ADF1",
        strVor = "HOLD",
        strGuardMonitor = "on",
        pageMode = 1,
        strChannelSetRTN = "1",
        strChannelSetCH = "2",
        strChannelSetUhfCh = "2",
        strChannelSetPRE = "&nbsp;",
        strChannelSetFR = "232.50", //Not Dynamic, just text
        strTR = "T/R",
        intADFsave = 1,
        intVORsave = 2,
        strGuardMonitor = "off", //on
        pageMode = 1,
        strTstr = "TST",
        strVor1 = "VOR1",
        intInnerChannel = 1,
        intInnerChannelPre = 2,
        intOuterChannel = 0,
        intOuterChannelPre = 0,
        intInnerChSetChannel = 2,
        intOuterChSetChannel = 0,
        intFinalChannel = 1,
        channelFreqLeftNum = 232,
        channelFreqRightNum = 500;
        blShowChannel = false,
        strLsk3Type = "vor1",
blHold = false;
    
/////////////////////////////// Frequency Selector /////////////////////////////////
//// Depending on which LSK is selected, change the behavior of the knobs //////////
function frequencySelector() {
    var intNewNumber = 0;
    if (blCenterKnob) {
        intInnerNum = intRotation;
        intOuterNum = 0;
        intCenterTick = startingTick;
        knobInnerTicks = newInner;
    } else {
        intOuterNum = intRotation;
        intInnerNum = 0;
        intOuterTick = startingTick;
        knobOuterTicks = newInner;
    }
    switch (intLSK) {
        case 0:
            // Case 0: UHF Frequency (LSK 0)
            if (blShowChannel){ //($("#lsk0Left").text().length == 1) {
                setChannel(); 
            }
            else {
                UHF_Frequency();
            }
            break;
        case 1:
            // Case 1: Pre-selection LSK 1
            if (blShowChannel) {
                setChannel();
            }
            else { PreSelection(); }
            //$(".currentRTUValue").html("postLsk1Right: " + postLsk1Right);
            break;
        case 2:
            // Case 2: VHF Frequency LSK 2 VOR/ILS
            if (strScreenView == "chSET") {
                // iterate storedFreq array
                setChannel();
            } else {
                VHF_Frequency();
            }
            break;
        case 3:
            // Case 3: ADF Nav Frequency LSK 3 
            if (strScreenView == "chSET") {
                chSetFreq();
            }
            else {
                ADF_Frequency();
            }
            break;
        case "y":
            $("#lsk4Alpha").html("x");
            break;
        case 4:
            // Case 4: TACAN Frequency LSK 4
            TCN_Frequency();
            break;
    }  
}
/////////////////// Frequency Specific Functions Below /////////////////////
function UHF_ChannelChange() {
    switch (intLSK) {
        case 0:
            //strChannelSetRTN = channels[intFinalChannel];
            $("#lsk0Right").html(" " + strChannelSetRTN);
            //console.log("You are here 168: ");
            var strFreq = storedFreq[Number(strChannelSetRTN) -1];
            var aryFreq = strFreq.split('.');
            lsk0Left = aryFreq[0];
            lsk0Right = aryFreq[1] +"0";
            //lsk0left = left half of freq and lsk0Right = to right side of decimal
            break;
        case 1:
            //console.log("You are here 176: ");
            if (strScreenView == "chSET") {
                $("#lsk1Right").html(" " + strChannelSetRTN);
                var strFreq = storedFreq[Number(strChannelSetRTN) - 1];
                var aryFreq = strFreq.split('.');
                lsk0Left = aryFreq[0];
                lsk0Right = aryFreq[1] + "0";
                $("#lsk0Left").html(lsk0Left);
                $("#lsk0Right").html("." + lsk0Right.substring(0, lsk0Right.length - 1));
                //console.log("lsk0Left: " + lsk0Left + "\nlsk0Right: " + lsk0Right);
            }
            else {
                $("#lsk1Right").html(" " + strChannelSetPRE);
                var strFreq = storedFreq[Number(strChannelSetPRE) - 1];
                var aryFreq = strFreq.split('.');
                postLsk1Left = aryFreq[0];
                postLsk1Right = aryFreq[1] + "0";
            }
            break;
        case 2:
            var frChannel = $("#lsk2Right").text();
            $("#lsk3Right").html(storedFreq[Number(frChannel) - 1]);
            break;
    }

}

//// UHF Frequency Behavior used in case 0 in frequencySelector
function UHF_Frequency() {
    if (!blPreSecondSelection) {
        //console.log("lsk0Left: " + lsk0Left + "\nlsk0Right: " + lsk0Right);
        lsk0Left = lsk0Left + intOuterNum;          // Left of decimal value + outer knob turn value
        limitUhfFreqRange();
        if ((lsk0Left > 224) && (lsk0Left < 400)) { // UHF Freq. Range
            fillFreq("lsk0Left", lsk0Left);
            //console.log("You are here 208: ");
        }
        lsk0Right = lsk0Right + (intInnerNum * 25); // Right of decimal value + inner knob turn value to the nearest 0.025
        limitUhfFreqRange();
        fillFreq("lsk0Right", lsk0Right);
        //console.log("You are here 213: ");
        //if in chSetView change the channel next to lsk1
        strCombination = $("#lsk0Left").text() + $("#lsk0Right").text();
        //console.log("String Combo: " + strCombination);
        isStored = jQuery.inArray(strCombination, storedFreq);
        if (strScreenView == "chSET") {
            if (isStored != -1) {
                var strChannel = (isStored + 1).toString();
                $("#lsk1Right").html(" " + strChannel);
                strChannelSetRTN = strChannel;
            }
            else {
                $("#lsk1Right").html(" 0");
                strChannelSetRTN = 0;
            }
        }
    }
    else if (blPreSecondSelection) {
        alert("blPreSecondSelection = true");
    }
    else {
        postLsk1Left = postLsk1Left + intOuterNum;
        limitUhfFreqRange(); // Range validation
        if ((postLsk1Left > 224) && (postLsk1Left < 400)) { // UHF Freq. Range
            fillFreq("lsk0Left", postLsk1Left);
        }
        postLsk1Right = postLsk1Right + (intInnerNum * 25);
        limitUhfFreqRange();
        fillFreq("lsk0Right", postLsk1Right);
        //console.log("You are here 239: ");
    }
}
function chSetFreq()
{
    //channelFreqLeftNum
    //channelFreqRightNum
    //var aryNum = $("#lsk3Right").text().split('.');
    //leftNum = Number(aryNum[0]);
    //rightNum = Number(aryNum[1]);
    channelFreqLeftNum = channelFreqLeftNum + intOuterNum;          // Left of decimal value + outer knob turn value
    if (channelFreqLeftNum > 399) {
        channelFreqLeftNum = 399;
    }
    if (channelFreqLeftNum < 225) {
        channelFreqLeftNum = 225;
    }
    

    //if ((leftNum > 224) && (leftNum < 400)) { // UHF Freq. Range
    //    fillFreq("lsk3Right", leftNum);
    //}
    channelFreqRightNum = channelFreqRightNum + (intInnerNum * 25); // Right of decimal value + inner knob turn value to the nearest 0.025
    //console.log("channelFreqRightNum: " + channelFreqLeftNum);
    //console.log("channelFreqRightNum: " + channelFreqRightNum);
    if (channelFreqRightNum > 999) { // Reset within range and 0.025 increments
        channelFreqRightNum = 0;
    }
    if (channelFreqRightNum < 0) { // Reset within range and 0.025 increments
        channelFreqRightNum = 975;
    }
    var strRight = channelFreqRightNum.toString();
    if (channelFreqRightNum < 100)
    {
        strRight = "0" + channelFreqRightNum.toString().substring(0, 1);
    }
    if (channelFreqRightNum == 0)
    {
        strRight = "00";
    }
    var numCombo = channelFreqLeftNum + "." + strRight.substring(0, 2);
    $("#lsk3Right").html(numCombo);
    //if in chSetView change the channel next to lsk1
    //strCombination = $("#lsk3Right").text();
    isStored = jQuery.inArray(numCombo, storedFreq);
    if (strScreenView == "chSET") {
        if (isStored != -1) {
            var strChannel = (isStored + 1).toString();
            $("#lsk2Right").html(" " + strChannel);
        }
        else {
            $("#lsk2Right").html(" 0");
        }
    }
}
// Limit UHF Frequency Range
function limitUhfFreqRange() {
    if (lsk0Left > 399) {
        lsk0Left = 399;
    }
    if (lsk0Left < 225) {
        lsk0Left = 225;
    }
    if (postLsk1Left > 399) {
        postLsk1Left = 399;
    }
    if (postLsk1Left < 225) {
        postLsk1Left = 225;
    }
    if (postLsk1Right > 999) { // Reset within range and 0.025 increments
        postLsk1Right = 0;
    }
    if (postLsk1Right < 0) { // Reset within range and 0.025 increments
        postLsk1Right = 975;
    }
    if (lsk0Right > 999) { // Reset within range and 0.025 increments
        lsk0Right = 0;
    }
    if (lsk0Right < 0) { // Reset within range and 0.025 increments
        lsk0Right = 975;
    }
}
// Case 1: Pre-selection LSK 1
function PreSelection() {
    if (blPreSecondSelection) {
        lsk0Left = lsk0Left + intOuterNum;
        limitUhfFreqRange(); // Range Validation
        if ((lsk0Left > 224) && (lsk0Left < 400)) { // UHF Freq. Range
            fillFreq("lsk1Left", lsk0Left);
        }
        lsk0Right = lsk0Right + (intInnerNum * 25);
        limitUhfFreqRange();
        fillFreq("lsk1Right", lsk0Right);
    }
    else {
        if (strScreenView == "chSET") {
            setChannel();
        }
        else {
            postLsk1Left = postLsk1Left + intOuterNum;
            limitUhfFreqRange();
            if ((postLsk1Left > 224) && (postLsk1Left < 400)) { // UHF Freq. Range
                fillFreq("lsk1Left", postLsk1Left);
            }
            postLsk1Right = postLsk1Right + (intInnerNum * 25);
            limitUhfFreqRange();
            fillFreq("lsk1Right", postLsk1Right);
        }
    }
}
// Case 2: VHF Frequency LSK 2 VOR/ILS
function VHF_Frequency() {
    //console.log("You are in the VHF Freq Function");
    lsk2Left = lsk2Left + intOuterNum;
    // Limit lsk2Left to a range of 108 - 117
    if (lsk2Left > 117) {
        lsk2Left = 117;
    }
    if (lsk2Left < 108) {
        lsk2Left = 108;
    }
    //console.log("The left number is " + lsk2Left);
    if ((lsk2Left > 107) && (lsk2Left < 118)) {                           // VHF Freq. Range
        //alert("In the Range If statement");
        $('#lsk2Left').html(lsk2Left);
    }

    lsk2Right = lsk2Right + (intInnerNum * 5);
    if (lsk2Right > 99) {
        lsk2Right = 0;
    }
    if (lsk2Right < 0) {
        lsk2Right = 95;
    }
    var lsk2RightString = lsk2Right.toString();                     //Converting to string
    if ((lsk2RightString == "0") || (lsk2RightString == "5")) {
        lsk2RightString = "0" + lsk2RightString;
    }
    $("#lsk2Right").html("." + lsk2RightString);
    

    //console.log("VHF Freq Function: lsk2RightString - " + lsk2RightString);
    //console.log("VHF Freq Function: lsk2Right.toString() - " + lsk2Right.toString());
    //console.log("Current Stats: \nstrScreenView: " + strScreenView + "\nintLSK: " + intLSK);

    if ((lsk2Left > 107) && (lsk2Left < 111)) {                         //Range for 
        var lsk2RightFirstCharacter = lsk2RightString.substring(0, 1);  //Selecting the first digit
        var lsk2RightFirstDigit = parseInt(lsk2RightFirstCharacter);    //Converting back to number
        if (lsk2RightFirstDigit % 2) {
            //console.log("lsk2RightFirstDigit: " + lsk2RightFirstDigit + "\nisEven?: " + (lsk2RightFirstDigit % 2));
            $("#lsk3Type").html("ILS1"); // Odd tenths
            strLsk3Type = "ils1";
        } else {
            //console.log("lsk2RightFirstDigit: " + lsk2RightFirstDigit + "\nisEven?: " + lsk2RightFirstDigit % 2);
            $("#lsk3Type").html("VOR1"); // Even tenths
            strLsk3Type = "vor1";
        }
    }
}

function setChannel() {
    // Handle OuterChannel Events
    var insideKnobNum = 0;
    var outsideKnobNum = 0;
    switch (intLSK) {
        case 0:
            insideKnobNum = intInnerChannel;
            outsideKnobNum = intOuterChannel;
            break;
        case 1:
            if (strScreenView == "chSET") {
                insideKnobNum = intInnerChannel;
                outsideKnobNum = intOuterChannel;
            }
            else {
                insideKnobNum = intInnerChannelPre;
                outsideKnobNum = intOuterChannelPre;
            }
            break;
        case 2:
            insideKnobNum = intInnerChSetChannel;
            outsideKnobNum = intOuterChSetChannel;
            break;
    }
    if (insideKnobNum > 0) {
        if (intOuterNum != 0) {
            outsideKnobNum == 1 ? outsideKnobNum = 0 : outsideKnobNum = 1;
        }

    }
    // Handle 10 - 19
    if (insideKnobNum == 0) {
        if (intOuterNum != 0) {
            outsideKnobNum == 1 ? outsideKnobNum = 2 : outsideKnobNum = 1;
        }
    }
    switch (outsideKnobNum) {
        case 0: // Ones
            insideKnobNum = insideKnobNum + intInnerNum;
            if (insideKnobNum < 1) {
                insideKnobNum = 9;
                    }
            if (insideKnobNum > 9) {
                insideKnobNum = 1;
                    }            
            
                intFinalChannel = insideKnobNum - 1;
            break;
        case 1: // Tens
            insideKnobNum = insideKnobNum + intInnerNum;
            if (insideKnobNum < 0) {
                insideKnobNum = 9;
            }
            if (insideKnobNum > 9) {
                insideKnobNum = 0;
            }
            intFinalChannel = insideKnobNum + 10 - 1;
            break;
        case 2: // Twenty
            intFinalChannel = 19;
            break;
    }
    switch (intLSK) {
        case 0:
            intInnerChannel = insideKnobNum;
            intOuterChannel = outsideKnobNum;
            strChannelSetRTN = channels[intFinalChannel];
            break;
        case 1:
            if (strScreenView == "chSET") {
                intInnerChannel = insideKnobNum;
                intOuterChannel = outsideKnobNum;
                strChannelSetRTN = channels[intFinalChannel];
            }
            else {
                intInnerChannelPre = insideKnobNum;
                intOuterChannelPre = outsideKnobNum;
                strChannelSetPRE = channels[intFinalChannel];
            }
            break;
        case 2:
            intInnerChSetChannel = insideKnobNum;
            intOuterChSetChannel = outsideKnobNum;
            strChannelSetUhfCh = channels[intFinalChannel];
            $("#lsk2Right").html(" " + strChannelSetUhfCh);
            break;
    }

    //switch (strScreenView) {
    //    case "Main":
    //        UHF_ChannelChange();
    //       // mainView();
    //        break;        
    //    case "chSET":
    //        UHF_ChannelChange();
    //        break;
    //}
    UHF_ChannelChange();

}

// Case 3: ADF Nav Frequency LSK 3 
function ADF_Frequency() {
    lsk3Right = lsk3Right + (intInnerNum / 2);                            //Inner Knob increment is 5
    lsk3Left = lsk3Left + (intOuterNum);                                  //Outer knob increment is 100

    if (lsk3Left > 17) {
        lsk3Left = 17;
    }
    if (lsk3Left < 2) {
        if ((lsk3Right < 90) && (!blCenterKnob)) {
            lsk3Left = 2;
        }
        else {
            lsk3Left = 1;
        }
    }
    $('#lsk3Left').html(lsk3Left);
    if (lsk3Right > 99.9) {
        lsk3Right = 0;
    }
    if (lsk3Right < 0) {
        lsk3Right = 99;
    }
    if ((lsk3Left == 1) && (blCenterKnob)) {
        if (lsk3Right < 90) {
            lsk3Right = 90;
        }
    }
    var blWholeNumber = true;
    if (lsk3Right % 1 != 0) {
        blWholeNumber = false;
    }
    var intRightLength = lsk3Right.toString().length;
    var strlsk3Right = "";
    if (blWholeNumber) {
        switch (intRightLength) {
            case 1:
                strlsk3Right = "0" + lsk3Right + ".0";
                break;
            case 2:
                strlsk3Right = lsk3Right + ".0";
                break;
        }
    }
    else {
        switch (intRightLength) {
            case 2:
                strlsk3Right = "00" + lsk3Right;
                break;
            case 3:
                strlsk3Right = "0" + lsk3Right;
                break;
            case 4:
                strlsk3Right = lsk3Right;
                break;
        }
    }
    if ((lsk3Left == 17) && (strlsk3Right == "99.5")) {
        strlsk3Right = "99.0";
        lsk3Right = 99;
    }
    $("#lsk3Right").html(strlsk3Right);

}
// Case 4: TACAN Frequency LSK 4
function TCN_Frequency() {
    lsk4Left = lsk4Left + intOuterNum;
    lsk4Right = lsk4Right + intInnerNum;
    // Set TACAN Units Range 0 - 9
    if ((lsk4Left < 12) && (lsk4Left >= 0)) {
        //$('#lsk4Left').html(lsk4Left);
        // lsk4Right is the ones value: 0 - 9
        if (lsk4Right > 9) {
            lsk4Right = 0;
            alphaToggle();
        }
        if (lsk4Right < 0) {
            lsk4Right = 9;
            alphaToggle();
        }
    }
    // If hundreds & tens are 12
    if ((lsk4Left == 12) && (blCenterKnob)) {
        if (lsk4Right > 6) {
            lsk4Right = 0;
            alphaToggle();
        }
        if (lsk4Right < 0) {
            lsk4Right = 6;
            alphaToggle();
        }
    }
    if ((lsk4Left > 11) && (!blCenterKnob)) {
        if (lsk4Right > 6) {
            lsk4Left = 11;
        }
        else {
            lsk4Left = 12;
        }
    }
    //Range of left: 0-12
    if (lsk4Left > 12) {
        lsk4Left = 12;
    }
    else if (lsk4Left < 0) {
        lsk4Left = 0;
    }
    $("#lsk4Left").html(lsk4Left);
    $("#lsk4Right").html(lsk4Right);
}

// Alpha numeric oscillation
function alphaToggle() {
    switch (alpha.html()) {
        case "x":
            lsk4Alpha = "y";
            break;
        case "y":
            lsk4Alpha = "x";
            break;
    }
    alpha.html(lsk4Alpha);
}
/////////////////// Frequency Specific Functions Above /////////////////////

//// Asterisk Timer/Reset
var resetDisplay = function resetDisplay() {
    /*
   500 = 0.5 seconds
   1000 = 1 second
   10000 = 10 seconds
   */
    resetTimeout = setTimeout(function () {
        //console.log("Reset Timeout Before mainView: \nstrScreenView: " + strScreenView + "\nintLSK: " + intLSK + "\nintADFsave: " + intADFsave);
        $("#frequencyDisplay").css("display", "block");
        $displayRow.toggleClass("shown", "shown").html("&nbsp;");
        intLSK = 1;
        mouseClicks = 0;
        displayLSK();
        mainView();
        //console.log("Reset Timeout After mainView: \nstrScreenView: " + strScreenView + "\nintLSK: " + intLSK + "\nintADFsave: " + intADFsave);
        //My input ******************
        if ((intLSK == 1) && (strScreenView.trim() == "Main")) { // remove lsk: 3 carat on mainView coming from adfView
            $displayRow.eq(3).addClass("shown").text(" ");
        };
        //**************************
        //blPreSecondSelection = false;
    }, 15000)//5000) //// @Production - change this value to 15000 (15 sec)
}
//// Reset Timer Countdown
function myStopFunction() {
    clearTimeout(resetTimeout);
}

function fillFreq(label, value) {
    switch (label) {
        case "caret":
            $("." + label).html(value);
            break;
        case "lsk0Left":
            $("#" + label).html(value);
            break;
        case "lsk0Right":
            var rightValue;
            if (value == 0) {
                rightValue = ".00";
                $("#" + label).html(rightValue);                
            }
            else {
                if (value.toString().length == 2) {
                    rightValue = ".0" + value.toString().substr(0, 1);
                    $("#" + label).html(rightValue);
                } else {
                    rightValue = "." + value.toString().substr(0, 2)
                $("#" + label).html(rightValue);
                }
            }
            break;

        case "lsk1Left":
            $("#" + label).html(value);
            break;

        case "lsk1Right":
            if (value == 0) {
                $("#" + label).html(".00"); // force .00
            }
            else {
                if (value.toString().length == 2) {
                    $("#" + label).html(".0" + value.toString().substr(0, 1));
                }
                else {
                    $("#" + label).html("." + value.toString().substr(0, 2));
                }
            }
            break;

        case "lsk2Left":
            $("#" + label).html(value);
            break;

        case "lsk2Right":
            if (value == 0) {
                $("#" + label).html(".00");
            }
            else {
                $("#" + label).html("." + value.toString().substr(0, 2));
            }
            break;

        case "lsk3Left":
            $("#" + label).html(value);
            break;

        case "lsk3Right":
            $("#" + label).html(value.toString());
            break;

        case "lsk4Left":
            $("#" + label).html(value);
            break;

        case "lsk4Right":          
                $("#" + label).html(value.toString());
            break;
    }
}

////////////////// Center & OuterKnob Rotation ///////////////////////////////////////////
function rotateRTU1CenterKnob() {
    knobCenterRTU1.mousemove(function (event) {
        intNumberOfTicks = 18;
        startingTick = intCenterTick;
        knobTicks = knobInnerTicks;
        var intX = event.pageX; // The mouse position relative to the left edge of the document
        var intY = event.pageY; // The mouse position relative to the top edge of the document
        //console.log("Center Test");
        if (lastY == intY) {
            if (intY > 469) { // center of knobs
                (lastX < intX) ? moveKnob("down", knobCenterRTU1) : moveKnob("up", knobCenterRTU1);
            } else {
                (lastX < intX) ? moveKnob("up", knobCenterRTU1) : moveKnob("down", knobCenterRTU1);
            }
        }
        else if (intX > 328) { // center of knobs
            (lastY < intY) ? moveKnob("up", knobCenterRTU1) : moveKnob("down", knobCenterRTU1);
        }
        else {
            (lastY < intY) ? moveKnob("down", knobCenterRTU1) : moveKnob("up", knobCenterRTU1);
        }
        lastY = intY;
        lastX = intX;
        blMouseMove = true;
        blCenterKnob = true;
        frequencySelector();
        myStopFunction(); // stops timer when knob is utilized
        resetDisplay(); // resets timer to return
        //Use to find center coordinates of knob
        //$('.currentRTUValue').html("Cursor Location:<br /><strong>X</strong> = " + intX.toFixed(2) + " <strong>Y</strong> = " + intY.toFixed(2));
    });
}
function removeRTU1Rotation() {
    knobCenterRTU1.unbind("mousemove");
}
//// Outer Knob
function rotateRTU1OuterKnob() {
    knobOuterRTU1.mousemove(function (event) {
        intNumberOfTicks = 18;  // Global var 
        startingTick = intOuterTick;
        knobTicks = knobOuterTicks;
        var intX = event.pageX;
        var intY = event.pageY;
        //console.log("Outer Test");

        if (lastY == intY) //No change to Y
        {
            if (intY > 469) //graphic Y minus
            {       //clockwise
                (lastX < intX) ? moveKnob('down', knobOuterRTU1) : moveKnob('up', knobOuterRTU1);
            }
            else  //graphic Y is positive 
            {
                (lastX < intX) ? moveKnob('up', knobOuterRTU1) : moveKnob('down', knobOuterRTU1);
            }
        }
        else if (intX > 328)  //positive X movement
        {
            (lastY < intY) ? moveKnob('up', knobOuterRTU1) : moveKnob('down', knobOuterRTU1);
        }
        else {
            (lastY < intY) ? moveKnob('down', knobOuterRTU1) : moveKnob('up', knobOuterRTU1);
        }
        lastY = intY;
        lastX = intX;
        blMouseMove = true;
        frequencySelector();
        myStopFunction(); // stops timer when knob is utilized
        resetDisplay(); // resets timer to return
        //Use to find center coordinates of knob
        //$('.currentRTUValue').text("Outer Knob x = " + intX + "\ny = " + intY);
        //$('.currentRTUValue').text("Outer Knob x = " + intX.toFixed(2)+ "\ny = " + intY.toFixed(2));
        //$('.currentRTUAngle').text("Outer Knob angle = " + intDegrees.toFixed(2));
        //$('.currentRTUValue').html("Outer Knob:<br /><strong>x</strong> = " + intX.toFixed(2) + " <strong>y</strong> = " + intY.toFixed(2));
        //$('currentUHFValue').html("currentUHFValue");
        blCenterKnob = false;
    });
}
function removeRTU1OuterRotation() {
    knobOuterRTU1.unbind("mousemove");
}

////////////////// Center & Outer Knob Rotation Above ///////////////////////////////////
//////////////////* Set Media Path for End Users *///////////////////////////////////////
function setMediaPath() {
    var mediaChange = " ";
    try {
        mediaChange = GetMediaPath() + "\\Instruments\\T1ARadioTuningUnit_400_540\\";
    }
    catch (e) { mediaChange = ""; }
    if (mediaChange.length > 30) {
        mediaLocation = mediaChange;
        $("#rtuContainer img").attr("background-image", "url('" + mediaLocation + "T1_RTU1FRQBlank.png'");  
        $("#btnList img").attr("background-image", "url('" + mediaLocation + "rtu-btn.png'");
        //$("#bugKnotSymbol img").attr('src', mediaLocation + "rtu-btn.png");
        //$("#pushMSI img").attr('src', mediaLocation + "T1_MSI_Dial.png");
        //$("#pressedButton").attr('src', "url('" + mediaLocation + "T1_MSI_TempPress.png");
        //$("#displayTAS").attr('src', "url('" + mediaLocation + "T1_MSI_TAS.png");
        //$("#tempImage").attr('src', "url('" + mediaLocation + "T1_MSI_RAT.png");
    }
}