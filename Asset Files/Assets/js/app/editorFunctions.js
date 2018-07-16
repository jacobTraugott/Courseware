
// www.simonsarris.com
// sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// holds all our objects that are being edited
var shapes = [];

// New, holds the 8 tiny boxes that will be our selection handles
// the selection handles will be in this order:
// 0  1  2
// 3     4
// 5  6  7
var selectionHandles = [];

// Hold canvas information
var canvas;
var ctx;
var bottomCanvas;
var ctxMedia;
var WIDTH;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var isResizeDrag = false;
var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
var mx, my; // mouse coordinates
var startX, startY; //beginning mouse coordinates when drawing
var endX, endY; //ending mouse coordinates when drawing

var shapeType = "";
var selectedColor = "#00FF00";
var highlightText = "";

var drawVisible = false;

var reportBack = false;

// when set to true, the canvas will redraw everything
// invalidate() just sets this to false right now
// we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel = null;

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 4;
var mySelBoxColor = 'darkred'; // New for selection boxes
var mySelBoxSize = 6;


// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety, offsetEndX, offsetEndY;

var mouseStartX = 0;
var mouseStartY = 0;
var lineStartX = 0;
var lineStartY = 0;
var lineEndX = 0;
var lineEndY = 0;
var lineStartDifx = 0; //start difference between mouse location and lineStart point
var lineStartDify = 0;
// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

var strHighlightColors;
var aryHighlightColors = highlightColorsArray;

var editType = "";

var hsImage_w;
var hsImage_h;
var mediaImage_w;
var mediaImage_h;

var mouseBtnDown = false;

var alertText = "";

var hsLineWidth = 0;
var boolMediaEditClicked = false;

var newWidth = 0;
var newHeight = 0;

/////////function to pull in and parse the highlight xml from updateHighlights/////
/////////pulls in and stores all highlight data to include highlight id for later use////////
function ReadHighlightXML(pStrXml)
{
    if (!boolMediaEditClicked)
    {
        editType = "highlights";
    }
    
    //alert(pStrXml);
    //var countHighlights = 0;
    var aryParameters;
    var strXML
    var xmlDocument;
    //alert("editType = " + editType);
    if (editType != "media")
    {
        SetCanvasEnable(true);
        InitHighlights(true);
        aryParameters = pStrXml.split("&&&");
        strXML = aryParameters[0].toString();

        strHighlightColors = aryParameters[1].toString();
        xmlDocument = $.parseXML(strXML), $xml = $(xmlDocument);
    }
    else
    {
        $xml = pStrXml;
        boolMediaEditClicked = false;
    }

    var highlightID = "";
    var highlightType = "";
    var x1 = "";
    var y1 = "";
    var x2 = "";
    var y2 = "";
    var text = "";
    var color = "";
    //var xmlDocument = $.parseXML(strXML), $xml = $(xmlDocument);
    $xml.find("highlights").each(function ()
    {
        highlightID = $(this).attr('highlightID');
        highlightType = $(this).attr('type');
        x1 = parseInt($(this).attr('x1'));
        y1 = parseInt($(this).attr('y1'));
        x2 = parseInt($(this).attr('x2'));
        y2 = parseInt($(this).attr('y2'));
        text = $(this).attr('htext');
        color = $(this).attr('colorType');

        var highlightColor = aryHighlightColors[color].toString();        

        switch(highlightType)
        {
            case "rectangle":
               // alert("rectangle color = " + highlightColor);
               // endX = x2;
               // endY = y2;
                var x = x1;
                var y = y1;
                newWidth = x2;// - x1;
                newHeight = y2;// - y1;
                AddRect(x, y, newWidth, newHeight, highlightID, highlightColor);
                break;

            case "arrow":
                AddArrow(x1, y1, x2, y2, highlightID, highlightColor);
                break;

            case "circle":
                newWidth = x2;// - x1;
                newHeight = y2;// - y1;
                AddEllipse(x1, y1, newWidth, newHeight, highlightID, highlightColor);
                //alert(x1 + ", " +  y1 + ", " +  newWidth + ", " +  newHeight + ", " + highlightColor);
                break;

            case "line":
                AddLine(x1, y1, x2, y2, highlightID, highlightColor);
                break;

            case "text":
                var x = x1;
                var y = y1;
                newWidth = x2;// - x1;
                newHeight = y2;// - y1;
                AddText(x, y, newWidth, newHeight, highlightID, highlightColor, text);
        }
    });
}

//////////////////////////////function to clear the media from the media div and put them in the canvas, represents swf and mp3 with a box and redraws back on the media tag////////
function SetupEditMedia()
{
    //alert("SetupEditMedia called");
    boolMediaEditClicked = true;
    var strMediaType = "";
    var mediaNameArray = [];    
    var mediaDivID = "";
    editType = "media";
    SetCanvasEnable(true);
    InitHighlights(true);

    $xmlCBT = $(xmlDoc);

    //ReadHighlightXML($xmlCBT);

    $xmlCBT.find("files").each(function ()
    {
        var mediaID = $(this).attr('mediaID');
        var mediaName = $(this).attr('media');
        var mediaX = $(this).attr('media_x');
        var mediaY = $(this).attr('media_y');

        mediaNameArray = mediaName.split('.')
        strMediaType = mediaNameArray[1].toLowerCase();
        mediaDivID = "#" + mediaNameArray[0].toLowerCase();

        try
        {
            if (strMediaType == "mp4")
            {
                var mp4Width = 0;
                var mp4Height = 0;
                //var vid = document.getElementById(mediaDivID);
               // mediaImage_w = vid.videoWidth;
                //mediaImage_h = vid.videoHeight;
                mp4Width = 300;
                mp4Height = 200;
               // alert("mp4Width = " + mp4Width + "\nmp4Height = " + mp4Height);
               // AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, mediaImage_h, mediaImage_w);///////added height and width
                AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, mp4Height, mp4Width);
            }
            if ((strMediaType == "htm") || (strMediaType == "html") || (strMediaType == "swf"))
            {
                GetMediaSize(mediaName);
                mediaImage_w = mediaWidth;
                mediaImage_h = mediaHeight;
                AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, mediaImage_h, mediaImage_w);
            }            
            //////////////////////////////////////Changes Start here//////////////////////////////////////////////////
            if ((strMediaType == "png") || (strMediaType == "jpg"))
            {
                var img = new Image();
                img.src = mediaPath + "/" + lessonIdentifier + "_media/" + mediaName;
                img.onload = function ()
                {
                  //  mediaImage_w = img.naturalWidth;
                    //  mediaImage_h = img.naturalHeight;
                  //  alert("img.naturalWidth = " + img.naturalWidth + "\nimg.naturalHeight = " + img.naturalHeight);
                   // AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, mediaImage_h, mediaImage_w);///////added height and width
                    AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, img.naturalHeight, img.naturalWidth);
                }
            }
        }
        catch (e)
        {
            alert("error = " + e.toString());
           // alert("In the catch, mediaName = " + mediaName + "\nstrMediaType = " + strMediaType )
            AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType, 100, 100);///////added height and width of 100
        }

        //AddMediaImage(mediaX, mediaY, mediaID, mediaName, strMediaType);//////Original, took it out and placed the new one in each if statement
    });

    //for (i = 0 ; i < shapes.length; i++)
    //{
    //    alert("shapes[" + i + "].mediaName = " + shapes[i].mediaName);
    //}

    $("#media").empty();
    SetHighlights(frames[0].highlightArray, 1, "bottomCanvas");
}

/////////////////////////////function to clear the hotspots and draw them in the canvas tag for editing////////////////
function SetupEditHotspots()
{
    editType = "hotspots";
    SetCanvasEnable(true);
    InitHighlights(true);

    $('.hotspot').remove();
    $('.hotspotText').remove();
    $('#hotspot').empty();

    $xmlCBT = $(xmlDoc);
    //shapeType = "rectangle";
    selectedColor = ConvertColor($xmlCBT.find("hotSpotColor").attr('value')); 
    hsLineWidth = parseInt( $xmlCBT.find('drawObjectsLineWidth').attr('value'));

    $xmlCBT.find("hotspot").each(function ()
    {
        var hotspotID = $(this).attr('id');
        var x = parseInt($(this).attr('left'));
        var y = parseInt($(this).attr('top'));
        var width = parseInt($(this).attr('width'));
        var height = parseInt($(this).attr('height'));
        var displayType = $(this).attr('displayType');
        var dropShadow = $(this).attr('dropShadow');
        //activateOn - Click, DoubleClick, Rollover
        var activateOn = $(this).attr('activateOn');
        var action = $(this).attr('action');
        //Show Text, Display a File, Link to a File, Jump to Frame, Move to Next Build
        var actionType = $(this).attr('actionType');
        var textHeight = parseInt($(this).attr('textHeight'));
        var textWidth = parseInt($(this).attr('textWidth'));
        var mediaX = parseInt( $(this).attr('mediaX'));
        var mediaY = parseInt($(this).attr('mediaY'));

        AddRect(x, y, width, height, hotspotID, selectedColor);

        switch(actionType)
        {
            case "Show Text":
                AddText(mediaX, mediaY, textWidth, textHeight, hotspotID, "#FFFFFF", action);
                break;

            case "Display a File":
                //var imgHeight;
                //var imgWidth;
        //        alert("display a file fired fileName = " + action + "\nhotspotID = " + hotspotID);
                var img = new Image();
                img.src = mediaPath + "/" + lessonIdentifier + "_media/" + action;
                img.onload = function ()
                {
                    mediaImage_w = img.naturalWidth;
                    mediaImage_h = img.naturalHeight;
                    AddHotspotImage(mediaX, mediaY, hotspotID, action, mediaImage_h, mediaImage_w);
                }
                break;
        }

       // AddRect(x, y, width, height, hotspotID, selectedColor);
    });
    selectedColor = "#00FF00";
   
    SetHighlights(frames[0].highlightArray, 1, "canvas");
}

