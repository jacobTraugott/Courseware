var contentPath = "Content/",
   // mediaPath = "_media/",
    progressbar = document.getElementById('progressbar'),
    percent = document.getElementById('progress-percent'),
    pagecount = $('#pageCount'),
    pageIndex = "",
    pageLength = "";

var mediaWidth = 0;
var mediaHeight = 0;
var DLPUrl = window.location.origin + "/dlp";
var startURL = window.location.href;

var critiquesArray = [];
var frames = [];
var childIndex = 0;
var currentFrameIndex = -1;
var percent = 0;
var lessonIdentifier = "";
var lessonID = "0";
var boolIsBuildFrame = false;
var currentBuildNumber = 1;
var numTimesQuestionAnswered = 0;
var questionsVisitedArray = [];
var strXmlVersionInfo = "";
var strHtmlVer = "1.0.0.0";
var boolMoveForward = true;
var intTopMarginText = 0;//55;
var intTopMarginImage = 0;//-5;
var intSideMarginImage = 0;//-3;
var boolClassified = false;
var titleSpanClass = "";
var tempIndexArray = [];//holds array indices that have been used already
var answeredTestQuestionsArray = [];
var testQuestionRemediationArray = [];
var totalQuestionCount = 0;
var strMoveForwardType = "";
var viewedQuestionsArray = [];
var allQuestionsArray = [];
var numQuestionsNotAnswered = 0;
var remediationArrayIndex = -1; //used to access the information in the testQuestionRemediationArray
var strFrameType = "";
var intHotspotOffsetX = 0;//10;
var intHotspotOffsetY = 0;//22;
var intHighlightXOffset = 0;//5;
var intHighlightYOffset = 0;//-5;
var boolHotSpot = false;
var boolHighlights = false;
var boolHotSpotMediaShowing = false;
var hotspotColor = "";
var boolHasIntroSlide = false;
var boolHasInformationSlide = false;
var highlightColorsArray = [];
var beginCBTTime = "00:00 PM 0/00/2016";
var endCBTTime = "00:00 PM 0/00/2016";
var lessonVersion = "0";
var acesVersion = "0";
var programID = "0";
var lessonTitle = "None";
var lessonComplete = "i";
var userCACID = "0000000000";
var studentID = "0";
var studentName = "0";
var syllabusID = "0";
var bookmark = "0";
var score = 0;
var timeInLesson = "0";
var lessonLoc = "0";////////////only used to pull in the param lessonLocation information - after that point always use the variable bookmark
var audioLevel = 0;
var strBase = "0";
var strClassID = "0";
var strCredit = "none";
var startTime = "00:00 PM 0/00/2016";
var endTime = "00:00 PM 0/00/2016";
var max = 0;
var boolViewSpecificFrame = false;
var developer = false;
var fullNav = "";
var tools = "";
var strXml = "";
var wrapperVersion = "";
var lessonRevision = "";
var myTool;
var menuObj = "";
var mediaPath = "Content";
var strAskClassID = "true";
var extraRemediationIndex = 0;
var intDrawObjectsLineWidth = 0;
var boolInRemediation = false;
var boolReviewQuestionRemediation = false;
var sourceLocation = "";
var remHighlightColor = "";
var numberDefinitionsOnPage = 0;
var boolExtraRemediation = false;
var xmlDoc = "";
var lessonType = "cbt";
var examForm = "a";
var masteryScore = "";
var maxTimeAllowed = 1;
var boolExamStarted = false;
var examTimerInterval;
var lesson_ExamID = "";
var examStudentAnswerArray = [];
var critiquesViewed = false;
var currentCritiqueIndex = -1;
var course = "";
var critiqueStudentName = "";
var aircraft = "";
var critiqueQuestionIndex = 0;
var strCritiqueStudentAnswers = "";
var critiqueRating = 0;
var critiqueComment = "";
var boolInCritique = false;
var supplementInfo = [];
var linkText = "";
var decryptedXMLGlossary = "";
var devText = false;
var reviewQuestionObj = [];
var blVarsSentFromWrapper = false;
var jumpToHiddenFrameID = "";

/*function SetXML(pStrXml)
{
    strXml = pStrXml;
   // alert("SetXML pStrXML = " + pStrXml);
    LoadXML(strXml);
}*/

function SetDecryptedGlossaryXML(pGlossaryXML)
{
    decryptedXMLGlossary = pGlossaryXML;
}


