
var xml = "";
var classification = "";
var classificationColor = "";

function GetClassificationXML()
{
    return "<classifications><!-- classificationID = the varible used to show the classification in the lesson/exam for both the Editor and Flash--><!-- dropDownOrder = the order that the item will show up in the dropdown list --><!-- Ordering rules--><!-- Special characters are listed first--><!-- Numbers are listed after special characters--><!-- Letter are listed after numbers--><!-- text = The listed text that will show up in the dropdown --><!-- color = the color of the text as it is displayed in the flash lesson/exam--><classification><classificationID>0</classificationID><!-- This classificationID of 0 must use text of Unclassified for the Score Me, Score, and end of exam slides--><dropDownOrder>951</dropDownOrder><text>UNCLASSIFIED</text><!-- This classificationID of 0 must use text of Unclassified for the Score Me, Score, and end of exam slides--><color>0x66FF33</color></classification><classification><classificationID>1</classificationID><dropDownOrder>501</dropDownOrder><text>CONFIDENTIAL</text><color>0x3366CC</color></classification><classification><classificationID>2</classificationID><dropDownOrder>541a</dropDownOrder><text>CONFIDENTIAL//REL TO USA, ACGU</text><color>0x3366CC</color></classification><classification><classificationID>3</classificationID><dropDownOrder>241a</dropDownOrder><text>SECRET//REL TO USA, ACGU</text><color>0xFF0000</color></classification><classification><classificationID>4</classificationID><dropDownOrder>201a</dropDownOrder><!-- This will show up in the list before/above 201b--><text>SECRET</text><color>0xFF0000</color></classification><classification><classificationID>5</classificationID><dropDownOrder>201</dropDownOrder><!-- This will show up in the list before/above 201a--><text>SECRET//NOFORN</text><color>0xFF0000</color></classification><classification><classificationID>6</classificationID><dropDownOrder>901</dropDownOrder><text>UNCLASSIFIED//FOUO</text><color>0x66FF33</color></classification><classification><classificationID>7</classificationID><dropDownOrder>251b</dropDownOrder><text>SECRET//REL TO USA, FVEY</text><color>0xFF0000</color></classification><classification><classificationID>8</classificationID><dropDownOrder>551b</dropDownOrder><text>CONFIDENTIAL//REL TO USA, FVEY</text><color>0x3366CC</color></classification><classification><classificationID>9</classificationID><dropDownOrder>201b</dropDownOrder><text>CONFIDENTIAL//NOFORN</text><color>0x3366CC</color></classification><!-- programID = the varible used to show the program in the lesson/exam for both the editor and flash--><!-- programText = The listed text that will show up in the dropdown--><program><programID>0</programID><programText>CSO</programText></program><program><programID>1</programID><programText>CSO_EW</programText></program><program><programID>2</programID><programText>CSO_T1</programText></program><program><programID>3</programID><programText>CSO_T6</programText></program><program><programID>4</programID><programText>RPA_RFC</programText></program><program><programID>5</programID><programText>RPA_RIQ</programText></program><program><programID>6</programID><programText>T1A</programText></program><program><programID>7</programID><programText>T38</programText></program><program><programID>8</programID><programText>T6</programText></program><!-- if You add a new program add it above this line --><!-- New programs must also be added to the bookstore database to allow for Objective and SoBs to work properly  --><editorColors><cbtMenu>#F0F0F0</cbtMenu><cbtBackground>#F0F0F0</cbtBackground><ibtMenu>#C3DE95</ibtMenu><ibtBackground>#C3DE95</ibtBackground><examMenu>#DEC295</examMenu><examBackground>#DEC295</examBackground></editorColors></classifications>";
}

function ReadClassificationXML()
{
    var xmlDoc = $.parseXML(GetClassificationXML());
    xml = $(xmlDoc)
}

function GetFrameClassification(pClassificationLevel)
{
    //parse XML and return the classification and color for the frame
    xml.find("classification").each(function ()
    {       
        if($(this).find("classificationID").text() == pClassificationLevel)
        {
            classification = $(this).find("text").text();
            classificationColor = XMLColorConverter($(this).find("color").text());
            return;
        }
    });
}

function XMLColorConverter(pColor)//used because the xml is in the Flash format and Flash needs the color in the hexadecimal format and IE needs it with a "#" in front of the color number.///////////////////
{
    switch(pColor)
    {
        case "0x66FF33":
            return "#66FF33";
            break;
        case "0x4E75BC":
            return "#4E75BC";
            break;
        case "0xFF0000":
            return "#FF0000";
            break;
    }
}

