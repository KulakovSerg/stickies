/**
 * Special for SEMrush.
 * Date: 30.11.13
 * Time: 17:34
 *
 * @author Kuolakov Sergey
 */

$(function(){
   $('.sticker').click(function(){
       var self = $(this),
           settingsClass = 'show-settings',
           hasSettings = self.hasClass(settingsClass),
           getClassName = function(rotate){
               return ((rotate ? !hasSettings : hasSettings) ? '' : 'not-') + settingsClass;
           }
       self.removeClass(getClassName()).addClass(getClassName(true));
       hasSettings && setTimeout(function(){
           self.removeClass('not-'+settingsClass);
       },1050);
   });
});