//////////////Gets the param.cmi vars from the wrapper
function GetVarsFromWrapper(pParamVars) {
    //check if exe or web
    if (!blVarsSentFromWrapper) {
        var aryParams = [];
        var strParamVars = pParamVars.toString();

    aryParams = pParamVars.split('&');

        for (var i = 0; i < aryParams.length; i++) {
            if (aryParams[i].toLowerCase().indexOf("student_id") > -1) {
                studentID = aryParams[i].toLowerCase().replace("student_id=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("student_name") > -1) {
                studentName = aryParams[i].toLowerCase().replace("student_name=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("lessonlocation") > -1) {
                lessonLoc = aryParams[i].toLowerCase().replace("lessonlocation=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("audiolevel") > -1) {
                audioLevel = aryParams[i].toLowerCase().replace("audiolevel=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("syllabusid") > -1) {
                syllabusID = aryParams[i].toLowerCase().replace("syllabusid=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("lessonstatus") > -1)
            {
                lessonComplete = aryParams[i].toLowerCase().replace("lessonstatus=", "");
            }
            
            if (aryParams[i].toLowerCase().indexOf("classid") > -1) {
                strClassID = aryParams[i].toLowerCase().replace("classid=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("base=") > -1) {
                strBase = aryParams[i].toLowerCase().replace("base=", "").toUpperCase();
            }
            if (aryParams[i].toLowerCase().indexOf("credit") > -1) {
                strCredit = aryParams[i].toLowerCase().replace("credit=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("usercacid") > -1) {
                userCACID = aryParams[i].toLowerCase().replace("usercacid=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("tools") > -1) {
                tools = aryParams[i].toLowerCase().replace("tools=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("assemblyversion") > -1) {
                wrapperVersion = aryParams[i].toLowerCase().replace("assemblyversion=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("askclassid=") > -1) {
                strAskClassID = aryParams[i].toLowerCase().replace("askclassid=", "");
            }                  
            if (aryParams[i].toLowerCase().indexOf("test_form=") > -1)
            {
                if (aryParams[i].length > 10) {
                    examForm = aryParams[i].toLowerCase().replace("test_form=", "");
                }
            }
            if (aryParams[i].toLowerCase().indexOf("masteryscore=") > -1)
            {
                masteryScore = aryParams[i].toLowerCase().replace("masteryscore=", "");
            }
            if (aryParams[i].toLowerCase().indexOf("maxtimeallowed=") > -1)
            {
                maxTimeAllowed = parseFloat(aryParams[i].toLowerCase().replace("maxtimeallowed=", ""));
            }
            if (aryParams[i].toLowerCase().indexOf("lessonid=") > -1)
            {                
                var lessonExamIDArray = []; 
                lessonExamIDArray = aryParams[i].split("=");
                lesson_ExamID = lessonExamIDArray[1];
            }
            if(aryParams[i].toLowerCase().indexOf("course=") > -1)
            {
                var courseArray = [];
                courseArray = aryParams[i].split("=");
                course = courseArray[1];
            }
            
            //examForm = "f";
        }
        if (typeof tools !== typeof undefined && tools.length > 0) {
            myTool = $.map(tools.replace(/_/g, " ").split(","), $.trim);
        }
        if ((studentName === "1") && (syllabusID == "321321"))
        {
            devText = true;
            fullNav = "1";
        }
        blVarsSentFromWrapper = true;
    }
}
///get the paramCmi json from TIMS
function getJsonFromTims()
{
    var ParamCmi = JSON.parse(TIMS.data.load());
    studentID = ParamCmi.PARAMCMI.CORE.Student_ID;
    studentName = ParamCmi.PARAMCMI.CORE.Student_Name;
    strCredit = ParamCmi.PARAMCMI.CORE.Credit;
    lessonComplete = ParamCmi.PARAMCMI.CORE.Lesson_Status;
    lessonIdentifier = ParamCmi.PARAMCMI.CORE_VENDOR.Lesson_ID;
}
function CheckMediaPath()
{
    try
    {
        mediaPath = GetMediaPath();//comes from mediaStartPath.js which is created at runtime
    }
    catch(e )
    {        
        mediaPath = "Content";
    }
}
//// Reads the xml file and sets up all arrays with information from the xml
function LoadXML(pStrXml)
{
    CheckMediaPath();

    var attachment = "";
    var remAttachment = "";
    var frameTitle = "";
    var framNum = "";
    var frameID = "";
    var frameTempType = "";
    var remediation = "";
    var txtTop = "";
    var txtLeft = "";
    var txtHeight = "";
    var txtWidth = "";
    var segmentTitle = "";
    var segmentID = 0;
    var segmentType = "";
    var topicTitle = "";
    var topicID = 0;
    var topicType = "";
    var numberOfBuilds = 0;
    var template = "";
    var classLevel = "";
    var colLeft = "";
    var colTop = "";
    var colWidth = "";
    var columnText = "";
    frames = [];
    xmlDoc = "";
    xmlDoc = $.parseXML(pStrXml), $xml = $(xmlDoc);
    var questionType = "";
    var menuTitle = "";
    var headPhoneIcon = "";
    var extraRemediationFrameArray = [];
    if (window.location.pathname.indexOf('ved') != -1)
    {
        DLPUrl = DLPUrl + "dev";
    }
    var topicRandom = false;
    var topicRandomizeArray = [];
    var segmentRandom = false;
    var segmentRandomizeArray = [];
    var forms = "";

    /////////////////////////////////////////////Set up highlight colors array/////////////////////////////////////////////////////////////////////////////////////
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value')));
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value2')));
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value3')));
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value4')));
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value5')));
    highlightColorsArray.push(ConvertColor($xml.find('highlightColor').attr('value6')));
    remHighlightColor = highlightColorsArray[2];

    /////////////////////////////////////////////End Set up highlight colors array/////////////////////////////////////////////////////////////////////////////////////

    /// Set the classification 
    $classified = $xml.find('classified').attr('value');
    if ($classified == 1)
    {
        boolClassified = true;
        titleSpanClass = "classified";
        if ($("div#classificationTopMarker").length)
        {
            //div already exists...do nothing
        }
        else
        {
            $("div#wrapper").before($("<div />", { // Append div
                "id": "classificationTopMarker",
                "class": "classifiedMarker"
            }));

            $("div#wrapper").after($("<div />", { // Append div
                "id": "classificationBottomMarker",
                "class": "classifiedMarker"
            }));
        }
    }
    else if ($classified == 0)
    {
        boolClassified = false;
        titleSpanClass = "unclassified";
    }

    if (boolClassified)
    {
        $("div#classificationBottomMarker, div#classificationTopMarker").html("UNCLASSIFIED").addClass("classifiedMarkerGreen");
        ReadClassificationXML();
    }

    ///////////////////////////////////////////////////End set classification///////////////////////////////////////////////////////////////////////////////////

    lessonType = $xml.find('mediatype').attr('value').toLowerCase();//////////////////sets the lessonType to EXAM, CBT, or IBT
    if (lessonType == "ibt")
    {
        strAskClassID = "false";
    }
    else
    {
        strAskClassID = "true";
    }

    if (lessonType == "exam")
    {
        aircraft = $xml.find('aircraft').attr('value');
    }

    var splashScreen = $xml.find('splashScreen').attr('value');

    if (typeof splashScreen === typeof undefined && currentFrameIndex == -1)
    {
        developer = true;
    }

    fullNav = $xml.find('fullNavigation').attr('value');
    lessonVersion = $xml.find('lessonRevision').attr('value');
    programID = $xml.find('program').attr('value');
    intDrawObjectsLineWidth = $xml.find('drawObjectsLineWidth').attr('value');
    lessonID = $xml.find('lessonID').attr('value');

    $("<span />", {  //// Create a frameTitle span tag
        "id": "frameTitle",
        "class": "frameTitle"
    }).appendTo("#titleBar");

    $("#text, #media, #columns, #remediation").empty().hide(); //// Set un-used tags "display:none"

    var xmlHotspotColor = $xml.find('hotSpotColor').attr('value');    //get hotspot color from xml//////////////////
    hotspotColor = ConvertColor(xmlHotspotColor);////////convert the color to usable form//////////////

    ////////////////////get supplement data//////////////////////
   // $xml.find("supplements");
    $xml.find("menuItem").each(function (index)
    {
        var suppTitle = $(this).attr("title");
        var suppURL = $(this).attr("link");
        supplementInfo.push({ title: suppTitle, link: suppURL });
    });

    //alert("supplement length = " + supplementInfo.length + "\nsuppURL = " + supplementInfo[0].link);

    /////////////////////////////////////////////get all frame data from the xml/////////////////////////////
    $xml.find("frame").each(function (index)
    {
        topicRandom = false;
        segmentRandom = false;
        strFrameType = "RegularFrame";

        if (lessonType == "exam")
        {
            var formsPublished = $(this).attr("forms");
            var formAvailable = false;

            forms = $(this).attr("forms");

            if (formsPublished.indexOf(examForm.toUpperCase()) !== -1)
            {
                formAvailable = true;
            }
        }

        // alert("lessonType = " + lessonType + "\nformAvailable = " + formAvailable + "\nexamForm.toUpperCase = " + examForm.toUpperCase());

        if ((lessonType == "ibt") || (lessonType == "cbt") || ((lessonType == "exam") && (formAvailable)))
        {
            //// Array
            var frameText = [];
            var frameMedia = [];
            var questionInfo = [];
            var hotspotArray = [];
            var highlightArray = [];
            var columnsArray = [];

            //// Topic Attributes
            $topic = $(this).parent();
            topicTitle = $topic.attr("title");
            topicID = $topic.attr("id");
            topicType = $topic.attr("type");

            //// Segment Attributes
            $segment = $topic.parent();
            segmentTitle = $segment.attr("title");
            segmentID = $segment.attr("id");
            segmentType = $segment.attr("type");

            if (lessonType == "exam")
            {
                if ($segment.attr("randomize") == 1)
                {
                    segmentRandom = true;
                    if ($topic.attr("type") !== "ScoreMe")
                    {
                        if (segmentRandomizeArray.indexOf(topicID) === -1)
                        {
                            segmentRandomizeArray.push(topicID);
                        }
                    }
                }
                if ($topic.attr("randomize") == 1)
                {
                    topicRandom = true;
                    ////////////////////////////only put in the array if it doesn't already exist.
                    if (topicRandomizeArray.indexOf(topicID) == -1)
                    {
                        topicRandomizeArray.push(topicID);
                    }
                }
            }

            //// Frame Attributes
            attachment = $(this).attr("attachment");
            remAttachment = $(this).attr("remAttachment");

            frameTitle = $(this).attr("title");
            frameID = $(this).attr("id");
            framNum = $(this).attr("num");
            frameTempType = $(this).attr("tempType");
            menuTitle = $(this).attr("menutitle");
            numberOfBuilds = $(this).attr("numbuilds");
            txtTop = $(this).attr("txtTop");
            txtLeft = $(this).attr("txtLeft");
            remediation = $(this).attr("remediation");
            headPhoneIcon = $(this).attr("headphoneIcon");
            questionType = $(this).attr("quesType");

            if (frameTempType == 8)//determine if there is an intro slide/////////////////
            {
                boolHasIntroSlide = true;
            }

            if (frameTempType == 0)//determine if there is an information slide/////////////////
            {
                boolHasInformationSlide = true;
            }

            //// Count the final review questions
            if ((segmentType == 3) && (frameID.indexOf("t") < 0) && (frameTempType == 2))
            {
                totalQuestionCount++;
            }

            txtWidth = $(this).attr("txtWidth");
            if (txtWidth > 984)
            {
                txtWidth = 984;
            }

            classLevel = $(this).attr("classlevel");//find the classification level of the frame/////////////////

            //get the column location info////////////////
            colLeft = $(this).attr("colLeft");
            colTop = $(this).attr("colTop");

            if (frameID.indexOf("t") >= 0)///////frameID with a t designates an ACES generated topics type slide///////////////
            {
                colWidth = 0;
            }
            else
            {
                colWidth = $(this).attr("colWidth");
            }

            frameText = CreateFrameTextObject($(this));///////////////fills the text array with the frame text, enables showing the proper formatting for each build//////////////
            columnsArray = CreateColumnText($(this));///////////////fills the column array with the column text, enables showing the proper columns for each build//////////////
            frameMedia = CreateMediaObject($(this));///////////////fills the media array with the media, enables showing the proper media for each build//////////////
            hotspotArray = CreateHotSpotObject($(this), false);///////////////fills the hotspot array with the hotspot info, enables showing the proper hotspots for each build//////////////
            highlightArray = CreateHighlightObject($(this), false);///////////////fills the highlight array with the highlight info, enables showing the proper highlights for each build//////////////

            try
            {
                if ($(this).find('negFeedback').text().length > 0)////if negFeedback found the frame is a question////////////////////////
                {
                    template = "question";

                    var strDistractors = $(this).find('distractors');
                    var oSerializer = new XMLSerializer();
                    var xmlString = oSerializer.serializeToString(strDistractors[0]);

                    //questionInfo = CreateQuestionObject($(this));
                    ////////fills the questions array/////////////////
                    negFeedback = $(this).find('negFeedback').text();
                    posFeedback = $(this).find('posFeedback').text();
                    randomize = $(this).find('distractors').attr('randomize');

                    questionInfo = CreateDistractors(negFeedback, posFeedback, randomize, xmlString);
                }
                else
                {
                    template = $(this).attr('template');/////set template with frame template info from the xml///////////////
                }
            }
            catch (e)
            {
                template = $(this).attr('template');/////set template with frame template info from the xml if check for negFeedback fails///////////////
            }

            //// Check for remediation media
            var remMediaArray = [];
            try
            {
                if ($(this).find('remMedia').attr('value').length > 0)////////////check for remediation media if found put info into remediation media array/////////////////
                {
                    var title = $(this).find('remMedia').attr('value');
                    var y = $(this).find('remMedia').attr('y');
                    var x = $(this).find('remMedia').attr('x');

                    remMediaArray.push({ mediaTitle: title, mediaY: y, mediaX: x });
                }
            }
            catch (e)
            {
                remMediaArray.push({ mediaTitle: "", mediaY: "", mediaX: "" });///if check for remediation media fails insert blank info into remediation media array/////////////
            }

            //Set up new array if there are any extra remediation frames
            if (remediation > 0)
            {
                strFrameType = "ExtraRemediation";
                extraRemediationFrameArray = SetUpExtraRemediation($(this));//////////////gets extra remediation info and puts it into the extraRemediationFrameArray/////////////////////
                strFrameType = "RegularFrame";
            }

            /////put all frame info into the frames array////////////////////////////////////////
            frames.push({
                title: frameTitle, fullNav: fullNav, displayNum: framNum, attachment: attachment, remAttachment: remAttachment, remediation: remediation,
                hotSpotsArray: hotspotArray, highlightArray: highlightArray, remMediaArray: remMediaArray, tempType: frameTempType,
                textArray: frameText, mediaArray: frameMedia, menuTitle: menuTitle, frameID: frameID, topicTitle: topicTitle, topicID: topicID, topicType: topicType,
                topicRandom: topicRandom, segmentTitle: segmentTitle, segmentID: segmentID, segmentType: segmentType, segmentRandom: segmentRandom, numberOfBuilds: numberOfBuilds,
                questionType: questionType, questionArray: questionInfo, template: template, textTop: txtTop, textLeft: txtLeft,
                textHeight: txtHeight, textWidth: txtWidth, classificationLevel: classLevel, columnLeft: colLeft, columnTop: colTop,
                columnWidth: colWidth, columnsArray: columnsArray, headPhoneIcon: headPhoneIcon, extraRemediationFrameArray: extraRemediationFrameArray, forms: forms
            });

            //// Pass total frames length to the progress bar
            max = frames.length;
            progressbar.max = max;
        }
    });


    // alert("topicRandomizeArray.length = " + topicRandomizeArray.length);

    ///////////randomize questions inside topics marked for randomization only////////////////////////
    if (topicRandomizeArray.length > 0)
    {
        for (b = 0; b < topicRandomizeArray.length; b++)
        {
            var topicID = topicRandomizeArray[b];
            //alert("topicID = " + topicRandomizeArray[b]);
            RandomizeQuestionsByTopic(topicID);
        }
    }

    //////////////////randomize the topics inside the segment//////////////////////////////////
    if (segmentRandomizeArray.length > 1)
    {
        RandomizeTopics(segmentRandomizeArray);
    }

    //////////////Set question titles in case they have been randomized/////////////
    if (lessonType == "exam")
    {
        if (!developer)
        {
            SetQuestionTitle();

            if (boolHasIntroSlide)
            {
                PutIntroSlidesFirst();
            }

            if (boolHasInformationSlide)//if there are information slides, move them to the front of the topic but behind Intro slides
            {
                MoveInformationSlides();
            }
            $("a.glossaryBtn").prop("disabled", true).attr('style', 'background-position: -53px -72px');
        }
        else
        {
            CreateTimerDisplay();

            $("#examTimer").html("00:00:00");
        }
    }

    //check for web launch
    if (sourceLocation == "dlpStart")
    {
        lessonTitle = QueryStringLessonName();
        userCACID = QueryStringCacID();
        tools = QueryStringSetToolsList();
        if (typeof tools !== typeof undefined && tools.length > 0)
        {
            myTool = $.map(tools.replace(/_/g, " ").split(","), $.trim);
        }
        //lessonLoc = "10";
        if (lessonType == "cbt")
        {
            getWebBookmarks();//get web
        }
    }
    else if (!developer)
    {
        if (lessonType == "cbt")
        {
            SetBookmark();
        }
    }
    MenuSection($xml);
    
    if (lessonType == "exam")
    {
        SetUpCritiques($xml);
        $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');
    }

    SetupQuestionsArray();
}

function SetupQuestionsArray()
{    
    for(var i = 0; i < frames.length; i++)
    {
        var segmentType = frames[i].segmentType;
        var frameID = frames[i].frameID;
        var frameTempType = frames[i].tempType;

        if ((segmentType == 3) && (frameID.indexOf("t") < 0) && (frameTempType == 2))
        {
            allQuestionsArray.push(i);
        }
    }
}

function SetUpCritiques($xml)
{
    //var questionArray = [];
    var questionTitle = "";
    var questionText = "";

    //critiquesArray
    $xml.find("critiqueTopic").each(function ()
    {
        var critiqueTitle = "";
        var critiqueSyllabus = "";
        critiqueTitle = $(this).find("critiqueTitle").text();
        critiqueSyllabus = $(this).find("critiqueSyllabus").text();

        $(this).find("Question").each(function ()
        {
            questionTitle = $(this).find("questionTitle").text();
            questionText = $(this).find("questionText").text();
            critiquesArray.push({ critiqueTitle: critiqueTitle, critiqueSyllabus: critiqueSyllabus, questionTitle: questionTitle, questionText: questionText, endCBTTime: endCBTTime, aircraft: aircraft, course: course, strBase: strBase, strClassID: strClassID, critiqueStudentName: critiqueStudentName, critiqueRating: 0, critiqueComment: ""});
        });
    });

}

function SetQuestionTitle()
{
    var questionCounter = 0;
    for(var i = 0; i < frames.length; i++)
    {
       // alert("frameTitle = " + frames[i].title + "\ntempType = " + frames[i].tempType);

        if(frames[i].tempType == 2)
        {
            questionCounter++;
            var frameTitle = frames[i].title + " " + questionCounter;
            frames[i].title = frameTitle;
            var menuTitle = frames[i].menuTitle + " " + questionCounter;
            frames[i].menuTitle = menuTitle;
        }     
    }
}

function MoveInformationSlides()
{    
    var tempInfoSlideArray = [];

    for(var i = 0; i < frames.length; i++)//find all information slides
    {
        if (frames[i].tempType == 0)
        {
            tempInfoSlideArray.push(frames[i]);//put info slide into temp array
        }
    }
    var boolContinueChecking = true;
    while (boolContinueChecking)
    {
        for (var i = 0; i < frames.length; i++)//find all information slides
        {
            if (frames[i].tempType == 0)
            {
                frames.splice(i, 1);//remove info slide from frames array
                boolContinueChecking = true;
                break;
            }
            boolContinueChecking = false;
        }
    }
    
    for(var i = 0; i < tempInfoSlideArray.length; i++)
    {
        var currentTopicID = tempInfoSlideArray[i].topicID;    

        for(var frameCount = 0; frameCount < frames.length; frameCount++)
        {
            if(frames[frameCount].tempType == 2)
            {
                if(currentTopicID == frames[frameCount].topicID)//find first question in topic
                {
                    frames.splice(frameCount, 0, tempInfoSlideArray[i]);//insert info slide before the first question
                    break;
                }
            }
        }
    }

}

function PutIntroSlidesFirst()
{
    var tempIntroSlideArray = [];
    var tempQuestionArray = [];

    for (var i = 0; i < frames.length; i++)
    {
        if (frames[i].tempType == 8)
        {
            tempIntroSlideArray.push(frames[i]);
        }
        else
        {
            tempQuestionArray.push(frames[i]);
        }
    }

    frames = tempIntroSlideArray.concat(tempQuestionArray);
}

function RandomizeTopics(pSegmentRandomizeArray)
{
    var tempIndexArray = [];
    var tempIndex;
    var tempFramesArray = [];

    for (var i = 0; i < pSegmentRandomizeArray.length; i++)
    {
        var boolInArray = true;

        while (boolInArray)
        {
            tempIndex = RandomGenerator(0, pSegmentRandomizeArray.length);//generate random index to randomize the questions///////////

            if (jQuery.inArray(tempIndex, tempIndexArray) == -1)//////ensures the index hasn't been used yet then puts it into the tempIndexArray///////////////
            {
                tempIndexArray.push(tempIndex);
                boolInArray = false;
            }
            else//////the index has been used already 
            {
                boolInArray = true;
            }
        }
    }

    for(var indexCount = 0; indexCount < tempIndexArray.length; indexCount++)
    {
        var selectedTopicID = pSegmentRandomizeArray[tempIndexArray[indexCount]];

        for(var framesCount = 0; framesCount < frames.length; framesCount++)
        {
            if (frames[framesCount].topicID == selectedTopicID)
            {
                tempFramesArray.push(frames[framesCount]);
            }
        }
    }

    ///////////put the scoreme frame last ////////////////////
    tempFramesArray.push(frames[frames.length - 1]);

    frames = [];
    frames = tempFramesArray;
}

////////////////////Randomize the questions inside the selected topic////////////////////
function RandomizeQuestionsByTopic(pTopicID)
{
    //alert("pTopicID = " + pTopicID);
    var firstQuestionIndex = 0;
    var lastQuestionIndex = 0;
    var firstQuestion = false;
    var reviewQuestionScoreIndex = 0;
    var tempIndexArray = [];
    var tempFramesArray = [];
    var tempIndex = 0;
    var boolInArray = true;
    var boolReturn = false;

    try
    {
        for(i = 0; i < frames.length; i++)
        {
            if(frames[i].tempType == 2)
            {
                //////check to make the question is in the proper topic//////////////
                if (frames[i].topicID == pTopicID)
                {
                    if (!firstQuestion)
                    {
                        firstQuestionIndex = i;
                        firstQuestion = true;
                    }

                    lastQuestionIndex = i;
                }
            }
            if (frames[i].tempType == 5)
            {
                reviewQuestionScoreIndex = i;
            }
        }

       // alert("firstQuestionIndex = " + firstQuestionIndex + "\nlastQuestionIndex = " + lastQuestionIndex + "\nframes.length = " + frames.length + "\nreviewQuestionScoreIndex = " + reviewQuestionScoreIndex);

        
        for (i = 0; i < frames.length; i++)
        {
            if (i < firstQuestionIndex)
            {
                tempIndexArray.push(i);
                tempFramesArray.push(frames[i]);
            }
            else
            {
                if (i == reviewQuestionScoreIndex)
                {                    
                    //alert("pushed last index");
                    tempIndexArray.push(i);
                    tempFramesArray.push(frames[reviewQuestionScoreIndex]);
                    break;
                    
                }
                if (i > lastQuestionIndex)
                {
                    tempIndexArray.push(i);
                    tempFramesArray.push(frames[i]);
                }
                else
                {
                    var boolInArray = true;

                    while (boolInArray)
                    {
                        tempIndex = RandomGenerator(firstQuestionIndex, lastQuestionIndex + 1);//generate random index to randomize the questions///////////

                          // alert("tempIndex = " + tempIndex);

                        if (jQuery.inArray(tempIndex, tempIndexArray) == -1)//////ensures the index hasn't been used yet then puts it into the tempIndexArray///////////////
                        {
                            tempIndexArray.push(tempIndex);
                            tempFramesArray.push(frames[tempIndex]);
                            boolInArray = false;
                        }
                        else//////the index has been used already 
                        {
                            boolInArray = true;
                        }
                    }
                }
            }
        }
    }
    catch(err)
    {
        alert("err = " + err.toString());
    }

    frames = [];
    frames = tempFramesArray;

    //alert("frames.length = " + frames.length);
    //for(c = 0; c < frames.length; c++)
    //{
    //    alert("frame title = " + frames[c].title);
    //}    
}

function ExamTimer()
{
    boolExamStarted = true;
    var displayHours;
    var displayMinutes;
    var displaySeconds;

    //set the time we are counting down to
    var examEndTime = new Date().getTime() + (maxTimeAllowed * 60 * 60 * 1000);  //current time + maxTimeAllowed converted
    //var examEndTime = new Date().getTime() + (2 * 60 * 1000);////////////////Testing only////////////////////////

    CreateTimerDisplay();

    //update the counter every second
    examTimerInterval = setInterval(function ()
    {
        //get current time
        var now = new Date().getTime();

        //find the difference
        var timeLeft = examEndTime - now;

        //Time calculations for hours, minutes and seconds
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        var minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        if (hours < 10)
        {
            displayHours = "0" + hours;
        }
        else
        {
            displayHours = hours;
        }

        if (minutes < 10)
        {
            displayMinutes = "0" + minutes;
        }
        else
        {
            displayMinutes = minutes;
        }

        if (seconds < 10)
        {
            displaySeconds = "0" + seconds;
        }
        else
        {
            displaySeconds = seconds;
        }

        $("#examTimer").html(displayHours + ":" + displayMinutes + ":" + displaySeconds);

        //////////////////if timeLeft < 1 minute add the class .examTimeCaution to the div displaying the timer///////////////
        if ((minutesLeft < 1)&&(displayHours == "00"))
        {
            //////////////////////change to yellow with new class//////////////////////////////////////
            $("#examTimer").addClass("examTimeCaution");
        }

        //if examTime expired
        if(timeLeft < 0)
        {
            KillExamTimer();
        }
    }, 1000);
}

function CreateTimerDisplay()
{    
    if (lessonType == "exam")
    {
        $("<span />", {  //// Create a examTimer span tag
            "id": "examTimeInfo",
            "class": "examTimeInfo"
        }).appendTo("#ExamTimer");

        $("#examTimeInfo").html("Exam Time Remaining ");
        $("<span />", {  //// Create a examTimer span tag
            "id": "examTimer",
            "class": "examTime"
        }).appendTo("#examTimeInfo");
    }
}

function KillExamTimer()
{
    clearInterval(examTimerInterval);
    //////////////////////Call score frame with results/////////////////////////////////////
    $("#examTimeInfo").remove();
    //////////////Get the end of the CBT time/////////////////
    endCBTTime = GetCBTTime("End");
    ClearAllItems();
    ShowScore();
}


function MenuSection($xml) {

    //// Build Menu Section
    $("<div />", { // Append container div to nav element
        "class": "mp-level"
    }).html(
           $("<h2 />", { // segments header
               //"text": "Segments"
               "class": "icon icon-stack",
               "html": "<span class='breadcrumb'>" + $xml.find('title').attr('value') + "</span>"
           })).appendTo("nav#mp-menu");

    var $ul = $("<ul />", { // Main UL container
        "class": "level-one"
    }).appendTo("div.mp-level:first-child");

    
    //// Options Menu    
    var $optionsList = $ul.append($("<li />", { // Options Menu Item
        "class": "icon icon-arrow-left",
        "id": "20"
    }).html($("<a />", {
        "href": "#",
        "html": "Options"
    })).append($("<div />", { //// Create mp-level div element
        "class": "mp-level"
    }).html($("<h2 />", { //// Create the menu header
        "class": "icon icon-key",
        "html": "Options"
    })).append($("<a />", { //// Create and append back link
        "class": "mp-back",
        "href": "#",
        "title": "Back",
        "html": "back"
    })).append($("<ul />", { // Main UL container
        "id": "options",
        "class": "options-list"
    }))));

    if (lessonType !== "exam")/////No Comments allowed in exams////////////
    {

        //// Comments list item
        $("<li />", { //// Create li for each option item
            "class": "icon"
        }).html($("<a />", { //// Create anchor element
            "href": "#", //// Link to tool
            "class": "toollink",
            "title": "Add Comment", //// Menu title on hover
            "html": "Add Comment" //// Anchor text
        })).appendTo("ul#options");
    }

    if (supplementInfo.length > 0)
    {
        //// Comments list item
        $("<li />", { //// Create li for each option item
            "class": "icon"
        }).html($("<a />", { //// Create anchor element
            "href": "#", //// Link to tool
            "class": "toollink",
            "title": supplementInfo[0].title,//.title, //// Menu title on hover
            "html": supplementInfo[0].title//"supplementInfo"//// Anchor text
        })).appendTo("ul#options");
    }

    ////////////////////////////Put supplement info here///////////////////////////////////////////////////////

    if (typeof tools !== typeof undefined && tools.length > 0) { //// If tools exits create li element 
        //// Tools list items
        $.each(myTool, function (index, tool) {
            $("<li />", { //// Create li for each option item
                "class": "icon"
            }).html($("<a />", { //// Create anchor element
                "href": "#", //// Link to tool
                "class": "toollink",
                "title": tool, //// Menu title on hover
                "html": tool //// Anchor text for tool
            })).appendTo("ul#options");
        });
    }
    //// End Options menu

    if (lessonType !== "exam")
    {
        //// Find Segments
        $($xml).find("segment").each(function (index)
        {
            if ($(this).children().length)
            {
                if ($(this).attr("type") == "1")
                {
                    return;
                }
                    var $ulTopics = $("<ul />", { //// Create a topics UL container for each segment
                        "class": "topics"

                });

                //// Topics for each segment set up list elements
                    $(this).children().each(function (index)
                    {
                        if ($(this).attr("type") == "ScoreMe") {
                            return;
                        }
                        var $ulFrames = $("<ul />", { //// Create a frames UL container for each topic
                            "id": "ulframes",
                            "class": "frames"
                        });

                        $("<li />", { //// Create li for each topic
                            "class": "icon icon-arrow-left"
                        }).html(
                        $("<a />", { //// Create anchor element
                            "href": "#",
                            "title": $(this).attr("title"),
                            "text": $(this).attr("title") //// Anchor text for topics
                        })).appendTo($ulTopics).append(
                        $("<div />", { //// Create mp-level div element
                            "class": "mp-level"
                        }).html(
                        $("<h2 />", { //// Create the frames header
                            "class": "icon icon-key",
                            //"html": "Frames"
                            "html": "<span class='breadcrumb'>" + $(this).parent().attr("title") + " &rarr; " + $(this).attr("title") + "</span>"
                        })).append(
                        $("<a />", { //// Create and append back link
                            "class": "mp-back",
                            "href": "#",
                            "title": "Back",
                            "text": "back"
                        })).append($ulFrames));

                        ////  Frames for each topic to set up list elements
                        $(this).children().filter(function () {  //// Filter function
                            //return (($(this).parents().attr("type") != "3" && $(this).attr("tempType") != "3" && $(this).attr("tempType") != "4") || ($(this).attr("id").indexOf("t") >= 0));
                            return (($(this).parents().attr("type") != "3") || ($(this).attr("id").indexOf("t") >= 0));
                        }).each(function (findex) {

                            if ($(this).attr("tempType") != "3" && $(this).attr("tempType") != "4") {
                                $("<li />", { //// Create li for each frame
                                    "class": "icon"
                                }).html(
                            $("<a />", { //// Create anchor element
                                "href": "#",
                                "class": "cbtlink",
                                "title": $(this).attr("menutitle"), //// Menu title on hover
                                "html": $(this).attr("menutitle")
                            })).appendTo($ulFrames);
                            }
                            else //hide hidden frames and hidden builds
                            {
                                $("<li />", { //// Create li for each frame
                                    "class": "distractorRemHide"
                                }).html(
                            $("<a />", { //// Create anchor element
                                "href": "#",
                                "class": "distractorRemHide",
                                "title": $(this).attr("menutitle"), //// Menu title on hover
                                "html": $(this).attr("menutitle")
                            })).appendTo($ulFrames);
                            }/////////end remove questions and hidden frames and builds
                        });
                    });

                //// Segments set up list elements
                $ul.append($("<li />", { //// Create li for each segment
                    "class": "icon icon-arrow-left",
                    "id": 'segment-' + $(this).attr("id")
                }).html(
                    $("<a />", { //// Create anchor element
                        "href": "#",
                        "title": $(this).attr("title"),
                        "text": $(this).attr("title") // Anchor text for segments
                    })).append($("<div />", { // Append container div
                        "class": "mp-level"
                    }).html(
                    $("<h2 />", { // topics header
                        "class": "icon icon-params",
                        //"text": "Topics"
                        "html": "<span class='breadcrumb'>" + $(this).attr("title") + "</span>"
                    })).append(
                    $("<a />", { // Append back link
                        "class": "mp-back",
                        "href": "#",
                        "title": "Back",
                        "text": "back"
                    })).append($ulTopics)));
            }
                //// If no topics or frames to display
            else $ul.append($("<li />", { //// Create li
                "class": "icon icon-arrow-left",
                "id": $(this).attr("id")
            }).html(
                $("<a />", {
                    "href": "#",
                    "text": $(this).attr("title")
                })));
        });//////////////////end of non exam menu section////////////////////////
    }
    else
    {
        //// Find Segments
        //$($xml).find("segment").each(function (index)
        var $ulFrames = $("<ul />", { //// Create a frames UL container for each topic
            "id": "ulframes",
            "class": "frames"
        });
        for (var i = 0; i < frames.length - 1; i++)
        {
            //if ($(this).children().length)
            //{
            //var $ulTopics = $("<ul />", { //// Create a topics UL container for each segment
            //    "class": "topics"//"topics"
            //});
            

            //// Topics for each segment set up list elements
            //$(this).children().each(function (index)
            //{
            if (frames[i].topicType !== "ScoreMe")
            {
                // $(this).children().each(function (findex)//finding questions
                //{
                var menuTitle = frames[i].menuTitle;
                var questionID = frames[i].frameID;

                if (!devText)
                {
                    $("<li />", { //// Create li for each frame
                        "class": "icon"
                    }).html(
                $("<a />", { //// Create anchor element
                    "href": "#",
                    "class": "cbtlink",
                    "title": menuTitle, //// Menu title on hover
                    "html": menuTitle
                })).appendTo($ulFrames);
                }
                else
                {
                    $("<li />", { //// Create li for each frame
                        "class": "icon"
                    }).html(
                $("<a />", { //// Create anchor element
                    "href": "#",
                    "class": "cbtlink",
                    "title": menuTitle + " [" + questionID + "]", //// Menu title on hover
                    "html": menuTitle + " [" + questionID + "]"
                })).appendTo($ulFrames);
                }
                // });
            }
        }
        var segID = frames[0].segmentID;
        var segTitle = frames[0].segmentTitle;

            //});
            //// Segments set up list elements
            $ul.append($("<li />", { //// Create li for each segment
                "class": "icon icon-arrow-left",
                "id": segID //$(this).attr("id")
            }).html(
                $("<a />", { //// Create anchor element
                    "href": "#",
                    "title": segTitle, //$(this).attr("title"),
                    "text": segTitle//$(this).attr("title") // Anchor text for segments
                })).append($("<div />", { // Append container div
                    "class": "mp-level"
                }).html(
                $("<h2 />", { // topics header
                    "class": "icon icon-params",
                    //"text": "Topics"
                    "html": "<span class='breadcrumb'>" + segTitle + "</span>" //$(this).attr("title") + "</span>"
                })).append(
                $("<a />", { // Append back link
                    "class": "mp-back",
                    "href": "#",
                    "title": "Back",
                    "text": "back"
                })).append($ulFrames)));
            
            //// If no topics or frames to display
            //else             
        

            //$ul.append($("<li />", { //// Create li
            //    "class": "icon icon-arrow-left",
            //    "id": segID //$(this).attr("id")
            //}).html(
            //        $("<a />", {
            //            "href": "#",
            //            "text": segTitle //$(this).attr("title")
            //        })));
        
    }//////////////////end of exam menu section////////////////////////

    //// DOM is loaded move to next callBack

    //// Create a deferred object to load menu scripts as DOM must be present
    var loadPushMenu = $.Deferred();
    loadPushMenu.resolve(new mlPushMenu(document.getElementById('mp-menu'),
            document.getElementById('trigger'), {
                type: 'cover'
            }));
    document.addEventListener("mlpmopen", function () {
    }, false);
    document.addEventListener("mlpmclose", function () {
    }, false);

    //// END Menu
    $("span#frameNo").html(currentFrameIndex).css({ color: "#000" });
    //// Access all lesson_data child elements, attributes
    $('lesson_data', $xml).each(function (i, data2) {
        //// Lesson Title
        lessonIdentifier = $(this).find("lessonIdentifier").attr("value");
        document.title = "CBT - " + lessonIdentifier.split("CBT")[0].replace(/_/g, " ");

        //// Splash Image
        splashImage = $(this).find("splashScreen").attr("value");
        lessonTitle = $(this).find("title").attr("value");       

        if (typeof splashImage !== typeof undefined && currentFrameIndex == -1) {
            $("<div id='splash' />", { // Create <div>
            }).html('<img class="splashImage" title="' + lessonTitle + '" alt="' + lessonTitle + '" src="' + mediaPath + "/" + lessonIdentifier + "_media/" + splashImage + '">')
            .appendTo("#wrapper"); // Append div to media

            $("#frameTitle").html(lessonTitle), $("#titleBar").addClass("introTitle"),
            $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
            if ((totalQuestionCount === 0) && (lessonType === "exam")) {
                strMoveForwardType = "ShowCritiques";
            }
        }
        else
        {
            developer = true;
            ViewSpecificFrame(0);
        }

        //// Get Version Info
        acesVersion = $(this).find("acesVer").attr("value");
        lessonRevision = $(this).find("lessonRevision").attr("value");
        //var currentFrameID = frames[currentFrameIndex].frameID;
       // $("#version").html("<p>Editor Version: " + acesVersion + "</p>" + "<p>Lesson Revision: " + lessonRevision + "</p>" + "<p>Wrapper Version: " + wrapperVersion + "</p>" );
        pagecount.html("Lesson Revision: " + lessonRevision + "");

        //// Display STINFO Modal
        var attrStinfo = $(this).find("stinfo").attr("show");
        var stinfo = $(this).find("stinfo").text();
        $("#stinfo").append(stinfo);

        //alert("strAskClassID = " + strAskClassID);
        if (strAskClassID != "false")
        {
            //// Check for the Registration dialog "isOpen"
            var locationDialog = $("#baseSelectionDialog").dialog("isOpen");

            //// Open the Registration dialog if "&register" is passed in the URL and get the bases
            if (window.location.search.indexOf("&register") > -1)
            {

            $('#baseSelectionDialog').dialog('open');
            ddlBaseSelect.empty().append($("<option />", { //// Create option tag
                //"selected": "selected",
                "value": -1
            }).html("--Select Your Base--"));

                $("base", $xml).each(function ()
                {
                    baseCode = $(this).attr("code");
                    baseName = $(this).attr("name");

                    ddlBaseSelect.append($("<option />", { //// Create option tag
                        "value": baseCode
                    }).html(baseName));
            });
                //// Pass the Base value to any object on change
                ddlBaseSelect.on('change', function (e)
                {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    var textSelected = optionSelected.text();
                });
                if (strBase.length == 4)
                {
                    ddlBaseSelect.val(strBase);
                }
                if (strClassID.length > 1)
                {
                    var aryClassID = strClassID.split('-');
                    studentClassIdOne.val(aryClassID[0]);
                    studentClassIdTwo.val(aryClassID[1]);
                }
            }
        }

        //// Open the STINFO dialog if set to "True" and no student class id and base selection is requested 
        if (typeof attrStinfo !== typeof undefined && attrStinfo !== "False") {
            $('#stinfoDialog').dialog('open');
        }

        if (typeof attrStinfo !== typeof undefined && attrStinfo !== "True" && window.location.search !== "?register") {
            //initToolTips();
        }
    });

    var commentSuppLocation = 0;

    if (lessonType !== "exam")
    {
        //// Options menu "Comments and Tools" events
        var commentsObj = $("ul.options-list li a").eq(0);
        commentsObj.on({
            mouseenter: function ()
            {
                $("#frameMessage").html($(this).text());
            },
            mouseleave: function ()
            {
                $("#frameMessage").empty();
            },
            click: function ()
            {
                $('#commentsDialog').dialog('open');
            }
        });
        commentSuppLocation++;
    }
    if (supplementInfo.length > 0)
    {
        var supplementsObj = $("ul.options-list li a").eq(commentSuppLocation);
        //var supplementsObj = $("ul.options-list li a").slice(1);
        supplementsObj.on({
            mouseenter: function ()
            {
                $("#frameMessage").html($(this).text());
            },
            mouseleave: function ()
            {
                $("#frameMessage").empty();
            },
            click: function ()
            {
                var suppLink = mediaPath + "/" + lessonIdentifier + "_media/" + supplementInfo[0].link;
                OpenSupplement(suppLink);
            }
        });
        commentSuppLocation++;
    }

    //toolObj = $("ul.options-list li a").slice(1);

    toolObj = $("ul.options-list li a").slice(commentSuppLocation);
    toolObj.each(function (toolIndex) {
        $(this).on({
            mouseenter: function () {
                $("#frameMessage").html($(this).text());
            },
            mouseleave: function () {
                $("#frameMessage").empty();
            },
            click: function () {
                RunTools(toolIndex);
                return toolIndex;
            }
        });
    });

    //// Main Menu
    menuObj = [];
    $("ul.frames li").each(function (findex) {
        var frameli = $(this);
        frameli.children("a");
        var strElemName = frameli.children("a").text();
        var media = $("#media div").length,
        siblings = $(this).siblings('li').andSelf(),
        groupTotal = siblings.length,
        currentIndex = findex,
        pageIndex = $(this).index() + 1;

        menuitem = {};
        menuitem["page"] = pageIndex;
        menuitem["group"] = groupTotal;
        menuitem["frame"] = currentIndex;
        menuObj.push(menuitem);
        var frame = $(this);
        if (typeof fullNav !== typeof undefined && fullNav !== '1' && findex > bookmark) {
            frame.addClass('inactive');
            if (!(frame.parents().prop('className').indexOf('currentIndexParent') > -1)) {
                frame.parents().eq(2).addClass('inactiveParent');//topic title
                frame.parents().eq(5).addClass('inactiveParent');//segment title
            }
        }
        else {
            frame.addClass('active');
        }
        if (findex == bookmark) {
            frame.removeClass('active').addClass('currentIndex');
            frame.parents().addClass('currentIndexParent');
        }

        $(this).on({
            mouseenter: function () {
	    
                $("#frameMessage").html($(this).text());
            },
            mouseleave: function () {
                $("#frameMessage").empty();
            },
            click: function (e, myEvent) {
                $("#trigger").get(0).click();
                if (bookmark < findex && $xml.find('fullNavigation').attr('value') == 0) {
                    return false;
                }
                else
                {
                    currentIndex = CheckForHiddenFrames(currentIndex);
                    ViewSpecificFrame(currentIndex);
                    progressbar.value = currentIndex;
                    value = progressbar.value;
                    progressBarCbt();
                    getPageCount();
                    EnableBackButton();
                    return true;
                }
            }
        });
        if (developer)
        {
            DisableNavigationBtns();
        }
        return menuObj;
    });

    reviewQuestionObj = []; //// Populate "<span id="pageCount" class="message"></span>" with correct title
    $($xml).find("topic").children().filter(function () {  //// Filter function
        return (($(this).parents().attr("type") == "3" && $(this).attr("tempType") == "2"));
    }).each(function (index) {
        questionitem = {};
        reviewQuestionObj.push(questionitem);
        //console.log(JSON.stringify(questionitem))
        return reviewQuestionObj;
    });

    if (lessonType !== "exam")
    {
        //// Get the start of the CBT time
        beginCBTTime = GetCBTTime("Start");
    }
}

function OpenSupplement(link)
{
    ReportToWrapper(link, "extLink");
}

function  CheckForHiddenFrames(pCurrentIndex)
{
    for(pCurrentIndex; pCurrentIndex < frames.length; pCurrentIndex++)
    {
        if ((frames[pCurrentIndex].tempType == 3) || (frames[pCurrentIndex].tempType == 4))
        {
            continue;
        }
        else
        {
            return pCurrentIndex;
        }
    }
}

///////////converts the color from the xml to a usable form///////////////////////////////////
function ConvertColor(PColor)
{
    var colorArray = [];
    
    if (typeof PColor !== typeof undefined)
    {
        colorArray = PColor.split('x');
    
        var convertedColor = "#" + colorArray[1];
    }
    else
    {
        convertedColor = "#FF0000";
    }
    return convertedColor;
}

///////////////fills the highlight array with the highlight info, enables showing the proper highlights for each build//////////////
function CreateHighlightObject(frameXML, boolRemediation) {
    var highlightID = 0;
    var bldNumber = 0;
    var type = "";
    var x1 = "";
    var y1 = "";
    var x2 = "";
    var y2 = "";
    var hText = "";
    var color = "";
    var hightlights = [];
    var searchTerm = "";

    if (boolRemediation)
    {
        searchTerm = "remhighlights";
    }
    else
    {
        searchTerm = "highlights";
    }    

    try {
        //find highlights if they exist
        if ($(frameXML).find(searchTerm).length > 0)
        {
            frameXML.find(searchTerm).each(function ()
            {
                highlightID = $(this).attr('highlightID');
                bldNumber = $(this).attr('bldnum');
                type = $(this).attr('type');
                x1 = $(this).attr('x1');
                y1 = $(this).attr('y1');
                x2 = $(this).attr('x2');
                y2 = $(this).attr('y2');
                hText = $(this).attr('htext');
                color = $(this).attr('colorType');                

                //////////insert highlight info into highlight array///////////////////////////////
                hightlights.push({ highlightID: highlightID, bldNumber: bldNumber, type: type, x1: x1, y1: y1, x2: x2, y2: y2, hText: hText, color: color });
            });
        }
        else {
            //no highlights, push empty array
            hightlights.push({ highlightID: highlightID, bldNumber: bldNumber, type: type, x1: x1, y1: y1, x2: x2, y2: y2, hText: hText, color: color });
        }
        
    }
    catch (e) {
        //push empty array if fails because there are no hightlights
        hightlights.push({ highlightID: highlightID, bldNumber: bldNumber, type: type, x1: x1, y1: y1, x2: x2, y2: y2, hText: hText, color: color });
    }

    return hightlights;

}

//// Fills the hotspot array with the hotspot info, enables showing the proper hotspots for each build
function CreateHotSpotObject(frameXML, boolRemediation)
{
    //hotSpotID, bldNum, actionType, activateOn, action, displayType, left, top, width, height, mediaX, mediaY, textWidth, textHeight, dropShadow

    var hotSpotID = 0;
    var bldNumber = 0;
    var actionType = "";
    var activateOn = "";
    var action = "";
    var displayType = "";
    var left = 0;
    var top = 0;
    var width = 0;
    var height = 0;
    var mediaX = 0;
    var mediaY = 0;
    var textWidth = 0;
    var textHeight = 0;
    var dropShadow = 0;
    var hotSpots = [];
    var searchTerm = "";

    if (boolRemediation)
    {
        searchTerm = "remhotspot";
    }
    else
    {
        searchTerm = "hotspot";
    }

    try
    {        
        //find hotspot if it exists
        if ($(frameXML).find(searchTerm).length > 0)
        {
            frameXML.find(searchTerm).each(function ()
            {
                hotSpotID = $(this).attr('hotSpotID');
                bldNumber = $(this).attr('bldNum');
                actionType = $(this).attr('actionType');
                activateOn = $(this).attr('activateOn');
                action = $(this).attr('action');
                displayType = $(this).attr('displayType');
                left = $(this).attr('left');
                top = $(this).attr('top');
                width = $(this).attr('width');
                height = $(this).attr('height');
                mediaX = $(this).attr('mediaX');
                mediaY = $(this).attr('mediaY');
                textWidth = $(this).attr('textWidth');
                textHeight = $(this).attr('textHeight');
                dropShadow = $(this).attr('dropShadow');

                hotSpots.push({ hotSpotID: hotSpotID, bldNumber: bldNumber, actionType: actionType, activateOn: activateOn, action: action, displayType: displayType, left: left, top: top, width: width, height: height, mediaX: mediaX, mediaY: mediaY, textWidth: textWidth, textHeight: textHeight, dropShadow: dropShadow });
            });
        }
        else {
            //  alert("no hotspots");
            //no hotspots push empty element
            hotSpots.push({ hotSpotID: hotSpotID, bldNumber: bldNumber, actionType: actionType, activateOn: activateOn, action: action, displayType: displayType, left: left, top: top, width: width, height: height, mediaX: mediaX, mediaY: mediaY, textWidth: textWidth, textHeight: textHeight, dropShadow: dropShadow });
        }
    }
    catch (e) {
        //push empty element if try fails because there is no hotspot
        hotSpots.push({ hotSpotID: hotSpotID, bldNumber: bldNumber, actionType: actionType, activateOn: activateOn, action: action, displayType: displayType, left: left, top: top, width: width, height: height, mediaX: mediaX, mediaY: mediaY, textWidth: textWidth, textHeight: textHeight, dropShadow: dropShadow });
    }

    return hotSpots;
}

//////////////gets extra remediation info and puts it into the extraRemediationFrameArray/////////////////////
function SetUpExtraRemediation(frameXML) {

    var extraRemediationArray = [];
    var remediationMediaArray = [];
    var remFrameText = [];
    var colsText = "";
    var remHighlightsArray = [];
    var remHotSpotsArray = [];

    frameTitle = frameXML.attr("title");

    var remFrame = frameXML.find('remframe');

    frameID = remFrame.attr("id");
    framNum = remFrame.attr("num");
    frameTempType = remFrame.attr("tempType");
    numberOfBuilds = remFrame.attr("numbuilds");
    txtTop = remFrame.attr("txtTop");
    txtLeft = remFrame.attr("txtLeft");
    template = remFrame.attr('template');

    txtHeight = remFrame.attr("txtHeight");
    if (txtHeight > 634) {
        txtHeight = 634;
    }
    txtWidth = remFrame.attr("txtWidth");
    if (txtWidth > 984) {
        txtWidth = 984;
    }

    colWidth = remFrame.attr("colWidth");
    classLevel = remFrame.attr("classlevel");
    colLeft = remFrame.attr("colLeft");
    colTop = remFrame.attr("colTop");

    var headPhoneIcon = remFrame.attr("headphoneIcon");
    //remText by build
    remFrameText = CreateFrameTextObject(frameXML);////////////////////fills the remFrameText array, enables media for the extra remediation frames///////////////

    // remFiles by build
    remediationMediaArray = CreateMediaObject(frameXML);////////////////////fills the remediation media array, enables media for the extra remediation frames///////////////

    colsTextArray = CreateColumnTextRemediation(frameXML, colWidth);////////////////////fills the remediation column text array, enables columns for the extra remediation frames///////////////

    /////////////////////////////////////NEED TO PUT IN REMHIGHLIGHTS AND REMHOTSPOTS/////////////////////////////////////////////////////////////////
    remHighlightsArray = CreateHighlightObject(remFrame, true);

    remHotSpotsArray = CreateHotSpotObject(remFrame, true);

    extraRemediationArray.push({ title: frameTitle, displayNum: framNum, tempType: frameTempType, remTextArray: remFrameText, remediationMediaArray: remediationMediaArray, frameID: frameID, numberOfBuilds: numberOfBuilds, template: template, textTop: txtTop, textLeft: txtLeft, textHeight: txtHeight, textWidth: txtWidth, classificationLevel: classLevel, columnLeft: colLeft, columnTop: colTop, columnWidth: colWidth, columnsArray: colsTextArray, highlightArray: remHighlightsArray, hotSpotsArray: remHotSpotsArray, headPhoneIcon: headPhoneIcon });

    return extraRemediationArray;
}

///////////////fills the column array with the column text, enables showing the proper columns for each build//////////////
function CreateColumnText(frameXML) {
    var columnInfo = [];
    var columnText = "";
    var columnWidth = 0;
    var buildNum = 0;

    
    $frameID = frameXML.attr("id");

    


    try {
        if (frameXML.find('column').text().length > 0)//find columns if any
        {
            
            columnWidth = Number(frameXML.attr('colWidth'));
            frameXML.find('column').each(function ()
            {
                //alert("in column each");
                if (typeof ($(this).parent('remframe').attr('title')) === typeof undefined)//Prevents remframe columns from being added
                {

                    $parentID = $(this).parent().attr("id");

                    if ($frameID == $parentID)
                    {

                        columnText = $(this).text();
                        buildNum = $(this).attr('bldNum');

                        columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//put column info into the array

                    }
                    else
                    {
                        columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//put empty information into array because column belongs to remframe
                    }
                }

            });
            

        }
        else
        {
            columnText = "";
            columnWidth = 0;
            buildNum = 0;
            columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//put empty information into array because there isn't a column
        }

        return columnInfo;
    }
    catch (e) {
        columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//if fails put empty information into array because there isn't a column
    }
    return columnInfo;
}

////////////////////fills the remediation column text array, enables columns for the extra remediation frames///////////////
function CreateColumnTextRemediation(frameXML, columnWidth)
{
    var columnInfo = [];
    var columnText = "";
    var buildNum = 0;
    var xmlSource = "";

    xmlSource = frameXML.find('remframe');

    try {
        if (xmlSource.find('column').attr('bldNum').length > 0) {
            xmlSource.find('column').each(function ()//find column info for remediation frames
            {
                columnText = $(this).text();
                buildNum = $(this).attr('bldNum');

                columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//put column info into the array

            });

        }
        else {
            columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//put empty information into array because there isn't a column
        }

        return columnInfo;
    }
    catch (e) {
        columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });//if fails put empty information into array because there isn't a column
    }
    return columnInfo;
}

////////fills the questions array/////////////////
function CreateQuestionObject(frameXML) {
    var negFeedback = "";
    var posFeedback = "";
    var randomize = 0;
    var questionArray = [];
    var answerArray = [];
    var tempAnswerArray = [];
    tempIndexArray = [];
    alert("CreateQuestionObject(frameXML)");
    ///////get the question info and put it into the questionArray/////////////////////////////////////
    negFeedback = frameXML.find('negFeedback').text();
    posFeedback = frameXML.find('posFeedback').text();
    randomize = frameXML.find('distractors').attr('randomize');
    var min = 0;
    var max = 0;//////number of distractors - used to ensure we only can get up to that number as a random number/////////////


    $distractors = frameXML.find('distractors');
    $distractors.find('answers').each(function ()////gets the distractors information and puts it into the answerArray////////////////////////
    {
        var tempText = $(this).text().replace("<span class='a'>", '');
        tempText = tempText.replace('</span>', '');

        var answerID = $(this).attr('id');
        var correct = $(this).attr('correct');
        var remediation = $(this).attr('remediation');
        var answerText = tempText;
        //alert("TempText = " + tempText);
            tempAnswerArray.push({ answerID: answerID, correct: correct, remediation: remediation, answerText: answerText });
            max++;
    });
    for (i = 0; i < max; i++) {
        var boolInArray = true;
        if (randomize == 1)///////////randomize the distractors//////////////////////////
        {
            while (boolInArray) {
                tempIndex = RandomGenerator(min, max);//generate random index to randomize the distractors with a maximum number of frames[currentFrameIndex].questionArray[0].answerArray.length///////////

                if (jQuery.inArray(tempIndex, tempIndexArray) == -1)//////ensures the index hasn't been used yet then puts it into the tempIndexArray///////////////
                {
                    tempIndexArray.push(tempIndex);
                    boolInArray = false;
                }
                else//////the index has been used already 
                {
                    boolInArray = true;
                }
            }
        }
        else//////////do not randomize the distractors////////////////////////////////
        {
            tempIndex = i;
            tempIndexArray.push(tempIndex);
        }
    }
  //  alert("Max = " + max + "\nTempIndexLength = " + tempIndexArray.length);
    for (i = 0; i < tempIndexArray.length; i++)
    {
        var answerID = tempAnswerArray[tempIndexArray[i]].answerID;
        var correct = tempAnswerArray[tempIndexArray[i]].correct;
        var remediation = tempAnswerArray[tempIndexArray[i]].remediation;
        var answerText = tempAnswerArray[tempIndexArray[i]].answerText;
       // alert("AnswerText = " + answerText);
        answerArray.push({ answerID: answerID, correct: correct, remediation: remediation, answerText: answerText });
    }

    ////put question info and answerArray into the questionArray//////////////////////////////////////////////
    questionArray.push({ negFeedback: negFeedback, posFeedback: posFeedback, randomize: randomize, answerArray: answerArray });

    return questionArray;

}

///Create distractors
function CreateDistractors(pNegFeedbackText, pPosFeedbackText, pRandmize, pStrXMLDistractors) {
    var negFeedback = "";
    var posFeedback = "";
    var randomize = 0;
    var questionArray = [];
    var answerArray = [];
    var tempAnswerArray = [];
    tempIndexArray = [];
    //alert("pStrXMLDistractors\n" + pStrXMLDistractors);
    ///////get the question info and put it into the questionArray/////////////////////////////////////
    negFeedback = pNegFeedbackText;
    posFeedback = pPosFeedbackText;
    randomize = pRandmize;
    var xmlDoc = $.parseXML(pStrXMLDistractors), $xml = $(xmlDoc);
    var min = 0;
    var max = 0;//////number of distractors - used to ensure we only can get up to that number as a random number/////////////
    $distractors = $xml.find('distractors');
    $distractors.find('answers').each(function ()////gets the distractors information and puts it into the answerArray////////////////////////
    {
        var tempText = $(this).text().replace("<span class='a'>", '').replace("<span class='ax'>", '');
        tempText = tempText.replace('</span>', '');

        var answerID = $(this).attr('id');
        var correct = $(this).attr('correct');
        var remediation = $(this).attr('remediation');
        var answerText = tempText;
        //alert("Answer Text = " + answerText + "\nAnswerID = " + answerID);
        //answerArray.push({ answerID: answerID, correct: correct, remediation: remediation, answerText: answerText });
        tempAnswerArray.push({ answerID: answerID, correct: correct, remediation: remediation, answerText: answerText });
        //alert("pStrXMLDistractors\n" + pStrXMLDistractors + "\nAnswer Text = " + answerText + "\nAnswerID = " + answerID);
        max++;
    });

    for (i = 0; i < max; i++) {
        var boolInArray = true;
        if (randomize == 1)///////////randomize the distractors//////////////////////////
        {
            while (boolInArray) {
                tempIndex = RandomGenerator(min, max);//generate random index to randomize the distractors with a maximum number of frames[currentFrameIndex].questionArray[0].answerArray.length///////////

                //if (jQuery.inArray(tempIndex, tempIndexArray) == -1)//////ensures the index hasn't been used yet then puts it into the tempIndexArray///////////////
                if (tempIndexArray.indexOf(tempIndex) == -1) {
                    tempIndexArray.push(tempIndex);
                    boolInArray = false;
                }
                else//////the index has been used already 
                {
                    boolInArray = true;
                }
            }
        }
        else//////////do not randomize the distractors////////////////////////////////
        {
            tempIndex = i;
            tempIndexArray.push(tempIndex);
        }
    }
        //add tempAnswerArray to answerArray
        for(i=0; i< tempIndexArray.length; i++)
        {
            var answerID = tempAnswerArray[tempIndexArray[i]].answerID;
            var correct = tempAnswerArray[tempIndexArray[i]].correct;
            var remediation = tempAnswerArray[tempIndexArray[i]].remediation;
            var answerText = tempAnswerArray[tempIndexArray[i]].answerText;
            answerArray.push({ answerID: answerID, correct: correct, remediation: remediation, answerText: answerText });
        }
    ////put question info and answerArray into the questionArray//////////////////////////////////////////////
    questionArray.push({ negFeedback: negFeedback, posFeedback: posFeedback, randomize: randomize, answerArray: answerArray });

    return questionArray;
}


///////////////fills the media array with the media, enables showing the proper media for each build//////////////
function CreateMediaObject(frameXML) {
    var bldNumber = 0;
    var mediaID = 0;
    var mediaName = "";
    var media_x = 0;
    var media_y = 0;
    var controller = 0;
    var moveNext = 0;
    var autoplay = 0;
    var loop = 0;
    var mediaArray = [];

    var fileType = "";

    if (strFrameType == "RegularFrame") {
        fileType = "files";
    }
    if (strFrameType == "ExtraRemediation") {

        fileType = "remfiles";

    }

    try {
        /////////put in if statement to catch frames that do not have media!!!!!!!!!!!!!!!!////////////////////////////////////
        if (frameXML.find(fileType).attr('media').length > 0) {
            frameXML.find(fileType).each(function () {
                mediaID = $(this).attr('mediaID');
                mediaName = $(this).attr('media');
                bldNumber = $(this).attr('bldnum');
                media_x = $(this).attr('media_x');
                media_y = $(this).attr('media_y');
                controller = $(this).attr('controller');
                moveNext = $(this).attr('movenext');
                autoplay = $(this).attr('autoplay');
                loop = $(this).attr('loop');

                ////////put all media info into mediaArray////////////////////////////////////////////////
                mediaArray.push({ mediaID: mediaID, mediaName: mediaName, bldNumber: bldNumber, media_x: media_x, media_y: media_y, controller: controller, moveNext: moveNext, autoplay: autoplay, loop: loop });

            });
        }
    }
    catch (e) {
        //push empty element if try fails because there is no media in the frame
        mediaArray.push({ mediaID: mediaID, mediaName: mediaName, bldNumber: bldNumber, media_x: media_x, media_y: media_y, controller: controller, moveNext: moveNext, autoplay: autoplay, loop: loop });
    }

    return mediaArray;
}

///////////////fills the text array with the frame text, enables showing the proper formatting for each build//////////////
function CreateFrameTextObject(frameXML) {
    var bldNumber = 0;
    var text = "";
    var textArray = [];

    var fileType = "";

    if (strFrameType == "RegularFrame")////////allows this function to be used for both regular frames and extra remediation frames/////////////////////////////////////
    {
        fileType = "text";
    }
    if (strFrameType == "ExtraRemediation") {
        fileType = "remtext";
    }

    tempType = $(frameXML).attr("tempType");

    frameXML.find(fileType).each(function () {

        bldNumber = $(this).attr('bldnum');
        text = $(this).text();

        if ((lessonType == "exam") && (fileType == "text"))
        {
            if (tempType != 8)
            {
                var SOB = $(this).attr('SOB');
                if (typeof SOB !== typeof undefined)
                {
                    SOB = $(this).attr('SOB');
                }
                else
                {
                    SOB = "";
                }
                var objectiveID = $(this).attr('objectiveId');
                if (typeof objectiveID !== typeof undefined)
                {
                    objectiveID = $(this).attr('objectiveId');
                }
                else
                {
                    objectiveID = "";
                }
                var lessonID = $(this).attr('lessonId');
                if (typeof lessonID !== typeof undefined)
                {
                    lessonID = $(this).attr('lessonId');
                }
                else
                {
                    lessonID = "";
                }


                textArray.push({ bldNumber: bldNumber, text: text, SOB: SOB, objectiveID: objectiveID, lessonID: lessonID });
            }

            else
            {
                textArray.push({ bldNumber: bldNumber, text: text, SOB: "", objectiveID: "", lessonID: "" });
            }
        }
        else
        {
            ////puts the text information into the textArray///////////////////////////
            textArray.push({ bldNumber: bldNumber, text: text });

        }
    });

    return textArray;
}

///////////////clears all items from the page before putting new items up/////////////////////
function ClearAllItems() {
    $("#remediationContainer, .remediationText, .remediationTextextra, .distractorClass, .distractorQuestionAnswered, .answers, .imgAnswerCorrect, .imgAnswerIncorrect, .imgDistractorClicked, #answers, #media, #splash, #text, #frameTitle, #columns, #rolloverHotspotMedia").empty();
    //$(".remediationText, .remediationTextextra, .distractorClass, .distractorQuestionAnswered, .answers, .imgAnswerCorrect, .imgAnswerIncorrect, .imgDistractorClicked, #answers, #media, #splash, #text, #frameTitle, #columns, #rolloverHotspotMedia").empty();
    $(".moveToTop, #remediation, .distractorClass, .distractorQuestionAnswered, .answers, .imgAnswerCorrect, .imgAnswerIncorrect, .imgDistractorClicked").remove();
    $("#remediationContainer, #media, #splash, #text, #columns, #externalLink").hide();
    $("#text").width(940);
    ClearHighlights();
    ClearHotSpots();
}

///////////////called by clicking the forward button////////////////////////////////////////////////
function MoveForward()
{
    /////////////////////////////////////////remove after working on critiques//////////////////////////////////////////////////////
    //currentFrameIndex = frames.length - 1;
    //endCBTTime = GetCBTTime("End");
    //alert("endCBTTime = " + endCBTTime + "\ncurrentFrameIndex being set to the end of the array here at function MoveForward for testing critiques");
    /////////////////////////////////////////end remove//////////////////////////////////////////////////////////////////////////////
    jumpToHiddenFrameID = "";
    switch (strMoveForwardType)///////////determines what function will be called when the forward button is clicked////////////////////////
    {
        case "ScoreTest":
            if (lessonType == "exam")
            {
                KillExamTimer();
            }
            else
            {
                ShowScore();
            }
            break;

        case "ShowRemediation":
            ClearAllItems();
            ShowRemediation();
            break;

        case "ShowExtraRemediation":
            ClearAllItems();
            // ShowExtraRemediation(frames[currentFrameIndex].remediation);
            ShowExtraRemediation(currentFrameIndex, true);

            break;

        case "ShowCritiques":
            boolInCritique = true;
            //if (currentCritiqueIndex > 0)
            //{
            //    SaveCritiqueAnswers();
            //}
            if (currentCritiqueIndex == -1)
            {

                critiquesViewed = false;
            }
            else
            {

                critiquesViewed = true;
            }
            
            ShowCritiques();
            break;

        default:

            if (currentFrameIndex <= frames.length - 1)//makes sure you are inside the frames array
            {
                boolMoveForward = true;
                MoveFrame();
            }
            else
            {
                ClearAllItems();
                CallEndOfLesson();
            }
    }
}

///////////////moves to the next or the previous frame or build,
function MoveFrame()
{
    ClearAllItems();
    boolInRemediation = false;
    var text = "";
    if (boolViewSpecificFrame)
    {
        currentFrameIndex++;//////////advances to first build of the next frame automatically when coming from ViewSpecificFrame/////////////////////segmentType
        if (frames[currentFrameIndex].segmentType == "1")
        {            
            $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
        }
        getPageCount();
    }
    else
    {
        if (boolMoveForward)////////////forward button clicked///////////////////////
        {            
            if ((currentFrameIndex < 0) || (currentBuildNumber == frames[currentFrameIndex].numberOfBuilds))
            {
                currentFrameIndex++;//////////advances to first build of the next frame/////////////////////
                if (currentFrameIndex <= frames.length - 1)//makes sure you are inside the frames array
                {
                    //continue on
                }
                else
                {
                    ClearAllItems();
                    CallEndOfLesson();
                    return;
                }

                if ((frames[currentFrameIndex].tempType == 3) || (frames[currentFrameIndex].tempType == 4))////////////don't show hidden frames using the forward button, access is only from ViewSpecificFrame/////////
                {
                    var hiddenFrameID = frames[currentFrameIndex].frameID;
                    currentFrameIndex++;////////////increment the currentFrameIndex again to avoid the hidden frame
                    //alert("Frame ID of frame after hidden frame = " + frames[currentFrameIndex].frameID.toString() + " :  hiddenFrameID = " + hiddenFrameID);
                }

                currentBuildNumber = 1;
            }
            else
            {
                currentBuildNumber++;////////advances to the next build of the current frame////////////////////////
            }
            if (frames[currentFrameIndex].segmentType == "1")
            {
                $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
            }
            progressBarCbt();
            ///////////////////////////////Review questions                           Not topic intro frame                 Not Review Questions Score                         Not Review Introduction//////////////////////////////////////
            if ((frames[currentFrameIndex].segmentType == 3) && (frames[currentFrameIndex].frameID.indexOf("t") < 0) && (frames[currentFrameIndex].tempType != 5) && (frames[currentFrameIndex].tempType != 8) && (frames[currentFrameIndex].tempType != 0))
            {                

                if (lessonType == "exam")
                {
                    $("a.listMenuBtn").prop("disabled", false).attr('style', 'background-position: 0px 0px');

                    if (!boolExamStarted)
                    {
                        ExamTimer();
                        DisableExitButton();
                        
                        //// Get the start of the CBT time
                        beginCBTTime = GetCBTTime("Start");

                    }
                }
                else
                {
                    $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');
                }

                if (jQuery.inArray(currentFrameIndex, viewedQuestionsArray) == -1)//////if -1 question not in the array and has not been visited before//////////////////////
                {
                    viewedQuestionsArray.push(currentFrameIndex);/////////////put question into viewedQuestionsArray///////////////////
                }
            }
            if ((bookmark < currentFrameIndex) && (frames[currentFrameIndex].segmentType != "1"))
            {
                bookmark = currentFrameIndex;
            }
            getPageCount();
        }
        else //// Back button clicked
        {
            if (boolReviewQuestionRemediation)
            {
                ShowRemediation("back");
                return;
            }
            //else
            //{


                if ((currentBuildNumber == 1) && (currentFrameIndex > 0))///////makes sure at build is the first build and not at the beginning of the lesson
                {
                    currentFrameIndex--;/////////////////moves to the previous frame//////////////////////

                    if ((frames[currentFrameIndex].tempType == 3) || (frames[currentFrameIndex].tempType == 4))////////////don't show hidden frames using the back button, access is only from ViewSpecificFrame/////////
                    {
                        currentFrameIndex--;////////////increment the currentFrameIndex again to avoid the hidden frame
                    }

                    currentBuildNumber = frames[currentFrameIndex].numberOfBuilds;
                }
                else//// Not the first build yet
                {
                    currentBuildNumber--; //////////////move to previous build////////////////////////////
                }

                getPageCount();
            }
        }
        if (frames[currentFrameIndex].tempType == 5)//////Review Questions Score//////////
        {
            if (developer)
            {
                $("#ExamTimer").remove();
            }
            strMoveForwardType = "ScoreTest";
            ScoreReviewQuestions();
        }
        else
        {
            strMoveForwardType = "";

            if (boolHasIntroSlide) ////////////review questions have an intro slide////////////////
            {
                ///////////////////////////////Review questions                           Review Introduction//////////////// 
                if (!developer)
                {
                    if (lessonType !== "exam")
                    {
                        if ((frames[currentFrameIndex].segmentType == 3) && ((frames[currentFrameIndex - 1].tempType == 0) || (frames[currentFrameIndex - 1].tempType == 8)))
                        {
                            $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');
                            $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');////disable back button to prevent student from going back into the lesson when in the review questions/////////////////
                        }
                        else
                        {
                            EnableBackButton();///////////enable back button because student not in review questions////////////////////
                        }
                    }
                }
            }
            else////////////review questions do not have an intro slide////////////////
            {
                ///////////////////////////////Review questions                           Review Introduction//////////////// 
                if ((frames[currentFrameIndex].segmentType == 3) && (frames[currentFrameIndex].displayNum == 2))
                {
                    $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');////disable back button to prevent student from going back into the lesson when in the review questions/////////////////
                }
                else
                {
                    EnableBackButton();///////////enable back button because student not in review questions////////////////////
                }
            }
            boolExtraRemediation = false;

            DetermineClassificationMarkings(frames[currentFrameIndex].classificationLevel);///////////determine and display classification markings if needed////////////////////////////
            SetTitle();/////////////display frame title/////////////////
            LoadMedia(frames[currentFrameIndex].mediaArray);///////////////display media////////////////////
            DisplayText(frames[currentFrameIndex], frames[currentFrameIndex].textArray);///////////display the text//////////////        
            SetupColumns(frames[currentFrameIndex].columnsArray, frames[currentFrameIndex]);//////////////set up and display columns//////////////////////
            SetHotSpots(frames[currentFrameIndex].hotSpotsArray, currentBuildNumber);///////////////display hot spots/////////////////////////
            SetupDistractors();/////////set up and display the distractors for questions//////////////        
            SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
            ExternalLinkSetup(frames[currentFrameIndex]);/////////////setup external link////////////////////
        }


        CorrectVerticalSpacing();
        SetHeadPhones(frames[currentFrameIndex].headPhoneIcon);

        boolViewSpecificFrame = false;
    
    // CommentsForm();
    //RunTools(0);
}

function CorrectVerticalSpacing()
{
    //// Removes empty "p" tags from textual content to correct verticle spacing
    //$('#text p')
    //.filter(function ()
    //{
    //    return $.trim($(this).text()) === '' && $(this).children().length == 0
    //}).remove()

    //$('p + br').remove();
}

function SetHeadPhones(pHeadPhoneIcon) {
    //var headPhone = frames[currentFrameIndex].headPhoneIcon;
    var headPhone = pHeadPhoneIcon;
    switch (headPhone)
    {
        case 'Yellow':
            $("a.audioBtn").attr('style', 'background-position: -340px -36px');
            break;
        case 'Green':
            $("a.audioBtn").attr('style', 'background-position: -340px -72px');
            break;
        default:
            $("a.audioBtn").attr('style', 'background-position: -340px 0');
            break;
    }
}

function getPageCount()
{
    var examQuestionCount = 0;
    if (lessonType == "exam")
    {
        for (var i = 0; i < frames.length; i++)
        {
            if (frames[i].tempType == 2)
            {
                examQuestionCount++;
            }
        }
    }
    var segmentType = frames[currentFrameIndex].segmentType;
    var frameTempType = frames[currentFrameIndex].tempType;

    if (boolMoveForward === true) {

        $("#pageCount").html("");
        

        var pageNumber = $.grep(menuObj, function (element, index) { //// Increment build number to #pageCount element
            return element.frame == currentFrameIndex;
        });

        if (typeof pageNumber[0] !== typeof undefined) {
            $("#pageCount").html("Page&nbsp;" + pageNumber[0].page + "&nbsp;of&nbsp;" + pageNumber[0].group);
        }

        if (frames[currentFrameIndex].numberOfBuilds > 1) {
            $("#pageCount").append(" | (Build " + currentBuildNumber + " of " + frames[currentFrameIndex].numberOfBuilds + ")");
        } //// EOF

        //// Review Questions
        //if (typeof segmentType !== typeof undefined && segmentType == '3') {
        //    $("#pageCount").html(frames[currentFrameIndex].title);
        //}

        if (lessonType != "exam")
        {
            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType == '2'))
            {
                $("#pageCount").html(frames[currentFrameIndex].title + "&nbsp;of&nbsp;" + reviewQuestionObj.length);
            }
        }
        else
        {
            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType != '2'))
            {
                $("#pageCount").html("Information Slide");
            }            
            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType == '2'))
            {
                $("#pageCount").html(frames[currentFrameIndex].title + "&nbsp;of&nbsp;" + examQuestionCount);
            }
        }


        //adjust menu colors active/currentIndex/inactive
        //cycle through all menu items and adjust colors accordingly
        var frameList = $("ul.frames li.icon");
        var intCurrentFrame = 0;
        //alert("Bookmark = " + bookmark + "\r\nCurrentFrame = " + currentFrameIndex);
        frameList.each(function (findex) {
            var frame = $(this);
            if (typeof fullNav !== typeof undefined && fullNav !== '1' && findex > bookmark) {
                //$("ul.frames li a").prop("disabled", true).attr('style', 'color: #333');
                frame.children().removeClass('active').removeClass('currentIndex').addClass('inactive');
                //frame.children().removeClass('active').removeClass('currentIndex').addClass('inactive');
                //currently going to the li class not the A tag
                if (!(frame.parents().prop('className').indexOf('currentIndexParent') > -1)) {
                    // frame.parents().removeClass('activeParent').removeClass('currentIndexParent').addClass('inactiveParent');
                }
            }
            else
            {
                frame.removeClass('inactive').removeClass('currentIndex').addClass('active');
                //frame.children().removeClass('inactive').removeClass('currentIndex').addClass('active');
                if (!(frame.parents().eq(2).prop('className').indexOf('currentIndexParent') > -1) && !(frame.parents().eq(2).prop('className').indexOf('activeParent') > -1)) {
                    frame.parents().eq(2).removeClass('inactiveParent').removeClass('currentIndexParent').addClass('activeParent');//topic title
                    frame.parents().eq(5).removeClass('inactiveParent').removeClass('currentIndexParent').addClass('activeParent');//segment title
                }
            }
            if (findex == currentFrameIndex) {
                //alert("CurrentFrame = " + bookmark);
                frame.removeClass('inactive').removeClass('active').addClass('currentIndex');
                //frame.children().removeClass('inactive').removeClass('active').addClass('currentIndex');
               frame.parents().removeClass('inactiveParent').removeClass('activeParent').addClass('currentIndexParent');
            }
        });
    }
    else//back button used
    {
        //// Filter for build number
        var pageNumber = $.grep(menuObj, function (element, index) { //// Increment build number to #pageCount element
            return element.frame == currentFrameIndex;
        });

        if (lessonType != "exam")
        {

            if (typeof pageNumber[0] !== typeof undefined)
            {
                $("#pageCount").html("Page&nbsp;" + pageNumber[0].page + "&nbsp;of&nbsp;" + pageNumber[0].group);
            }


            if (frames[currentFrameIndex].numberOfBuilds > 1)
            {
                $("#pageCount").append(" | (Build " + currentBuildNumber + " of " + frames[currentFrameIndex].numberOfBuilds + ")");
            } //// EOF

            //// Review Questions
            //if (typeof segmentType !== typeof undefined && segmentType == '3') {
            //    $("#pageCount").html(frames[currentFrameIndex].title);
            //}


            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType == '2'))
            {
                $("#pageCount").html(frames[currentFrameIndex].title + "&nbsp;of&nbsp;" + reviewQuestionObj.length);
            }
        }
        else
        {
            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType != '2'))
            {
                $("#pageCount").html("Information Slide");
            }
            if ((typeof segmentType !== typeof undefined && segmentType == '3') && (typeof frameTempType !== typeof undefined && frameTempType == '2'))
            {
                $("#pageCount").html(frames[currentFrameIndex].title + "&nbsp;of&nbsp;" + examQuestionCount);
            }
        }
    }
}