function SetupEditHotspotQuestions(pDraw)
{
    //alert("SetupEditHotspotQuestions called");
    editType = "hotspotQuestions";
    SetCanvasEnable(true);
    InitHighlights(true);
    $('.hotspot').remove();

    selectedColor = "#FFFFFF";

    $xmlCBT = $(xmlDoc);
    hsLineWidth = parseInt($xmlCBT.find('drawObjectsLineWidth').attr('value'));

    $xmlCBT.find("answers").each(function ()
    {
        var answerID = $(this).attr('id');
        var strHotspotInfo = $(this).text();
        var hotspotInfoArray = strHotspotInfo.split('~');
        var x = parseInt(hotspotInfoArray[0]) - 16;
        var y = parseInt(hotspotInfoArray[1]) - 50;
        var height = parseInt(hotspotInfoArray[2]);
        var width = parseInt(hotspotInfoArray[3]);

        //alert("x = " + x + "\ny = " + y + "\nanswerID = " + answerID);

        AddRect(x, y, width, height, answerID, selectedColor);

    });

    SetHighlights(frames[0].highlightArray, 1, "canvas");
}

///////////////Sets mySel to the object the user selected in the editor//////////////////
function SelectObject(pObjectID)
{
    try
    {       
        for (i = 0; i < shapes.length; i++)
        {
            if (shapes[i].ID == pObjectID)
            {
                mySel = shapes[i];
                invalidate();
                break;
            }
        }        
    }
    catch(e)
    {
        alert("SelectObject error = " + e.toString());
    }
}

///////////////////////Assigns the object ID to the ID of the newly created object ID in the database/////////////////////
function AssignObjectID(pObjectID)
{
    //alert("pHighlightID = " + pObjectID);
    shapes[shapes.length - 1].ID = pObjectID;
}

/////////////////Called by the editor to reset the params back to empty to prevent another hotspot or highlight from being drawn when trying to move a graphic or text///////////////////////
function ResetParams()
{
    selectedColor = "#00FF00";
    shapeType = "";
    highlightText = "";
}

//////////////////////Gets the users color and shape selections from the editor///////////////////
function GetHighlightVarsFromWrapper(pParamVars)
{
    //alert("GetHighlightVarsFromWrapper called");
    var aryParams = [];
    var strParamVars = pParamVars.toString();

    //"stringColor=" + _strColor + "&stringShape=" + _strShape;

    aryParams = pParamVars.split('&');

    for (var i = 0; i < aryParams.length; i++)
    {
        if (aryParams[i].toLowerCase().indexOf("stringcolor") > -1)
        {
            selectedColor = aryParams[i].toLowerCase().replace("stringcolor=", "");
            if(selectedColor.indexOf("#") == -1)
            {
                selectedColor = "#00FF00";
            }
        }
        if (aryParams[i].toLowerCase().indexOf("stringshape") > -1)
        {
            shapeType = aryParams[i].toLowerCase().replace("stringshape=", "");
        }
        if (aryParams[i].toLowerCase().indexOf("edittype = ") > -1)
        {
            editType = aryParams[i].toLowerCase().replace("edittype=", "");
        }        
        if (shapeType == "text")
        {
            if (aryParams[i].toLowerCase().indexOf("htext") > -1)
            {
               // highlightText = aryParams[i].toLowerCase().replace("htext=", "");
                highlightText = aryParams[i].replace("htext=", "");
            }
        }
    }
   // alert("selectedColor = " + selectedColor + "       :   shapeType = " + shapeType);
    
}


//////////////////////////////////////Object definitions/functions////////////////////////////////////////////////
function Line()
{
    this.ID = '0';
    this.shapeType = 'line';
    this.x = 0;//beginning x
    this.y = 0;//beginning y
    this.endX = 1; // default end X and end Y?
    this.endY = 1;
    this.strokeStyle = '#444444';
    this.lineWidth = 3;
    
}

Line.prototype =
{
    LineDraw:function(context, optionalColor)
    {
        var ctxLine = context;
        ctxLine.lineWidth = this.lineWidth;

        ctxLine.beginPath();
        ctxLine.moveTo(this.x, this.y);
        ctxLine.lineTo(this.endX, this.endY);
        ctxLine.strokeStyle = this.strokeStyle;
        ctxLine.lineWidth = 2;
        ctxLine.stroke();
        ctxLine.closePath();

        if (mySel === this)
        {

            mySelBoxSize = 10;
            var width = this.endX - this.x;
            var height = this.endY - this.y;

            //  alert("endX = " + endX + "    :   this.x = " + this.x);
            var half = mySelBoxSize / 2;

            selectionHandles[0].x = this.x - half;
            selectionHandles[0].y = this.y - half;
            selectionHandles[1].x = this.x + width / 2 - half;
            selectionHandles[1].y = this.y + height / 2 - half;
            selectionHandles[2].x = this.endX - half;
            selectionHandles[2].y = this.endY - half;

            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 3; i++)
            {
                var cur = selectionHandles[i];
                context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }
    }
}

Line.prototype.contains = function (mx, my)
{
    if (editType != "media")
    {
        var dxc = mx - this.x;
        var dyc = my - this.y;

        var dx1 = this.endX - this.x;
        var dy1 = this.endY - this.y;

        var threshold = 500;

        var cross = dxc * dy1 - dyc * dx1;


        if (Math.abs(cross) > threshold)
        {
            //alert("Not on the line");
            return false;
        }
        else
        {
            if (Math.abs(dx1) >= Math.abs(dy1))
            {
                // alert(">= On the line");
                return dx1 > 0 ? this.x <= mx && mx <= this.endX : this.endX <= mx && mx <= this.x;
            }
            else
            {
                //alert("< On the line");
                return dy1 > 0 ? this.y <= my && my <= this.endY : this.endY <= my && my <= this.y;
            }
        }
    }
}

function AddLine(x, y, endX, endY, id, fill)
{
    var line = new Line;
    line.ID = id;
    line.x = x;
    line.y = y;
    line.endX = endX;
    line.endY = endY;
    line.strokeStyle = fill;
    shapes.push(line);
    invalidate();
}

function Arrow()
{
    this.ID = '0';
    this.shapeType = 'arrow';
    this.x = 0;//beginning x
    this.y = 0;//beginning y
    this.endX = 1; // default end X and end Y?
    this.endY = 1;
    //this.fill = '#444444';
    this.strokeStyle = '#444444';
    this.lineWidth = 3;
}

Arrow.prototype =
{
    ArrowDraw: function(context, optionalColor)
    {
        //variables to be used when creating the arrow
       // var c = document.getElementById("canvas");
        // var ctxArrow = c.getContext("2d");
        var ctxArrow = context;
        var headlen = 2;

        var angle = Math.atan2(this.endY - this.y, this.endX - this.x);

        //starting path of the arrow from the start square to the end square and drawing the stroke
        ctxArrow.beginPath();
        ctxArrow.moveTo(this.x, this.y);
        ctxArrow.lineTo(this.endX, this.endY);
        ctxArrow.strokeStyle = this.strokeStyle;
        ctxArrow.lineWidth = this.lineWidth;
        ctxArrow.stroke();
        ctxArrow.closePath();

        //starting a new path from the head of the arrow to one of the sides of the point
        ctxArrow.beginPath();
        ctxArrow.moveTo(this.endX, this.endY);
        ctxArrow.lineTo(this.endX - headlen * Math.cos(angle - Math.PI / 7), this.endY - headlen * Math.sin(angle - Math.PI / 7));

        //path from the side point of the arrow, to the other side point
        ctxArrow.lineTo(this.endX - headlen * Math.cos(angle + Math.PI / 7), this.endY - headlen * Math.sin(angle + Math.PI / 7));

        //path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctxArrow.lineTo(this.endX, this.endY);
        ctxArrow.lineTo(this.endX - headlen * Math.cos(angle - Math.PI / 7), this.endY - headlen * Math.sin(angle - Math.PI / 7));

        //draws the paths created above
        ctxArrow.strokeStyle = this.strokeStyle;
        ctxArrow.lineWidth = 7;
        ctxArrow.stroke();
        ctxArrow.fillStyle = this.strokeStyle;
        ctxArrow.fill();
        ctxArrow.lineWidth = 1;
        ctxArrow.closePath();

        if (mySel === this)
        {
            mySelBoxSize = 10;
            var width = this.endX - this.x;
            var height = this.endY - this.y;

          //  alert("endX = " + endX + "    :   this.x = " + this.x);
            var half = mySelBoxSize / 2;

            selectionHandles[0].x = this.x - half;
            selectionHandles[0].y = this.y - half;
            selectionHandles[1].x = this.x + width / 2 - half;
            selectionHandles[1].y = this.y + height/2 - half;
            selectionHandles[2].x = this.endX - half;
            selectionHandles[2].y = this.endY - half;

            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 3; i++)
            {
                var cur = selectionHandles[i];               
                context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }
    }
}

