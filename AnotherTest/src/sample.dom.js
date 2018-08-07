var Page = {
    title: 'a title',
    description: 'Some kind of description description',
    textArea: $('div#textArea'),
    addButton: $('button#addTextButton'),


    init: function () {
        var _this = this;
        this.addButton.click(function () {
            var randomString = _this.createRandomString();
            _this.addTextToPage(randomString);
        });
    },

    addTextToPage: function (text) {
        var textDivToAdd = $('<div>').html('<p>' + text + '</p>');

        this.textArea.append(textDivToAdd);
    },

    createRandomString: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },
};

Page.init();