/////////////if there is an external link, sets up the link/////////////////////////
function ExternalLinkSetup(frameInfo)
{
    try
    {
        if (boolInRemediation)
        {
            if (typeof frameInfo !== typeof undefined && frameInfo.remAttachment.length > 1)
            {
                $('#externalLink').show();/////////////show the link/////////////////
                boolExternalLinkShown = true;

                linkText = mediaPath + "\\" + lessonIdentifier + "_media\\" + frameInfo.remAttachment;
               // alert("remExternalLink = " + linkText);
                //$('#externLink').attr("value", linkText);

            }
            else
            {
                $('#externalLink').hide();/////////////hides the link img, no link on frame/////////////////
                boolExternalLinkShown = false;
            }
        }
        else
        {
            if (typeof frameInfo !== typeof undefined && frameInfo.attachment.length > 1)
            {
                $('#externalLink').show();/////////////show the link/////////////////
                boolExternalLinkShown = true;

                linkText = mediaPath + "\\" + lessonIdentifier + "_media\\" + frameInfo.attachment;
                // alert("externalLink = " + linkText);
                //$('#externLink').attr("value", linkText);

            }
            else
            {
                $('#externalLink').hide();/////////////hides the link img, no link on frame/////////////////
                boolExternalLinkShown = false;
            }
        }
    }
    catch (e)///////suppresses the error gotten when there is no attachment attribute in the xml////////////
    {
      //  alert("frameID = " + frameInfo.frameID.toString() + " :   frameTitle = " + frameInfo.frameTitle + "\n\r" + " error = " + e.toString());
    }
}

function ExternalLinkCalled()//called from the web page
{
   // alert("linkText = " + linkText);
    ReportToWrapper(linkText, "extLink");
}

//////clears all highlights/////////////
function ClearHighlights(boolHighlightsFromEditor) {
    if ((boolHighlights) || (boolHighlightsFromEditor)) {
        // $('.highlight').remove();///////removes highlights created with div tags//////////
        $('.highlight').html("");
        //('#canvas').remove();
        var myCanvas = document.getElementById("canvas");
        var ctx = myCanvas.getContext("2d");

        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);//////////removes highlights drawn on canvas tags/////////////////////////
        boolHighlights = false;
    }
}

