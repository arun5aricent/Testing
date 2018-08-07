describe("An interactive page", function () {
    it("'s text area should not contain any text before pressing the button", function () {
        expect(Page.textArea).toBeEmpty();
    });

    it("should contain a text area div", function () {
        expect(Page.textArea).toBe('div#textArea');
    });

    it("should append a div containing a random string to the text area when clicking the button", function () {
        var clickEvent = spyOnEvent('#addTextButton', 'click');
        $('button#addTextButton').click();

        expect('click').toHaveBeenTriggeredOn('#addTextButton');
        expect(clickEvent).toHaveBeenTriggered();

        expect($('div.addedText:last')).not.toBeEmpty();

    });
});