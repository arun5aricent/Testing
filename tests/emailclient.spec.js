

let emailTestDataFixture, createIFrameFormForPostDataFixture, decodeHTMLEntitiesFixture;
let plaintextToHtmlFixture = {};




// [[ _____emailclient.js______

/// <summary>Testing decodeHTMLEntities method</summary>

describe('decodeHTMLEntities test suit', function () {

    //load emailclient test data fixture

    beforeEach(function () {
        jasmine.getJSONFixtures().fixturesPath = 'base/tests/fixtures';
        decodeHTMLEntitiesFixture = getJSONFixture('email.testdata.json').decodeHTMLEntities;
       
    });
   
    //test a html string

    it('should return html string without modification', function () {       

        var testDecodedHtml = decodeHTMLEntities(decodeHTMLEntitiesFixture.htmlText);

        expect(testDecodedHtml).toBe(decodeHTMLEntitiesFixture.htmlText);

    });


    //test a encoded html string to be decoded

    it('should return decoded html string', function () {      

        var testdecodedHtml = decodeHTMLEntities(decodeHTMLEntitiesFixture.encodedHTMLText);

        expect(testdecodedHtml).toBe(decodeHTMLEntitiesFixture.htmlText);

    });

   //test a encoded html string to be valid html

    it('should return valid html string', function () {            

        var testdecodedHtml = decodeHTMLEntities(decodeHTMLEntitiesFixture.encodedHTMLText);

        let helpers = new Helpers();

        expect(helpers.isHTML(testdecodedHtml)).toBe(true);

    });

});


/// <summary>Testing decodeHtml method</summary>

describe('decodeHtml test suit', function () {

    //load emailclient test data fixture

    beforeEach(function () {

        jasmine.getJSONFixtures().fixturesPath = 'base/tests/fixtures';

        decodeHTMLEntitiesFixture = getJSONFixture('email.testdata.json').decodeHTMLEntities;

    });


    //test a html string

    it('should return html string without modification', function () {      
        
        var testDecodedHtml = decodeHtml(decodeHTMLEntitiesFixture.htmlText);
       
        expect(testDecodedHtml).toBe(decodeHTMLEntitiesFixture.htmlText);

    });


    //test a encoded html string

    it('should return decoded html string', function () {     
        

        var testdecodedHtml = decodeHtml(decodeHTMLEntitiesFixture.encodedHTMLText);
        
        testdecodedHtml = testdecodedHtml.replace("\u00a0", " ");  //failing for " ", replace white space with " "

        expect(testdecodedHtml).toBe(decodeHTMLEntitiesFixture.htmlText);

    });


    //test a encoded html string to be valid html

    it('should return valid html string', function() {      

        var testdecodedHtml = decodeHtml(decodeHTMLEntitiesFixture.encodedHTMLText);

        let helpers = new Helpers();

        expect(helpers.isHTML(testdecodedHtml)).toBe(true);

    });

});


/// <summary>Testing plaintextToHtml method</summary>

describe('plaintextToHtml test suit', function () {

    //load emailclient test data fixture

    beforeEach(function () {

        jasmine.getJSONFixtures().fixturesPath = 'base/tests/fixtures';

        emailTestDataFixture = getJSONFixture('email.testdata.json');
        decodeHTMLEntitiesFixture = emailTestDataFixture.decodeHTMLEntities;
        plaintextToHtmlFixture = emailTestDataFixture.plaintextToHtml; 

        

    });


    //test a html string

    it('should return html string without modification', function () {

        var testHTMLText = plaintextToHtml(decodeHTMLEntitiesFixture.htmlText);

        expect(testHTMLText).toBe(decodeHTMLEntitiesFixture.htmlText);

    });


    //test a string with link

    it('should replace link with html', function () {        

        var testHTMLText = plaintextToHtml(plaintextToHtmlFixture.textWithLink);
       
        expect(testHTMLText).toBe(plaintextToHtmlFixture.linkTextToHTML);

    });


    //test string with link to be valid html

    it('should return valid html string', function () {

        var testHTMLText = plaintextToHtml(plaintextToHtmlFixture.textWithLink);

        let helpers = new Helpers();

        expect(helpers.isHTML(testHTMLText)).toBe(true);

    });

});