/////////Sets and displays highlights///////////
function SetHighlights(pSourceHighlightArray, pCurrentBuildNumber, pCanvas) {
    ClearHighlights();
    try
    {
        if (pSourceHighlightArray[0].highlightID > 0)/////////highlights found//////////////
        {
            boolHighlights = true;

            var myCanvas = document.getElementById(pCanvas);//////////gets the canvas for modifications//////////////

        var ctx = myCanvas.getContext("2d");
        ctx.beginPath();////////////////////starts the path for the hightlights//////////////

        for (var i = 0; i < pSourceHighlightArray.length; i++)////go through all highlights in the array///////////////
        {
            if (pSourceHighlightArray[i].bldNumber == pCurrentBuildNumber)///////////only display the highlights for the current build//////////////
            {
                var highlightID = pSourceHighlightArray[i].highlightID;
                var x1 = Number(pSourceHighlightArray[i].x1) + intHighlightXOffset;
                var y1 = Number(pSourceHighlightArray[i].y1) + intHighlightYOffset;
                var x2 = Number(pSourceHighlightArray[i].x2) + intHighlightXOffset;
                var y2 = Number(pSourceHighlightArray[i].y2) + intHighlightYOffset;// + 3;
                //var y2 = Number(pSourceHighlightArray[i].y2) + intHighlightYOffset;
                var highlightColor = highlightColorsArray[pSourceHighlightArray[i].color];
                var highlightType = pSourceHighlightArray[i].type;

                var width = x2;
                var height = y2;

                if ((!boolInRemediation) && (highlightColor == remHighlightColor))
                {                   
                    continue;
                }

                switch (highlightType)//////////find the type of highlight to display//////////////////
                {
                    case "arrow":
                        //alert("arrow highlight");
                        //currentHighlight = new ArrowLineHighlight(hColor, hX2-hX, hY2-hY, drawLineWidth, showNodes);
                        //ArrowLineHighlight( pColor:uint, pWidth:int, pHeight:int, pLineWidth:int=1, pEnabled=false ) 
                        //currentHighlight.x = hX;
                        // currentHighlight.y = hY;

                        //draw the line
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = highlightColor;
                        //ctx.lineWidth = 2;
                        ctx.lineWidth = intDrawObjectsLineWidth;
                        ctx.stroke();

                        /////////end draw the line///////////////////////////////////////////

                        /////////////////Figure the angle for the arrowhead/////////////////////////////////////////////////

                        // Rotate the arrowhead to the correct angle
                        var _distanceX = Number(x2) - Number(x1);
                        var _distanceY = Number(y2) - Number(y1);
                        //var _angle = (Math.atan2(_distanceY, _distanceX))*(180/Math.PI);
                        var _angle = (Math.atan(_distanceY / _distanceX));// must be in radians

                        var arrowSlopeCompensator = 0;

                        if (((x1 > x2) && (y2 < y1)) || ((x1 > x2) && (y2 > y1)) || ((y1 == y2) && (x1 > x2)))
                        {
                            arrowSlopeCompensator = 180 * (Math.PI / 180);//degrees must be converted to radians
                        }

                        else
                        {
                            arrowSlopeCompensator = 0;

                        }

                        var arrowAngle = _angle + arrowSlopeCompensator;

                        /////////////////////////////////////End Figure the angle for the arrowhead////////////////////////////////////////////

                        width = (15 * .55);//gives half of the width of the arrowhead
                        height = Math.round(15 * .7);//gives the height of the arrowhead to the point

                        var startX = x2;//x - coordinate of end of line
                        var startY = Math.round(y2 - width);//100 is the y coordinate of the end of the line
                        var endX = x2;
                        var endY = Math.round(y2 + width);
                        var pointX = x2 + height;
                        var pointY = y2;

                        //draw the arrowhead

                        ctx.save();//saves the current coordinate system before it is changed

                        ctx.beginPath();

                        ctx.translate(x2, y2);//Moves the origin
                        ctx.rotate(arrowAngle);
                        ctx.translate(-x2, -y2);//Moves the origin back must be used

                        ctx.moveTo(startX, startY);
                        ctx.lineTo(pointX, pointY);
                        ctx.lineTo(endX, endY);
                        ctx.lineTo(startX, startY);
                        ctx.strokeStyle = highlightColor;
                        ctx.fillStyle = highlightColor;
                        ctx.fill();

                        ctx.restore();//restores the original coordinate system           
                        //////////////end draw arrowhead/////////////////////////////////

                        break;

                    case "line":
                        //alert("line highlight");
                        //currentHighlight = new LineHighlight(hColor, hW, hH, drawLineWidth, showNodes);
                        //LineHighlight( pColor:uint, pWidth:int, pHeight:int, pLineWidth:int=1, pEnabled=false ) 
                        //currentHighlight.x = hX;
                        //currentHighlight.y = hY;
                        //x1 y1 line start point, x2 y2 line end point

                        y2 = y2;// - 3;//take out the extra adjustment/////////////////////////////

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = highlightColor;
                        ctx.lineWidth = intDrawObjectsLineWidth;
                        ctx.stroke();

                        break;

                    case "circle":
                        // alert("circle highlight");
                        /*var hX:Number = Number(highlightXML[h].@x1);
                        var hY:Number = Number(highlightXML[h].@y1);
                        var hX2:Number = Number(highlightXML[h].@x2);
                        var hY2:Number = Number(highlightXML[h].@y2);
					
                        var hW:Number = Number(highlightXML[h].@x2) - Number(highlightXML[h].@x1);
                        var hH:Number = Number(highlightXML[h].@y2) - Number(highlightXML[h].@y1);*/
                        //currentHighlight = new CircleHighlight(hColor, hX2, drawLineWidth, showNodes);
                        //CircleHighlight( pColor:uint, pRadius:int, pLineWidth:int=1, pEnabled=false )
                        //currentHighlight.x = hX;
                        //currentHighlight.y = hY;

                        //x1 y1 is the location of the circle, x2 is the radius of the circle

                        y2 = y2;// - 3;//take out the extra adjustment/////////////////////////////
                        x2 = x2 - intHighlightXOffset;

                        ctx.beginPath();
                        ctx.arc(x1, y1, x2, 0, 2 * Math.PI);
                        ctx.strokeStyle = highlightColor;
                        ctx.lineWidth = intDrawObjectsLineWidth;
                        ctx.stroke();

                        if (x2 < 6) {
                            ctx.fillStyle = highlightColor;
                            ctx.fill();
                        }

                        break;

                    case "rectangle":
                        // alert("rectangle highlight");
                        //currentHighlight = new RectangleHighlight(hColor, hX2, hY2, drawLineWidth, showNodes);
                        //RectangleHighlight( pColor:uint, pWidth:int, pHeight:int, pLineWidth:int=1, pEnabled=false )
                        // currentHighlight.x = hX;
                        // currentHighlight.y = hY;

                        ///x1 y1 is the location of the rectangle, x2 is the width and y2 is the height of the rectangle

                        ctx.beginPath();
                        ctx.rect(x1, y1, width, height);
                        ctx.strokeStyle = highlightColor;
                        ctx.lineWidth = intDrawObjectsLineWidth;
                        ctx.stroke();

                        /* $highlight = $("<div id='" + highlightID + "' class='highlight'></div>").appendTo($topContainer);
 
                         $highlight.css({
                             position: 'absolute',
                             left: x1,// + intHotspotOffsetX,
                             top: y1,// + intHotspotOffsetY,
                             width: width + 'px',
                             height: height + 'px',
                             border: '3px solid'
                         });
 
                         $highlight.css('border-color', highlightColor);*/
                        break;

                    case "text":
                        //var highlightText:String = "<span class='ah" + highlightXML[h].@colorType + "'>" + formatScreenText(highlightXML[h].@htext) + "</span>";
                        //currentHighlight = new TextHighlight(hColor, hX2, hY2, highlightText, css);
                        //TextHighlight( pColor:uint, pWidth:int, pHeight:int, pText:String, pCSS:StyleSheet, pLineWidth:int = 1, pShowBorder:Boolean = false, pEnabled:Boolean = true ) 

                        //////////////create a div with no border and put the text inside, x1 y1 location , x2 is the width and y2 is the height of the div///////////////////////
                        // ($topContainer) = $("#media");highlightText
                        ($topContainer) = $("#highlightText");
                        var highlightText = pSourceHighlightArray[i].hText;
                        var divText = "<div id='" + highlightID + "' class='highlight ah" + pSourceHighlightArray[i].color + "'>" + highlightText + "</div>";
                        $highlightText = $(divText).appendTo($topContainer);

                        $highlightText.css({
                            position: 'absolute',
                            left: x1,// + intHotspotOffsetX,
                            top: y1,// + intHotspotOffsetY,
                            width: width + 'px',
                            height: height + 'px'
                            //color: highlightColor
                        });
                            break;
                    }
                }
            }
        }
    }
    catch(e)
    {
        alert("SetHighlights error = " + e.toString());
    }
}

//////////clears all hotspots//////////////
function ClearHotSpots() {
    if (boolHotSpot)
    {
        $(".hotspot, .hotspotAnswer, .hotSpotReview, .hotpotQuestionClicked, .hotspotText").remove();
        boolHotSpot = false;
    }
}

/////////set hotspots for display and actions//////////////
function SetHotSpots(pSourceHotspotArray, pCurrentBuildNumber) {
    ClearHotSpots();
    try
    {
        if (pSourceHotspotArray[0].hotSpotID > 0)///////////hotspots found///////////////
        {
            $topContainer = $("#hotspot"); //document.getElementById('topContainer');

            boolHotSpot = true;

            for (var i = 0; i < pSourceHotspotArray.length; i++)
            {
                //need to use the pCurrentBuildNumber to make sure to only show the hotspots for the current build
                if (pSourceHotspotArray[i].bldNumber == pCurrentBuildNumber) {
                    var x = Number(pSourceHotspotArray[i].left) + intHotspotOffsetX;
                    var y = Number(pSourceHotspotArray[i].top) + intHotspotOffsetY;

                    var width = pSourceHotspotArray[i].width;
                    var height = pSourceHotspotArray[i].height;

                    var hotSpotID = pSourceHotspotArray[i].hotSpotID;
                    var displayType = pSourceHotspotArray[i].displayType;
                    var dropShadow = pSourceHotspotArray[i].dropShadow;
                    //activateOn - Click, DoubleClick, Rollover
                    var activateOn = pSourceHotspotArray[i].activateOn;
                    var actionMethod = "";
                    var activateType = "";

                    switch (activateOn) {
                        case "Click":
                            actionMethod = "ClickMethod";
                            activateType = "onClick";
                            break;

                        case "Double Click":
                            actionMethod = "DoubleClickMethod";
                            activateType = "ondblclick";
                            break;

                        case "Rollover":
                            actionMethod = "RolloverMethod";
                            activateType = "onmouseover";
                            break;
                    }

                    if (activateOn == "Rollover") {
                        $hotspot = $("<div style='z-index: 300;' id='hotspot" + hotSpotID + "' class='hotspot' " + activateType + "='" + actionMethod + "(\"hsElement" + hotSpotID + "\")' onmouseout='MouseOutMethod(\"hsElement" + hotSpotID + "\")'></div>").appendTo($topContainer);
                    }
                    else {
                        $hotspot = $("<div style='z-index: 300;' id='hotspot" + hotSpotID + "' class='hotspot' " + activateType + "='" + actionMethod + "(\"hsElement" + hotSpotID + "\")'></div>").appendTo($topContainer);
                    }

                    $hotspot.css({
                        position: 'absolute',
                        left: x + intHotspotOffsetX,
                        top: y + intHotspotOffsetY,
                        width: width + 'px',
                        height: height + 'px'
                        //border: '3px solid'
                    });
                    switch(displayType) {
                        case "Outlined":
                        switch (intDrawObjectsLineWidth) {
                            case "1":
                                $hotspot.css({ 'border': '1px solid', 'border-color': hotspotColor });
                                break;
                            case "2":
                                $hotspot.css({ 'border': '2px solid', 'border-color': hotspotColor });
                                break;
                            case "3":
                                $hotspot.css({ 'border': '3px solid', 'border-color': hotspotColor });
                                break;
                            case "4":
                                $hotspot.css({ 'border': '4px solid', 'border-color': hotspotColor });
                                break;
                            case "5":
                                $hotspot.css({ 'border': '5px solid', 'border-color': hotspotColor });
                                break;
                            default:
                                $hotspot.css({ 'border': '2px solid', 'border-color': hotspotColor });
                                break;
                        }
                        break;
                        case "Translucent Box":
                            $hotspot.css({ 'background-color': '#fff', 'background-color': 'rgba(255,255,255,0.5)' });
                        break;
                        //$hotspot.css({ 'border': '2px solid', 'border-color': hotspotColor });
                    }

                    if (dropShadow != 0) {
                        $hotspot.addClass("dropShadow");
                    }
                }
            }
        }
    }

    catch(e)
    {
        //alert("hotspot error = " + e.toString());
    }
}

/////////////used with activateOn rollover//////////////
function MouseOutMethod(e)
{
    var divID = "#" + e;
    $(divID).remove();
    $(divID).remove();
}

//////////////calls hotspot actions for the Rollover method/////////////
function RolloverMethod(e)
{    
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
    var activateOn = "";
    var actionType = "";
    var action = "";
    var mediaX = 0;
    var mediaY = 0;
    var textWidth = 0;
    var textHeight = 0;
    var hotspotSource = "";
    var thisFrameIndex = currentFrameIndex;
    if (jumpToHiddenFrameID != "")
    {
        thisFrameIndex = jumpToHiddenFrameID;
    }
    if (boolExtraRemediation)
    {
        hotspotSource = frames[thisFrameIndex].extraRemediationFrameArray[0];
    }
    else
    {
        hotspotSource = frames[thisFrameIndex];
    }

    //use current frame hotspot array, find hotspot id that is equal to pHotspotID, get the hotspot info 
    for (var i = 0; i < hotspotSource.hotSpotsArray.length; i++)
    {
        //alert("frames[currentFrameIndex].hotSpotsArray = " + frames[currentFrameIndex].hotSpotsArray + "   :  e = " + e);
        if (hotspotSource.hotSpotsArray[i].hotSpotID == pHotspotID.replace('hsElement',''))
        {            
            activateOn = hotspotSource.hotSpotsArray[i].activateOn;
            actionType = hotspotSource.hotSpotsArray[i].actionType;
            action = hotspotSource.hotSpotsArray[i].action;
            mediaX = hotspotSource.hotSpotsArray[i].mediaX;
            mediaY = hotspotSource.hotSpotsArray[i].mediaY;
            textWidth = hotspotSource.hotSpotsArray[i].textWidth;
            textHeight = hotspotSource.hotSpotsArray[i].textHeight;

            break;

            //alert("actionType = " + actionType);
        }
    }

    switch (actionType) {
        case "Show Text":
            var divID = "#" + pHotspotID;

            if ($(divID).length !== 0)
            {
                $(divID).remove();
            }
            else
            {
                //$topContainer = $("#media");
                $topContainer = $("#hotspot");
                $RolloverText = $("<div id='" + pHotspotID + "' class='hotspotText'><span style='font-size: 20px !important; z-index: 300; font-family: Arial;'>" + action + "</span></div>").appendTo($topContainer);
                $RolloverText.css({
                    position: 'absolute',
                    left: mediaX + 'px',
                    top: mediaY + 'px',
                    width: textWidth + 'px',
		    padding: '2px 0 0 5px' 
                });
            }
            break;

        case "Display a File":
            if (action.indexOf("mp3") !== -1)
            {
                $('#rolloverHotspotMedia').remove();
                //$mediaDiv = $("#wrapper");  //not sure why wrapper was set...moved to media so that the MP3 controller would be over the top of the images
                $mediaDiv = $("#media");
                var media = "";
                media = EmbedMedia(action, mediaY, mediaX, hotspotSource.hotSpotsArray, pHotspotID);

                $hotspotDiv = $("<div id='rolloverHotspotMedia'>" + media + "</div>").appendTo($mediaDiv);
                try {
                    var mp3Obj = $(".mp3ControllerLocation");
                    mp3Obj.on('ended', function () { mp3Obj.prop("controls", ""); });
                }
                catch (ex) { alert(ex); }
            }
            else
            {
                var divID = "#" + pHotspotID;
                if ($(divID).length)
                {
                    $(divID).remove();
                }
                else
                {
                    $mediaDiv = $("#wrapper");
                    var media = "";
                    $media = EmbedMedia(action, mediaY, mediaX, hotspotSource.mediaArray, pHotspotID);
                    $hotspotDiv = $("<div id='" + pHotspotID + "'>" + $media + "</div>").appendTo($mediaDiv);
                    $hotspotDiv.css({
                        position: 'absolute',
                        left: mediaX + 'px',
                        top: mediaY + 'px'
                    });

                    $hotspotDiv.addClass("moveToTop");
                }
            }

            break;

        case "Jump to Frame"://action is now a frame ID to jump to, go through frames array to find the frame ID and call ViewSpecificFrame(pIntFrameNumber)
            
            if (!developer)
            {
                for (var j = 0; j < frames.length; j++)
                {
                    if (frames[j].frameID == action)
                    {
                        if (frames[j].tempType == 3)
                        {
                            jumpToHiddenFrameID = j.toString();
                            JumpToHiddenFrame(j);
                        }
                        else
                        {
                            ViewSpecificFrame(j);
                        }

                    }
                }
            }
            else
            {
                alert("In developer, otherwise would have jumped to frame " + action);
            }
            break;

        case "Link to a File"://action is now a file name to open
            var fileLocation = mediaPath + "/" + lessonIdentifier + "_media/" + action;
            if (!developer)
            {
                try
                {
                    ReportToWrapper(fileLocation, "extLink");
                }
                catch (e)
                {
                    alert("Cannot run a link to file from the editor, must be in the wrapper");
                }
            }
            else
            {
                alert("In developer, otherwise would have displayed " + action);
            }
            break;

        case "Move to Next":
           
            if (!developer)
            {
                MoveForwardFromHotspot();
            }
            else
            {
                alert("In developer, otherwise would have moved to next frame/build");
            }

            break;
    }
}