Arrow.prototype.contains = function (mx, my)
{
    if (editType != "media")
    {
        // make sure the Mouse X,Y fall in the area between
        // the arrow's beginning and ending points.

        var dxc = mx - this.x;
        var dyc = my - this.y;

        var dx1 = this.endX - this.x;
        var dy1 = this.endY - this.y;

        var threshold = 500;

        var cross = dxc * dy1 - dyc * dx1;


        if (Math.abs(cross) > threshold)
        {
            //alert("Not on the line");
            return false;
        }
        else
        {
            if (Math.abs(dx1) >= Math.abs(dy1))
            {
                // alert(">= On the line");
                return dx1 > 0 ? this.x <= mx && mx <= this.endX : this.endX <= mx && mx <= this.x;
            }
            else
            {
                //alert("< On the line");
                return dy1 > 0 ? this.y <= my && my <= this.endY : this.endY <= my && my <= this.y;
            }
        }
    }
}

function AddArrow(x, y, endX, endY, id, fill)
{
    var arrow = new Arrow;
    arrow.ID = id;
    arrow.x = x;
    arrow.y = y;
    arrow.endX = endX;
    arrow.endY = endY;
    arrow.strokeStyle = fill;
    shapes.push(arrow);
    invalidate();
}

function Ellipse()
{
    this.ID = '0';
    this.shapeType = "circle";
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.strokeStyle = '#444444';
    this.lineWidth = 3;
}

Ellipse.prototype =
{
    EllipseDraw: function (context, optionalColor)
    {
        //context.beginPath();
        //context.moveTo(this.x, this.y - this.h / 2);
        //context.bezierCurveTo(
        //    this.x + this.w / 2, this.y - this.h / 2,
        //    this.x + this.w / 2, this.y +this.h / 2,
        //    this.x, this.y + this.h / 2);

        //context.bezierCurveTo(
        //    this.x - this.w / 2, this.y + this.h / 2,
        //    this.x - this.w / 2, this.y - this.h / 2,
        //    this.x, this.y - this.h / 2);

        //context.strokeStyle = this.strokeStyle;
        //context.lineWidth = this.lineWidth;
        //context.stroke();
        //context.closePath();

        //x1 y1 is the location of the circle, x2 is the radius of the circle

        y2 = this.h - 3;//take out the extra adjustment/////////////////////////////
        x2 = this.w - intHighlightXOffset;
        x1 = this.x;
        y1 = this.y;

        context.beginPath();
        context.arc(x1, y1, x2, 0, 2 * Math.PI);
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.stroke();

        if (x2 < 6)
        {
            context.fillStyle = this.strokeStyle;
            context.fill();
        }

        if (mySel === this)
        {
            //context.strokeStyle = selectedColor;
            context.lineWidth = mySelWidth;
            // context.strokeRect(this.x, this.y, this.w, this.h);
            var topLeftx = this.x - this.w;
            //var topLeftY = this.y - this.h / 2 ;
            var topLeftY = this.y - this.w;
            context.strokeRect(topLeftx, topLeftY, this.w * 2, this.w * 2);

            // draw the boxes
            mySelBoxSize = 6;
            var half = mySelBoxSize / 2;

            // 0  1  2
            // 3     4
            // 5  6  7

            // top left, middle, right
            selectionHandles[0].x = topLeftx - half;
            selectionHandles[0].y = topLeftY - half;

            selectionHandles[1].x = topLeftx + this.w - half; //this.w / 2 - half;
            selectionHandles[1].y = topLeftY - half;

            selectionHandles[2].x = topLeftx + this.w * 2 - half;
            selectionHandles[2].y = topLeftY - half;

            //middle left
            selectionHandles[3].x = topLeftx - half;
            selectionHandles[3].y = topLeftY + this.w - half; //this.w / 2 - half;

            //middle right
            selectionHandles[4].x = topLeftx + this.w * 2- half; //this.w - half;
            selectionHandles[4].y = topLeftY + this.w - half;//this.w / 2 - half;

            //bottom left, middle, right
            selectionHandles[6].x = topLeftx + this.w - half; //this.w / 2 - half;
            selectionHandles[6].y = topLeftY + this.w * 2 - half; //this.w - half;

            selectionHandles[5].x = topLeftx - half;
            selectionHandles[5].y = topLeftY + this.w * 2 - half; //this.w - half;

            selectionHandles[7].x = topLeftx + this.w * 2 - half; //this.w - half;
            selectionHandles[7].y = topLeftY + this.w * 2 - half; //this.w - half;


            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 8; i++)
            {
                var cur = selectionHandles[i];
                context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }
    }
}

Ellipse.prototype.contains = function(mx, my)
{
    if (editType != "media")
    {
        var topLeftx = this.x - this.w;
        var topLeftY = this.y - this.w;
        return (topLeftx <= mx) && (topLeftx + this.w * 2 >= mx) &&
                (topLeftY <= my) && (topLeftY + this.w * 2 >= my);
    }
}

function AddEllipse(x, y, w, h, id, fill)
{
    var ellipse = new Ellipse;
    ellipse.ID = id;
    ellipse.x = x;
    ellipse.y = y;
    ellipse.w = w;
    ellipse.h = h;
    ellipse.strokeStyle = fill;
    shapes.push(ellipse);
    invalidate();

}


function Text()
{
    this.ID = '0';
    this.shapeType = 'text';
    this.text = "";
    this.font = "bold 12px Arial";
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.TextfillStyle = '#444444';
    this.lineWidth = 2;
    this.strokeStyle = '#444444';
}

Text.prototype =
{
    TextDraw: function (context, optionalColor)
    {
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);//sets the rectangle above the text, only seen in the editor
        context.fillStyle = this.strokeStyle;
        if (editType == "hotspots")
        {
            context.font = "20px Arial";
            context.fillText(this.text, this.x + 3, this.y + 18);//offsets hotspot text in the hsEditCanvas to match the location of hotspot text in the hotspot div
        }
        else
        {
            context.font = this.font;
            context.fillText(this.text, this.x + 4, this.y + 10);//Offsets highlight text when drawn on the canvas to match the highlight text's location when on the highlight text div
        }        

        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel === this)
        {
            // context.strokeStyle = selectedColor;
            context.lineWidth = mySelWidth;
            context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);

            // draw the boxes
            mySelBoxSize = 6;
            var half = mySelBoxSize / 2;

            // 0  1  2
            // 3     4
            // 5  6  7

            // top left, middle, right
            selectionHandles[0].x = (this.x - 2) - half;
            selectionHandles[0].y = (this.y - 12) - half;

            selectionHandles[1].x = (this.x - 2) + this.w / 2 - half;
            selectionHandles[1].y = (this.y - 12) - half;

            selectionHandles[2].x = (this.x - 2) + this.w - half;
            selectionHandles[2].y = (this.y - 12) - half;

            //middle left
            selectionHandles[3].x = (this.x - 2) - half;
            selectionHandles[3].y = (this.y - 12) + this.h / 2 - half;

            //middle right
            selectionHandles[4].x = (this.x - 2) + this.w - half;
            selectionHandles[4].y = (this.y - 12) + this.h / 2 - half;

            //bottom left, middle, right
            selectionHandles[6].x = (this.x - 2) + this.w / 2 - half;
            selectionHandles[6].y = (this.y - 12) + this.h - half;

            selectionHandles[5].x = (this.x - 2) - half;
            selectionHandles[5].y = (this.y - 12) + this.h - half;

            selectionHandles[7].x = (this.x - 2) + this.w - half;
            selectionHandles[7].y = (this.y - 12) + this.h - half;


            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 8; i++)
            {
                var cur = selectionHandles[i];
                context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }

    } // end draw        
}

Text.prototype.contains = function (mx, my)
{
    if (editType != "media")
    {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
        return (this.x <= mx) && (this.x + this.w >= mx) &&
                (this.y <= my) && (this.y + this.h >= my);
    }
}