/// <summary>Testing uuid method</summary>

describe('uuid test suit', function () {

    //test the uuid length

    it('should return a uuid with length of 36', function () {

        let uuidLength = uuid().length;
        expect(uuidLength).toEqual(36);

    });


    //uuid should be unique

    it('should return unique uuid', function () {

        let uuid1 = uuid();
        let uuid2 = uuid();

        expect(uuid2).not.toEqual(uuid1);

    });

});


/// <summary>testing createIFrameFormForPost method</summary>

describe('createIFrameFormForPost test suit', function () {
    
    //load emailclient test data fixture

    beforeEach(function () {

        jasmine.getJSONFixtures().fixturesPath = 'base/tests/fixtures';

        createIFrameFormForPostDataFixture = getJSONFixture('email.testdata.json').createIFrameFormForPostData;

        setUpHTMLFixture();

    });


    //test the uuid length

    it('should return a form', function () {      

        var form = createIFrameFormForPost(createIFrameFormForPostDataFixture.formAction, createIFrameFormForPostDataFixture.formTarget, createIFrameFormForPostDataFixture.formInputs);

       $('#iFrameFormForContainer').append(form);

        expect($("#iFrameFormForContainer form")).toExist();       
       
    });

});



/// <summary>testing initAttachment method</summary>

describe('initAttachment test suit', function () {

    //load emailclient test dom fixture

    beforeEach(function () {
       
            setUpHTMLFixture();
    });


    //test the sender should be visible

    it("should result visible", function () {

        let tabId = 0;

        expect($("#sender-" + tabId)).toBeVisible();
    });


     //test the sender src

    it("should result src", function () {

        let tabId = "0";
        let tabName = "inbox";

        initAttachment(tabId, tabName);     

        expect($("#sender-" + tabId).attr("src")).toBe(urls["attachments"] + "?t=inbox");

    });

   
});



/// <summary>testing removeIncomingAttachmentsFromTab method</summary>

describe('removeIncomingAttachmentsFromTab test suit', function () {

    //load emailclient test dom fixture

    beforeEach(function () {

        setUpHTMLFixture();
    });

    
    //test the element with id newLineBR

    it("should remove element with id newLineBR from Attachment id #sender-0", function () {

        let senderAttachmentId = "#sender-0";
      
        removeIncomingAttachmentsFromTab(senderAttachmentId);

        expect($(senderAttachmentId + " #newLineBR")).not.toExist();

    });

    //test the element with class sender-attachments

    it("should remove element with class sender-attachments from Attachment id #sender-0", function () {

        let senderAttachmentId = "#sender-0";

        removeIncomingAttachmentsFromTab(senderAttachmentId);

        expect($(senderAttachmentId + " .sender-attachments")).not.toExist();

    });

   
 //test the element with class attachmentiFramecls

    it("should apply css margin-left:0 on element with class attachmentiFramecls from Attachment id #sender-0", function () {

        let senderAttachmentId = "#sender-0";

        removeIncomingAttachmentsFromTab(senderAttachmentId);

        expect($(senderAttachmentId + " .attachmentiFramecls").css("margin-left")).toBe('0px');

    });

});



/// <summary>testing initEmailBody method</summary>

describe('initEmailBody test suit', function () {

    //load emailclient test dom fixture

    beforeEach(function () {

        setUpHTMLFixture();
        //email body contains a link as plain text
    });

    //test the element with id emailBody

    it("should convert plain text to html", function () {
     
        initEmailBody();       

        expect($("#emailBody a")).toExist();

    });

    //test the element "a" inside emailBody

    it("should have anchor target _blank", function () {

        initEmailBody();

        expect($("#emailBody a")).toHaveAttr("target", "_blank");

    });

    //test the isHTML test suit inside emailBody

    it("should call isHTML test suit", function () {

        isHTML = jasmine.createSpy("isHTML");

        initEmailBody();

        expect(isHTML).toHaveBeenCalled();       

    });


});


//  _____emailclient.js______ ]]