///////////////Jumps to a hidden frame and then allows going to the next frame in original sequence/////////////
function JumpToHiddenFrame(frameIndex)
{
    boolExtraRemediation = false;
    ClearAllItems();
    currentBuildNumber = 1;
    DetermineClassificationMarkings(frames[frameIndex].classificationLevel);///////////determine and display classification markings if needed////////////////////////////
    SetTitle();/////////////display frame title/////////////////
    LoadMedia(frames[frameIndex].mediaArray);///////////////display media////////////////////
    DisplayText(frames[frameIndex], frames[frameIndex].textArray);///////////display the text//////////////        
    SetupColumns(frames[frameIndex].columnsArray, frames[frameIndex]);//////////////set up and display columns//////////////////////
    SetHotSpots(frames[frameIndex].hotSpotsArray, currentBuildNumber);///////////////display hot spots/////////////////////////
    SetupDistractors();/////////set up and display the distractors for questions//////////////        
    SetHighlights(frames[frameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
    ExternalLinkSetup(frames[frameIndex]);/////////////setup external link////////////////////
    CorrectVerticalSpacing();
}

////////////////Sets frame title to what is in the frame array at the current frame index/////////////////
function SetTitle()
{
    var thisFrameIndex = currentFrameIndex;
    if (jumpToHiddenFrameID != "") {
        thisFrameIndex = jumpToHiddenFrameID;
    }
    if ($classified == 0) {
        $("#titleBar").removeClass("introTitle");
        $("#frameTitle").addClass("titleCenter").text((frames[thisFrameIndex].title));
    }
    else if ($classified == 1) {
        $("#titleBar").removeClass("introTitle");
        $("#frameTitle").addClass("titleRight").text((frames[thisFrameIndex].title));
    }    
}

//////////sets frame title to whatever is sent in the parameter///////////////////////////////////
function SetFrameTitleWithParameter(pTitleText) {
    if ($classified == 0) {
        $("#titleBar").removeClass("introTitle");
        $("#frameTitle").addClass("titleCenter").text(pTitleText);
    }
    else if ($classified == 1) {
        $("#titleBar").removeClass("introTitle");
        $("#frameTitle").addClass("titleRight").text(pTitleText);
    }
}

////////////sets up the distractors properly, randomized if necessary, visited, unvisited.........../////////////////
function SetupDistractors()
{
    //answers section///////////////////////////////////////////////////////////////////////////////
    if (frames[currentFrameIndex].template == "question") {
        if (jQuery.inArray(currentFrameIndex, questionsVisitedArray) == -1)////makes sure question has not been visited////////////////////
        {
            if (frames[currentFrameIndex].questionType == "hs")
            {
                numTimesQuestionAnswered = 0;//resets this for the next question
                var hotSpotAnsweredID = 0;
              //  ClearHotSpots();
                //boolHotSpot = true;
                $topContainer = $("#hotspot"); //need to put into hotspot div
                var numDistractors = frames[currentFrameIndex].questionArray[0].answerArray.length;

                for(i = 0; i < numDistractors; i++)
                {
                    if (frames[currentFrameIndex].segmentType == 3)//final review questions
                    {
                        //check if already answered, if so set answered distractor to cyan
                        // find out if in the answeredTestQuestionsArray, if so find the answer already picked and display in cyan
                        for (var count = 0; count < answeredTestQuestionsArray.length; count++)
                        {
                            if (answeredTestQuestionsArray[count].frameIndex == currentFrameIndex)
                            {
                                if (answeredTestQuestionsArray[count].answerID == frames[currentFrameIndex].questionArray[0].answerArray[i].answerID)
                                {
                                    hotSpotAnsweredID = answeredTestQuestionsArray[count].answerID;
                                    break;
                                }
                            }
                        }
                        OnClickFunction = "ClickedTestAnswer(";
                    }
                    else//////other questions///////////////////////////////
                    {
                        //disable nav buttons until question answered
                        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
                        $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');

                        OnClickFunction = "CheckHSReviewAnswer(";
                    }
                    var hotSpotID = frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
                    var answerLocationString = frames[currentFrameIndex].questionArray[0].answerArray[i].answerText;
                    var aryAnswerCoords = answerLocationString.split('~');
                    var x = Number(aryAnswerCoords[0]);
                    var y = Number(aryAnswerCoords[1]);
                    var width = Number(aryAnswerCoords[3]);
                    var height = Number(aryAnswerCoords[2]);

                    //alert("x = " + x + "   :  y = " + y + "   :   width = " + width + "   :  height = " + height);
                    if (hotSpotID == hotSpotAnsweredID)
                    {
                        //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspot imgDistractorClicked' onClick=\"" + OnClickFunction + "'hs-" + hotSpotID + "');\"></div>").appendTo($topContainer);
                        $topContainer.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspotAnswer imgDistractorClicked' onClick=\"" + OnClickFunction + "'hs-" + hotSpotID + "');\"></div>");
                    }
                    else
                    {
                        //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspot hotSpotReview' onClick=\"" + OnClickFunction + "'hs-" + hotSpotID + "');\"></div>").appendTo($topContainer);
                        $topContainer.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspotAnswer hotSpotReview' onClick=\"" + OnClickFunction + "'hs-" + hotSpotID + "');\"></div>");
                    }
                    $HS = $("#hotSpotAnswer" + hotSpotID);
                    //$hotspot.css({
                    $HS.css({
                        position: 'absolute',
                        left: x + intHotspotOffsetX,
                        top: y + intHotspotOffsetY,
                        width: width + 'px',
                        height: height + 'px',                        
                    });
                    boolHotSpot = true;
                }

            }
            else
            {

                var answerText = "";
                var text = "";
                tempIndexArray = [];

                var min = 0;
                var max = frames[currentFrameIndex].questionArray[0].answerArray.length;//////number of distractors - used to ensure we only can get up to that number as a random number/////////////
                var tempIndex = 0;

                if (frames[currentFrameIndex].questionType == "mcI")
                {
                    answerText += "<table width='984'>";
                }

                for (i = 0; i < max; i++)
                {
                    tempIndex = i;
                    tempIndexArray.push(tempIndex);

                    if (frames[currentFrameIndex].segmentType == 3)//final review questions
                    {
                        //check if already answered, if so set answered distractor to cyan
                        OnClickFunction = "ClickedTestAnswer(";
                    }
                    else//////other questions///////////////////////////////
                    {
                        //disable nav buttons until question answered
                        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
                        $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');

                        OnClickFunction = "CheckReviewAnswer(";
                    }
                    if (frames[currentFrameIndex].questionType == "mcI")
                    {
                        if ((i == 0) || (i == 2))
                        {
                            answerText += "<tr>";
                        }
                    }

                    if (frames[currentFrameIndex].questionType == "mcI")
                    {
                        answerText += "<td>";
                        answerText += DistractorSetup(i, tempIndex, OnClickFunction);//////////////sets the proper spanClass on the distractors//////////////////////////////////
                        answerText += "</td>";
                    }
                    else
                    {
                        answerText += DistractorSetup(i, tempIndex, OnClickFunction);//////////////sets the proper spanClass on the distractors//////////////////////////////////
                    }

                    if (frames[currentFrameIndex].questionType === "mcI")
                    {
                        if ((i === 1) || (i === 3))
                        {
                            answerText += "</tr>";
                        }
                    }
                }

                if (frames[currentFrameIndex].questionType === "mcI")
                {
                    answerText += "</table>";
                }

                $text = $("#text");
                textPosition = $text.position();
                $answers = $text.append($("<div />", { // Append div
                    "id": "answers"
                }).html(answerText));

                //$answers.css({
                //    position: 'absolute',
                //    left: 20,
                //    top: intTopMarginText - 10 //moves the top of the answers lower than the question
                //});
                //$('#answers').css("text-align", "left");
                //$('#answers').css("display", "block");
            }
        }
        else//////////question has been visited already so use ViewAnsweredQuestion() to view the question////////////////////////////////////
        {
            ViewAnsweredQuestion();///////////sets up to view answered questions/////////////////////////
        }
    }
}


//////////formats text properly for builds and other types of frames///////////////////////////////////////
function DisplayText(pTextInfo, sourceTextArray) {
    //////////////////////////////////////////////////////////////////////text section/////////////////////////////////////////////////////////////////////////
    var text = "";
    numberDefinitionsOnPage = 0;

    for (i = 0; i < sourceTextArray.length; i++) 
    {
        if (sourceTextArray[i].bldNumber < currentBuildNumber)///checking to see if build text is the current build text //////////////
        {
            var tempString = BuildTextFormatter(sourceTextArray[i].text);//////////if not grays it out/////////////
            text += tempString;

        }

        if (sourceTextArray[i].bldNumber == currentBuildNumber)///checking to see if build text is the current build text //////////////
        {
            text += NormalTextFormatter(sourceTextArray[i].text);//////////if so formats it as current/////////////
        }
    }

    var strTextTop = pTextInfo.textTop + "px";
    var strTextLeft = 0;
    var strTextHeight = pTextInfo.textHeight + "px";
    var strTextWidth = pTextInfo.textWidth + "px";

    if (pTextInfo.frameID.indexOf("t") < 0)///////if topic intro frame set text to proper position for that type frame//////////////
    {
        //strTextLeft = Number(pTextInfo.textLeft) + 15 + "px";
        strTextLeft = Number(pTextInfo.textLeft) + "px";
        // $('#text').css("text-align", "left");
        // $('#text').css("display", "block");
        $('#text').css({ width: strTextWidth });
    }
    else {
        strTextLeft = pTextInfo.textLeft + "px";///////////not topic intro frame so set text where xml says///////////////////////
    }

    placeDiv("text", strTextLeft, strTextTop);
    SetDivHeightWidth("text", strTextHeight, strTextWidth);

    if ((text.indexOf("class='adef'") >= 0) || (text.indexOf("class='adefL'") >= 0))/////////////////////check to see if definition class exists/////////////////////////////////////////////
    {
        var classCountSmallFont = occurrences(text, "class='adef'", false);
        var classCountLargFont = occurrences(text, "class='adefL'", false);
        // alert("class adef found count = " + classCount);
        numberDefinitionsOnPage = classCountSmallFont + classCountLargFont;
        var boolColumn = false;
        text = SetupDefinitions(text, numberDefinitionsOnPage, boolColumn);
    }

   // alert("numberDefinitionsOnPage = " + numberDefinitionsOnPage + "\n\ntext = " + text);

    $("#text").html(text).show();


    if (numberDefinitionsOnPage > 0)//////////////find locations of the tooltips, if off of the page move down 20 px and left as necessary///////////////
    {
        for (i = 0; i < numberDefinitionsOnPage; i++)
        {
            var wordToDefineSpanID = "#word" + i;
            var definitionSpanID = "#def" + i;
            var defSpanWidth = 220;
            $(wordToDefineSpanID).attr("onmouseover", "HideHighlights()");
            $(wordToDefineSpanID).attr("onmouseout", "UnHideHighlights()");
            var wordPosition = $(wordToDefineSpanID).position();
            var wordSpanLeft = parseInt(wordPosition.left);
            var defPosition = $(definitionSpanID).position();
            var definitionSpanLeft = parseInt(defPosition.left);
            var spanTotalWidth = wordSpanLeft + definitionSpanLeft + defSpanWidth + parseInt(strTextLeft);
            var topOfViewableArea = -parseInt(pTextInfo.textTop) - parseInt(wordPosition.top);
            var topAdjust = 0;
            var leftAdjust = 0;
            var topOffset = 20;
            var blAdjust = false;
            var blOffEndOfPage = false;
            var overallHeight = 51 + parseInt(pTextInfo.textTop) + parseInt(wordPosition.top) + parseInt($(definitionSpanID).height());
            if (overallHeight > 640)
            {
                blOffEndOfPage = true;
            }
            if (blOffEndOfPage)
            {
                topAdjust = topAdjust - parseInt($(definitionSpanID).height())- topOffset;
                topOffset = 0;
                blAdjust = true;
            }

            if (spanTotalWidth > 984)//part is off the page 984
            {
                var spanAdjust = 984 - spanTotalWidth;//984 in place of 350
                topAdjust = topAdjust + topOffset;
                leftAdjust = defPosition.left + spanAdjust;
                blAdjust = true;                
            }
            if(blAdjust)
            {
                if (topAdjust < topOfViewableArea)
                {
                    topAdjust = topOfViewableArea;
                }
                if (leftAdjust == 0)
                {
                    leftAdjust = definitionSpanLeft;
                }
                
                $(definitionSpanID).css({ top: topAdjust, left: leftAdjust, position: 'absolute' });
            }
        }
    }

    /////////////////////////////////////////////////////////end text section///////////////////////////////////////////////////////////////////////
}
///called from editor to update primary text field
function EditorUpdateText (pText)
{
    $("#text").html();
    $("#text").html(pText).show();
}
function EditorUpdateTextWidth (pWitdh)
{
    $("#text").width(pWitdh);
    //$("#text").html(pWitdh).show();
}
///called from editor to update distractors that get added to the primary text field
function EditorUpdateDistractors(pNegFeedbackText, pPosFeedbackText, pStrXMLDistractors)
{
    var frameTitle = frames[0].title; framNum = frames[0].displayNum; attachment = frames[0].attachment; remediation = frames[0].remediation;
    var hotspotArray = frames[0].hotSpotArray; highlightArray = frames[0].highlightArray; remMediaArray = frames[0].remMediaArray; frameTempType = frames[0].tempType;
    var frameText = frames[0].textArray; frameMedia = frames[0].mediaArray; menuTitle = frames[0].menuTitle; frameID = frames[0].frameID; topicTitle = frames[0].topicTitle; topicID = frames[0].topicID;
    var segmentTitle = frames[0].segmentTitle; segmentID = frames[0].segmentID; segmentType = frames[0].segmentType; numberOfBuilds = frames[0].numberOfBuilds;
    var questionType = frames[0].questionType;
    var template = 'question'; txtTop = frames[0].textTop; txtLeft = frames[0].textLeft;
    var txtHeight = frames[0].textHeight; txtWidth = frames[0].textWidth; classLevel = frames[0].classificationLevel; colLeft = frames[0].columnLeft; colTop = frames[0].columnTop;
    var colWidth = frames[0].columnWidth; columnsArray = frames[0].columnsArray; headPhoneIcon = frames[0].headPhoneIcon;
    var questionInfo = CreateDistractors(pNegFeedbackText, pPosFeedbackText, 0, pStrXMLDistractors);

    frames = [];
    frames.push({
        title: frameTitle, fullNav: fullNav, displayNum: framNum, attachment: attachment, remediation: remediation,
        hotSpotsArray: hotspotArray, highlightArray: highlightArray, remMediaArray: remMediaArray, tempType: frameTempType,
        textArray: frameText, mediaArray: frameMedia, menuTitle: menuTitle, frameID: frameID, topicTitle: topicTitle, topicID: topicID,
        segmentTitle: segmentTitle, segmentID: segmentID, segmentType: segmentType, numberOfBuilds: numberOfBuilds,
        questionType: questionType, questionArray: questionInfo, template: template, textTop: txtTop, textLeft: txtLeft,
        textHeight: txtHeight, textWidth: txtWidth, classificationLevel: classLevel, columnLeft: colLeft, columnTop: colTop,
        columnWidth: colWidth, columnsArray: columnsArray, headPhoneIcon: headPhoneIcon
    });
    SetupDistractors();
}
//////////Sets up any glossary terms with its definition in a separate div/////////////
function SetupDefinitions(pText, pNumberOccurrences, pBoolColumn)
{
    var wordToDefineID = "word";
    var definitionSpanID = "def";
    var startIndex = 0;
    var startIndex = 0;
    /////////////////////////////////////use for loop with pNumberOccurrences     
    for (var i = 0; i < pNumberOccurrences; i++)
    {
        var beginningIndex = 0;
        var beginningOffsetColumns = 0;
        var beginningOffsetText = 0;
        var boolSmallText = false;

        if (pText.indexOf("class='adefL'") >= 0)
        {
            beginningIndex = pText.indexOf("class='adefL'");
            beginningOffsetColumns = 56;//52
            beginningOffsetText = 53;//49
            boolSmallText = false;
        }
        else if (pText.indexOf("class='adef'") >= 0)
        {
            beginningIndex = pText.indexOf("class='adef'");
            beginningOffsetColumns = 51;
            beginningOffsetText = 48;
            boolSmallText = true;
        }

        //beginningIndex = pText.indexOf("class='adef'");

        if (pBoolColumn)
        {
            wordToDefineID = "wordCol";
            definitionSpanID = "defCol";
            startIndex = beginningIndex + beginningOffsetColumns;
            if (i > 9)
            {
                startIndex = beginningIndex + (beginningOffsetColumns + 1);//accounts for i being double digit 
            }
        }
        else
        {
            wordToDefineID = "word";
            definitionSpanID = "def";

            startIndex = beginningIndex + beginningOffsetText;
            if (i > 9)
            {
                startIndex = beginningIndex + (beginningOffsetText + 1);//accounts for i being double digit 
            }
        }
        //alert("starting loop");
        //var tempString = pText;
        
        wordToDefineID += i;
        definitionSpanID += i;
        // pText = pText.replace("class='adef'", "class='definition'");//37 spaces from the beginning of class to 
        if (boolSmallText)
        {
            pText = pText.replace("class='adef'", "class='definition' id='" + wordToDefineID + "'");//48 spaces from the beginning of class to 
        }
        else
        {
            pText = pText.replace("class='adefL'", "class='definitionLarge' id='" + wordToDefineID + "'");
        }

        // var startIndex = beginningIndex + 37;
        
        var substringText = pText.toLowerCase().substring(startIndex);
       // alert("substringText = " + substringText);
        var subEndIndex = substringText.indexOf("</a></u></span>");
        var endIndex = startIndex + subEndIndex;

        // var tempWords = pText.substring(startIndex, endIndex);
       // alert("pText = " + pText + "\nstartIndex = " + startIndex + "\nendIndex = " + endIndex);

        var tempWords = pText.slice(startIndex, endIndex);

        var tempArray = tempWords.split("'");

        var wordToDefine = tempArray[0];

        /////////////////////////look up the word in the dictionary and get its definition - put the definition into the span class tooltiptext below, the word itself in span class tooltip/////////////////////////////////

        var xmlGlossary = "";
        if (lessonType === "exam")
        {
            xmlGlossary = decryptedXMLGlossary;
        }
        else
        {
            xmlGlossary = getGlossary();///////Call getGlossary in GetXML.js
        }

        var xmlGlossaryDoc = $.parseXML(xmlGlossary);
        $xmlGlossary = $(xmlGlossaryDoc);

        var definition = "";

       // alert("wordToDefine = " + wordToDefine);
        var startingSpace = "";
        var trailingSpace = "";
        
        $xmlGlossary.find("word").each(function ()
        {
            //find and replace whitespaces the trim removes
            var regexp = /\s/g;
            var match, matches = [];
            while ((match = regexp.exec(wordToDefine)) !== null)
            {
                matches.push(match.index);
            }
            if (matches[0] == 0)
            {
                startingSpace = '\u00A0';
            }
            if (matches[matches.length - 1] == wordToDefine.length - 1) { trailingSpace = '\u00A0'; }
            if ($(this).attr("value").toUpperCase().trim() == wordToDefine.toUpperCase().trim())
            {
                definition = $(this).attr("def");
                //alert("found it: " + $(this).attr("value").toUpperCase());
            }
            // }
        });

        
        //trim the wordToDefine or the whitespaces will double, but without the addition of the whitespace none will show even without the trim
        var aTagReplacer = startingSpace + wordToDefine.trim() + trailingSpace + "<span id='" + definitionSpanID + "' class='tooltiptext'>" + definition + "</span>";
        //var aTagReplacer = startingSpace + wordToDefine.trim() + trailingSpace + "<span class=\"tooltiptext\">" + definition + "</span>";
        var aTagToReplace = "<u><a href='event:" + wordToDefine + "'>" + wordToDefine + "</a></u>";
        /////////////////////////replace <u><a href='event:wordToDefine'>wordToDefine</a></u> in the pText with the newly created span classes///////////////////

        pText = pText.replace(aTagToReplace, aTagReplacer);
        
    }

    return pText;
}

function HideHighlights()
{
    $("#hotspot").hide();
    $("#highlights").hide();
}

function UnHideHighlights()
{
    $("#hotspot").show();
    $("#highlights").show();
}

/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

//// Determine Classification Markings
function DetermineClassificationMarkings(pClassificationLevel) {
    if (boolClassified) {
        var classificationArray = [];
        classificationArray = GetFrameClassification(pClassificationLevel);
        $("div#classificationBottomMarker, div#classificationTopMarker").html(classification).css({ color: classificationColor });
    }
}

//////////////set up and display columns//////////////////////
function SetupColumns(pColumnSourceArray, frameSource)
{
    //////////////////////////////////////////////////////////column section///////////////////////////////////////////////////////////////////////
    var tableData = "";
    var columnCount = 0;
    var tableWidth = 0;
    var columnWidth = 0;
    var columnText = "";
    var columnData = "";
    var columnTop = 0;
    var columnLeft = 0;

    try
    {
        if (pColumnSourceArray.length > 0)
        {
            for (var i = 0; i < pColumnSourceArray.length; i++)
            {
                if (pColumnSourceArray[i].bldNumber == currentBuildNumber)
                {
                    
                    columnWidth = pColumnSourceArray[i].columnWidth;
                    columnTop = frameSource.columnTop;
                    columnLeft = frameSource.columnLeft;
                    if (columnCount > 0)
                    {
                        columnData += "~#~" + pColumnSourceArray[i].columnText;//add columnseparator
                    }
                    else
                    {
                        columnData = pColumnSourceArray[i].columnText;
                    }
                    columnCount++;
                }
                else
                {
                    columnCount = 0;
                }
            }
            try
            {
                if ((columnData.indexOf("class='adef'") >= 0) || (columnData.indexOf("class='adefL'") >= 0))/////////////////////check to see if definition class exists/////////////////////////////////////////////
                {                
                    var classCountSmallFont = occurrences(columnData, "class='adef'", false);
                    var classCountLargFont = occurrences(columnData, "class='adefL'", false);
                    // alert("class adef found count = " + classCount);
                    var numberDefinitionsOnPage = classCountSmallFont + classCountLargFont;
                    var boolColumn = true;
                    columnData = SetupDefinitions(columnData, numberDefinitionsOnPage, boolColumn);
                    // alert("columnData = " + columnData);
                }
            }
            catch(ex)
            {
                alert("ex = " + ex.toString());
            }
            if (columnData.length > 1)
            {
                var JsonString = "{\"columnLeft\":\"" + columnLeft + "\",\"columnTop\":\"" + columnTop + "\",\"columnWidth\":\"" + columnWidth + "\",\"ColumnData\":\"" + columnData + "\"}";
                EditorSetColumnText(JsonString);
            }

            if (numberDefinitionsOnPage > 0)//////////////find locations of the tooltips, if off of the page move down 20 px and left as necessary///////////////
            {
               // alert("numberDefinitionsOnPage" = +numberDefinitionsOnPage);
                for (var i = 0; i < numberDefinitionsOnPage; i++)
                {
                    var wordToDefineSpanID = "#wordCol"+ i;
                    var definitionSpanID = "#defCol"+ i;
                    var defSpanWidth = 220;
                    $(wordToDefineSpanID).attr("onmouseover", "HideHighlights()");
                    $(wordToDefineSpanID).attr("onmouseout", "UnHideHighlights()");
                    var wordPosition = $(wordToDefineSpanID).position();
                    var wordSpanLeft = parseInt(wordPosition.left);
                    var defPosition = $(definitionSpanID).position();
                    var definitionSpanLeft = parseInt(defPosition.left);
                    tableWidth = parseInt(columnLeft);// + (parseInt(columnWidth) * columnCount);
                    var spanTotalWidth = wordSpanLeft + definitionSpanLeft + defSpanWidth + tableWidth;

                    var topAdjust = 0;
                    var leftAdjust = 0;
                    var topOffset = 20;
                    var blAdjust = false;
                    var blOffEndOfPage = false;
                    var overallHeight = 51 + parseInt(columnTop) + parseInt(wordPosition.top) + parseInt($(definitionSpanID).height());
                    var topOfViewableArea = -parseInt(columnTop) - parseInt(wordPosition.top);
		    if (overallHeight > 640)
                    {
                        blOffEndOfPage = true;
                    }
                    if (blOffEndOfPage)
                    {                        
                        topAdjust = topAdjust - parseInt($(definitionSpanID).height()) - topOffset;
                        topOffset = 0;
                        blAdjust = true;
                    }
                    if (spanTotalWidth > 984)//part is off the page 984
                    {
                        var spanAdjust = 984 - spanTotalWidth;//984 in place of 350
                        topAdjust = topAdjust + topOffset;
                        leftAdjust = defPosition.left + spanAdjust;
                        blAdjust = true;
                    }
                    if (blAdjust)
                    {
                        if (topAdjust < topOfViewableArea)
                        {
                            topAdjust = topOfViewableArea;
                        }
                        if (leftAdjust == 0)
                        {
                            leftAdjust = definitionSpanLeft;
                        }

                        $(definitionSpanID).css({ top: topAdjust, left: leftAdjust, position: 'absolute' });
                    }
                }
                
            }
            
        }
    }
    catch (e)
    {
        // alert("columns error = " + e.toString())// stop the error when there are no columns
    }
    
    /////////////////////////////////////////////////////////end column section//////////////////////////////////////////////////////////////////////
}

function EditorSetColumnText(pColumnJSON)
{
    //alert(pColumnJSON);
    var obj = $.parseJSON(pColumnJSON);
    var tableData = "";
    var columnCount = 0;
    var tableWidth = 0;
    var columnWidth = 0;
    var columnText = "";
    try {
        columnWidth = obj.columnWidth;//"columnWidth":"100"
       // alert("ColumnWidth = " + columnWidth);
        var pColumnSourceArray = obj.ColumnData.split("~#~");//"ColumnData":"Column One~Column Two"  
        //columnInfo.push({ columnText: columnText, bldNumber: buildNum, columnWidth: columnWidth });
        if (pColumnSourceArray.length > 0) {
            for (i = 0; i < pColumnSourceArray.length; i++) {
                columnCount++;
                if (frames.length === 1)//fires before setting developer mode
                {
                    tableData += "<td class='border' width='" + columnWidth + "'>" + pColumnSourceArray[i] + "</td>";//////////puts column text into table data tags//////////////
                }
                else {
                    tableData += "<td width='" + columnWidth + "'>" + pColumnSourceArray[i] + "</td>";//////////puts column text into table data tags//////////////
                }
                    //alert("tableDate = " + tableData);
            }

            tableWidth = (columnWidth * columnCount) + ((columnCount - 1) * 10);

            columnText = "<table><tr>" + tableData + "</tr></table>";////////////puts all td tags into table of proper width//////////////////////

            var columnTop = (Number(obj.columnTop) - 10) + "px";//"columnTop":"0"
            var columnLeft = obj.columnLeft + "px";//"columnLeft":"54"

            placeDiv("columns", columnLeft, columnTop);//////////puts column div at required location///////////////////////Original Code
            //alert(columnText);
            $("#columns").html(columnText).show();///////puts table into column div/////////////////////Original Code
        }
    }
    catch (e) {
        alert("columns error = \n" + e.toString());// stop the error when there are no columns
    }
}


//// Media Section
function LoadMedia(pSourceMediaArray) {
    var media = "";
    var strmediaLeft = "";
    var strmediaTop = "";
    var txtMediaName = "";

    if (pSourceMediaArray.length) {
        // var mediaContainer =  document.getElementById("lessonMedia");
        //var mediaContainer = 
        $("#media").show();

        for (i = 0; i < pSourceMediaArray.length; i++)
        {
            if (pSourceMediaArray[i].bldNumber == currentBuildNumber)///////////only load media for the current build/////////////////
            {
                var txtMediaName = pSourceMediaArray[i].mediaName;
                var mediaID = pSourceMediaArray[i].mediaID;
                var mediaNameIDArray = [];
                var strGoNext = "";
                var strForceWatch = "";
                var strMediaName = "";
                mediaNameIDArray = txtMediaName.split('.');
                strMediaName = mediaNameIDArray[0].toLowerCase();
                var mediaType = mediaNameIDArray[1].toLowerCase();
                strmediaTop = Number(pSourceMediaArray[i].media_y) + intTopMarginImage + "px";
                strmediaLeft = (pSourceMediaArray[i].media_x) + "px";
                media += EmbedMedia(txtMediaName, strmediaTop, strmediaLeft, pSourceMediaArray, mediaID);////////////embed media in html according to media type///////////////////


                if (mediaType === 'mp4') {
                    if (pSourceMediaArray[i].controller == 1)//Must watch the video if controller = 1
                    {

                        $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');
                        strForceWatch = "EnableNavigationBtns();";
                        //media += "<script type='text/javascript'>document.getElementById('" + mediaID + "').addEventListener('ended', forceWatch, false); function forceWatch(e) { EnableNavigationBtns(); } </script>";
                    }

                    if (pSourceMediaArray[i].moveNext == 1)//Go to next frame when complete
                    {
                        strGoNext = "GoNextFrame();";
                        //media += "<script type='text/javascript'>document.getElementById('" + mediaID + "').addEventListener('ended', GoNextFrame, false); function GoNextFrame(e) { GoNextFrame(); } </script>";
                    }
                    media += "<script type='text/javascript'>document.getElementById('" + strMediaName + "').addEventListener('ended', endEvent, false); function endEvent(e) { " + strGoNext + strForceWatch + " } </script>";
                }
            }
        }
        
        $("#media").html(media);

        $("video").hover(function (event) {
            if (event.type === "mouseenter") {
                $(this).attr("controls", "");
            } else if (event.type === "mouseleave") {
                $(this).removeAttr("controls");
            }
        });

        //}
    }
}

//// Remediation media section
function LoadRemediationMedia() {
    ////////////////////////////////////////////////////////////remediation media section///////////////////////////////////////////////////////////////////////////////////////

    var media = "";
    var strmediaLeft = "";
    var strmediaTop = "";
    var mediaContainer = $('#media').html();
    $("#media").show();
    var txtMediaName = frames[currentFrameIndex].remMediaArray[0].mediaTitle;
    var mediaID = frames[currentFrameIndex].remMediaArray[0].mediaID;
    strmediaTop = Number(frames[currentFrameIndex].remMediaArray[0].mediaY) + intTopMarginImage + "px";
    strmediaLeft = (frames[currentFrameIndex].remMediaArray[0].mediaX) + "px";
    media += EmbedMedia(txtMediaName, strmediaTop, strmediaLeft, frames[currentFrameIndex].remMediaArray, mediaID);////////////embed media in html according to media type///////////////////
    $('#media').html(mediaContainer + media);
    ////////////////////////////////////////////////////////////end remediation media section///////////////////////////////////////////////////////////////////////////////////////

}

//////////////sets the proper spanClass on the distractors//////////////////////////////////
function DistractorSetup(i, tempIndex, OnClickFunction) {
    var text = "";
    var strIDPassed = "";
    var spanClass = "a";
    numTimesQuestionAnswered = 0;//resets this for the next question

    // find out if in the answeredTestQuestionsArray, if so find the answer already picked and display in cyan
    for (var count = 0; count < answeredTestQuestionsArray.length; count++) {
        if (answeredTestQuestionsArray[count].frameIndex == currentFrameIndex) {
            if (answeredTestQuestionsArray[count].answerID == frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID) {
                spanClass = "acl";
                break;
            }
        }
    }

    switch (frames[currentFrameIndex].questionType) {
        case "tf":
            text = TrueFalseSetup(i, tempIndex, spanClass);
            break;

        case "mcT":
            text = MultipleChoiceSetup(i, tempIndex, spanClass);
            break;

        case "mcI":
            text += MultipleImageSetup(i, tempIndex, spanClass);
            break;

    }

    return text;
}

/////////////////////sets up media type distractors//////////////////////
function MultipleImageSetup(i, tempIndex, pSpanClass) {
    var text = "";
    var strIDPassed = "";
    var spanClass = "";

    if (pSpanClass === "acl") {
        spanClass = "imgDistractorClicked";//image distractor clicked in final review questions///////////////
    }
    else {
        spanClass = "mediaClass";
    }

    switch (i) {
        case 0:
            strIDPassed = "'A-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = "A";
            value =  frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText, strIDPassed, strID, tempIndex, spanClass, value);
            break;

        case 1:
            strIDPassed = "'B-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = "B";
            value = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText, strIDPassed, strID, tempIndex, spanClass, value);
            break;

        case 2:
            strIDPassed = "'C-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = "C";
            value = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText, strIDPassed, strID, tempIndex, spanClass, value);
            break;

        case 3:
            strIDPassed = "'D-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = "D";
            value = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText, strIDPassed, strID, tempIndex, spanClass, value);
            break;
    }

    return text;
}

////////////sets up true false distractors////////////////
function TrueFalseSetup(i, tempIndex, pSpanClass)
{
    var text = "";
    var spanClass = pSpanClass;


    switch (i) {
        case 0:
            strIDPassed = "'A-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='A' value='" + strID + "'> " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

        case 1:
            strIDPassed = "'B-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='B' value='" + strID + "'> " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

    }

    return text;
}

////////////sets up multiple choice text distractors////////////////////
function MultipleChoiceSetup(i, tempIndex, pSpanClass)
{
    var text = "";
    var strIDPassed = "";
    var spanClass = pSpanClass;

    switch (i) {
        case 0:
            strIDPassed = "'A-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='A' value='" + strID + "'>A) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

        case 1:
            strIDPassed = "'B-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='B' value='" + strID + "'>B) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

        case 2:
            strIDPassed = "'C-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='C' value='" + strID + "'>C) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

        case 3:
            strIDPassed = "'D-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='D' value='" + strID + "'>D) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

        case 4:
            strIDPassed = "'E-" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID + "')";
            strID = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerID;
            text = "<span class='distractorClass " + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='E' value='" + strID + "'>E) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
            break;

    }
    return text;
}

