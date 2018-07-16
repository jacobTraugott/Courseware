var ddlBaseSelect = $("select[name$=ddlBaseSelect]")
var studentClassIdOne = $("[id$=txbClassIdOne]")
var studentClassIdTwo = $("[id$=txbClassIdTwo]")
var studentClassInfo = studentClassIdOne.val() + "-" + studentClassIdTwo.val();
var studentComments = $("[id$=txbClassIdTwo]")
//// Check for the Registration dialog "isOpen"


$(window).resize(function () {
    $("#stinfoDialog, #baseSelectionDialog, #bookmarkConfirmDialog, #glossaryDialog").dialog("option", "position", { my: "center", at: "center", of: window });
});

//// Developer or Production mode
var mode = $('[name="mode"]').val();
switch (mode) {
    case 'developer':
        $("input[name='txbClassIdOne']").val("99");
        $("input[name='txbClassIdTwo']").val("999");
        $("body").addClass("ruler");
        break;
    case 'production':
        $("input[name='txbClassIdOne']").attr("placeholder", "99");
        $("input[name='txbClassIdTwo']").attr("placeholder", "999");
        break;
}

$(function () {
    //// STINFO Dialog
    $("<div />", { // Append container div to body element
        "id": "stinfoDialog"
    })
        .html($("<div />", { // Append
            "id": "stinfo",
            "class": "ui-front ui-helper-clearfix"
        })).appendTo($("body"));

    $("#stinfoDialog").dialog({
        dialogClass: "no-close stinfo-dialog",
        title: "STINFO",
        autoOpen: false,
        draggable: false,
        resizable: false,
        minHeight: 420,
        height: 420,
        width: 600,
        position: {
            my: "center",
            at: "center",
            of: window
        },

        open: function (event, ui) {
            $(".ui-dialog-buttonpane").find("button").eq(0).prop({ title: "Confirm to close window" }).css({ "font-size": "80%", "text-align": "center" });
            $(".ui-dialog-titlebar-close").hide();
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },

        buttons: {
            "Confirm": function () {
                $(this).dialog('close');
            }
        },

        close: function () {
            //initToolTips();
        },
        modal: true
    });

    //// Version Information Dialog
    $("<div />", { // Append container div to body element
        "id": "versionDialog"
    }).html($("<div />", { // Append
        "id": "version",
        "class": "ui-front ui-helper-clearfix"
    })).appendTo($("body"));

    $("#versionDialog").dialog({
        dialogClass: "no-close version-dialog",
        title: "Version Information",
        autoOpen: false,
        draggable: false,
        resizable: false,
        minHeight: 200,
        height: 200,
        width: 260,
        open: function (event, ui) {
            //close other modals
                $("#glossaryDialog").dialog('close');
                $("#commentsDialog").dialog('close');
            $(".ui-dialog").css({ background: "#333", "font-size": "0.9em" });
            $(".ui-dialog-buttonpane").show();
            $(".ui-dialog-buttonpane").find("button").eq(1).prop({ title: "Close Window" }).css({ "font-size": "80%", "text-align": "center" });
            $(".ui-dialog-titlebar-close").hide();
            $(".ui-dialog-titlebar").css({ "text-align": "center" });
            $(".ui-dialog-content").css({ "background": "#333" });
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },

        buttons: {
            "OK": function () {
                $(this).dialog('close');
            }
        },

        close: function () {
        },
        modal: false
    });

    //// Base Selection modal
    $("#baseSelectionDialog").dialog({
        dialogClass: "no-close base-dialog",
        title: "Enter Your Class ID and Base",
        autoOpen: false,
        draggable: false,
        resizable: false,
        minHeight: 220,
        height: 220,
        width: 320,
        stack: true,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        open: function (event, ui) {
            //$("input:text").val(""); //// Clear the text boxes
            $(".ui-dialog-buttonpane").find("button").eq(2).prop({ title: "Save & Close" }).css({ "text-align": "center" });
            $(".ui-dialog-titlebar-close").hide();
            $(".ui-dialog-titlebar").css({ "text-align": "center" });
            $(".ui-dialog-buttonpane").css({ "background": "#333" });
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },

        buttons: {
            "Save": function () {
                /// To Do - create function for updating class id and base
                if ($.trim($(studentClassIdOne).val()) === "" || $.trim($(studentClassIdTwo).val()) === "") {
                    alert("Please input your class ID!");
                    return false;
                }

                if ($.trim($(studentClassIdOne).val().length) < 2) {
                    alert("The left text box must contain at least 2 character's!");
                    studentClassIdOne.addClass("ui-state-error").removeClass("ui-state-error", 1000, "easeInBack");
                    return false;
                }

                if ($.trim($(studentClassIdTwo).val().length) < 2) {
                    alert("The right text box must contain at least 2 character's!");
                    studentClassIdTwo.addClass("ui-state-error").removeClass("ui-state-error", 1000, "easeInBack");
                    return false;
                }

                if ((ddlBaseSelect).val() === "-1") {
                    alert("Please select a base!");
                    ddlBaseSelect.addClass("ui-state-error").removeClass("ui-state-error", 1000, "easeInBack");
                    return false;
                }

                else if ($.trim(studentClassIdOne.val()).length > 1 && $.trim(studentClassIdTwo.val()).length > 1 && ddlBaseSelect.val() !== "-1") {
                    confirmStudentClass()
                }
            }
        },

        close: function () {

        },
        modal: true
    }); //// EOF

    //// Bookmark Modal
    $("<div />", { // Append container div to body element
        "id": "bookmarkConfirmDialog"
    })
        .html($("<div />", { // Append
            "id": "bookmark-confirm"
        })
        .html("Selecting \"<span class='grn-notice'>OK</span>\" will continue your last session.<br><br>Selecting \"<span class='blu-notice'>Cancel</span>\"  will start you from the begining."))
        .css({ display: "none" }).appendTo($("body"));

    $("#bookmarkConfirmDialog").dialog({
        dialogClass: "no-close bookmark-dialog",
        autoOpen: false,
        draggable: false,
        resizable: false,
        title: "Confirm Bookmark",
        minHeight: 245,
        height: 245,
        width: 260,
        modal: true,
        open: function (event, ui) {
            $(".ui-dialog").css({ background: "#333" }),
            $(".ui-dialog-buttonpane").find("button").eq(3).prop({ title: "Go To Bookmark" }).css({ "font-size": "80%", "text-align": "center" }),
            $(".ui-dialog-buttonpane").find("button").eq(4).prop({ title: "Cancel" }).css({ "font-size": "80%", "text-align": "center" }),
            $(".ui-dialog-titlebar-close").hide(),
            $(".ui-dialog-titlebar").css({ "text-align": "center" }),
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },
        buttons: {
            "OK": function () {
                $("a.backBtn").prop("disabled", false).removeAttr('style');
                ViewSpecificFrame(bookmark);
                progressbar.value = bookmark;
                value = progressbar.value;
                progressBarCbt();
                getPageCount();
                $(this).dialog("close");
            },
            Cancel: function () {
                ViewSpecificFrame(0);
                $(this).dialog("close");
            }
        }
    }); //// EOF

    //// Comments Dialog
    $("<div />", { // Append container div to body element
        "id": "commentsDialog"
    }).css({ display: "none", "text-align": "center" })
        .html($("<textarea />", { // segments header
            "id": "txbComment",
            "type": "text",
            "title": "Add Comment",
            "rows": "8",
            "name": "txbComment",
            //"required": true,
            val: "",
            "placeholder": "Comments"
        }).css({ width: "320px", color: "#4b4b4b" })).appendTo("body");

    $("#commentsDialog").dialog({
        dialogClass: "no-close comment-dialog",
        title: "Add Comment",
        autoOpen: false,
        draggable: true,
        resizable: false,
        minHeight: 360,
        height: 360,
        width: 360,
        modal: true,
        stack: true,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        open: function (event, ui) {
            //close other modals
                $("#glossaryDialog").dialog('close');
                $("#versionDialog").dialog('close');
            $(".ui-dialog-buttonpane").find("button").eq(5).prop({ title: "Save Comment" }).css({ "font-size": "80%", "text-align": "center" });
            $(".ui-dialog-buttonpane").find("button").eq(6).prop({ title: "Cancel Comment" }).css({ "font-size": "80%", "text-align": "center" });
            $(".ui-dialog-buttonpane").show();
            $(".ui-dialog-titlebar-close").hide();
            $(".ui-dialog").css({ "background": "#333" });
            $(".ui-dialog-titlebar").css({ "text-align": "center" });
            $(".ui-dialog-buttonpane").css({ "background": "#333" });
            $(".ui-dialog-content").css({ "background": "#333" });
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },
        close: function (event, ui) {
            $('textarea').val("");
        },
        buttons: {
            "Save Comment": function () {
                var txtComment = $("#txbComment").val();
                Comments(txtComment);
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            },
        }
    }); //// EOF

    //// Glossary Dialog
    $("<div />", { // Append glossaryDialog to body element
        "id": "glossaryDialog",
        "class": "glossary-wrapper"
    })
        .html($("<div />", { // Append Control Column
            "id": "crtlColumn"
        }).html($("<div />", {
            "class": "jcarousel-wrapper"
        }).html($("<div />", {
            "class": "jcarousel"
        }).html($("<ul />", { // Append list container
            "id": "nav-container"
        }))).append($("<a />", { // Append Controls
            "class": "jcarousel-control-prev"
        })).append($("<a />", {
            "class": "jcarousel-control-next"
        })))).appendTo($("body"));
    $("<div />", { // Append Viewport
        "id": "viewport",
        "class": "show-bkgnd"
    }).html($("<div />", { // Append Accordion
        "id": "accordion",
        "class": "accordion"
    })).appendTo($("#glossaryDialog"));

    $("#glossaryDialog").dialog({
        dialogClass: "no-close glossary",
        title: "Glossary",
        autoOpen: false,
        draggable: true,
        resizable: false,
        // minHeight: 620,
        height: 620,
        width: 400,
        position: {
            my: "center",
            at: "center",
            of: window
        },

        open: function (event, ui) {
            //close other modals
                $("#commentsDialog").dialog('close');
                $("#versionDialog").dialog('close');
            $(".ui-dialog-buttonpane").find("button").eq(7).hide();
            $(".ui-dialog-titlebar-close").show();
            $(".ui-dialog-titlebar").css({ "font-size": "90%", "text-align": "center", color: "#000" });
            $(".ui-dialog-buttonpane").hide();
            $(".ui-dialog").css({ "background": "#e0e0e0" });
            $(".ui-dialog-content").css({ "background": "#e0e0e0" });
            $(".ui-widget-overlay").css({ opacity: 0.5, filter: "Alpha(Opacity=50)", });
        },

        buttons: {
            "Minimize": function () {
                //// Empty
            }
        },

        close: function () {
            ////
        },

        modal: false
    });
}); //// EOF


