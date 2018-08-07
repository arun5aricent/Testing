

var upstream = upstream || {};

upstream.gadget = upstream.gadget || {};

upstream.gadget.local = {};


upstream.Logger = upstream.Logger || {};


upstream.Logger.setDebug = function () { };

upstream.Logger.debug = function () { };

var urls = {
    "attachments" : "/applications/emailclient/message/Attachments",
    "autoSave" : "/applications/emailclient/message/autosave/",
    "paperClipImage" : "https://outsource10.cisco90.upstreamworks.com/applications/emailclient/content/img/paperclip.png?nc=f4188af9-a56c-4659-bff3-0db07f4d8383",
    "printCss" : "https://outsource10.cisco90.upstreamworks.com/static/internal/common/css/Print.css?nc=f4188af9-a56c-4659-bff3-0db07f4d8383",
    "removeFile" : "/applications/emailclient/message/removefile/",
    "restore" : "/applications/emailclient/message/restore/",
    "templateContent" : "/applications/emailclient/message/GetTemplateContent/",
    "templates"  : "/applications/emailclient/message/GetTemplates/"
}