////////generates random number for use in randomizing the distractors//////////////////
function RandomGenerator(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

//////////format text for html instead of flash//////////////
function NormalTextFormatter(pStrToFormat) {
    var strReturnString = "";
    var strTempString = "";

    pStrToFormat = pStrToFormat.replace(/~quote/g, '"'); 

    pStrToFormat = pStrToFormat.replace(/<B>/g, "<b>");
    strTempString = pStrToFormat.replace(/<\/B>/g, "</b>");
    strReturnString = strTempString;
    return strReturnString;

}

/////////////format text according to the build - gray out previous build text//////////////////////
function BuildTextFormatter(pStrToFormat) {
    var strReturnString = "";

    pStrToFormat = pStrToFormat.replace(/<u><a href='event:/g, "<span class='g");///////removes the a tag from the inactive build text to prevent broken hyperlinks in the inactive build text
    pStrToFormat = pStrToFormat.replace(/<\/a><\/u>/g, "<\/span>");
    pStrToFormat = pStrToFormat.replace(/class='tn'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='th'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='a'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ax'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='aL'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='an'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='anL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='ae'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='aeL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='ad'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='adL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='ar'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='arL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='adef'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='adefL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='aalt'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='aaltL'>/g, "class='agL'>");
    pStrToFormat = pStrToFormat.replace(/class='ah0'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ah1'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ah2'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ah3'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ah4'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='ah5'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='j'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jn'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jnL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='je'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jeL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jd'>/g, "class='ag'>");
    pStrToFormat = pStrToFormat.replace(/class='jdL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jr'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jrL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jdef'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jdefL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jalt'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jaltL'>/g, "class='jgL'>");
    pStrToFormat = pStrToFormat.replace(/class='jh0'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jh1'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jh2'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jh3'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jh4'>/g, "class='jg'>");
    pStrToFormat = pStrToFormat.replace(/class='jh5'>/g, "class='jg'>");


    pStrToFormat = pStrToFormat.replace(/<B>/g, "<b>");
    pStrToFormat = pStrToFormat.replace(/<\/B>/g, "</b>");
    pStrToFormat = pStrToFormat.replace(/~quote/g, '"');
    pStrToFormat = pStrToFormat.replace(/<U>/g, "<u>");
    pStrToFormat = pStrToFormat.replace(/<\/U>/g, "</u>");


    strReturnString = pStrToFormat;
    return strReturnString;
}

////////////embeds the media in media type distractors to show them properly/////////////////////////
function EmbedMediaDistractor(pTxtMediaName, strIDPassed, strID, tempIndex, className, value)
{
    //"<span class='" + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='A' value='" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].correct + "'>" + EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText) + "</span>";
    // returnMediaString = "<img class='mediaClass' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "'  src='" + "Content/" + lessonIdentifier + "_media/" + pTxtMediaName + "' />";
    
    var returnMediaString = "";
    if ((className === "imgDistractorClicked") || (className === "imgAnswerIncorrect") || (className === "imgAnswerCorrect") || (className === "distractorQuestionAnswered"))
    {
        
        returnMediaString = "<img class='" + className + "' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "'  src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='" + strID + "' value='" + value + "'>";
    }
    else
    {
        returnMediaString = "<img class='distractorClass " + className + "' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "'  src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='" + strID + "' value='" + value + "'>";
    }

    return returnMediaString;
}

////////////embeds the media in media type distractors to show them properly/////////////////////////
function EmbedMediaDistractorAnswered(pTxtMediaName, strIDPassed, strID, tempIndex, className)
{
    //"<span class='" + spanClass + "' onClick=\"" + OnClickFunction + strIDPassed + ";\" id='A' value='" + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].correct + "'>" + EmbedMediaDistractor(frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText) + "</span>";
    // returnMediaString = "<img class='mediaClass' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "'  src='" + "Content/" + lessonIdentifier + "_media/" + pTxtMediaName + "' />";

    var returnMediaString = "<img class='" + className + "' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "'  src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' >";
    return returnMediaString;
}

////////////embed media in html according to media type///////////////////
function EmbedMedia(pTxtMediaName, pStrMediaTop, pStrMediaLeft, pMediaArray, pMediaID)
{
    var returnMediaString = "";
    var strMediaType = "";
    var mediaNameArray = [];
    var strLoop = "";
    var strControls = "";
    var mediaID = "";
    var autoPlay = "";
    try
    {
        var index = 0;
        var blMediaFound = false;
        for (var i = 0; i < pMediaArray.length; i++)
        {
            //if(pMediaArray[i].mediaName == pTxtMediaName)
            if (pMediaArray[i].mediaID == pMediaID)
            {
                index = i;
		        blMediaFound = true;
                break;
            }
        }
        if (pMediaArray[index].loop == 1)
        {
            strLoop = "loop ";
        }
        if (pMediaArray[index].controller == 1)//Must watch the video if controller = 1
        {
            strControls = "controls";
        }
        if (pMediaArray[index].autoplay == 1)
        {
            autoPlay = "autoplay ";
        }
        else
        {
            autoPlay = "controls";
        }
        if (!blMediaFound)  //hotspot media
        {
            autoPlay = "autoplay ";
        }
    }
    catch(e)
    {
        //alert("error in EmbedMedia = " + e.toString());///////suppress the error////////
    }

    mediaNameArray = pTxtMediaName.split('.');
    strMediaType = mediaNameArray[1].toLowerCase();
    mediaID = mediaNameArray[0].toLowerCase();

    switch (strMediaType) {
        case "png":
        case "jpg":
            returnMediaString = "<img class='mediaClass' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + "' src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' />";
            //returnMediaString = "<img class='mediaClass' title='" + pTxtMediaName + "' alt='" + pTxtMediaName + "' src='" + "Content/" + lessonIdentifier + "_media/" + pTxtMediaName + "' />";
            return returnMediaString;
            break;

        case "swf":
            GetMediaSize(pTxtMediaName);
            returnMediaString = "<object id='" + mediaID + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0'  width='" + mediaWidth + "' height='" + mediaHeight + "' ><param name='wmode' value='transparent' /><param name='movie' value='" + mediaPath + "\\" + lessonIdentifier + "_media\\" + pTxtMediaName + "' /><embed src='" + mediaPath + "\\" + lessonIdentifier + "_media\\" + pTxtMediaName + "' width='" + mediaWidth + "' height='" + mediaHeight + "' wmode='transparent' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + ";type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='" + mediaPath + "\\" + lessonIdentifier + "_media\\" + pTxtMediaName + "' /></object>";
            
            return returnMediaString;
            break;

        case "mp3":
            returnMediaString = "<audio controls " + autoPlay + " id='" + mediaID + "' class='mp3ControllerLocation'><source src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' type='audio/mpeg'>Your browser does not support the audio element.</audio>";
            return returnMediaString;
            break;

        case "mp4":
            //returnMediaString = "<video controls autoplay><source src='Content/" + lessonIdentifier + "_media/" + pTxtMediaName + "' type='video/mp4' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + "'>Your browser does not support the video tag.</video> ";
            //returnMediaString = "<video autoplay><source src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' type='video/mp4" + "' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + "'>Your browser does not support the video tag.</video> ";
            returnMediaString = "<video " + autoPlay + " id='" + mediaID + "' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + "' " + strLoop + strControls + "><source src='" + mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName + "' type='video/mp4'>Your browser does not support the video tag.</video> ";
            return returnMediaString;
            break;

        case "flv":
            alert("Flash flv media not supported in this application");
            break;

        case "pdf":
            var fileName = mediaPath + "/" + lessonIdentifier + "_media/" + pTxtMediaName;
            window.open(fileName);
            break;
        case "htm":
        case "html":
            //alert("htm file located");
            try{
                var aryHtmlSize = pTxtMediaName.split("_");
                var intHtmlWidth = aryHtmlSize[aryHtmlSize.length-2].toString();
                var intHtmlHeight = aryHtmlSize[aryHtmlSize.length - 1].toString().replace(".htm", "").replace(".html", "");
            } catch (e) { alert("Html naming not properly formatted to determine page size");}
            returnMediaString = "<div id='" + mediaID + "' style='position: absolute; top:" + pStrMediaTop + "; left:" + pStrMediaLeft + "'><object data='" + pTxtMediaName + "' type='text/html' style='width:" + intHtmlWidth + "px; height:" + intHtmlHeight + "px;'></object></div> ";
            //alert(returnMediaString);
            return returnMediaString;
            break;
    }
}

/////gets the swf/html size from the media name//////////////
function GetMediaSize(pTxtMediaName)
{
    //mediaWidth : mediaHeight
    var mediaSizeArray = [];
    mediaSizeArray = pTxtMediaName.split('_');
    mediaWidth = mediaSizeArray[mediaSizeArray.length - 2];

    mediaSizeArray = mediaSizeArray[mediaSizeArray.length - 1].split('.');

    mediaHeight = mediaSizeArray[0];
}

//////back button clicked/////////////////
function MoveBackward() {
    //enable forward button to prevent problem with unanswered question links when it is disabled
    $("a.forwardBtn").prop("disabled", false).removeAttr('style');
    jumpToHiddenFrameID = "";
    if (strMoveForwardType === "ShowCritiques")
    {
       // alert("called MoveBackward currentCritiqueIndex before subtraction = " + currentCritiqueIndex);
        currentCritiqueIndex--;
        currentCritiqueIndex--;

        ShowCritiques();
    }
    else
    {
        if (currentFrameIndex > 0)
        {
            boolMoveForward = false;
            MoveFrame();
        }
    }    
}

///////////clear all answers when a new answer has been clicked, allows re-formatting of distractors//////////////////
function ClearAllAnswers() {
    var spanClass = "a distractorClass";
    var target = "";

    if (frames[currentFrameIndex].questionType === "hs")
    {
        $target = $(".hotspot").css("border-color", "#FFFFFF");
    }
    else
    {

        for (i = 0; i < frames[currentFrameIndex].questionArray[0].answerArray.length; i++)///////find all answers so they can be cleared/////////
        {
            switch (i)
            {
                case 0:
                    target = document.getElementById('A');
                    break;

                case 1:
                    target = document.getElementById('B');
                    break;

                case 2:
                    target = document.getElementById('C');
                    break;

                case 3:
                    target = document.getElementById('D');
                    break;

                case 4:
                    target = document.getElementById('E');
                    break;

            }

            target.setAttribute('class', spanClass);
        }
    }

}

/////////used with final review questions//////////////////
function ClickedTestAnswer(e) {
    ClearAllAnswers();

    for (var i = 0; i < answeredTestQuestionsArray.length; i++) {
        if (answeredTestQuestionsArray[i].frameIndex == currentFrameIndex) {
            //take out of array
            answeredTestQuestionsArray.splice(i, 1);
            break;
        }
    }    

    var tempArray = [];
    tempArray = e.split('-');
    var targetID = tempArray[0];    
    var answerID = tempArray[1];

    ////////////////////////////put the currentFrameIndex and the answerID into the answeredTestQuestionsArray
    answeredTestQuestionsArray.push({ frameIndex: currentFrameIndex, answerID: answerID });

    if (targetID === "hs")
    {
        targetID = "#hotSpotAnswer" + answerID;
        $target = $(targetID).css("border-color", "#00FFFF");
        
    }
    else
    {
        var target = document.getElementById(targetID);
        //  var value = target.getAttribute('value');
        var spanClass = "";

        $text = $("#answers");
        textPosition = $text.position();

        if (frames[currentFrameIndex].questionType === "mcI")
        {
            spanClass = "imgDistractorClicked";
        }
        else
        {
            spanClass = "acl";
        }
        //turn distractor cyan
        target.setAttribute('class', spanClass);////////////if image question use class .imgDistractorClicked///////////////////////////////
    }
}

///////////used with hotspot topic review questions///////////
function CheckHSReviewAnswer(e)
{
    boolHotSpot = true;
    var tempArray = [];
    tempArray = e.split('-');
    var targetAnswerID = tempArray[1];

    var targetID = "#hotSpotAnswer" + targetAnswerID;
    //var target = document.getElementById(targetID);
    $target = $(targetID);
    var numDistractors = frames[currentFrameIndex].questionArray[0].answerArray.length;
    var value = 0;
    var spanClass = "";//used for the remediation text
    var hsSpanClass = "";//used for the hotspot border
    var answerIndex = 0;//used for distractor remediation
    var correctAnswerID = "#hotSpotAnswer";//used to mark the correct answer after final allowed attempt


    //$text = $("#text");
    $text = $("#remediationContainer");
    textPosition = $text.position();

    for(i = 0; i < numDistractors; i++)
    {
        if(frames[currentFrameIndex].questionArray[0].answerArray[i].answerID == targetAnswerID)
        {
            value = frames[currentFrameIndex].questionArray[0].answerArray[i].correct;
            answerIndex = i;            
        }
        if(frames[currentFrameIndex].questionArray[0].answerArray[i].correct == 1)
        {
            correctAnswerID += frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
        }
    }

    if (jQuery.inArray(currentFrameIndex, questionsVisitedArray) === -1)//question hasn't been visited
    {
        if (numDistractors > 2)
        {
            if (numTimesQuestionAnswered >= 1)
            {
                //$("#remediation").remove();
                $(".remediationText").remove();
                $(".remediationTextextra").remove();
            }
            if (numTimesQuestionAnswered <= 1)
            {

                if (value == 1) //answer correct
                {
                    //re-enable nav buttons since question has been answered correctly
                    EnableBackButton();
                    $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                    spanClass = "acor";
                    hsSpanClass = "imgAnswerCorrect";                    

                    //turn distractor hotspot green
                    $target.css("border-color", "#00FF00");
                    $target.css("background-color", "#00FF00");
                    $target.css("opacity", "0.3");
                     
                    $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].posFeedback + "</span></div>").appendTo($text);
                    $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                        "class": spanClass
                    }));//.html)//(frames[currentFrameIndex].questionArray[0].posFeedback));
                    questionsVisitedArray.push(currentFrameIndex);
                    numTimesQuestionAnswered = 0;
                }
                else//answer incorrect
                {
                    spanClass = "awng";
                    hsSpanClass = "imgAnswerIncorrect";
                    
                    //turn distractor red
                    $target.css("border-color", "#FF2B30");
                    $target.css("background-color", "#FF2B30");
                    $target.css("opacity", "0.3");
                 
                    if (numTimesQuestionAnswered < 1)
                    {                        
                        var distractorRemediationText = frames[currentFrameIndex].questionArray[0].answerArray[answerIndex].remediation.toString();
                        $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + "Incorrect, try again <br/><br/>" + distractorRemediationText + "</span></div>").appendTo($text);
                        $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                            "class": spanClass
                        }));//.html)//(frames[currentFrameIndex].questionArray[0].posFeedback));
                    }
                    else
                    {
                        boolInRemediation = true;
                        SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
                        $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span></div>").appendTo($text);
                        if (frames[currentFrameIndex].remMediaArray[0].mediaTitle.length > 0)
                        {
                            LoadRemediationMedia();
                        }
                        if (frames[currentFrameIndex].remediation > 0)
                        {                            
                            //$remediation = $("<div id='remediation2' class='remediationTextextra'><span class = 'acl'>" + "Click Next for Remediation</span></div>").appendTo($text);
                            $text = $("#remediation");
                            $remediation = $("<span class = 'acl'>" + "<br /><br />Click Next for Remediation</span>").appendTo($text);
                            $remediation = $("#remediation").show().append($("<span />", { // Append
                                "class": spanClass
                            }));
                            strMoveForwardType = "ShowExtraRemediation";
                        }
                    }
                    if (numTimesQuestionAnswered === 1) {
                        //push question to answered question array
                        questionsVisitedArray.push(currentFrameIndex);
                        numTimesQuestionAnswered = 0;

                        ////////////////////////find correct answer and highlight it in green  
                       $correctHSAnswer = $(correctAnswerID);
                       $correctHSAnswer.css("border-color", "#00FF00");
                       $correctHSAnswer.css("background-color", "#00FF00");
                       $correctHSAnswer.css("opacity", "0.3");

                       EnableBackButton();
                       $("a.forwardBtn").prop("disabled", false).removeAttr('style');
                    }
                    numTimesQuestionAnswered++;
                }
            }
            else
            {
                numTimesQuestionAnswered = 0;
            }
        }
        else//2 distractors
        {
            if (value == 1) //answer correct
            {
                //re-enable nav buttons since question has been answered
                EnableBackButton();
                $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                spanClass = "acor";
                //turn distractor hotspot green
                $target.css("border-color", "#00FF00");
                $target.css("background-color", "#00FF00");
                $target.css("opacity", "0.3");

                $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].posFeedback + "</span></div>").appendTo($text);
                $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                    "class": spanClass
                }));//.html)//(frames[currentFrameIndex].questionArray[0].posFeedback));
                questionsVisitedArray.push(currentFrameIndex);
                numTimesQuestionAnswered = 0;

            }
            else//answer incorrect
            {
                boolInRemediation = true;
                SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
                //re-enable nav buttons since question has been answered
                EnableBackButton();
                $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                //push question to answered question array
                questionsVisitedArray.push(currentFrameIndex);
                numTimesQuestionAnswered = 0;
               
                spanClass = "awng";

                //turn selected distractor red
                $target.css("border-color", "#FF2B30");
                $target.css("background-color", "#FF2B30");
                $target.css("opacity", "0.3");

                ////////////////////////find correct answer and highlight it in green                        
                $correctHSAnswer = $(correctAnswerID);
                $correctHSAnswer.css("border-color", "#00FF00");
                $correctHSAnswer.css("background-color", "#00FF00");
                $correctHSAnswer.css("opacity", "0.3");

                $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span></div>").appendTo($text);
                $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                    "class": spanClass
                }));//.html)//(frames[currentFrameIndex].questionArray[0].posFeedback));
                if (frames[currentFrameIndex].remediation > 0)
                {
                    //$remediation = $("<div id='remediation2' class='remediationTextextra'><span class = 'acl'>" + "Click Next for Remediation</span></div>").appendTo($text);
                    $text = $("#remediation");
                    $remediation = $("<span class = 'acl'>" + "<br /><br />Click Next for Remediation</span>").appendTo($text);
                    $remediation = $("#remediation").show().append($("<span />", { // Append
                        "class": spanClass
                    }));
                    strMoveForwardType = "ShowExtraRemediation";
                }

                if (frames[currentFrameIndex].remMediaArray[0].mediaTitle.length > 0)
                {
                    LoadRemediationMedia();
                }

            }
        }
    }
    else
    {
        boolInRemediation = false;
        ViewAnsweredQuestion();
    }

}


///////////used with topic review questions///////////
function CheckReviewAnswer(e)
{
    var tempArray = [];
    tempArray = e.split('-');
    var targetID = tempArray[0];
    var targetAnswerID = tempArray[1];

    var target = document.getElementById(targetID);
    var value = 0;
    var spanClass = "";
    var correctAnswerID = "";//used to mark the correct answer after final allowed attempt
    var correctClass = "acor";

    var numDistractors = frames[currentFrameIndex].questionArray[0].answerArray.length;

    for (i = 0; i < numDistractors; i++)
    {
        if (frames[currentFrameIndex].questionArray[0].answerArray[i].answerID == targetAnswerID)
        {
            value = frames[currentFrameIndex].questionArray[0].answerArray[i].correct;           
        }
        if (frames[currentFrameIndex].questionArray[0].answerArray[i].correct == 1)
        {
            correctAnswerID = frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
        }
    }

    correctAnswerID = "[value = '" + correctAnswerID + "']";    

    //$text = $("#answers");
    $text = $("#remediationContainer");
    //$text = $("#text");
    textPosition = $text.position();    

    if (jQuery.inArray(currentFrameIndex, questionsVisitedArray) === -1)//question hasn't been visited
    {
        if (numDistractors > 2)
        {
            if (numTimesQuestionAnswered >= 1)
            {
                //$("#remediation").remove();
                $(".remediationText").remove();
                $(".remediationTextextra").remove();
            }

            if (numTimesQuestionAnswered <= 1)
            {

                if (value == 1) //answer correct
                {
                    //re-enable nav buttons since question has been answered correctly
                    EnableBackButton();
                    $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                    spanClass = "acor";

                    if (frames[currentFrameIndex].questionType === "mcI")
                    {
                        target.setAttribute('class', 'imgAnswerCorrect');
                    }
                    else
                    {

                        //turn distractor green
                        target.setAttribute('class', spanClass);
                    }

                    $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].posFeedback + "</span></div>").appendTo($text);
                    $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                        "class": spanClass
                    }));
                    questionsVisitedArray.push(currentFrameIndex);
                    numTimesQuestionAnswered = 0;
                }
                else//answer incorrect
                {

                    spanClass = "awng";

                    if (frames[currentFrameIndex].questionType === "mcI")
                    {
                        target.setAttribute('class', 'imgAnswerIncorrect');
                    }
                    else
                    {
                        //turn distractor red
                        target.setAttribute('class', spanClass);
                    }

                    if (numTimesQuestionAnswered < 1)
                    {
                        var answerIndex = 0;
                        switch(targetID)
                        {
                            case "A":
                                break;
                            case "B":
                                answerIndex = 1;
                                break;
                            case "C":
                                answerIndex = 2;
                                break;
                            case "D":
                                answerIndex = 3;
                                break;
                            case "E":
                                answerIndex = 4;
                                break;
                        }
                        var distractorRemediationText = frames[currentFrameIndex].questionArray[0].answerArray[answerIndex].remediation.toString();
                        $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + "Incorrect, try again <br/><br/>" + distractorRemediationText + "</span></div>").appendTo($text);
                        // $remediation = $("#remediation").show().append($("<span />", { // Append
                        $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                            "class": spanClass
                        }));//.html)//(frames[currentFrameIndex].questionArray[0].posFeedback));
                    }
                    else
                    {
                        boolInRemediation = true;
                        SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
                        $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span></div>").appendTo($text);
                        if (frames[currentFrameIndex].remMediaArray[0].mediaTitle.length > 0)
                        {
                            LoadRemediationMedia();
                        }
                        if (frames[currentFrameIndex].remediation > 0)
                        {
                            //$remediation = $("<div id='remediation2' class='remediationTextextra'><span class = 'acl'>" + "Click Next for Remediation</span></div>").appendTo($text);
                            $text = $("#remediation");
                            $remediation = $("<span class = 'acl'>" + "<br /><br />Click Next for Remediation</span>").appendTo($text);
                            $remediation = $("#remediation").show().append($("<span />", { // Append
                                "class": spanClass
                            }));
                            strMoveForwardType = "ShowExtraRemediation";
                        }
                    }
                    if (numTimesQuestionAnswered === 1)
                    {
                        //push question to answered question array
                        questionsVisitedArray.push(currentFrameIndex);
                        numTimesQuestionAnswered = 0;



                        ////////////////////////find correct answer and highlight it in green   
                        if (frames[currentFrameIndex].questionType === "mcI")
                        {
                            $(correctAnswerID).addClass('imgAnswerCorrect');
                        }
                        else
                        {
                            //correctAnswer.setAttribute('class', 'acor');
                            $(correctAnswerID).addClass(correctClass);
                        }

                        EnableBackButton();
                        $("a.forwardBtn").prop("disabled", false).removeAttr('style');
                    }
                    
                    numTimesQuestionAnswered++;
                }
            }
            else
            {
                numTimesQuestionAnswered = 0;
            }
        }
        else//2 distractors
        {
            if (value == 1) //answer correct
            {
                //re-enable nav buttons since question has been answered
                EnableBackButton();
                $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                //turn distractor green
                spanClass = "acor";
                
                target.setAttribute('class', 'acor');
                $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].posFeedback + "</span></div>").appendTo($text);
                $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                    "class": spanClass
                }));
                questionsVisitedArray.push(currentFrameIndex);
                numTimesQuestionAnswered = 0;

            }
            else//answer incorrect
            {
                boolInRemediation = true;
                SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
                //re-enable nav buttons since question has been answered
                EnableBackButton();
                $("a.forwardBtn").prop("disabled", false).removeAttr('style');

                //push question to answered question array
                questionsVisitedArray.push(currentFrameIndex);
                numTimesQuestionAnswered = 0;

                //turn selected distractor red
                spanClass = "awng";
                target.setAttribute('class', spanClass);
                ////////////////////////find correct answer and highlight it in green                        
                $(correctAnswerID).addClass(correctClass);

                $remediation = $("<div id='remediation' class='remediationText'><span class = '" + spanClass + "'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span></div>").appendTo($text);
                $remediation = $("#remediationContainer").show().append($("<span />", { // Append
                    "class": spanClass
                }));
                if (frames[currentFrameIndex].remMediaArray[0].mediaTitle.length > 0)
                {
                    LoadRemediationMedia();
                }
                if (frames[currentFrameIndex].remediation > 0)
                {
                    $text = $("#remediation");
                    $remediation = $("<span class = 'acl'>" + "<br /><br />Click Next for Remediation</span>").appendTo($text);
                    $remediation = $("#remediation").show().append($("<span />", { // Append
                        "class": spanClass
                    }));
                    strMoveForwardType = "ShowExtraRemediation";
                }
            }
        }
    }
    else
    {
        boolInRemediation = false;
        ViewAnsweredQuestion();
    }

    //$answers.css({
    //    position: 'absolute',
    //    left: 20
    //});
    //$('#answers').css("text-align", "left");
    //$('#answers').css("display", "block");
}

///////////allows viewing of answered questions with the correct answer highlighted////////////////
function ViewAnsweredQuestion()
{
    var answerText = "";
    var text = "";
    var spanClass = "";
    var imageSpanClass = "";
    var tempIndex = 0;

    var numDistractors = frames[currentFrameIndex].questionArray[0].answerArray.length;

    $answers = $("#answers");
    $answers.empty();

    //re-enable nav buttons now that question has been answered
    EnableBackButton();
    $("a.forwardBtn").prop("disabled", false).removeAttr('style');

    if (frames[currentFrameIndex].questionType === "mcI")
    {
        answerText = "<table width='984'>";
    }
    if (frames[currentFrameIndex].questionType === "hs")
    {
        $topContainer = $("#hotspot"); //need to put into hotspot div
        $topContainer.html('');
        boolHotSpot = true;

        for (i = 0; i < frames[currentFrameIndex].questionArray[0].answerArray.length; i++)
        {
            if (frames[currentFrameIndex].questionArray[0].answerArray[i].correct == 1)
            {
                var hotSpotID = frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
                var answerLocationString = frames[currentFrameIndex].questionArray[0].answerArray[i].answerText;
                var aryAnswerCoords = answerLocationString.split('~');
                var x = Number(aryAnswerCoords[0]);
                var y = Number(aryAnswerCoords[1]);
                var width = aryAnswerCoords[3];
                var height = aryAnswerCoords[2];

                //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspot'></div>").appendTo($topContainer);
                $topContainer.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotspotAnswer'></div>");
                $HS1 = $('#hotSpotAnswer' + hotSpotID);
                // $hotspot.css({
                $HS1.css({
                    position: 'absolute',
                    left: x,// + intHotspotOffsetX,
                    top: y,// + intHotspotOffsetY,
                    width: width + 'px',
                    height: height + 'px',
                    border: '2px solid',
                    cursor: 'default',
                    borderColor: "#00FF00"
                });
                break;
            }
        }

    }
    else
    {
        var max = frames[currentFrameIndex].questionArray[0].answerArray.length;//////number of distractors - used to ensure we only can get up to that number as a random number/////////////
        tempIndexArray = [];
        for (i = 0; i < max; i++) {
            tempIndex = i;
            tempIndexArray.push(tempIndex);
        }
        // var correctAnswerID = "#";//used to mark the correct answer after final allowed attempt

        for (i = 0; i < frames[currentFrameIndex].questionArray[0].answerArray.length; i++)
        {
            tempIndex = tempIndexArray[i];

            if (frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].correct == 1)///////find correct answer and highlight it ///////////////
            {
                spanClass = "acor";
                imageSpanClass = "imgAnswerCorrect";
               // correctAnswerID += frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
            }
            else
            {
                spanClass = "a";///////incorrect answers are white//////////////////
                imageSpanClass = "mediaClass";
            }
            if (frames[currentFrameIndex].questionType === "mcI")
            {
                txtMediaName = frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText;

                switch (i)
                {
                    case 0:
                        text += "<tr><td>" + EmbedMediaDistractorAnswered(txtMediaName, 0, 0, tempIndex, imageSpanClass) + "</td>";
                        break;

                    case 1:
                        text += "<td>" + EmbedMediaDistractorAnswered(txtMediaName, 0, 0, tempIndex, imageSpanClass) + "</td></tr>";
                        break;

                    case 2:
                        text += "<tr><td>" + EmbedMediaDistractorAnswered(txtMediaName, 0, 0, tempIndex, imageSpanClass) + "</td>";
                        break;

                    case 3:
                        text += "<td>" + EmbedMediaDistractorAnswered(txtMediaName, 0, 0, tempIndex, imageSpanClass) + "</td></tr>";
                        break;
                }
            }
            else
            {
                if (numDistractors > 2)
                {
                    switch (i)
                    {
                        case 0:
                            text += "<span class='" + spanClass + "'>A) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                        case 1:
                            text += "<span class='" + spanClass + "'>B) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                        case 2:
                            text += "<span class='" + spanClass + "'>C) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                        case 3:
                            text += "<span class='" + spanClass + "'>D) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                        case 4:
                            text += "<span class='" + spanClass + "'>E) " + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                    }
                }
                else
                {
                    //alert("i = " + i);
                    var boolLetterDesignatorShow = false;
                    var letterDesignator = "";

                    if (frames[currentFrameIndex].questionType === "tf")
                    {
                        boolLetterDesignatorShow = false;
                    }
                    else
                    {
                        boolLetterDesignatorShow = true;
                    }

                    switch (i)
                    {
                        case 0:
                            if (boolLetterDesignatorShow)
                            {
                                letterDesignator = "A) ";
                            }
                            text += "<span class='" + spanClass + "'>" + letterDesignator + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;

                        case 1:
                            if (boolLetterDesignatorShow)
                            {
                                letterDesignator = "B) ";
                            }
                            text += "<span class='" + spanClass + "'>" + letterDesignator + frames[currentFrameIndex].questionArray[0].answerArray[tempIndex].answerText + "</span><br/><br/>";
                            break;
                    }
                }
            }
        }
        answerText += text;

        if (frames[currentFrameIndex].questionType === "mcI")
        {
            answerText += "</table>";
        }        

        $text = $("#text");
        textPosition = $text.position();
        try{ if ($answers.html().length < 1){}}
        catch(ex){
            $answers = $("<div id='answers'>" + answerText + "</div>").appendTo($text);
        }
       // else
        {
            $answers.html(answerText);
        }
    }    
}

////////////places image div in requested location//////////////////
function PlaceImageDiv(pStrElementID, pStrLeft, pStrTop) {
    $imageDiv = $("'#" + pStrElementID + "'");

    $imageDiv.css({
        position: 'absolute',
        left: pStrLeft + 'px',
        top: pStrTop + 'px',
        width: textWidth + 'px'
    });
}

/////////////places divs in requested location///////////////
function placeDiv(pStrElementID, pStrLeft, pStrTop) {
    var d = document.getElementById(pStrElementID);

    if (pStrElementID === "text") {
        d.style.position = "relative";
    }
    //else if (pStrElementID == "columns") {
    //    d.style.position = "absolute";
    //}

    d.style.left = pStrLeft;
    d.style.top = Number(pStrTop.replace("px", "")) + intTopMarginText + "px";
}
function EditorPlaceDiv(pJson) {
    var obj = JSON.parse(pJson);
    var pStrElementID = obj.updateText.ElementID;
    var pStrLeft = obj.updateText.TextLeft;
    var pStrTop = obj.updateText.TextTop;
    var pWidth = obj.updateText.TextWidth;
    var d = document.getElementById(pStrElementID);
    if (pStrElementID === "text") {
        d.style.position = "relative";
    }
    d.style.left = pStrLeft;
    d.style.top = Number(pStrTop.replace("px", "")) + intTopMarginText + "px";
    d.style.width = pWidth;
}
////////sets height and width on div//////////////
function SetDivHeightWidth(pStrElementID, pStrHeight, pStrWidth) {
    var d = document.getElementById(pStrElementID);
    d.style.position = "relative";
    //d.style.height = pStrHeight;
    //alert("pStrWidth = " + pStrWidth);
    d.style.width = pStrWidth;
    d.style.float = "left";
}

///////////asks user if they are ready to score their review///////////////////
function ScoreReviewQuestions() {
    $("#text").show();

    $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');

    setTimeout(
  function () {
      $("a.forwardBtn").prop("disabled", false).attr('style', 'background-position: -259px 0px');

  }, 2000);

    SetFrameTitleWithParameter("Score Review Questions");

    numQuestionsNotAnswered = totalQuestionCount - answeredTestQuestionsArray.length;

    var strPageText = "<span class='a'>You have answered " + answeredTestQuestionsArray.length + " out of " + totalQuestionCount + " questions. <br><br>";

    if (totalQuestionCount !== answeredTestQuestionsArray.length) {
        strPageText += "You have " + numQuestionsNotAnswered + " questions that you have not yet answered: <br>Questions ";

        var strUnansweredQuestionLinks = GenerateUnansweredQuestionLinks();

        strPageText += strUnansweredQuestionLinks + "<br><br>";
    }

    strPageText += "<p>If you would like to review or change your answers, use the BACK button.</p><p>If you are finished with the review questions and are ready to receive your score, then <span class='acl'>";
    strPageText += "click the NEXT button</span> to continue.</span></p><p>Once you sequence past this slide, navigation back to lesson content is disabled. In order to review the content again, the lesson must be restarted.</p><p><span class='acl'>(The FORWARD button will be enabled within 2 seconds)</span></p><p><span class='awng'>";
    strPageText += "CLICKING NEXT WILL NOT ALLOW YOU TO GO BACK AND CHANGE ANSWERS!</span></p>";

    //document.getElementById("text").innerHTML = strPageText;
    $("#text").html(strPageText);

}

/////////////Calculates and shows the quiz score//////////////////////////////////////////
function ShowScore() 
{
    $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');

    $("#text").show();

    var numCorrect = 0;
    var numIncorrect = 0;

    for (var i = 0; i < answeredTestQuestionsArray.length; i++) {
        for (var count = 0; count < frames[answeredTestQuestionsArray[i].frameIndex].questionArray[0].answerArray.length; count++) {
            if (answeredTestQuestionsArray[i].answerID == frames[answeredTestQuestionsArray[i].frameIndex].questionArray[0].answerArray[count].answerID) {
                if (frames[answeredTestQuestionsArray[i].frameIndex].questionArray[0].answerArray[count].correct == 1) {
                    numCorrect++;
                }
                else {
                    numIncorrect++;
                }
            }
        }
    }

    $("nav#left-nav a.backBtn").prop({ disabled: true });//back button must be disabled to prevent student from going back and re-answering questions

    score = Math.round(numCorrect / totalQuestionCount * 100);
    SetFrameTitleWithParameter("Review Questions Score");//////sets the frame title/////////////
    var strPageText = "<span class='a'>Review question results:<br /><br /><br />Your exam score and statistics are listed below.  If you missed any questions, clicking Next will take you to remediation.<br /><br />";
    strPageText += "Number of Questions: " + totalQuestionCount + "<br />Number of Questions Answered: " + answeredTestQuestionsArray.length + "<br />";
    strPageText += "Questions Answered Correctly: " + numCorrect + "<br />Questions Answered Incorrectly: " + (numIncorrect + numQuestionsNotAnswered) + "<br /><br />";
    strPageText += "Your Score: " + score + "%<br /><br /> <span class='acl'>Click NEXT for Remediation</span></span>";

    //document.getElementById("text").innerHTML = strPageText;
    $("#text").html(strPageText);

    if (lessonType === "exam") {
        ReportExamToWrapper();
        SendExamQuestions();
    }

    strMoveForwardType = "ShowRemediation";////////////Sets this to call ShowRemediation on the next forward button click//////////////////////////////
    CreateRemediation();///////////creates the remediation for missed questions////////////////////////
}

