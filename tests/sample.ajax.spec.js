//Specified a spy on the success function 

describe('Test ajax', function () {
    it('test success', function () {
        spyOn(handler, 'success').and.callFake(function (e) {
            console.log("This is a spy call for success handler");
        });
        spyOn($, 'ajax').and.callFake(function (e) {
            return $.Deferred().resolve({
                'hurray': 'success'
            }).promise();
        });
        testObj.ajaxFunction();
        expect(handler.success).toHaveBeenCalled();
    });

    it('test failure', function () {
        spyOn(handler, 'fail').and.callFake(function (e) {
            console.log("This is a spy call for fail handler");
        });
        spyOn($, 'ajax').and.callFake(function (e) {
            return $.Deferred().reject({
                'alas': 'failure'
            }).promise();
        });
        testObj.ajaxFunction();
        expect(handler.fail).toHaveBeenCalled();
    });

});



//Directly mocking the $.ajax object.Be it get / post / load or any ajax flavor from jquery, you can simply mock the $.ajax as shown below.

describe('Ajax test suite', function () {
    it('sample test', function () {
        testObj1.ajaxFunction('https://jsonplaceholder.typicode.com/posts/1');
        spyOn($, 'ajax').and.callFake(function (e) {
            return $.Deferred().resolve({ 'text': 'this a a fake response' }).promise();
        });
        spyOn(testObj1, 'successFunction').and.callThrough();
        testObj1.ajaxFunction('https://jsonplaceholder.typicode.com/posts/1');
        expect(testObj1.successFunction).toHaveBeenCalledWith({ 'text': 'this a a fake response' });
    });
});