//// Student ID input functions
studentClassIdOne.on("keydown", function (event) {
    var keyCode = window.event ? event.keyCode : event.which;
    if (keyCode != 17 && keyCode != 8 && keyCode != 0 && (keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105)) {
        $(this).addClass("ui-state-error").removeClass("ui-state-error", 1000, "easeInBack");
        event.preventDefault();
    }

    var self = $(this);
    //// Wait for it
    setTimeout(function () {
        if (self.val().length > 1) {
            studentClassIdTwo.focus();
        }
    }, 1);
});

studentClassIdTwo.on("keyup ", function () {
    $(this).val($(this).val().toUpperCase());
    var self = $(this);
    //// Wait for it
    setTimeout(function () {
        if (self.val().length > 2) {
            ddlBaseSelect.focus();
        }
    }, 1);
}); //// EOF

function confirmStudentClass(ev) {
    if (confirm("Is \"" + studentClassIdOne.val() + "-" + studentClassIdTwo.val() + "\" your current Class ID and \"" + ddlBaseSelect.val() + "\" your current base?")) {
        strClassID = studentClassIdOne.val() + "-" + studentClassIdTwo.val();
        strBase = ddlBaseSelect.val();
        ReportClassBaseSelection();
        $("#baseSelectionDialog").dialog('close');

        //updateStudentClass()

    } else {
        alert("Please try again and click \"OK\" to confirm!");
    }
}

function updateStudentClass(ev) {
    // to Do
    // Create function for SQL update
}