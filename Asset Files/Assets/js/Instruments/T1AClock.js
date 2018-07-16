
var FlightTime = 0;
var startTime = new Date;
var currentTimeInterval;
var flightTimeInterval;
var elapsedTimeInterval;
var ElapsedTime = 0;
var TimeSwitchValue = 395;
var ElapsedSwitchValue = 398;
var mediaLocation = "Content/Instruments/T1AClock_339_339/";
var ElapsedTimerIsRunning = false;
var ElapsedTimeIncrement = false;

/////////////used with activateOn rollover//////////////
function MouseOutMethod(e) {
    var divID = "#" + e;
    //$(divID).remove();
    $(divID).removeClass("distractorRemShow");
    $(divID).addClass("distractorRemHide");

}
//////////////calls hotspot actions for the Rollover method/////////////
function RolloverMethod(e) {
    HotspotActions(e);
}

//////////////calls hotspot actions for the doubleClick method/////////////
function DoubleClickMethod(e) {
    HotspotActions(e);
}

//////////////calls hotspot actions for the Click method/////////////
function ClickMethod(e) {
    HotspotActions(e);
}

/////////////performs the various hotspot actions////////////////////
function HotspotActions(pHotspotID) {
    var timeButtonArray = [394, 395, 396];
    var runButtonArray = [397, 398, 399];
    $image = $("#" + pHotspotID);
    //show associated image
    if ($image.hasClass("distractorRemHide")) {
        $image.addClass("distractorRemShow");
        $image.removeClass("distractorRemHide");
    }
    //adjust images not selected
    switch(pHotspotID)
    {
        
        case 394://current Time
        case 395://Flight time
        case 396://Elapsed time
            //Hide none associated images
            for (i = 0; i < timeButtonArray.length; i++) {
                if (timeButtonArray[i] != pHotspotID) {
                    $hideImage = $("#" + timeButtonArray[i]);
                    $hideImage.removeClass("distractorRemShow");
                    $hideImage.addClass("distractorRemHide");
                }
            }
            TimeSwitchValue = pHotspotID;
                break;
        case 397://Zero
        case 398://Stop
        case 399://Run
            for (i = 0; i < runButtonArray.length; i++) {
                if (runButtonArray[i] != pHotspotID) {
                    $hideImage = $("#" + runButtonArray[i]);
                    $hideImage.removeClass("distractorRemShow");
                    $hideImage.addClass("distractorRemHide");
                }
            }
            ElapsedSwitchValue = pHotspotID;
            break;
}
    //add functionality to the switches
    switch(pHotspotID)
     {
        case 394://Current time
            CurrentTimer();
            currentTimeInterval = setInterval(CurrentTimer, 1000);
            break;
        case 395: //Flight time
            FlightTimerDisplay();
            flightTimeInterval = setInterval(FlightTimerDisplay, 1000);
            break;
        case 396://Elapsed time
            //ElapsedTimer();
            CheckElapsedTimer();
            if (ElapsedSwitchValue == 399)
            {
                if(!ElapsedTimerIsRunning)
                {
                    elapsedTimeInterval = setInterval(ElapsedTimer, 1000);
                    ElapsedTimerIsRunning = true;
                }
            }
            break;
        case 397://Zero Elapsed time
            //if time switch is in ET reset elapsed time
            if (TimeSwitchValue == 396) {
                ElapsedTime = -1;
                clearInterval(elapsedTimeInterval);
                ElapsedTimerIsRunning = false;
                ElapsedTimer();
            }
            break;
        case 398://Stop Elapsed time
            //if time switch is in ET pause the timer
            if (TimeSwitchValue == 396) {
                clearInterval(elapsedTimeInterval);
                ElapsedTimerIsRunning = false;
            }
            break;
        case 399://Run Elapsed time
            //if time switch is in ET start the timer running
            if (TimeSwitchValue == 396) {
                if (!ElapsedTimerIsRunning) {
                    ElapsedTimer();
                    elapsedTimeInterval = setInterval(ElapsedTimer, 1000);
                    ElapsedTimerIsRunning = true;
                }
            }
            break;
    }
    function CurrentTimer()
    {
        var dt = new Date();
        var currentHour = dt.getHours();
        var currentMinutes = dt.getMinutes();
        var currentSeconds = dt.getSeconds();
        if (TimeSwitchValue == 394) {
            $("#hourTens img").attr('src', mediaLocation + translateNumberToText(getTens(currentHour)) + ".png");
            $("#minutesTens img").attr('src', mediaLocation + translateNumberToText(getTens(currentMinutes)) + ".png");
            $("#secondsTens img").attr('src', mediaLocation + translateNumberToText(getTens(currentSeconds)) + ".png");
            $("#hourOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(currentHour)) + ".png");
            $("#minutesOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(currentMinutes)) + ".png");
            $("#secondsOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(currentSeconds)) + ".png");            
        }
    }

    function FlightTimerDisplay()
    {
        var seconds = FlightTime / 1000;
        var hours = Math.floor(seconds / 3600); //Get whole hours
        //seconds -= hours * 3600;
        var minutes = Math.floor((seconds - (hours*3600)) / 60); //Get remaining minutes
        seconds = Math.floor(seconds % 60);
        if (TimeSwitchValue == 395) {
            $("#hourTens img").attr('src', mediaLocation + translateNumberToText(getTens(hours)) + ".png");
            $("#minutesTens img").attr('src', mediaLocation + translateNumberToText(getTens(minutes)) + ".png");
            $("#secondsTens img").attr('src', mediaLocation + translateNumberToText(getTens(seconds)) + ".png");
            $("#hourOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(hours)) + ".png");
            $("#minutesOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(minutes)) + ".png");
            $("#secondsOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(seconds)) + ".png");
        }
    }
    function ElapsedTimer()
    {
        ElapsedTime++; 
        CheckElapsedTimer();
    }
    function CheckElapsedTimer()
    {
        var seconds = ElapsedTime;
        var hours = Math.floor(seconds / 3600); //Get whole hours
        //seconds -= hours * 3600;
        var minutes = Math.floor((seconds - (hours * 3600)) / 60); //Get remaining minutes
        seconds = Math.floor(seconds % 60);
        if (TimeSwitchValue == 396) {
            $("#hourTens img").attr('src', mediaLocation + translateNumberToText(getTens(hours)) + ".png");
            $("#minutesTens img").attr('src', mediaLocation + translateNumberToText(getTens(minutes)) + ".png");
            $("#secondsTens img").attr('src', mediaLocation + translateNumberToText(getTens(seconds)) + ".png");
            $("#hourOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(hours)) + ".png");
            $("#minutesOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(minutes)) + ".png");
            $("#secondsOnes img").attr('src', mediaLocation + translateNumberToText(getOnes(seconds)) + ".png");
        }
    }

    function getTens(pNumber)
    {
        if (pNumber > 9) {
            var aryOnes = [];
            var sNumber = pNumber.toString();
            for (var i = 0; i < sNumber.length; i++) {
                aryOnes.push(+sNumber.charAt(i));
            }
            return aryOnes[0];
        }
        else {
            return 0;
        }
    }
    function getOnes(pNumber) {

        if(pNumber > 9)
        {
            var aryOnes = [];
            var sNumber = pNumber.toString();
            for (var i = 0; i < sNumber.length; i++)
            {
                aryOnes.push(+sNumber.charAt(i));
            }
            return aryOnes[1];
        }
        else
        {
            return pNumber;
        }
    }
    function translateNumberToText(pNumber)
    {
        var returnText = "";
        switch(pNumber)
        {
            case 1:
                returnText = "One";
                break;
            case 2:
                returnText = "Two";
                break;
            case 3:
                returnText = "Three";
                break;
            case 4:
                returnText = "Four";
                break;
            case 5:
                returnText = "Five";
                break;
            case 6:
                returnText = "Six";
                break;
            case 7:
                returnText = "Seven";
                break;
            case 8:
                returnText = "Eight";
                break;
            case 9:
                returnText = "Nine";
                break;
            case 0:
                returnText = "Zero";
                break;
            default:
                returnText = "Zero";
                break;
        }
        return returnText;
    }
}
function setMediaPath() {
    var mediaChange = " ";
    try{
        mediaChange = GetMediaPath() + "\\Instruments\\T1AClock_339_339\\";
    }
    catch (e) { mediaChange = "";}
    if (mediaChange.length > 30) {
        mediaLocation = mediaChange;
        $("#clockMedia img").attr('src', mediaLocation + "T1_SY304_CBT_ClockFlightTimeA.png");
        $("#399 img").attr('src', mediaLocation + "RunSwitch.png");
        $("#398 img").attr('src', mediaLocation + "StopRunSwitch.png");
        $("#397 img").attr('src', mediaLocation + "ZeroRunSwitch.png");
        $("#396 img").attr('src', mediaLocation + "ElapsedTimeSwitch.png");
        $("#395 img").attr('src', mediaLocation + "FlightTimeSwitch.png");
        $("#394 img").attr('src', mediaLocation + "CurrentTimeSwitch.png");
        $("#hourTens img").attr('src', mediaLocation + "Zero.png");
        $("#hourOnes img").attr('src', mediaLocation + "Zero.png");
        $("#minutesTens img").attr('src', mediaLocation + "Zero.png");
        $("#minutesOnes img").attr('src', mediaLocation + "Zero.png");
        $("#secondsTens img").attr('src', mediaLocation + "Zero.png");
        $("#secondsOnes img").attr('src', mediaLocation + "Zero.png");
    }
}