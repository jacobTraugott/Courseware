function initToolTips() {
    /* qTip calls */
    $('#cbtStart').qtip({
        content: {
            text: 'To Start Click The "Next" Button'
        },
        show: {
            ready: true,
            delay: 200,
            effect: function (offset) {
                $(this).show('scale', 500); // "this" refers to the tooltip
            }
        },
        hide: {
            inactive: 5000,
            effect: function (offset) {
                $(this).hide('puff', 500); // "this" refers to the tooltip
            }
        },
        events: {
            render: function (event, api) {
                // The first time it hides, remove the inactive hide delay
                $(this).one('tooltiphide', function () {
                    api.set('hide.inactive', false);
                });
            }
        },
        position: {
            my: 'bottom left',
            at: 'bottom center',
            adjust: { y: 710, x: 90 }
        },
        style: {
            classes: 'qtip-green qtip-rounded'
        },
    });
    /* qTip #2 */
    $('#cbtBack').qtip({
        content: {
            text: 'To review a previous slide use this button'
        },
        show: {
            ready: true,
            delay: 2000,
            effect: function (offset) {
                $(this).show('slide', 500);
            }
        },
        hide: {
            inactive: 3200,
            effect: function (offset) {
                $(this).hide('puff', 500);
            }
        },
        events: {
            render: function (event, api) {
                $(this).one('tooltiphide', function () {
                    api.set('hide.inactive', false);
                });
            }
        },
        position: {
            my: 'bottom right',
            at: 'bottom center',
            adjust: { y: 710, x: -90 }
        },
        style: {
            classes: 'qtip-green qtip-rounded'
           
        },
    });
    /* qTip #3 */
    $('#cbtMenuNote').qtip({
        content: {
            text: 'To access individual frames use this button'
        },
        show: {
            ready: true,
            delay: 6500,
            effect: function (offset) {
                $(this).show('scale', 500);
            }
        },
        hide: {
            inactive: 6800,
            effect: function (offset) {
                $(this).hide('explode', 500);
            }
        },
        events: {
            render: function (event, api) {
                $(this).one('tooltiphide', function () {
                    api.set('hide.inactive', false);
                });
            }
        },
        position: {
            my: 'bottom right',
            at: 'bottom center',
            adjust: { y: 710, x: -200 }
        },
        style: {
            classes: 'qtip-green qtip-rounded'

        },
    });
};
//$(document).ready(function () {
//    initMenus();
//});