function AddText(x, y, w, h, id, fillColor, hText)
{
    var text = new Text;
    text.ID = id;
    text.x = x;
    text.y = y;
    text.w = w
    text.h = h;
    text.strokeStyle = fillColor;
    text.TextfillStyle = fillColor;
    text.text = hText;

    shapes.push(text);
    invalidate();
}
// Box object to hold data

function MediaImage()
{
    this.ID = 0;
    this.shapeType = 'mediaImage';
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.strokeStyle = '#FFFFFF';
    this.lineWidth = 4;
    this.imageName = "test";
    this.imageType = "";
}

MediaImage.prototype =
{
    MediaDraw: function (context, optionalColor)
    {
        try
        {
            var mediaImage_strokeStyle = this.strokeStyle;
            var mediaImage_lineWidth = this.lineWidth;
            var mediaImage_x = this.x;
            var mediaImage_y = this.y;            
           
            switch(this.imageType)
            {
                case "mp4":
                    context.strokeStyle = mediaImage_strokeStyle;
                    //// We can skip the drawing of elements that have moved off the screen:
                    if (this.x > WIDTH || this.y > HEIGHT) return;
                    if (this.x + this.w < 0 || this.y + this.h < 0) return;

                    context.lineWidth = this.lineWidth;
                    // alertText +="w = " + this.w + "\nh = " + this.h + "\nthis.imageTyp = " + this.imageType + "\nID = " + this.ID;
                    //context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);//sets the rectangle above the text, only seen in the editor
                    context.strokeRect(this.x, this.y, this.w, this.h);
                    //  context.font = "bold 12px Arial";
                    //  context.fillStyle = this.strokeStyle;
                    //  context.fillText(this.imageName, this.x, this.y);

                    if (!mouseBtnDown)
                    {

                        window.external.UpdateMediaFromJS("", "");

                    }
                    if (this.imageType == "swf")
                    {
                        context.fillStyle = "#000000";
                        context.fillRect(this.x - 2, this.y - 12, this.w, this.h);
                    }

                    //  context.fillStyle = this.strokeStyle;
                    //  context.fillText(this.imageName, this.x, this.y);

                    if (mySel === this)
                    {
                        context.strokeStyle = "#FF0000";
                        context.lineWidth = this.lineWidth;
                        //context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);
                        context.strokeRect(this.x, this.y, this.w, this.h);
                    }

                    break;

                case "swf":
                case "htm":
                case "html":
                    context.strokeStyle = mediaImage_strokeStyle;
                    //// We can skip the drawing of elements that have moved off the screen:
                    if (this.x > WIDTH || this.y > HEIGHT) return;
                    if (this.x + this.w < 0 || this.y + this.h < 0) return;

                    context.lineWidth = this.lineWidth;
                   // alertText +="w = " + this.w + "\nh = " + this.h + "\nthis.imageTyp = " + this.imageType + "\nID = " + this.ID;
                    context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);//sets the rectangle above the text, only seen in the editor
                    //context.strokeRect(this.x, this.y, this.w, this.h);
                    context.font = "bold 12px Arial";
                    context.fillStyle = this.strokeStyle;
                    context.fillText(this.imageName, this.x, this.y);

                    if (!mouseBtnDown)
                    {
                       
                        window.external.UpdateMediaFromJS("", "");
                        
                    }
                    if (this.imageType == "swf")
                    {
                        context.fillStyle = "#000000";
                        context.fillRect(this.x - 2, this.y - 12, this.w, this.h);
                    }

                    context.fillStyle = this.strokeStyle;
                    context.fillText(this.imageName, this.x, this.y);

                    if (mySel === this)
                    {
                        context.strokeStyle = "#FF0000";
                        context.lineWidth = this.lineWidth;
                        context.strokeRect(this.x - 2, this.y - 12, this.w, this.h);
                        //context.strokeRect(this.x, this.y, this.w, this.h);
                    }

                    break;

                case "png":
                case "jpg":
                    var mediaWidth = this.w;
                    var mediaHeight = this.h;
                    var strokeLineWidth = this.lineWidth;

                  //  alert("imageName before onload = " + this.imageName + "\nheight = " + mediaHeight + "\nwidth = " + mediaWidth);
                    var img = new Image();
           
                    img.src = mediaPath + "/" + lessonIdentifier + "_media/" + this.imageName;

                    img.onload = function ()
                    {
                        //mediaImage_w = this.w = img.naturalWidth;
                        //mediaImage_h = this.h = img.naturalHeight;
                        this.x = mediaImage_x;
                        this.y = mediaImage_y;
                        this.w = mediaWidth;/////////////new
                        this.h = mediaHeight;/////////////new

                       // alert("imageName in onload = " + img.src + "\nheight = " + mediaHeight + "\nwidth = " + mediaWidth);

                        context.drawImage(img, this.x, this.y, this.w, this.h);

                        // draw selection
                        // this is a stroke along the image
                        context.lineWidth = strokeLineWidth;
                        context.strokeStyle = mediaImage_strokeStyle;
                        //context.strokeRect(mediaImage_x, mediaImage_y, mediaImage_w, mediaImage_h);
                        context.strokeRect(this.x, this.y, this.w, this.h);
                    }   
                    
                    //// We can skip the drawing of elements that have moved off the screen:
                    //if (mediaImage_x > WIDTH || mediaImage_y > HEIGHT) return;
                    //if (mediaImage_x + mediaImage_w < 0 || mediaImage_y + mediaImage_h < 0) return;
                    if (this.x > WIDTH || this.y > HEIGHT) return;
                    if (this.x + this.w < 0 || this.y + this.h < 0) return;
                                        
                    if (mySel === this)
                    {
                        context.strokeStyle = "#FF0000";
                        context.lineWidth = 10;
                        //context.strokeRect(mediaImage_x, mediaImage_y, mediaImage_w, mediaImage_h);
                        context.strokeRect(this.x, this.y, this.w, this.h);
                    }
                    break;
            }                
        }
        catch(e)
        {
          //  alert("error = " + e.toString());
        }
    } // end MediaDraw    
}

MediaImage.prototype.contains = function(mx, my)
{
  
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)    
    return (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
}

//function AddMediaImage(mediaX, mediaY, id, imageName, imageType)////Original
function AddMediaImage(mediaX, mediaY, id, imageName, imageType, height, width)
{   
    var mediaImage = new MediaImage;
    mediaImage.ID = id;
    mediaImage.x = mediaX;
    mediaImage.y = mediaY;
    mediaImage.h = height;///////////////////New
    mediaImage.w = width;///////////////////New
    mediaImage.imageName = imageName;
    mediaImage.imageType = imageType;
    //if ((imageType == "mp4") || (imageType == "swf"))
    //{
    //    mediaImage.w = mediaImage_w;
    //    mediaImage.h = mediaImage_h;
    //}
   // alert("mediaImage.imageName = " + mediaImage.imageName);
    shapes.push(mediaImage);
    invalidate();
}

function HotspotImage()
{
    this.ID = 0;
    this.shapeType = 'hsImage';
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.strokeStyle = '#FFFFFF';
    this.lineWidth = 4;
    this.imageName = "test";
}

HotspotImage.prototype =
{
    imageDraw: function (context, optionalColor)
    {
        try
        {
            var hsImage_strokeStyle = this.strokeStyle;
            var hsImage_lineWidth = this.lineWidth;
            var hsImage_x = this.x;
            var hsImage_y = this.y;            
            var img = new Image();
           
            img.onload = function ()
            {
                this.w = img.naturalWidth;
                this.h = img.naturalHeight;
                this.x = hsImage_x;
                this.y = hsImage_y;

                context.drawImage(img, this.x - 20, this.y - 48);
                
                context.strokeStyle = hsImage_strokeStyle;

                // draw selection
                // this is a stroke along the image
                context.lineWidth = hsImage_lineWidth;
                context.strokeRect(this.x - 20, this.y - 48, this.w, this.h);              
                
            }
            img.src = mediaPath + "/" + lessonIdentifier + "_media/" + this.imageName;
           
            //// We can skip the drawing of elements that have moved off the screen:
            if (this.x > WIDTH || this.y > HEIGHT) return;
            if (this.x + this.w < 0 || this.y + this.h < 0) return;

            if (mySel === this)
            {
                context.strokeStyle = "#FF0000";
                context.lineWidth = 10;// mySelWidth;
                context.strokeRect(this.x - 20, this.y - 48, this.w, this.h);
            }
        }
        catch(e)
        {
            alert("error = " + e.toString());
        }
    } // end imageDraw       
}

HotspotImage.prototype.contains = function (mx, my)
{
    if (editType != "media")
    {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
        //alert("this.ID = " + this.ID + "\nthis.x = " + this.x + "\nthis.y = " + this.y + "\nthis.w = " + this.w + "\nthis.h = " + this.h);
        return (this.x - 20 <= mx) && (this.x - 20 + this.w >= mx) &&
                (this.y - 48 <= my) && (this.y - 48 + this.h >= my);
    }
}

