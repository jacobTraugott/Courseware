var progressbar = document.getElementById('progressbar'),
    percent = document.getElementById('progress-percent'),
    max = progressbar.max,
    value = progressbar.value;

//function closeAllTips() {
//    $('.qtip.ui-tooltip').qtip('hide');
//    $(".qtip").remove();
//}

function progressBarCbt(cbtIndex) {
    percent.innerHTML = Math.floor((value / max) * 100) + "%";
    progressbar.value = value;
    cbtIndex++;

    if (value == max) {

       // $("#progressLabel").html("Complete").removeClass("progressLabel").addClass("progress-done");
      //  $(".progress-percent").hide(),
      //  $("#pbar").hide();

    }
    else if (value != max) {
        $(".progress-percent").removeClass("progress-done").addClass("progress-percent")
        $(".cbtProgress").show();
    }
}
var amountLoaded = 0;
progressBarCbt(amountLoaded);

function closeAll() {
    // $('div.qtip:visible').qtip('hide');
    //$(".qtip").remove();
    $("#stinfoDialog").dialog("close");
}
$("#trigger").on('click', function () {
    $("#stinfoDialog").dialog("close");
    //$(".qtip").remove();
    //closeAll();
    return false;
});

//// Exit button functionality
$("a.exitBtn").on('click', function () {
    // window.close();
    if (lessonType != "exam")
    {
        EndCBT();
    }
    else
    {
        ReportCritiques();
    }
});

$("a.forwardBtn").on({
    mouseenter: function () {
        $("#frameMessage").html("Next Frame");
    },
    mouseleave: function () {
        $("#frameMessage").empty();
    },
    click: function (event) {
        MoveForwardFromHotspot();
        
        return false;
    }
});

function MoveForwardFromHotspot()
{
    var media = $("#media").length;
    //// Progress Bar
    $("#progressbar").attr("value", currentFrameIndex + 1);
    value = $("#progressbar").attr("value");
    //// END
    $("a.backBtn").prop("disabled", false).removeAttr("style")

    if (media < 1)
    {
        $("#media").hide();
    }
    else
    {
        $("#media").show();
    }

    if (currentFrameIndex === -1)
    {
        $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
    }
    progressBarCbt();
    MoveForward();
    if (!developer)
    {
        closeAll();
    }
    return false;
}

$("a.backBtn").on({
    mouseenter: function () {
        $("#frameMessage").html("Previous Frame");
    },
    mouseleave: function () {
        $("#frameMessage").empty();
    },
    click: function () {
        var media = $("#media div").length;
        //// Progress Bar
        $('#progressbar').attr("value", currentFrameIndex - 1);
        value = $("#progressbar").attr("value");
        //// END

        if (media < 1) {
            $("#media").hide();
        }
        else {
            $("#media").show();
        }

        if (currentFrameIndex == 1) {
            $("a.backBtn").prop("disabled", true).attr('style', 'background-position: -106px -72px');
        }
        progressBarCbt();
        MoveBackward();
        return false;
    }
});

$("#glossaryBtn").on('click', function () {
    LaunchGlossary();
    $('#glossaryDialog').dialog('open');
    $('.jcarousel').jcarousel('reload');
});

var versionOBj = $('#versionInfo_link');
versionOBj.on({
    mouseenter: function () {
        $("#frameMessage").html("Version Status Info");
    },
    mouseleave: function () {
        $("#frameMessage").empty();
    },
    click: function () {
        if (currentFrameIndex >= 0) {
            var currentFrameID = frames[currentFrameIndex].frameID;
            var remediationFrameID = 0;
            var strShowRemediationFrameID = "";
            if (frames[currentFrameIndex].remediation > 0)
            {
                remediationFrameID = frames[currentFrameIndex].remediation;
                strShowRemediationFrameID = "</p>" + "<p>Remediation Frame ID: " + remediationFrameID + "</p>"
            }
            $("#version").html("<p>Editor Version: " + acesVersion + "</p>" + "<p>Lesson Revision: " + lessonRevision + "</p>" + "<p>Wrapper Version: " + wrapperVersion + "</p>" + "<p>Frame ID: " + currentFrameID + "</p>" + strShowRemediationFrameID);
            $('#versionDialog').dialog('open');
        }
    }
});