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
            }, duration + 10);
        },
        toggleCloseButton = function () {
            var self = $(this),
                isActive = self.hasClass('active'),
                current = self.hasClass('add') ? 'add' : 'remove';
            $('.footer .button:not(.' + current + ')').removeClass('active');
            $(this).toggleClass('active');
            var target = $('.wrapper');
            if(current == 'remove' && !isActive){
                target.addClass(showCloseButtons)
            }
            else{
                target.removeClass(showCloseButtons)
            }
        }

    $(stickerClass + '.more').click(toggleSettings);

    $(stickerClass + '.ready').click(toggleSettings);

    $(stickerClass + '.close').click(function () {
        var self = $(this);
        self.css('opacity') > 0 && self.closest(stickerClass).remove();
    });

    $('.footer .add').click(toggleCloseButton);
    $('.footer .remove').click(toggleCloseButton);
});

/* backbone */

$(function(){
    var Sticker = Backbone.Model.extend({
        defaults: function() {
            return {
                font: "пустой список задач...",
                color: 0,
                close: 0,
                positionx: 'auto',
                positiony: 'auto',
                text: '',
                fontFamily: 'Helvetica',
                fontSize: 'middle',
                showSettings: 0,
                id: Stickers.getNewId()
            };
        },
        initialize: function() {
            //backbone
            //TODO
        },
        saveText: function(e){
            this.text = $(e.target).html();
            this.save();
        },
        saveProperty: function(name,value,callback){
            var data = {};
            data[name] = value;
            /*$.ajax({
                url: 'http://example.com',
                data: data,
                success: function(result){
                    callback && callback(result);
                }
            });*/
            console.log('AJAX {',name,':',value,'}');
        }

    });
    var StickerList = Backbone.Collection.extend({
        model: Sticker,
        getNewId: function() {
            if (!this.length) return 1;
            return _.max(this,function(obj){ return obj.id }) + 1;
        }
        //localStorage: new Store("todos-backbone"),
    });
    var Stickers = new StickerList;
    var StickerView = Backbone.View.extend({
        template: _.template($('#sticker-template').html()),
        events: {
            /*
             font: "пустой список задач...",
             color: 0,
             close: 0,
             positionx: 'auto',
             positiony: 'auto',
             text: '',
             fontFamily: 'Helvetica',
             fontSize: 'middle',
             showSettings: 0,
             id: Stickers.getNewId()
             */
            "click .close": "close",
            "blur .text": "saveText",
            "ondragend .sticker"  : "savePosition",
            "click .color" : "saveColor",
            "change .font-family" : "saveFontFamily",
            "change .font-size" : "saveFontSize"
        },
        initialize: function() {//backbone
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },
        render: function() {
            /*this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');*/
            //this.model.save({this.$el});//save new sticker
            return this;
        },
        close: function() {
            this.model.save({remove: this.model.id});//??????
            this.remove();
        }
    });
    var AppView = Backbone.View.extend({
        el: $("body"),
        statsTemplate: _.template($('#app-template').html()),
        events: {
            "click .button.add": "toggleAdd",
            "click .button.remove": "toggleRemove",
            "click .add-sticker": "addSticker"
        },
        initialize: function() {
            /*Stickers.bind('add', this.addOne, this);
            Stickers.bind('reset', this.addAll, this);
            Stickers.bind('all', this.render, this);*/
        },
        render: function() {

        },
        toggleAdd: function(todo) {
            this.addMode = !this.addMode;
            var addMode = this.addMode;
            if(this.addMode){
                this.$('.button.add').addClass
            }
            Stickers.each(function (item) {
                addMode ? item.addClass('close') : item.removeClass('close')
            });
        },
        addSticker: function(e) {
            Stickers.create();
        }
    });
    var App = new AppView;

});