function AddHotspotImage(mediaX, mediaY, id, imageName, mediaHeight, mediaWidth)
{
    var hsImage = new HotspotImage;
    hsImage.ID = id;
    hsImage.x = mediaX;
    hsImage.y = mediaY;
    hsImage.imageName = imageName;
    hsImage.h = mediaHeight;
    hsImage.w = mediaWidth;
    shapes.push(hsImage);
    invalidate();
}


function Box()
{
    this.ID = '0';
    this.shapeType = 'rectangle';
    this.x = 0;
    this.y = 0;
    this.w = 1; // default width and height?
    this.h = 1;
    //this.fill = '#444444';
    this.strokeStyle = '#444444';
    this.lineWidth = 3;
}

// New methods on the Box class
Box.prototype =
{
    // we used to have a solo draw function
    // but now each box is responsible for its own drawing
    // mainDraw() will call this with the normal canvas
    boxDraw: function (context, optionalColor)
    {
        context.strokeStyle = this.strokeStyle;
        // }

        // We can skip the drawing of elements that have moved off the screen:
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.w, this.h);

       
        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel == this)
        {
           // context.strokeStyle = selectedColor;
            context.lineWidth = mySelWidth;
            context.strokeRect(this.x, this.y, this.w, this.h);

            // draw the boxes
            mySelBoxSize = 6;
            var half = mySelBoxSize / 2;

            // 0  1  2
            // 3     4
            // 5  6  7

            // top left, middle, right
            selectionHandles[0].x = this.x - half;
            selectionHandles[0].y = this.y - half;

            selectionHandles[1].x = this.x + this.w / 2 - half;
            selectionHandles[1].y = this.y - half;

            selectionHandles[2].x = this.x + this.w - half;
            selectionHandles[2].y = this.y - half;

            //middle left
            selectionHandles[3].x = this.x - half;
            selectionHandles[3].y = this.y + this.h / 2 - half;

            //middle right
            selectionHandles[4].x = this.x + this.w - half;
            selectionHandles[4].y = this.y + this.h / 2 - half;

            //bottom left, middle, right
            selectionHandles[6].x = this.x + this.w / 2 - half;
            selectionHandles[6].y = this.y + this.h - half;

            selectionHandles[5].x = this.x - half;
            selectionHandles[5].y = this.y + this.h - half;

            selectionHandles[7].x = this.x + this.w - half;
            selectionHandles[7].y = this.y + this.h - half;


            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 8; i++)
            {
                var cur = selectionHandles[i];
                context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }

    } // end draw

}
Box.prototype.contains = function (mx, my)
{    
    if (editType != "media")
    {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
       // $("#text").append("<div>id = " + this.ID + " this.x (" + this.x + ") <= mx(" + mx + ") = " + (this.x <= mx).toString());
       // $("#text").append("<br/> this.x (" + this.x + ") + this.w(" + this.w + ")  >= mx(" + mx + ") = " + (this.x + this.w >= mx).toString());
       // $("#text").append("<br/> this.y (" + this.y + ") <= my(" + my + ") = " + (this.y <= my).toString());
       // $("#text").append("<br/> this.y (" + this.y + ") + this.h(" + this.h + ")  >= my(" + my + ") = " + (this.y + this.h >= my).toString()+ "</div>");
        return (this.x <= mx) && (this.x + this.w >= mx) &&
                (this.y <= my) && (this.y + this.h >= my);
    }   
}

//Initialize a new Box, add it, and invalidate the canvas
function AddRect(x, y, w, h, id, fill)
{
   // $("#text").append("<div>x = " + x + "<br/>y = " + y + "<br/>w = " + w + "<br/>h = " + h + "</div>");
    //alert("x = " + x + "\ny = " + y + "\nw = " + w + "\nh = " + h);
    var rect = new Box;
    rect.ID = id;
    rect.x = x;
    rect.y = y;
    rect.w = w
    rect.h = h;
    rect.strokeStyle = fill;
    if ((editType == "hotspots") || (editType == "hotspotQuestions"))
    {
        rect.lineWidth = hsLineWidth;
    }
    shapes.push(rect);
    invalidate();
}

//////////////////////////////////////End Object definitions/functions////////////////////////////////////////////////

//////////////////////////////////////Functions to set up the canvas for use/////////////////////////////////////

//Sets the editType so InitHighlights knows which canvas to use for editing////////
function ChangeEditType(pEditType)
{
    editType = pEditType;
}

///////////////Enables or disables drawing on the canvas//////////////////////
function SetCanvasEnable(pDraw)
{
    clearAllCanvas();
   // if ((editType == "hotspots") || (editType == "hotspotQuestions"))
    switch(editType)
    {
        case "hotspots":
        case "hotspotQuestions":
        if (pDraw)
        {
            //alert("Called hotspots setCanvasEnable pDraw is true");
            document.getElementById("hotspotEditCanvas").style.pointerEvents = "all";
            document.getElementById("bottomCanvas").style.pointerEvents = "none";
            document.getElementById("canvas").style.pointerEvents = "none";
            drawVisible = true;
        }
        else
        {
           // alert("Called hotspots setCanvasEnable pDraw is false");
            document.getElementById("hotspotEditCanvas").style.pointerEvents = "none";
            document.getElementById("bottomCanvas").style.pointerEvents = "none";
            document.getElementById("canvas").style.pointerEvents = "none";
            drawVisible = false;
            mySel = null;
            invalidate();
        }
        break;
    case "highlights":
    
        if (pDraw)
        {
            document.getElementById("hotspotEditCanvas").style.pointerEvents = "none";
            document.getElementById("bottomCanvas").style.pointerEvents = "none";
            document.getElementById("canvas").style.pointerEvents = "all";
            drawVisible = true;
        }
        else
        {
            document.getElementById("hotspotEditCanvas").style.pointerEvents = "none";
            document.getElementById("bottomCanvas").style.pointerEvents = "none";
            document.getElementById("canvas").style.pointerEvents = "none";
            drawVisible = false;
            mySel = null;
            invalidate();
        }
        break;
        case "media":
            if (pDraw)
            {
                document.getElementById("hotspotEditCanvas").style.pointerEvents = "none";
                document.getElementById("bottomCanvas").style.pointerEvents =  "all";
                document.getElementById("canvas").style.pointerEvents = "none";
                drawVisible = true;
            }
            else
            {
                document.getElementById("hotspotEditCanvas").style.pointerEvents = "none";
                document.getElementById("bottomCanvas").style.pointerEvents = "none";
                document.getElementById("canvas").style.pointerEvents = "none";
                drawVisible = false;
                mySel = null;
                invalidate();
            }
            break;
    }

    //alert("SetCanvasEnable called with pDraw = " + pDraw);
}

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function InitHighlights(pClearHighlights)
{
    try
    {
        //alert("InitHighlights called");
        canvas = document.getElementById('canvas');

        switch(editType)
        {
            case "hotspots":
            case "hotspotQuestions":
                canvas = document.getElementById('hotspotEditCanvas');
                break;
            case "highlights":        
                canvas = document.getElementById('canvas');
                bottomCanvas = document.getElementById('bottomCanvas');
                HEIGHT = bottomCanvas.height;
                WIDTH = bottomCanvas.width;
                ctxMedia = bottomCanvas.getContext('2d');

                shapeType = "";
                selectedColor = "#00FF00";
                $("#highlightText").empty();
                break;
            case "media":
                canvas = document.getElementById('bottomCanvas');
                bottomCanvas = document.getElementById('canvas');

                HEIGHT = bottomCanvas.height;
                WIDTH = bottomCanvas.width;
                ctxMedia = bottomCanvas.getContext('2d');
                break;

        }
        HEIGHT = canvas.height;
        WIDTH = canvas.width;
        ctx = canvas.getContext('2d');

        //if (editType == "highlights")
        //{
        //    shapeType = "";
        //    selectedColor = "#00FF00";
        //    $("#highlightText").empty();
        //}

        shapes = [];/////////////////////////////////////////////////////////////////
        
        

        //alert("drawVisible = " + drawVisible + "\neditType = " + editType);

        //if (drawVisible)
        //{            
        //    document.getElementById("canvas").style.pointerEvents = "all";
        //}
        //else
        //{
        //    document.getElementById("canvas").style.pointerEvents = "none";
        //}

        //fixes a problem where double clicking causes text to get selected on the canvas
        canvas.onselectstart = function () { return false; }

        // fixes mouse co-ordinate problems when there's a border or padding
        // see getMouse for more detail
        if (document.defaultView && document.defaultView.getComputedStyle)
        {
            stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
            stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
            styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
            styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
        }

        // make mainDraw() fire every INTERVAL milliseconds
        setInterval(mainDraw, INTERVAL);

        // set our events. Up and down are for dragging and resizing,
       
        canvas.onmousedown = myDown;
        canvas.onmouseup = myUp;
       // canvas.ondblclick = myDblClick;
        canvas.onmousemove = myMove;
       

        // set up the selection handle boxes
        for (var i = 0; i < 8; i++)
        {
            var rect = new Box;
            selectionHandles.push(rect);
        }

        // add custom initialization here:

        // add a large green rectangle
        //addRect(260, 70, 60, 65, 'rgba(0,205,0,0.7)');
       // addRect(260, 570, 60, 65, 'Green');

        // add a green-blue rectangle
        //addRect(240, 120, 40, 40, 'rgba(2,165,165,0.7)');
         //addRect(240, 120, 40, 40, 'Blue');

        // add a smaller purple rectangle
        //addRect(45, 60, 25, 25, 'rgba(150,150,250,0.7)');
        //  addRect(45, 60, 25, 25, 'Orange');

        //  alert("init complete");
        if(pClearHighlights == "true")
        {
            invalidate();
        }
    }
    catch(e)
    {
        alert("init error = " + e.toString());
    }    
}