///////////creates the remediation for missed questions////////////////////////
function CreateRemediation() {
    $("#remediation").show();
    boolInRemediation = true;
    boolReviewQuestionRemediation = true;

    var sendVarAnswers = "";
    var questionID = "0";
    var studentDistractorChosen = "0";
    var studentAnswerCorrect = "0";
    
    //for (var i = 0; i < viewedQuestionsArray.length; i++)
    for (var i = 0; i < allQuestionsArray.length; i++)
    {
        var boolQuestionFound = false;
        var boolQuestionCorrect = false;
        //var frameIndex = viewedQuestionsArray[i];
        var frameIndex = allQuestionsArray[i];
        questionID = frames[frameIndex].frameID;

        if ((frames[frameIndex].tempType != 0) || (frames[frameIndex].tempType != 8))//removes question intro and info frames from remediation
        {
           for (var count = 0; count < answeredTestQuestionsArray.length; count++)////searches through the answered questions array to find questions answered incorrectly
            {
               if (allQuestionsArray[i] == answeredTestQuestionsArray[count].frameIndex)//found question, check to see if answered correctly
                {
                    boolQuestionFound = true;

                    for (var countAnswers = 0; countAnswers < frames[answeredTestQuestionsArray[count].frameIndex].questionArray[0].answerArray.length; countAnswers++)////searches the answers//////////
                    {

                        if (answeredTestQuestionsArray[count].answerID == frames[answeredTestQuestionsArray[count].frameIndex].questionArray[0].answerArray[countAnswers].answerID)
                        {
                            studentDistractorChosen = answeredTestQuestionsArray[count].answerID;

                            if (frames[answeredTestQuestionsArray[count].frameIndex].questionArray[0].answerArray[countAnswers].correct != 1)//answered incorrectly
                            {
                                testQuestionRemediationArray.push({ frameIndex: frameIndex, studentAnswerID: answeredTestQuestionsArray[count].answerID, bldNum: 1 });////put the question info into the remediation array//////
                                studentAnswerCorrect = 0;
                                //check to see if there is an extra remediation frame, if so add that frame to the remediation array

                                if (frames[answeredTestQuestionsArray[count].frameIndex].remediation > 0)
                                {
                                    for (bldCount = 1; bldCount <= frames[frameIndex].extraRemediationFrameArray[0].numberOfBuilds; bldCount++)
                                    {
                                        testQuestionRemediationArray.push({ frameIndex: frameIndex, studentAnswerID: -1, bldNum: bldCount });////////////adds any extra remediation frames with buildnumber/////////////
                                    }
                                }

                                boolQuestionCorrect = false;
                                break;///////////breaks out of the for loop that searches for the answers to go to the next question/////////////////////
                            }
                            else/////////answered correctly, not put into remediation array//////////////////////
                            {
                                boolQuestionCorrect = true;
                                boolQuestionFound = true;
                                studentAnswerCorrect = 1;
                                break;///////////breaks out of the for loop that searches for the answers to go to the next question/////////////////////
                            }
                        }
                    }/////end for (var countAnswers = 0; countAnswers < frames[answeredTestQuestionsArray[count].frameIndex].questionArray[0].answerArray.length; countAnswers++)///////////////
                    if (boolQuestionFound)
                    {
                        break;
                    }
                }
                else
                {
                    boolQuestionFound = false;                   
                }
            }/////////end for (var count = 0; count < answeredTestQuestionsArray.length; count++)///////////////////
            if (!boolQuestionFound)//question not found so student didn't answer the question so answerID will be 0///////////////////////
            {
                testQuestionRemediationArray.push({ frameIndex: frameIndex, studentAnswerID: 0, bldNum: 1 });////////put question info into remediation array///////////////

                studentDistractorChosen = 0;
                studentAnswerCorrect = 0;

                //check to see is there is an extra remediation frame, if so add that frame to the remediation array                      
                if (frames[frameIndex].remediation > 0)
                {
                    for (bldCount = 1; bldCount <= frames[frameIndex].extraRemediationFrameArray[0].numberOfBuilds; bldCount++)
                    {
                        testQuestionRemediationArray.push({ frameIndex: frameIndex, studentAnswerID: -1, bldNum: bldCount });////////////adds any extra remediation frames with buildnumber/////////////
                    }
                }
            }
            
            ///set the exam student answer reporting information into the array here////////////////////////////////////////////////////
            sendVarAnswers += questionID + "~#~" + studentID + "~#~" + lesson_ExamID.replace("_EXAM","") + "~#~" + lessonVersion + "~#~" + studentDistractorChosen + "~#~" + studentAnswerCorrect + "~#~" + examForm.toUpperCase() + "~#~" + endCBTTime + "~#~" + strClassID + "~#~" + strBase;

            if (i < allQuestionsArray.length - 1)
            {
                sendVarAnswers += "~~~##";
            }
        }        
    }
    //alert("sendVarAnswers = " + sendVarAnswers);
    if (lessonType === "exam")
    {
        SendStudentExamAnswers(sendVarAnswers);
    }
}

function SetupHotSpotRemediationDistractors()
{
    var hotSpotAnsweredID = 0;
    $topContainer2 = $("#hotspot"); //need to put into hotspot div
    $topContainer2.addClass('positionRelative');

    //find the answerID of the students choice
    var studentAnswerID = 0;
    for (var count = 0; count < testQuestionRemediationArray.length; count++)
    {
        if (testQuestionRemediationArray[count].frameIndex == currentFrameIndex)
        {
            studentAnswerID = testQuestionRemediationArray[count].studentAnswerID;
            break;
        }
    }

    var numDistractors = frames[currentFrameIndex].questionArray[0].answerArray.length;

    for (i = 0; i < numDistractors; i++)
    {     
        var hotSpotID = frames[currentFrameIndex].questionArray[0].answerArray[i].answerID;
        var answerLocationString = frames[currentFrameIndex].questionArray[0].answerArray[i].answerText;
        var aryAnswerCoords = answerLocationString.split('~');
        var x = Number(aryAnswerCoords[0]);
        var y = Number(aryAnswerCoords[1]);
        var width = Number(aryAnswerCoords[3]);
        var height = Number(aryAnswerCoords[2]);

        //alert("x = " + x + "   :  y = " + y + "   :   width = " + width + "   :  height = " + height);
        if (hotSpotID == studentAnswerID)
        {
            //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='imgAnswerIncorrect'\"></div>").appendTo($topContainer);
            $topContainer2.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='imgAnswerIncorrect'\"></div>");
        }
        else if (frames[currentFrameIndex].questionArray[0].answerArray[i].correct == 1)
        {
            //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='imgAnswerCorrect' \"></div>").appendTo($topContainer);
            $topContainer.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='imgAnswerCorrect' \"></div>");
        }
        else
        {
            //$hotspot = $("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotSpotReview' \"></div>").appendTo($topContainer);
            $topContainer2.append("<div style='z-index: 300;' id='hotSpotAnswer" + hotSpotID + "' class='hotSpotReview' \"></div>");
        }
         $HS = $("#hotSpotAnswer" + hotSpotID);
        $HS.css({
            position: 'absolute',
            left: x + intHotspotOffsetX,
            top: y + intHotspotOffsetY,
            width: width + 'px',
            height: height + 'px'
        });
        boolHotSpot = true;
    }
}

////////////shows remediation for missed questions/////////////////////////////
function ShowRemediation(ev)
{
    boolInRemediation = true;

    if (boolInRemediation)
    {
        $("#pageCount").html("Remediation");
    }

    //$text = $("#text");
    $text2 = $("#remediationContainer");
    if (ev !== "back")
    {
        remediationArrayIndex++;
        
    }
    if (ev === "back")
    {
       remediationArrayIndex--;
     

        if(remediationArrayIndex < 0)
        {
            remediationArrayIndex = 0;
            $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');//disable back button to prevent student from going back into the questions when in remediation

        }
    }

    if (remediationArrayIndex >= testQuestionRemediationArray.length)  
    {
        if (!boolReviewQuestionRemediation)
        {
            strMoveForwardType = "";
            MoveForward();
            return;
        }
        //alert("Index >= testQuestionRemediationArray.length");

        $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');//no more remediation to show
        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');////disable back button to prevent student from going back into the lesson when remediation is finished/////////////////

        
        //alert("No more remediation to show");//////////////////////call a function to bring up end of lesson page
        ClearAllItems();
        CallEndOfLesson();

        return;
    }

    ///////////////////////////////////Check the student answer for -1, if it is -1 then this is an extra remediation frame and should be handled differently////////////////////////////////
    ClearAllItems();

    if (testQuestionRemediationArray[remediationArrayIndex].studentAnswerID === -1)
    {
        var extraRemediationforward = true;
        if (ev === "back")
        {
            extraRemediationforward = false;
        }

        ShowExtraRemediation(testQuestionRemediationArray[remediationArrayIndex].frameIndex, extraRemediationforward);
    }
    else
    {
        boolExtraRemediation = false;
        //// Access testQuestionRemediationArray with remediationArrayIndex to get the remediation to show.
        currentFrameIndex = testQuestionRemediationArray[remediationArrayIndex].frameIndex;
        
        currentBuildNumber = 1;
        
        DetermineClassificationMarkings(frames[currentFrameIndex].classificationLevel);
        SetFrameTitleWithParameter(frames[currentFrameIndex].title + " Remediation");
        DisplayText(frames[currentFrameIndex], frames[currentFrameIndex].textArray);
        
        LoadMedia(frames[currentFrameIndex].mediaArray);//original question media     
        SetHighlights(frames[currentFrameIndex].highlightArray, currentBuildNumber, "canvas");
        SetupColumns(frames[currentFrameIndex].columnsArray, frames[currentFrameIndex]);//////////////set up and display columns//////////////////////
        SetHotSpots(frames[currentFrameIndex].hotSpotsArray, currentBuildNumber);///////////////display hot spots/////////////////////////
        ExternalLinkSetup(frames[currentFrameIndex]);/////////////setup external link////////////////////
        if (frames[currentFrameIndex].questionType === "hs")
        {
            SetupHotSpotRemediationDistractors();
        }
        else
        {
            SetupRemediationDistractors();
        }
       

        var remediationText = "<div id='remediation' class='remediationTextReview'><span class='awng'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span></div>";

        if (frames[currentFrameIndex].remediation > 0)
        {            
            //remediationText.replace("</div>", "");
            remediationText = "<div id='remediation' class='remediationTextReview'><span class='awng'>" + frames[currentFrameIndex].questionArray[0].negFeedback + "</span><br /><br /><span class='acl'>" + "Click Next for Remediation" + "</span></div>";
            
            //alert("remediationText = " + remediationText);
        }
        $text2.html(remediationText).show();
        //$remediation = $(remediationText).appendTo($text2);
        //$remediation = $("#remediationContainer").show();//.append($("<span />", { // Append
        //        "class": "awng"
        //    }));
        //$remediation.css({
        //    position: 'absolute',
        //    top: 745 //500
        //});
        //$('#answers').css("text-align", "left");
        //$('#answers').css("display", "block");

        // remediation media section
        if (frames[currentFrameIndex].remMediaArray[0].mediaTitle.length > 0)
        {
            LoadRemediationMedia();
        }
    }
}

////////////////Sets student name for critiques///////////////
function SetCritiqueStudentName(val)
{
    critiqueStudentName = val;    
}

function CritiqueSetRating(val)
{
    //alert("currentCritiqueIndex = " + currentCritiqueIndex);
    var strCritiqueRating = val;

    critiquesArray[currentCritiqueIndex - 1].critiqueRating = strCritiqueRating;

    if (val > 2)
    {
        clearCritiqueCommentDefaultText();
        EnableForwardButton();
        if(currentCritiqueIndex > 1)
        {
            EnableBackButton();
        }
    }
    else
    {
        var textValue = $("#critiqueComment").text();
        if (textValue.length < 5) {
            DisableNavigationBtns();
            $("#critiqueComment").html("Please enter comments to enable navigation");
        }
        //alert("Please enter comments then click outside the comment entry box to enable navigation");
        //alert("Please enter comments to enable navigation");
    }
}
function clearCritiqueCommentDefaultText()
{
    var textValue = $("#critiqueComment").text();
    if (textValue === "Please enter comments to enable navigation")
    {
        $("#critiqueComment").html("");
    }
}
function SetCritiqueComment(val)
{    
    var strCritiqueComment = val;
   
    critiquesArray[currentCritiqueIndex - 1].critiqueComment = strCritiqueComment;

    //if (critiquesArray[currentCritiqueIndex - 1].critiqueRating > 0)
    var textValue = $("#critiqueComment").text();
    if((val.length > 4) && (textValue != "Please enter comments to enable navigation") && (critiquesArray[currentCritiqueIndex - 1].critiqueRating > 0))
    {
        EnableForwardButton();
        if (currentCritiqueIndex > 1)
        {
            EnableBackButton();
        }
    }
}


////////////////shows critiques////////////////////////
function ShowCritiques()
{
    if (boolInCritique)
    {
        $("#pageCount").html("Critique");
    }
    var title = "";
    var text = "";
    var critiqueSyllabus = critiquesArray[0].critiqueSyllabus;
    critiqueComment = "0";
    critiqueRating = "0";

    ClearAllItems();
    DisableNavigationBtns();

    if (!critiquesViewed)///////Very beginning of critiques so show the instruction Page/////////////////
    {
        $("a.forwardBtn").prop("disabled", false).attr('style', 'background-position: -259px 0px');
        title = "Course Information";
        $("#frameTitle").html(title).show().addClass(("titleCenter"));

        text = "<span class='an'><strong>Syllabus:</strong>&nbsp;" + critiqueSyllabus + "</p><p><strong>Base:</strong>&nbsp;" + strBase + "</p><p><strong>ClassID:</strong>&nbsp;" + strClassID + "</p>";
        text += "<p><strong>Course:</strong>&nbsp;" + course + "</p><p><strong>Student Name (optional):</strong> <input type='text' onchange='SetCritiqueStudentName(this.value)'> </p><p>&nbsp;</p><p><strong>Critique instructions:</strong></p>";
        text += "<ul><li>If you assign a rating below 'Good' to a critique item, you must enter comments.</li><li>After answerinng all critique items, you will have the opportunity to review you choices and make changes.</li></ul></span>";

        $("#text").html(text).show();

        currentCritiqueIndex++;//////////advance to first section of critiques/////////////
    }
    else
    {       
        if (currentCritiqueIndex <= critiquesArray.length - 1)
        {
            endCBTTime = GetCBTTime("End");
            //set the endCBTTime to the end of the exam
            critiquesArray[currentCritiqueIndex].endCBTTime = endCBTTime;
            critiquesArray[currentCritiqueIndex].critiqueStudentName = critiqueStudentName;

            title = critiquesArray[currentCritiqueIndex].questionTitle + " (" + critiquesArray[currentCritiqueIndex].critiqueTitle + ")";
            $("#frameTitle").html(title).show().addClass(("titleCenter"));

            text = "<form><span class='an'><p>" + critiquesArray[currentCritiqueIndex].questionText + "</p>";

            if (critiquesArray[currentCritiqueIndex].critiqueRating === 0)
            {
                text += "<p><label><input type='radio' name='rating' value='1' onchange='CritiqueSetRating(this.value)'>&nbsp;Unsatisfactory</label></p>";
                text += "<p><label><input type='radio' name='rating' value='2' onchange='CritiqueSetRating(this.value)'>&nbsp;Fair</label></p><p><label><input type='radio' name='rating' value='3' onchange='CritiqueSetRating(this.value)'>&nbsp;Good</label></p>";
                text += "<p><label><input type='radio' name='rating' value='4' onchange='CritiqueSetRating(this.value)'>&nbsp;Excellent</label></p><p><label><input type='radio' name='rating' value='5' onchange='CritiqueSetRating(this.value)'>&nbsp;Outstanding</label></p>";
            }
            else
            {
                EnableForwardButton();
                if (currentCritiqueIndex > 0)
                {
                    EnableBackButton();
                }
                var answeredRating = critiquesArray[currentCritiqueIndex].critiqueRating;

                for(var i = 1; i <= 5; i++)
                {
                    var ratingValue = i;
                    var ratingText = "";
                    var checked = "";
                    if(i == answeredRating)
                    {
                        checked = "checked='checked'";
                    }

                    switch(i)
                    {
                        case 1:
                            ratingText = "Unsatisfactory";
                            break;
                        case 2:
                            ratingText = "Fair";
                            break;
                        case 3:
                            ratingText = "Good";
                            break;
                        case 4:
                            ratingText = "Excellent";
                            break;
                        case 5:
                            ratingText = "Outstanding";
                            break;
                    }

                    text += "<p><label><input type='radio' name='rating' value='" + i + "'onchange='CritiqueSetRating(this.value)' " + checked + ">&nbsp;" + ratingText + "</label></p>";
                }
            }
            text += "<p>Comments:</p></span><p><textarea id='critiqueComment' rows='10' cols='100' name='critiqueComment' onfocus='clearCritiqueCommentDefaultText()' oninput='SetCritiqueComment(this.value)'>" + critiquesArray[currentCritiqueIndex].critiqueComment + "</textarea></p></form>";
            $("#text").html(text).show();

            currentCritiqueIndex++;           
        }
        else///////show end of critique page
        {
            if (currentCritiqueIndex > 0)
            {
                EnableBackButton();
            }
            $("a.exitBtn").prop("disabled", false).attr('style', 'background-position: -392px 0px');

            title = "Critique Ratings Review";
            $("#frameTitle").html(title).show().addClass(("titleCenter"));

            text = "<span class='an'><p>Thank you for completing the critique. Click the EXIT button to submit your ratings.</p><p><strong>Syllabus:</strong>&nbsp;" + programID + "</p>";
            text += "<p><strong>Base:</strong>&nbsp;" + strBase + "</p><p><strong>ClassID:</strong>&nbsp;" + strClassID + "</p><p><strong>Academic Course:</strong>&nbsp;" + course + "</p><p><strong>Instructor: </strong>N/A</p>";

            ///////////////put in question title and ratings////////////////

            for (var i = 0; i < critiquesArray.length; i++)
            {

                var critiqueScore = ConvertCritiqueScore(critiquesArray[i].critiqueRating);
                
                text += "<p><strong>" + critiquesArray[i].questionTitle + " (" + critiquesArray[i].critiqueTitle + "):</strong>&nbsp;<em>" + critiqueScore + "</em></p>";
                
            }

            text += "</span></br></br></br></br>";

            $("#text").html(text).show();
            currentCritiqueIndex++;
        }              
    }
}

function ConvertCritiqueScore(critiqueAnswer)
{
    switch(critiqueAnswer)
    {
        case "1":
            return "Unsatisfactory";
            break;

        case "2":
            return "Fair";
            break;

        case "3":
            return "Good";
            break;

        case "4":
            return "Excellent";
            break;

        case "5":
            return "Outstanding";
            break;

    }
}
function ReportClassBaseSelection()
{
    return window.external.ShowMessage(strClassID + "~#~" + strBase, "setBase");
}

function ReportCritiques() {
    strCritiqueStudentAnswers = BuildCritiqueAnswersString();
    return window.external.ShowMessage(strCritiqueStudentAnswers, "varCritiques");
}

function BuildCritiqueAnswersString()
{
    var commentConvert = " ";
    
    //critiquesArray.push({ critiqueTitle: critiqueTitle, critiqueSyllabus: critiqueSyllabus, questionTitle: questionTitle, questionText: questionText, endCBTTime: endCBTTime, aircraft: aircraft, course: course, strBase: strBase, strClassID: strClassID, critiqueStudentName: critiqueStudentName, critiqueRating: critiqueRating, critiqueComment: critiqueComment});

    for (var i = 0; i < critiquesArray.length; i++)
    {        //                                     0                               1                                       2                                       3                                           4                                       5
        strCritiqueStudentAnswers += critiquesArray[i].endCBTTime + "~#~" + critiquesArray[i].aircraft + "~#~" + critiquesArray[i].critiqueSyllabus + "~#~" + critiquesArray[i].course + "~#~" + strBase + "~#~" + strClassID + "~#~" + "" + "~#~" + critiquesArray[i].critiqueStudentName + "~#~" + critiquesArray[i].questionText + "~#~" + critiquesArray[i].questionTitle + "~#~" + critiquesArray[i].critiqueRating + "~#~" + critiquesArray[i].critiqueComment;

        if (i < critiquesArray.length - 1)
        {
            strCritiqueStudentAnswers += "~~~##";
        }
    }

    return strCritiqueStudentAnswers;
    //alert("strCritiqueStudentAnswers = " + strCritiqueStudentAnswers);
}

////////////////shows the end of lesson slide/////////////////////////
function CallEndOfLesson() {
    ClearAllItems();

    if ((critiquesArray.length > 0) && (lessonType === "exam") && (!critiquesViewed))
    {
        strMoveForwardType = "ShowCritiques";
        MoveForward();
    }
    else
    {

        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
        $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');

        var title = "End of Lesson";

        $("#frameTitle").html(title).show();

        var text;

        if (lessonType === "exam")
        {
            text = "<span class='an'>You have completed the <span class='ae'>" + lessonTitle + "</span> exam.<br />Please exit the exam to update your records.</span>";

            $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');
        }
        else
        {
            text = "<span class='an'>You have completed the <span class='ae'>" + lessonTitle + "</span> lesson.<br />You can now exit the lesson.</span>";

          
           // $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -36px');
        }

        $("#text").html(text).show();
        $("#text").width(990);
        if (boolClassified)
        {
            lessonComplete = "true";
        }
        else
        {
            lessonComplete = "c";
        }
        EnableExitButton();
    }
}

///////shows any additional remediation frames provided////////////////
function ShowExtraRemediation(pFrameIndex, extraRemediationforward)
{
    if (!boolReviewQuestionRemediation)
    {
        //disable back button in extra remediation to solve problem of getting stuck on the question if you hit the back button
        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');//disable back button to prevent student from going back into the questions when in remediation
    }
    else
    {
       
        currentBuildNumber = testQuestionRemediationArray[remediationArrayIndex].bldNum;
    }


    boolExtraRemediation = true;
    
    

    if (currentBuildNumber > frames[pFrameIndex].extraRemediationFrameArray[0].numberOfBuilds)
    {
        strMoveForwardType = "";
        currentBuildNumber = 1;
        boolExtraRemediation = false;        
        MoveForward();
        return;
    }   

    DetermineClassificationMarkings(frames[pFrameIndex].extraRemediationFrameArray[0].classificationLevel);
    SetFrameTitleWithParameter(frames[pFrameIndex].title + " Remediation");
    LoadMedia(frames[pFrameIndex].extraRemediationFrameArray[0].remediationMediaArray);
    DisplayText(frames[pFrameIndex].extraRemediationFrameArray[0], frames[pFrameIndex].extraRemediationFrameArray[0].remTextArray);
    SetupColumns(frames[pFrameIndex].extraRemediationFrameArray[0].columnsArray, frames[pFrameIndex].extraRemediationFrameArray[0]);
    SetHotSpots(frames[pFrameIndex].extraRemediationFrameArray[0].hotSpotsArray, currentBuildNumber);///////////////display hot spots/////////////////////////
    SetHighlights(frames[pFrameIndex].extraRemediationFrameArray[0].highlightArray, currentBuildNumber, "canvas");////////////display highlights/////////////////
    ExternalLinkSetup(frames[pFrameIndex].extraRemediationFrameArray[0]);/////////////setup external link////////////////////
    SetHeadPhones(frames[pFrameIndex].extraRemediationFrameArray[0].headPhoneIcon);

    if (!boolReviewQuestionRemediation)////only do this if in topic questions
    {
        if (strMoveForwardType !== "ShowExtraRemediation")
        {
            //increment for the next remediation to be shown when the next button is clicked testQuestionRemediationArray.push({ frameIndex: frameIndex, studentAnswerID: answeredTestQuestionsArray[count].answerID });
            remediationArrayIndex++;
            
        }
        currentBuildNumber++;
    }
   
}

////////////formats distractors for remediation display//////////////////////
function SetupRemediationDistractors()
{
    try
    {
        var answerText = "";
        var studentAnswerID = 0;

    if (frames[currentFrameIndex].questionType === "mcI") {
        answerText = "<table width='984'>";
    }

    for (var count = 0; count < testQuestionRemediationArray.length; count++) {
        if (testQuestionRemediationArray[count].frameIndex == currentFrameIndex) {
            studentAnswerID = testQuestionRemediationArray[count].studentAnswerID;
            break;
        }
    }

    for (i = 0; i < frames[currentFrameIndex].questionArray[0].answerArray.length; i++) {
        var spanClass = "";//acor, awng, a

        if (frames[currentFrameIndex].questionArray[0].answerArray[i].answerID == studentAnswerID) {
            spanClass = "awng";
            imageSpanClass = "imgAnswerIncorrect";
        }
        else if (frames[currentFrameIndex].questionArray[0].answerArray[i].correct == 1) {
            spanClass = "acor";
            imageSpanClass = "imgAnswerCorrect";
        }
        else {
            spanClass = "a";
            imageSpanClass = "distractorQuestionAnswered";
        }

        if (frames[currentFrameIndex].questionType === "mcI") {
            answerText += RemediationDistractorMedia(i, imageSpanClass);
        }
        else {
            answerText += RemediationDistractorText(i, spanClass);
        }
    }

    if (frames[currentFrameIndex].questionType == "mcI") {
        answerText += "</table>";
    }

    $text = $("#text");
    textPosition = $text.position();

        $answers = $("<div />", { // Append div
            "id": "answers",
            "html": answerText
        })
        .appendTo("#text");
    }
    catch(e)
    {
        alert("error = " + e.toString());
    }
}

///////////formats remediation media type distractors /////////////////////
function RemediationDistractorMedia(i, imageSpanClass) {
    ////////////get the media name from the answer text////////////////////////////
    var txtMediaName = frames[currentFrameIndex].questionArray[0].answerArray[i].answerText;

    switch (i) {
        case 0:
            text = "<tr><td>" + EmbedMediaDistractor(txtMediaName, 0, 0, i, imageSpanClass) + "</td>";
            break;

        case 1:
            text = "<td>" + EmbedMediaDistractor(txtMediaName, 0, 0, i, imageSpanClass) + "</td></tr>";
            break;

        case 2:
            text = "<tr><td>" + EmbedMediaDistractor(txtMediaName, 0, 0, i, imageSpanClass) + "</td>";
            break;

        case 3:
            text = "<td>" + EmbedMediaDistractor(txtMediaName, 0, 0, i, imageSpanClass) + "</td></tr>";
            break;
    }

    return text;
}

////////////use the spanClass to format the distractors properly////////////////
function RemediationDistractorText(i, spanClass) {
    var text = "";

    switch (i) {
        case 0:
            text = "<span class='" + spanClass + "' id='A' >A) " + frames[currentFrameIndex].questionArray[0].answerArray[i].answerText + "</span><br><br>";
            break;

        case 1:
            text = "<span class='" + spanClass + "' id='B' >B) " + frames[currentFrameIndex].questionArray[0].answerArray[i].answerText + "</span><br><br>";
            break;

        case 2:
            text = "<span class='" + spanClass + "' id='C' >C) " + frames[currentFrameIndex].questionArray[0].answerArray[i].answerText + "</span><br><br>";
            break;

        case 3:
            text = "<span class='" + spanClass + "' id='D' >D) " + frames[currentFrameIndex].questionArray[0].answerArray[i].answerText + "</span><br><br>";
            break;

        case 4:
            text = "<span class='" + spanClass + "' id='E' >E) " + frames[currentFrameIndex].questionArray[0].answerArray[i].answerText + "</span><br><br>";
            break;

    }
    return text;
}

////////////////////Creates links to the questions that have not been answered yet//////////////
function GenerateUnansweredQuestionLinks() {
    var strQuestionLinkReturn = "";

    ////////////////////////////////////////////////////////////////////////create the links here//////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < allQuestionsArray.length; i++)
    {
        var intIndexToSetLink = 0;
        var boolFound = false;

        for (var count = 0; count < answeredTestQuestionsArray.length; count++) {

            if (answeredTestQuestionsArray[count].frameIndex == allQuestionsArray[i])////////question was answered, Don't create a link///////////////
            {
                boolFound = true;
            }

        }
        if (!boolFound)////////question wasn't answered, Create a link///////////////
        {
            intIndexToSetLink = allQuestionsArray[i];
            strQuestionLinkReturn += "<a href='#' onClick='ViewSpecificFrame(" + intIndexToSetLink + ")'>" + (i + 1) + "</a>, ";
            
        }
    }

    return strQuestionLinkReturn;
}

