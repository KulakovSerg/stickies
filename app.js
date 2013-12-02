/**
 * Special for SEMrush.
 * @author Kuolakov Sergey
 */

$(function () {
    var wrapperClass = '.wrapper',
        showCloseButtons = 'showClose',
        settingsClass = 'show-settings',
        stickerClass = '.sticker ',
        duration = 500,
        toggleSettings = function (e) {
            var self = $(e.target).closest(stickerClass),
                hasSettings = self.hasClass(settingsClass),
                getClassName = function (rotate) {
                    return ((rotate ? !hasSettings : hasSettings) ? '' : 'not-') + settingsClass;
                };
            self.removeClass(getClassName()).addClass(getClassName(true));
            hasSettings && setTimeout(function () {
                self.removeClass('not-' + settingsClass);
            }, duration+10);
        };

    $(stickerClass+'.more').click(toggleSettings);

    $(stickerClass+'.ready').click(toggleSettings);

    $(stickerClass+'.close').click(function(){
        var self = $(this);
        self.css('opacity') > 0 && self.closest(stickerClass).remove();
    });

    $('.footer .add').click(function () {
        $('.wrapper').removeClass(showCloseButtons);
    });
    $('.footer .remove').click(function () {
        $('.wrapper').addClass(showCloseButtons);
    });
});