function clearAllCanvas()
{
    canvas = document.getElementById('hotspotEditCanvas');
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    clear(ctx);

    canvas = document.getElementById("canvas");
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    clear(ctx);

    canvas = document.getElementById("bottomCanvas");
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    clear(ctx);
}
//wipes the canvas context
function clear(c)
{    
    c.clearRect(0, 0, WIDTH, HEIGHT);    
}

//////////////////////////////////////End Functions to set up the canvas for use/////////////////////////////////////

/////////////////////////////////////Control functions for the canvas///////////////////////////////////////////////

// Main draw loop.
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function mainDraw()
{    
    if (canvasValid == false)
    {
        if (editType === "media")
        {
            clear(ctxMedia);
        }
        else
        {
            clear(ctx);
        }
        

        // Add stuff you want drawn in the background all the time here
        // draw all boxes
        var l = shapes.length;
       // alert("shapes.length = " + shapes.length);
        for (var i = 0; i < l; i++)
        {
            ctx.globalAlpha = 1.0;
            //alert("shapes[i].imageName = " + shapes[i].imageName);
            try
            {
                switch (shapes[i].shapeType)
                {
                    case "rectangle":
                        shapes[i].boxDraw(ctx); // we used to call drawshape, but now each box draws itself
                        break;

                    case "arrow":
                        shapes[i].ArrowDraw(ctx);
                        break;

                    case "circle":
                        shapes[i].EllipseDraw(ctx);
                        break;

                    case "line":
                        shapes[i].LineDraw(ctx);
                        break;

                    case "text":
                        shapes[i].TextDraw(ctx);
                        break;
                    
                    case "hsImage":
                        ctx.globalAlpha = 0.5;
                        shapes[i].imageDraw(ctx);
                        break;

                    case "mediaImage":
                        shapes[i].MediaDraw(ctxMedia);
                        // alertText += "\nshapes[" + i + "].w = " + shapes[i].w + "\nshapes[i].ID + " + shapes[i].ID;
                        break;
                }  
            }
            catch(err)
            {

            }
        }

        // Add stuff you want drawn on top all the time here
        //alert("alertText = " + alertText);
        canvasValid = true;
    }
}

//////////////////////////////function for mouse move if the mouseButton is down///////////////////
function myMove(e)
{
    getMouse(e);

    if (mouseBtnDown)
    {

        if (isDrag)
        {
            try
            {
                if ((mySel.shapeType == "arrow") || (mySel.shapeType == "line"))
                {
                    //var distanceX = Math.abs(mouseStartX - mx);
                    //var distanceY = Math.abs(mouseStartY - my);
                    var distanceX = Math.abs(mx - lineStartDifx);
                    var distanceY = Math.abs(my - lineStartDify);

                    //if (mouseStartX < mx)
                    //{
                    //    mySel.x = mySel.x + distanceX;
                    //    mySel.endX = mySel.endX + distanceX;
                    //}
                    //else
                    //{
                    //    mySel.x = mySel.x - distanceX;
                    //    mySel.endX = mySel.endX - distanceX;
                    //}
                    //if (mouseStartY < my)
                    //{
                    //    mySel.y = mySel.y + distanceY;
                    //    mySel.endY = mySel.endY + distanceY;
                    //}
                    //else
                    //{
                    //    mySel.y = mySel.y - distanceY;
                    //    mySel.endY = mySel.endY - distanceY;
                    //}
                    //mouseStartX = mx;
                    //mouseStartY = my;
                    if (lineStartDifx < mx)
                    {
                        mySel.x = lineStartX + distanceX;
                        mySel.endX = lineEndX + distanceX;
                    }
                    else
                    {
                        mySel.x = lineStartX - distanceX;
                        mySel.endX = lineEndX - distanceX;
                    }
                    if (lineStartDify < my)
                    {
                        mySel.y = lineStartY + distanceY;
                        mySel.endY = lineEndY + distanceY;
                    }
                    else
                    {
                        mySel.y = lineStartY - distanceY;
                        mySel.endY = lineEndY - distanceY;
                    }
                }
                else
                {
                    mySel.x = mx - offsetx;
                    mySel.y = my - offsety;
                }
            }
            catch (e)
            {

            }

            // something is changing position so we better invalidate the canvas!

            invalidate();


        }
        else if (isResizeDrag) {
            // time ro resize!
            // 0  1  2
            // 3     4
            // 5  6  7
            var oldx = mySel.x;
            var oldy = mySel.y;
            switch (mySel.shapeType) {
                case "arrow":
                case "line":
                    switch (expectResize) {
                        case 0:
                            mySel.x = mx;
                            mySel.y = my;
                            break;
                        case 2:
                            mySel.endX = mx;
                            mySel.endY = my;
                            break;
                    }
                    break;
                case "circle":
                    switch (expectResize) {
                        case 0:
                            mySel.w = oldx - mx;
                            mySel.h = oldy - my;
                            break;
                        case 1:
                            mySel.w = oldy - my;
                            mySel.h = oldy - my;
                            break;
                        case 2:
                            mySel.w = mx - oldx;
                            mySel.h = oldy - my;
                            break;
                        case 3:
                            mySel.w = oldx - mx;
                            break;
                        case 4:
                            mySel.w = mx - oldx;
                            break;
                        case 5:
                            mySel.w = oldx - mx;
                            mySel.h = my - oldy;
                            break;
                        case 6:
                            mySel.w = my - oldy;
                            mySel.h = my - oldy;
                            break;
                        case 7:
                            mySel.w = mx - oldx;
                            mySel.h = my - oldy;
                            break;
                    }
                    break;
                default:
                    switch (expectResize) {
                        case 0:
                            mySel.x = mx;
                            mySel.y = my;
                            mySel.w += oldx - mx;
                            mySel.h += oldy - my;
                            break;
                        case 1:
                            mySel.y = my;
                            mySel.h += oldy - my;
                            break;
                        case 2:
                            mySel.y = my;
                            mySel.w = mx - oldx;
                            mySel.h += oldy - my;
                            break;
                        case 3:
                            mySel.x = mx;
                            mySel.w += oldx - mx;
                            break;
                        case 4:
                            mySel.w = mx - oldx;
                            break;
                        case 5:
                            mySel.x = mx;
                            mySel.w += oldx - mx;
                            mySel.h = my - oldy;
                            break;
                        case 6:
                            mySel.h = my - oldy;
                            break;
                        case 7:
                            mySel.w = mx - oldx;
                            mySel.h = my - oldy;
                            break;
                    }
                    break;
            }
            invalidate();
        }
        if ((shapeType != "") && (selectedColor != ""))
        {
            if (mySel == null)
            {
                for (i = 0; i < shapes.length; i++)
                {
                    if (shapes[i] != null)
                    {
                        if (shapes[i].ID == 0)
                        {
                            delete shapes[i];
                            invalidate();
                        }
                    }
                }
                if ((editType == "hotspots") || (editType == "hotspotQuestions"))
                {
                    var newWidth = mx - startX;
                    var newHeight = my - startY;
                    
                    AddRect(startX, startY, newWidth, newHeight, 0, selectedColor);
                }
                else
                {
                    switch (shapeType)
                    {
                        case "rectangle":
                            var newWidth = mx - startX;
                            var newHeight = my - startY;
                            
                            AddRect(startX, startY, newWidth, newHeight, 0, selectedColor);
                            break;

                        case "arrow":
                            AddArrow(startX, startY, mx, my, 0, selectedColor);
                            break;

                        case "circle":
                            var newWidth = mx - startX;
                            var newHeight = my - startY;
                            
                            AddEllipse(startX, startY, newWidth, newHeight, 0, selectedColor);

                            break;

                        case "line":
                            AddLine(startX, startY, mx, my, 0, selectedColor);

                            break;

                        case "text":
                            var newWidth = mx - startX;
                            var newHeight = my - startY;
                            
                            AddText(startX, startY, newWidth, newHeight, 0, selectedColor, "");
                            break;
                    }
                }

            }
        }
    }
        // getMouse(e);
        // if there's a selection see if we grabbed one of the selection handles
        if (mySel !== null && !isResizeDrag)
        {
            for (var i = 0; i < 8; i++)
            {
                // 0  1  2
                // 3     4
                // 5  6  7

                var cur = selectionHandles[i];

                // we dont need to use the ghost context because
                // selection handles will always be rectangles
                if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
                    my >= cur.y && my <= cur.y + mySelBoxSize)
                {
                    // we found one!
                    expectResize = i;
                    invalidate();

                    switch (i)
                    {
                        case 0:
                            this.style.cursor = 'nw-resize';
                            break;
                        case 1:
                            this.style.cursor = 'n-resize';
                            break;
                        case 2:
                            this.style.cursor = 'ne-resize';
                            break;
                        case 3:
                            this.style.cursor = 'w-resize';
                            break;
                        case 4:
                            this.style.cursor = 'e-resize';
                            break;
                        case 5:
                            this.style.cursor = 'sw-resize';
                            break;
                        case 6:
                            this.style.cursor = 's-resize';
                            break;
                        case 7:
                            this.style.cursor = 'se-resize';
                            break;
                    }
                    return;
                }

            }
            // not over a selection box, return to normal
            isResizeDrag = false;
            expectResize = -1;
            this.style.cursor = 'auto';
        }
}