///////////////view a specific frame///////////////////////////////////////
function ViewSpecificFrame(pIntFrameNumber) {
    //enable forward button to prevent problem with unanswered question links when it is disabled
    if (pIntFrameNumber >= 0)
    {
        $("a.forwardBtn").prop("disabled", false).removeAttr('style');
        currentFrameIndex = pIntFrameNumber - 1;
        boolViewSpecificFrame = true;
        boolMoveForward = true;
        currentBuildNumber = 1;
        //alert("CurrentIndex = " + currentFrameIndex);
        MoveFrame();
        //alert("after moveframe");
    }
    else
    {
        //alert("before " + pIntFrameNumber);
    }
}

function CalculateTimeInLesson() {
    var timeDifference = endTime - startTime;

    timeDifference = timeDifference / 1000; //remove milliseconds
    timeDifference = timeDifference / 60; //remove seconds

    var timeMinutes = Math.ceil(timeDifference % 60);//get minutes
    var timeHours = Math.floor(timeDifference / 60);//get hours

    if (timeHours < 10) {
        timeInLesson = timeInLesson + "0" + timeHours + ":";
    }
    else {
        timeInLesson = timeInLesson + timeHours + ":";
    }
    if (timeMinutes < 10) {
        timeInLesson = timeInLesson + "0" + timeMinutes;
    }
    else {
        timeInLesson = timeInLesson + timeMinutes;
    }
}

function GetCBTTime(pStrTimeType) {

    if (pStrTimeType === "Start") {
        startTime = new Date();

    }
    else if (pStrTimeType === "End") {
        endTime = new Date();
        CalculateTimeInLesson();

    }


    var d = new Date();
    var cbtTime = "";
    var cbtHours = d.getHours();
    var cbtMinutes = d.getMinutes();
    var cbtSeconds = d.getSeconds();
    var cbtAMPM = "AM";

    ////////////////////format the hour portion of the time///////////////////////
    if (cbtHours > 11) {
        cbtAMPM = "PM";

        if (cbtHours > 12) {
            cbtHours -= 12;
        }
    }

    if (cbtHours < 10) {
        cbtHours = "0" + cbtHours;
    }
    /////////////////////////finished formatting the hour portion of the time//////////////////////////////////

    ///////////////////////////format the minute portion of the time////////////////////////////////////
    if (cbtMinutes < 10) {
        cbtMinutes = "0" + cbtMinutes;
    }
    /////////////////////////finished formatting the minute portion of the time//////////////////////////////////

    ///////////////////////////format the seconds portion of the time////////////////////////////////////
    if (cbtSeconds < 10) {
        cbtSeconds = "0" + cbtSeconds;
    }
    /////////////////////////finished formatting the seconds portion of the time//////////////////////////////////
    cbtTime = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " ";
    cbtTime += cbtHours + ":" + cbtMinutes + ":" + cbtSeconds + " " + cbtAMPM;

    return cbtTime;
}

/////////////////report completion info then shut down/////////////////////////////
function EndCBT()
{
    //if (lessonType == "ibt")
    //{
        //userCACID = 1;
    //}
        var reportString = "";
        var sqlProgramID = "0";

    //////////////Get the end of the CBT time/////////////////
        endCBTTime = GetCBTTime("End");

        lessonTitle = lessonTitle.replace("#", "-");

    if (lessonType !== "exam")
    {
        sqlProgramID = FindSqlProgramID();
        lessonLoc = bookmark;
        if (sourceLocation === "exeStart")
        {
            //exe launch
            reportString = lessonComplete + "#" + score + "#" + strCredit + "#" + timeInLesson + "#" + lessonLoc + "#" + beginCBTTime + "#" + endCBTTime + "#" + audioLevel + "#" + lessonTitle + "#" + bookmark + "#" + sqlProgramID + "#" + lessonVersion + "#" + lessonComplete + "#" + userCACID + "#" + syllabusID + "#" + lessonIdentifier + "#" + acesVersion;
            
        }
        else if (sourceLocation === "dlpStart")
        {
            if (lessonComplete === "i")
            {
                lessonComplete = "false";
            }
            else if (lessonComplete === "c") { lessonComplete = "true"; }
            reportString = lessonComplete + "#" + score + "#" + strCredit + "#" + timeInLesson + "#" + lessonLoc + "#" + beginCBTTime + "#" + endCBTTime + "#" + audioLevel + "#" + lessonTitle + "#" + bookmark + "#" + sqlProgramID + "#" + lessonVersion + "#" + lessonComplete + "#" + userCACID + "#" + syllabusID + "#" + lessonIdentifier + "#" + acesVersion;
        }
        else //JSON
        {
            var strJson = '{"OUTPUTFILE": {"CORE": {"Lesson_Status": "' + lessonComplete + '","Lesson_Location": "' + lessonLoc + '","Score": "' + score + '","Time": "' + timeInLesson + '"},"CORE_VENDOR": {"Test_Form": "A","Num_Test_Questions": "0"},"STUDENT_DATA": {"Audio": "100"}}}';
            reportString = strJson;
        }
        ReportToWrapper(reportString, "sendVars");
    }
}

///////////Collects comment data to be sent back to the wrapper
function Comments(pComment) {
    try
    {
        lesIdent = lessonIdentifier;
        thisTopIndex = frames[currentFrameIndex].topicID;
        selFrame = currentFrameIndex;
        classID = strClassID;
        uName = userCACID;   // studentName;//? - user name
        prog = programID;
        lesID = lessonID;
        segID = frames[currentFrameIndex].segmentID;
        seg_name = frames[currentFrameIndex].segmentTitle;
        topID = frames[currentFrameIndex].topicID;
        top_name = frames[currentFrameIndex].topicTitle;
        frmID = frames[currentFrameIndex].frameID.replace("t","");
        frmName = frames[currentFrameIndex].title;
        mnuTitle = frames[currentFrameIndex].menuTitle;
        comment = pComment; //user comments   
        if (frames[currentFrameIndex].frameID.indexOf("t") !== -1)
        {
            comment = "[Topic Frame] " + comment;
        }
        var base = "DLP";

        if ((ddlBaseSelect).val() !== null)
        {    
            base = ddlBaseSelect.val();
        }

        var comments = lesIdent + "#" + thisTopIndex + "#" + selFrame + "#" + classID + "#" + uName + "#" + prog;
        comments += "#" + lesID + "#" + segID + "#" + seg_name + "#" + topID + "#" + top_name + "#" + frmID + "#" + frmName;
        comments += "#" + mnuTitle + "#" + comment + "#" + base;
        var JSONcomments = '{"lessonIdentity":"' + lesIdent + '","topicIndex":"' + thisTopIndex + '", "selectedFrame":"' + selFrame + '", "classID":"' + classID + '", "studentName":"' + uName + '", "programName":"' + prog + '",';
        JSONcomments += '"lessonID":"' + lesID + '", "segmentID":"' + segID + '", "segmentID":"' + seg_name + '", "topicID":"' + topID + '", "topicName":"' + top_name + '", "frameID":"' + frmID + '", "frameName":"' + frmName + '", ';
        JSONcomments += '"menuTitle":"' + mnuTitle + '", "comment":"' + comment + '", "base":"' + base + '"}';
        // alert("CommentString = " + comments);

        ReportToWrapper(comments, "comments");
    }
    catch(e)
    {
        //prevent error if comment tried from splash screen
    }
}

function RunTools(pToolIndex)//////Receives an int containing the index of the tool to run from the options menu///////////////
{
    ReportToWrapper(pToolIndex, "tools");
}

function ReportExamToWrapper() {
    examData = beginCBTTime + "~#~" + endCBTTime + "~#~" + score + "~#~" + examForm.toUpperCase() + "~#~" + timeInLesson + "~#~" + strClassID + "~#~" + strBase;
    return window.external.ShowMessage(examData, "ExamReport");//process closing via the exe wrapper
}
function SendStudentExamAnswers(sendVarAnswers) {
    return window.external.ShowMessage(sendVarAnswers, "sendVarAnswers");
}
function SendExamQuestions() {
    ////////////////////////////////DO NOT CHANGE THE ORDER THESE ARE BEING SENT IN!!!!!!!!!!!!!!!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QuestionType///////////////////////////arrayIndex + 1////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  varQuestionsSent += currID + "~#~" + examID + "~#~" + examVersion + "~#~" + currStem + "~#~" + distractorArray[0] + "~#~" + distractorArray[1] + "~#~" + distractorArray[2] + "~#~" + distractorArray[3] + "~#~" + distractorArray[4] + "~#~" + currType + "~#~" + currMedia + "~#~" + correctDistractor + "~#~" + currForms + "~#~" + currLessonID + "~#~" + currObjID + "~#~" + currSOB;
    //  varQuestionsSent += "~~~##";
    ////////////////////////////////////////////
    var varQuestionsSent = "";
    //alert("Starting SenExamQuestions");
    /* OLD CODE
    for (var i = 0; i < frames.length; i++) {
        if (frames[i].tempType == 2) {
            var distractor1 = "";
            var distractor2 = "";
            var distractor3 = "";
            var distractor4 = "";
            var distractor5 = "";
            var correctDistractor = 0;
            var strTemp = "";

            for (var distractorCount = 0; distractorCount < frames[i].questionArray[0].answerArray.length; distractorCount++)//////////get the distractors
            {
                if (frames[i].questionArray[0].answerArray[distractorCount].correct == 1) {
                    correctDistractor = (distractorCount + 1);
                }
                strTemp = frames[i].questionArray[0].answerArray[distractorCount].answerText.replace(/'/g, "\\'");
                switch (distractorCount) {
                    case 0:
                        distractor1 = strTemp;
                        break;
                    case 1:
                        distractor2 = strTemp;
                        break;
                    case 2:
                        distractor3 = strTemp;
                        break;
                    case 3:
                        distractor4 = strTemp;
                        break;
                    case 4:
                        distractor5 = strTemp;
                        break;
                }
            }
            var mediaList = "";

            for (var mediaCounter = 0; mediaCounter < frames[i].mediaArray.length; mediaCounter++) {
                if (mediaCounter === 0) {
                    mediaList = frames[i].mediaArray[mediaCounter].mediaName;
                }
                else {
                    mediaList += "," + frames[i].mediaArray[mediaCounter].mediaName;
                }
            }

            strStem = frames[i].textArray[0].text;
            strQuestionStem = strStem;//$(strStem).text();

            //textArray.push({ bldNumber: bldNumber, text: text, SOB:SOB, objectiveID:objectiveID, lessonID:lessonID});
            varQuestionsSent += frames[i].frameID + "~#~" + lesson_ExamID.replace("_EXAM", "") + "~#~" + lessonVersion + "~#~" + strQuestionStem + "~#~" + distractor1 + "~#~" + distractor2 + "~#~" + distractor3 + "~#~" + distractor4 + "~#~" + distractor5 + "~#~" + frames[i].questionType + "~#~" + mediaList + "~#~" + correctDistractor + "~#~" + frames[i].forms + "~#~" + frames[i].textArray[0].lessonID + "~#~" + frames[i].textArray[0].objectiveID + "~#~" + frames[i].textArray[0].SOB;
            varQuestionsSent += "~~~##";
        }
    }
    */
    try{
        var AllQuestionFrames = [];
        $xml.find("frame").each(function (index) {
            var QuestionMedialist = "";

            //// Arrays
            var frameText = [];

            //// Frame Attributes
            var QuestionframeID = $(this).attr("id");//needed
            var QuestionFrameTempType = $(this).attr("tempType");
            var QuestionQuesType = $(this).attr("quesType");
            var QuestionForms = $(this).attr("forms");
            frameText = CreateFrameTextObject($(this));///////////////fills the text array with the frame text, enables showing the proper formatting for each build//////////////

            var distractor1 = "";
            var distractor2 = "";
            var distractor3 = "";
            var distractor4 = "";
            var distractor5 = "";
            var correctDistractor = 0;

            try {
                if (QuestionFrameTempType === "2")
                {
                    template = "question";
                    var distractorCount = 0;
                    $distractors = $(this).find('distractors');
                    $distractors.find("answers").each(function(){
                        var distractorText = $(this).text().replace("<span class='a'>", '').replace("<span class='ax'>", '');
                        distractorText = distractorText.replace('</span>', '');
                        var correct = $(this).attr('correct');
                        distractorCount++;
                        if (correct != "0")
                        {
                            correctDistractor = distractorCount;
                        }
                        switch(distractorCount)
                        {
                            case 1:
                                distractor1 = distractorText;
                                break;
                            case 2:
                                distractor2 = distractorText;
                                break;
                            case 3:
                                distractor3 = distractorText;
                                break;
                            case 4:
                                distractor4 = distractorText;
                                break;
                            case 5:
                                distractor5 = distractorText;
                                break;
                        }
                    });
                }
            }
            catch (e) {
                alert("build distractor failed\n" + e.message);
            }
            //build question string
            if (QuestionFrameTempType === "2") {
                varQuestionsSent += QuestionframeID + "~#~" + lesson_ExamID.replace("_EXAM", "") + "~#~" + lessonVersion + "~#~" + frameText[0].text + "~#~" + distractor1 + "~#~" + distractor2 + "~#~" + distractor3 + "~#~" + distractor4 + "~#~" + distractor5 + "~#~" + QuestionQuesType + "~#~" + QuestionMedialist + "~#~" + correctDistractor + "~#~" + QuestionForms + "~#~" + frameText[0].lessonID + "~#~" + frameText[0].objectiveID + "~#~" + frameText[0].SOB;
                varQuestionsSent += "~~~##";
            }
        });
    }
    catch(exception)
    {
        alert("AllQuestions error = \n" + exception.message);
    }
    /////////////////////////////////////////make the call to send it to the wrapper///////////////////////////////
    // alert("varQuestionsSent = " + varQuestionsSent); 
    return window.external.ShowMessage(varQuestionsSent, "varQuestionsSent");
}
///////////send information back to the wrapper
function ReportToWrapper(pReportString, pCommand)
{
    if(!developer)
    {
        try
        {
            //how to tell if in wrapper or not?
            if (sourceLocation === "exeStart") {
                //exe launch
                return window.external.ShowMessage(pReportString, pCommand);//process closing via the exe wrapper
            }
            else if ((sourceLocation === "dlpStart") || (sourceLocation === "t2"))
            {
                //web launch
                switch (pCommand) {
                    case "sendVars":
                        if (sourceLocation === "t2") {
                            var obj = pReportString; //JSON.parse(pReportString);
                            T2.TIMS.data.save(obj);//send output to TIMS T2
                        }
                        try {
                            var blIsAFPortal = false;
                            $.ajax({
                                type: "POST",
                                url: DLPUrl + "/DLPWebservice.asmx/CoursewareCompletion",
                                data: JSON.stringify({ Completion: pReportString }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (data) {
                                    if (sourceLocation === "t2") {
                                        T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                    }
                                    window.close();//close lesson
                                },
                                failure: function (errMsg) {
                                    if (sourceLocation === "t2") {
                                        T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                    }
                                    alert(errMsg);
                                },
                                error: function (request, status, error) {
                                    if (sourceLocation === "t2") {
                                        T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                    }
                                    //alert(request.responseText + "\n" + status.url);
                                    blIsAFPortal = true;
                                }
                            });
                            if(blIsAFPortal)
                            {
                                $.ajax({
                                    type: "POST",
                                    url: "/BRIProd/" + DLPUrl + "/DLPWebservice.asmx/CoursewareCompletion",
                                    data: JSON.stringify({ Completion: pReportString }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (data) {
                                        if (sourceLocation === "t2") {
                                            T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                        }
                                        window.close();//close lesson
                                    },
                                    failure: function (errMsg) {
                                        if (sourceLocation === "t2") {
                                            T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                        }
                                        alert(errMsg);
                                    },
                                    error: function (request, status, error) {
                                        if (sourceLocation === "t2") {
                                            T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                                        }
                                        alert(request.responseText + "\n" + status.url);
                                    }
                                });
                            }
                        }
                        catch (err) { alert("WS Error: " + err); }
                        setTimeout(function () {
                            if (sourceLocation === "t2") {
                                T2.TIMS.connection.terminate();//let TIMS T2 know lesson is closing
                            }
                            window.close();
                        }, 10000);
                        break;
                    case "comments":
                        try {
                            var blIsAFPortal = false;
                            $.ajax({
                                type: "POST",
                                url: DLPUrl + "/DLPWebservice.asmx/LessonComment",
                                data: JSON.stringify({ Response: pReportString }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (data) {  },
                                failure: function (errMsg) { alert(errMsg); },
                                error: function (request, status, error) {
                                    //alert(request.responseText + "\n" + status.url);
                                    blIsAFPortal = true;
                                }
                            });
                            if(blIsAFPortal)
                            {
                                $.ajax({
                                    type: "POST",
                                    url: "/BRIProd/" + DLPUrl + "/DLPWebservice.asmx/LessonComment",
                                    data: JSON.stringify({ Response: pReportString }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (data) { },
                                    failure: function (errMsg) { alert(errMsg); },
                                    error: function (request, status, error) {
                                        alert(request.responseText + "\n" + status.url);
                                    }
                                });
                            }
                        }
                        catch (err) { alert("WS Error: " + err); } break;
                    case "tools":
                        var aryTools = tools.split(',');
                        var strTools = aryTools[pReportString];
                        var aryToolsPath = startURL.split("index.html?");
                        var toolsPath = aryToolsPath[0] + "Tools/" + strTools;
                        window.open(toolsPath);
                        break;
                    case "extLink":                        
                        window.open(pReportString);
                        break;
                }
            }
            else
            {
                switch (pCommand) {
                    case "sendVars":
                        window.close();
                        break;
                }
            }
        }
        catch (e)
        {
            //alert("error = " + e.toString() + "pReportString = " + pReportString + "\r\n" + "pCommand = " + pCommand);
        }
    }
    else
    {
        //alert("Document loaded");
        return window.external.ShowMessage(pReportString, pCommand);//process closing via the exe wrapper
    }
}

/////Convert the cbt program ID to the sqlProgram ID to match the databsae////////////////////
function FindSqlProgramID() {
    var sqlProgramID = "0";

    switch (programID.toLowerCase()) {
        case "cso-t1":
        case "cso_t1":
            if (boolClassified) {
                sqlProgramID = "1";
            }
            else {
                sqlProgramID = "2";
            }
            break;
        case "cso-t6":
        case "cso_t6":
        case "cso":
            if (boolClassified) {
                sqlProgramID = "2";
            }
            else {
                sqlProgramID = "3";
            }
            break;
        case "rpa":
            sqlProgramID = "4";
            break;
        case "t1":
        case "t1a":
            sqlProgramID = "5";
            break;
        case "t38":
        case "t38c":
            sqlProgramID = "6";
            break;
        case "t38-iff":
            sqlProgramID = "7";
            break;
        case "t6":
            sqlProgramID = "8";
            break;
        case "t6-pit":
            sqlProgramID = "10";
            break;
        case "rpa_riq":
            sqlProgramID = "11";
            break;
        default:
            sqlProgramID = programID;
            break;

    }

    return sqlProgramID;
}

///////////////////////////Get lesson data info from TIMS/////////////////////////////
function SetBookmark() {

    //////pull in lesson bookmark data from TIMS
    if ((lessonComplete === "c") || (lessonComplete === "true"))////////if c give full nav even if xml shows sequential nav because the student is running the CBT after having completed it//////////////////
    {
        bookmark = max;
    }
    else
    {
        bookmark = lessonLoc;
    }

    if ((bookmark > 0) && (bookmark < max)) { //// Gives user choice of returning to where last left off        
        $('#bookmarkConfirmDialog').dialog('open');
    }
}

//// Build Glossary Dialog and jcarousel
//// Function is called from triggerEvents.js
function LaunchGlossary() {
    var $xml = "";
    if (lessonType !== "exam")
    {
       // alert("called getGlossary");
        $xml = getGlossary();
    }
    else
    {
         $xml = decryptedXMLGlossary;
    }
    var glossletter;
    $($xml).find("catagory").each(function (index) {
        glossletter = $(this).attr("letter");
        $(this).each(function (index) {
            $('.jcarousel ul').append($("<li />", { //// Create li for each attribute
                "class": ".ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"

            }).html(
                    $("<a />", { //// Create anchor element
                        "href": "#",
                        "title": glossletter,
                        "text": glossletter //// Anchor text
                    })));
        });
    });

    var jcarousel = $('.jcarousel').jcarousel();

    $('.jcarousel-control-prev')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=6'
        });

    $('.jcarousel-control-next')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=6'
        });


    $(function () {
        var glossDefinition;
        var glossCatagory;
        var glossValue;

        var getAccordion = function ()
        {
            $("#accordion").accordion().empty();

            $($xml).find('catagory[letter="' + glossCatagory + '"]').each(function (i)
            {
                $(this).children().each(function (index)
                { //// Loop over child elements
                    glossDefinition = $(this).attr("def"),
                    glossValue = $(this).attr("value");
                    //
                    $("#accordion").append($("<h3 />", { // append header
                    }).html($("<a />", {
                        "href": "#",
                        "html": glossValue //// Word Value
                    }))).append($("<div />", {
                        "class": "def",
                        "html": glossDefinition //// Word Definition
                    })).accordion("refresh").accordion({ active: false, collapsible: true, heightStyle: "content" });
                });
            });
        };

        $('.jcarousel ul li').on({
            mouseenter: function () {
                //$("#frameMessage").html($(this).text());
            },
            mouseleave: function () {
                //$("#frameMessage").empty();
            },
            click: function (e) {
                //$("#accordion").accordion;("destroy");
                $("#viewport").removeClass("show-bkgnd");
                glossCatagory = $(this).text();
                getAccordion(glossCatagory);
                return false;
            }
        });
    });

    //// Remove duplicate items from the list
    var hasDuplicate = {};
    $('.jcarousel ul li').each(function () {
        var dupletter = $(this).text().toLowerCase();
        if (hasDuplicate[dupletter])
            $(this).remove();
        else
            hasDuplicate[dupletter] = true;
    });

    $("#accordion").accordion({
        create: function (event, ui) {

        },

        header: "h3",
        collapsible: true,
        active: false,
        heightStyle: "content",
        autoActivate: true
    });
}

//enable forward button
function EnableForwardButton()
{
    $("a.forwardBtn").prop("disabled", false).attr('style', 'background-position: -259px 0px');
    viewedQuestionsArray.push(0);
    //strMoveForwardType = "ScoreTest";
}

//enable back button
function EnableBackButton()
{
    try {
        if (frames[currentFrameIndex].segmentType != "1") {
            $("a.backBtn").prop("disabled", false).attr('style', 'background-position: -106px 0px');
        }
    }
    catch (ex) {
            $("a.backBtn").prop("disabled", false).attr('style', 'background-position: -106px 0px');
    }
}

function DisableForwardButton()
{
    $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');
}

function DisableExitButton()
{
    $("a.exitBtn").prop("disabled", true).attr('style', 'background-position: -392px -72px');
}

function EnableExitButton()
{
    $("a.exitBtn").prop("disabled", false).attr('style', 'background-position: -392px 0px');
}

//disable navigation buttons
function DisableNavigationBtns()
{
    $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
    $("a.forwardBtn").prop("disabled", true).attr('style', 'background-position: -259px -72px');
    $("a.glossaryBtn").prop("disabled", true).attr('style', 'background-position: -53px -72px');
    $("a.versionInfo_link").prop("disabled", true);
    $("a.listMenuBtn").prop("disabled", true).attr('style', 'background-position: 0px -72px');
    $("a.exitBtn").prop("disabled", true).attr('style', 'background-position: -392px -72px');
}

//Enable navigation buttons
function EnableNavigationBtns()
{
    if (!developer)
    {
        EnableBackButton();
        $("a.forwardBtn").prop("disabled", false).attr('style', 'background-position: -259px 0px');
        if (lessonType != "exam") {
            $("a.glossaryBtn").prop("disabled", false).attr('style', 'background-position: -53px -0px');
        }
        $("a.versionInfo_link").prop("disabled", false);
        $("a.listMenuBtn").prop("disabled", false).attr('style', 'background-position: 0px -36px');
        $("a.exitBtn").prop("disabled", false).attr('style', 'background-position: -392px 0px');
    }
}

//Go to next frame
function GoNextFrame()
{
    boolMoveForward = true;
    MoveFrame();
}

//find lessonName
function QueryStringLessonName() {
    try {
        var url = window.location.href.split('#')[0];
        var args = url.split("lessonName");
        var lessonName = "";
        lessonName = args[1].split('&');
        var myReturn = lessonName[0].replace('=', '');
    }
    catch (error) { }
    return myReturn;
}
//find CAC ID
function QueryStringCacID() {
    try {
        var url = window.location.href.split('#')[0];
        var args = url.split("ID");
        var cacID = "";
        cacID = args[1].split('&');
        var myReturn = cacID[0].replace('=', '');
    }
    catch (error) { }
    return myReturn;
}
//webbased tools list
function QueryStringSetToolsList()
{
    try {
        var url = window.location.href.split('#')[0];
        var args = url.split("Tools");
        var toolsList = "";
        toolsList = args[1].split('&');
        var myReturn = toolsList[0].replace('=', '');
    }
    catch (error) { }
    return myReturn;
}
//webbased bookmarks/completion status
function getWebBookmarks()
{
    var markers = { "pCac": userCACID, "pLesson": lessonTitle };
    var blAjaxPassed = true;
    $.ajax({
        type: "POST",
        url: DLPUrl + "/DLPWebservice.asmx/CoursewareBookmark",
        data: JSON.stringify(markers),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            try {
                //alert(data.d);
                var json = JSON.parse(data.d);
                lessonLoc = json.CurrentFrame;
                bookmark = lessonLoc;
                lessonComplete = json.Status;
                if ((bookmark > 0) && (bookmark < max)) { //// Gives user choice of returning to where last left off        
                    $('#bookmarkConfirmDialog').dialog('open');
                }
                //alert("bookmark = " + bookmark + "\nlessonComplete = " + lessonComplete + "\n" + max);
            }
            catch (err) {
                lessonLoc = "0";
                bookmark = "0";
            }
        },
        failure: function (errMsg) { alert("Bookmark Failure: " + errMsg); },
        error: function (request, status, error) {
            //alert("Bookmark Error: " + request.responseText + "\n" + status.url);
            blAjaxPassed = false;
        }        
    });
    if(!blAjaxPassed)
    {
        $.ajax({
            type: "POST",
            url: "/BRIProd/" + DLPUrl + "/DLPWebservice.asmx/CoursewareBookmark",
            data: JSON.stringify(markers),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                try {
                    //alert(data.d);
                    var json = JSON.parse(data.d);
                    lessonLoc = json.CurrentFrame;
                    bookmark = lessonLoc;
                    lessonComplete = json.Status;
                    if ((bookmark > 0) && (bookmark < max)) { //// Gives user choice of returning to where last left off        
                        $('#bookmarkConfirmDialog').dialog('open');
                    }
                    //alert("bookmark = " + bookmark + "\nlessonComplete = " + lessonComplete + "\n" + max);
                }
                catch (err) {
                    lessonLoc = "0";
                    bookmark = "0";
                }
            },
            failure: function (errMsg) { alert("Bookmark Failure: " + errMsg); },
            error: function (request, status, error) {
                alert("Portal Bookmark Error: " + request.responseText + "\n" + status.url);
                //blAjaxPassed = false;
            }
        });
    }
}
//check what started the index.html (file, DLP, T2)
function getSourceLocation()
{
    if (startURL.toLocaleLowerCase().indexOf("file:") > -1) {
        sourceLocation = "exeStart";
    }
    else if((startURL.toLowerCase().indexOf("bri") > -1) || (startURL.toLowerCase().indexOf("http:") > -1))
    {
        sourceLocation = "dlpStart";
    }
    else
    {
        sourceLocation = "t2";
    }
}

function ExamResizePage()
{
    var width = 1040;
    var height = 835;
}

function CheckIfExam()
{
    try
    {
        getSourceLocation();
        if (sourceLocation === 't2')
        {
            //initialize with API
            //TIMS data.load to get ParamCmi from API
            getJsonFromTims();
            myReturn = lessonIdentifier;
        }
        else
        {
            var url = window.location.href.split('#')[0];
            var args = url.split("lessonName");
            var lessonName = "";
            lessonName = args[1].split('&');
            var myReturn = lessonName[0].replace('=', '');
        }
    }
    catch (error) { }
    return myReturn;
}
function wrapperKeydownEvent(pKeyPressed)
{
    if (!$("#commentsDialog").length) {
        switch (pKeyPressed) {
            case "A":
            case "B":
            case "C":
            case "D":
            case "E":
                $('#' + pKeyPressed).trigger("click");
                break;
            case "G":
                $("#glossaryBtn").trigger("click");
                break;
            case "Right":
                if (!$("a.forwardBtn").prop("disabled"))
                { $("a.forwardBtn").trigger("click"); }
                break;
            case "Left":
                if (!$("a.backBtn").prop("disabled"))
                { $("a.backBtn").trigger("click"); }
                break;
        }
    }
}