///////////////////function for when the mouse is clicked in the canvas/////////////
function myDown(e)
{
    mouseBtnDown = true;
    try
    {
        alertText = "";
        getMouse(e);

        //we are over a selection box
        if (expectResize !== -1)
        {
            if (editType == "highlights")
            {
                shapeType = "";
                selectedColor = "#00FF00";
            }
            if (((mySel.shapeType == "arrow") || (mySel.shapeType == "line")) && (expectResize == 1))
            {
                //mouseStartX = mx;
                //mouseStartY = my;
                lineStartX = mySel.x;
                lineStartY = mySel.y;
                lineEndX = mySel.endX;
                lineEndY = mySel.endY;

                isDrag = true;
            }
            else
            {
                isResizeDrag = true;
            }
            return;        
        }

        var l = shapes.length;
        var boolSelectionContained = false;
        var objectID = 0;
        for (var i = l - 1; i >= 0; i--)
        {
            //$("#text").append("<div>shapes.length = " + shapes.length + "</div>");
            if (shapes[i].contains(mx, my))
            {
                mySel = shapes[i];
                //$("#text").append("<div>ID = " + mySel.ID + "\nx = " + mySel.x + "\ny = " + mySel.y + "\nh = " + mySel.h + "\nw = " + mySel.w + " mx =  " + mx + " my = " + my + "</div>");

                //alert("mySel.shapeType = " + mySel.shapeType);

                objectID = mySel.ID;
                //alert("mySel.ID = " + mySel.ID);
                lineStartX = mySel.x;
                lineStartY = mySel.y;
                lineEndX = mySel.endX;
                lineEndY = mySel.endY;
                lineStartDifx = mx;
                lineStartDify = my;
                offsetx = mx - mySel.x;
                offsety = my - mySel.y;
                mySel.x = mx - offsetx;
                mySel.y = my - offsety;
                isDrag = true;
                boolSelectionContained = true;                   
            }
        }
        if (boolSelectionContained)
        {
            if (editType == "highlights")
            {
                shapeType = "";
                selectedColor = "#00FF00";
            }
            invalidate();
            boolSelectionContained = false;
            return window.external.SelectListViewHighlightFromHTML(objectID);
        }
        // havent returned means we have selected nothing
                   
        mySel = null;

        startX = mx;
        startY = my;

        //alert("myDown fired shapeType = " + shapeType + "  :  selectedColor = " + selectedColor);

        // invalidate because we might need the selection border to disappear
        invalidate();
    }
    catch(e)
    {
        alert("myDown Error = " + e.toString());
    }
}

//////////////////fucntion for when the mouse button is released//////////////////////
function myUp(e)
{
    mouseBtnDown = false;
   // alert("drawVisible = " +drawVisible + "\neditType = " + editType);
    getMouse(e);
    if (mySel != null)//has a selection to move or resize
    {
        if (((lineStartX != mySel.x) || (lineStartY != mySel.y)) || (isResizeDrag)){
            switch (editType) {
                case "highlights":
                    CreateHighlightUpdateString();
                    break;

                case "hotspots":
                    CreateHotspotUpdateString();
                    break;

                case "media":
                    CreateMediaUpdateString();
                    break;
                case "hotspotQuestions":
                    CreateHotspotQuestionUpdateString();
                    break;
            }
        }
    }
    else
    {
        if ((shapeType != "") && (selectedColor != "#000000"))
        {
            switch (editType)
            {
                case "highlights":
                    CreateHighlightAddString();
                    break;

                case "hotspots":
                    CreateHotspotAddString();
                    break;

                case "hotspotQuestions":
                    CreateHotspotQuestionAddString();
                    break;
            }
        }       
    }
    isDrag = false;
    isResizeDrag = false;
}

//////////////////function that signals the mainDraw to re-draw everything because something has changed/////////////////////////
function invalidate()
{
    canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e)
{

    try
    {
        var element = canvas, offsetX = 0, offsetY = 0;

        if (element.offsetParent)
        {
            do
            {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        offsetX += stylePaddingLeft;
        offsetY += stylePaddingTop;

        offsetX += styleBorderLeft;
        offsetY += styleBorderTop;

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY
    }
    catch (error)
    {
        alert("getMouse error = " + error.toString());
    }
}

/////////////////////////////////////End Control functions for the canvas///////////////////////////////////////////////

/////////////////////////////////////functions to update the editor and database///////////////////////////////////////

function CreateMediaUpdateString()
{
    isDrag = false;
    isResizeDrag = false;
    expectResize = -1;
    var reportString = "";
    var command = "UpdateMedia";
    var gettingFrame = "false";

    
    reportString = "mediaID:" + mySel.ID + ", left:" + mySel.x + ", top:" + mySel.y + ", mediaType:" + mySel.imageType;

    ReportToEditor(reportString, command);
}

function CreateHotspotQuestionAddString()
{
    var command = "AddQuestionHotspot";

    if ((mx - startX != 0) && (my - startY != 0))
    {
        var id = 0;
        var reportString = "";        

        if ((shapeType != "") || (selectedColor != ""))
        {            
            endX = mx;
            endY = my;
            var x = startX;
            var y = startY;
            var newWidth = mx - startX;
            var newHeight = my - startY;
            if (newHeight < 0)
            {
                endY = startY;
                startY = my;
                y = startY;
                newHeight = endY - startY;
            }
            if (newWidth < 0)
            {
                endX = startX;
                startX = mx;
                x = startX;
                newWidth = endX - startX;
            }
            reportString = "hsLeft:" + (x + 16) + ", hsTop:" + (y + 50) + ", hsHeight:" + newHeight + ", hsWidth:" + newWidth;
            AddRect(x, y, newWidth, newHeight, id, selectedColor);
            ReportToEditor(reportString, command);
        }
    }
}

function CreateHotspotQuestionUpdateString()
{
    var reportString = "";
    var command = "UpdateQuestionHotspot";

    reportString = "HotspotID:" + mySel.ID + ", left:" + (mySel.x + 16) + ", top:" + (mySel.y + 50) + ", height:" + mySel.h + ", width:" + mySel.w;
    ReportToEditor(reportString, command);
}

function CreateHotspotAddString()
{
    var command = "AddHotspots";
   
    if ((mx - startX != 0) && (my - startY != 0))
    {
        var id = 0;
        var reportString = "";
        //var hText = "";
        //var hColor = "";

        if ((shapeType != "") || (selectedColor != ""))
        {
            //  alert("shapeType = " + shapeType + "     :  selectedColor = " + selectedColor);
            //for (i = 0; i < aryHighlightColors.length; i++)
            //{
            //    if (aryHighlightColors[i] == selectedColor.toUpperCase())
            //    {
            //        hColor = i;
            //        break;
            //    }
            //}
            endX = mx;
            endY = my;
            var x = startX;
            var y = startY;
            var newWidth = mx - startX;
            var newHeight = my - startY;
            if (newHeight < 0)
            {
                endY = startY;
                startY = my;
                y = startY;
                newHeight = endY - startY;
            }
            if (newWidth < 0)
            {
                endX = startX;
                startX = mx;
                x = startX;
                newWidth = endX - startX;
            }
            reportString = "hsLeft:" + x + ", hsTop:" + y + ", hsWidth:" + newWidth + ", hsHeight:" + newHeight;
            AddRect(x, y, newWidth, newHeight, id, selectedColor);
            ReportToEditor(reportString, command);
        }
    }
}

function CreateHotspotUpdateString()
{
    isDrag = false;
    isResizeDrag = false;
    expectResize = -1;

    var reportString = "";
    var command = "UpdateHotspots";
    //mySel.x = mx;
    //mySel.y = my;

    switch(mySel.shapeType)
    {
        case "rectangle":
            try{
                for (var i = 0; i < shapes.length; i++)
                {
                    if((mySel.ID == shapes[i].ID) && (shapes[i].shapeType != "rectangle"))
                    {
                        break;
                    }
                }

                reportString = "HotspotID:" + mySel.ID + ", left:" + mySel.x + ", top:" + mySel.y + ", width:" + mySel.w + ", height:" + mySel.h;

                if (shapes[i].shapeType == "text")
                {
                    reportString += ", textHeight:" + shapes[i].h + ", textWidth:" + shapes[i].w + ", mediaX:" + shapes[i].x + ", mediaY:" + shapes[i].y;
                }
                else if (shapes[i].shapeType == "hsImage")
                {
                    reportString += ", textHeight:100, textWidth:100, mediaX:" + shapes[i].x + ", mediaY:" + shapes[i].y;
                }
            }
            catch(e)            
            {
                reportString += ", textHeight:100, textWidth:100, mediaX:100, mediaY:100";
            }

            break;

        case "text":          
        case "hsImage":
            try
            {
                for (var i = 0; i < shapes.length; i++)
                {
             ///       alert("mySel.ID = " + mySel.ID + "\nshapes[" + i + "].ID = " + shapes[i].ID);
                    if ((mySel.ID == shapes[i].ID) && (shapes[i].shapeType == "rectangle"))
                    {
                        break;
                    }
                }

                reportString = "HotspotID:" + shapes[i].ID + ", left:" + shapes[i].x + ", top:" + shapes[i].y + ", width:" + shapes[i].w + ", height:" + shapes[i].h;

                if (mySel.shapeType == "text")
                {
                    reportString += ", textHeight:" + mySel.h + ", textWidth:" + mySel.w + ", mediaX:" + mySel.x + ", mediaY:" + mySel.y;
                }
                else if (mySel.shapeType == "hsImage")
                {
                    reportString += ", textHeight:100, textWidth:100, mediaX:" + mySel.x + ", mediaY:" + mySel.y;
                }
            }
            catch(e)
            {
                reportString += ", textHeight:100, textWidth:100, mediaX:100, mediaY:100";
            }
            break;
    }
    //alert("mySel.x = " + mySel.x + "\nmySel.y = " + mySel.y);
    ReportToEditor(reportString, command);
}

function CreateHighlightAddString()
{
    if ((mx - startX != 0) && (my - startY != 0))
    {
        var id = 0;
        var reportString = "";
        var hText = "";
        var hColor = "";

        //alert("selectedColor = " + selectedColor);

        if ((shapeType != "") && (selectedColor != "") && (selectedColor != "#000000"))
        {
            //  alert("shapeType = " + shapeType + "     :  selectedColor = " + selectedColor);
            for (i = 0; i < aryHighlightColors.length; i++)
            {
                if (aryHighlightColors[i] == selectedColor.toUpperCase())
                {
                    hColor = i;
                    break;
                }
            }
            switch (shapeType)
            {
                case "rectangle":
                    endX = mx;
                    endY = my;
                    var x = startX;
                    var y = startY;
                    newWidth = mx - startX;
                    newHeight = my - startY;
                    if (newHeight < 0)
                    {
                        endY = startY;
                        startY = my;
                        y = startY;
                        newHeight = endY - startY;
                    }
                    if (newWidth < 0)
                    {
                        endX = startX;
                        startX = mx;
                        x = startX;
                        newWidth = endX - startX;
                    }
                    reportString = "highlightShapeType:" + shapeType + ", highlightX1:" + x + ", highlightY1:" + y + ", highlightX2:" + newWidth + ", highlightY2:" + newHeight + ", highlightText:" + hText + ", highlightColor:" + hColor;
                    AddRect(x, y, newWidth, newHeight, id, selectedColor);
                    break;

                case "arrow":
                    reportString = "highlightShapeType:" + shapeType + ", highlightX1:" + startX + ", highlightY1:" + startY + ", highlightX2:" + mx + ", highlightY2:" + my + ", highlightText:" + hText + ", highlightColor:" + hColor;
                    AddArrow(startX, startY, mx, my, id, selectedColor);
                    break;

                case "circle":
                    newWidth = mx - startX;
                    newHeight = my - startY;
                    if (newHeight < 0)
                    {
                        endY = startY;
                        startY = my;
                        y = startY;
                        newHeight = endY - startY;
                    }
                    if (newWidth < 0)
                    {
                        endX = startX;
                        startX = mx;
                        x = startX;
                        newWidth = endX - startX;
                    }
                    reportString = "highlightShapeType:" + shapeType + ", highlightX1:" + startX + ", highlightY1:" + startY + ", highlightX2:" + newWidth + ", highlightY2:" + newHeight + ", highlightText:" + hText + ", highlightColor:" + hColor;
                    AddEllipse(startX, startY, newWidth, newHeight, id, selectedColor);
                    break;

                case "line":
                    reportString = "highlightShapeType:" + shapeType + ", highlightX1:" + startX + ", highlightY1:" + startY + ", highlightX2:" + mx + ", highlightY2:" + my + ", highlightText:" + hText + ", highlightColor:" + hColor;
                    AddLine(startX, startY, mx, my, id, selectedColor);
                    break;

                case "text":
                    endX = mx;
                    endY = my;

                    var x = startX;
                    var y = startY;
                    newWidth = mx - startX;
                    newHeight = my - startY;
                    if (newHeight < 0)
                    {
                        endY = startY;
                        startY = my;
                        y = startY;
                        newHeight = endY - startY;
                    }
                    if (newWidth < 0)
                    {
                        endX = startX;
                        startX = mx;
                        x = startX;
                        newWidth = endX - startX;
                    }
                    ////////////////////////////////need to get hText////////////////////////////

                    reportString = "highlightShapeType:" + shapeType + ", highlightX1:" + startX + ", highlightY1:" + startY + ", highlightX2:" + newWidth + ", highlightY2:" + newHeight + ", highlightText:" + highlightText + ", highlightColor:" + hColor;
                    AddText(x, y, newWidth, newHeight, id, selectedColor, highlightText);
                    break;
                default:
                    alert("Select a shape and color to draw");
            }
            if (editType == "highlights")
            {
                ReportToEditor(reportString, "AddHighlights");
            }
        }
        if (editType == "highlights")
        {
            shapeType = "";
            selectedColor = "#00FF00";
        }
    }
}

function CreateHighlightUpdateString()
{
    isDrag = false;
    isResizeDrag = false;
    expectResize = -1;

    var reportString = "";
    var command = "UpdateHighlights";

    switch (mySel.shapeType)
    {
        case "rectangle":
            reportString = "highlightID:" + mySel.ID + ", highlightX1:" + mySel.x + ", highlightY1:" + mySel.y + ", highlightX2:" + mySel.w + ", highlightY2:" + mySel.h;
            break;

        case "arrow":
            reportString = "highlightID:" + mySel.ID + ", highlightX1:" + mySel.x + ", highlightY1:" + mySel.y + ", highlightX2:" + mySel.endX + ", highlightY2:" + mySel.endY;
            break;

        case "circle":
            var newWidth = mx - startX;
            var newHeight = my - startY;
            reportString = "highlightID:" + mySel.ID + ", highlightX1:" + mySel.x + ", highlightY1:" + mySel.y + ", highlightX2:" + mySel.w + ", highlightY2:" + mySel.h;
            break;

        case "line":
            reportString = "highlightID:" + mySel.ID + ", highlightX1:" + mySel.x + ", highlightY1:" + mySel.y + ", highlightX2:" + mySel.endX + ", highlightY2:" + mySel.endY;
            break;

        case "text":
            reportString = "highlightID:" + mySel.ID + ", highlightX1:" + mySel.x + ", highlightY1:" + mySel.y + ", highlightX2:" + mySel.w + ", highlightY2:" + mySel.h;
            break;
    }
    if (editType == "highlights")
    {
        ReportToEditor(reportString, command);
        shapeType = "";
        selectedColor = "#00FF00";
    }
}

function ReportToEditor(pReportString, pCommand)
{
    try
    {
        if ((pCommand == "UpdateHighlights") || (pCommand == "AddHighlights"))
        {
            //$("#lblDebug").html("pReportString = " + pReportString);
            return window.external.UpdateHighlightsFromJS(pReportString, pCommand);
        }
        else if ((pCommand == "UpdateHotspots") || (pCommand == "AddHotspots"))
        {
            return window.external.UpdateHotSpotsFromJS(pReportString, pCommand);
        }
        else if (pCommand == "UpdateMedia")
        {
            return window.external.UpdateMediaFromJS(pReportString, pCommand);
        }
        else if ((pCommand == "AddQuestionHotspot") || (pCommand == "UpdateQuestionHotspot"))
        {
            ResetParams();
            return window.external.UpdateHotSpotQuestionsFromJS(pReportString, pCommand);
        }
    }
    catch (e)
    {
        alert("error = " + e.toString() + "pReportString = " + pReportString + "\r\n" + "pCommand = " + pCommand);
    }
}

/////////////////////////////////////End functions to update the editor and database///////////////////////////////////////