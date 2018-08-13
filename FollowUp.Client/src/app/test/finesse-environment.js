//Environment setup regarding Finesse
var finesse = finesse || {};
finesse.containerservices = finesse.containerservices || {}
finesse.containerservices.ContainerServices = finesse.containerservices.ContainerServices || {
    init() {
        return {
            addHandler(param1, param2) {
            }
        }
    }
};
finesse.containerservices.ContainerServices.Topics = finesse.containerservices.ContainerServices.Topics || {
    "ACTIVE_TAB": "FollowUp"
};

//Environment setup regarding upstream
var upstream = upstream || {};
upstream.gadget = upstream.gadget || {};
upstream.gadgets = upstream.gadgets || {};
upstream.gadgets.io = upstream.gadgets.io || {
ajax:function(){}};
upstream.gadget.Config = upstream.gadget.Config || {};
upstream.gadget.Config.baseUri = "test path uri";
upstream.gadget.locale = upstream.gadget.locale || {}
upstream.gadget.locale.Common = {};
upstream.gadget.locale.FollowUpGadget = {
    "All": "All",
    "Overdue": "Overdue",
    "Today": "Today",
    "Tomorrow": "Tomorrow",
    "LabelMint": "Mint",
    "LabelNoLabel": "No Label",
    "LabelYellow": "LabelYellow",
    "LabelOrange": "LabelOrange",
    "LabelPink": "LabelPink",
    "LabelPurple": "LabelPurple",
    "LabelTeal": "LabelTeal",
    "RecordFoundMessage": "&#x23; records found",
    "LockedErrorMessage": "This FollowUp is currently locked for editing by &#x23;",
    "ModalFooterMessage": "&#x23; of &#x24;",
    "Apply": "Apply",
    "Cancel": "Cancel",
    "Tomorrow": "Tomorrow",
    "In3Days": "In3Days",
    "In1Week": "In1Week",
    "Custom": "Custom",
    "SkillQueue": "&#x23; will be queued",
    "SelectField":"select field"
}
upstream.gadget.locale.InteractionActivity = {
    "OriginalEmail":"Email",
    "AgentReply":"Reply",
    "AgentForward":"Forward",
    "AgentInitiated":"Initiated",
    "AgentResend":"Resend",
    "AutoReply": "AutoReply",
    "TranscriptSentTo": "SentTo",
    "TranscriptWillBeSentTo": "will be sent to",
    "TranscriptNotSentDueToMissingEmailAddress":"will not be sent"
}
upstream.modules = upstream.modules || {}
upstream.modules.utilities = upstream.modules.utilities || {
    getQueryStringParameter: function (param1, param2) {
        if (param2 == 'enableFollowUp' || 'enablefollowup' || 'EnableFollowUp') {
            return "true";
        } else {
            return "false";
        }
    }
}
upstream.Logger = upstream.Logger || (function () {

    return {
        setDebug: function (enable) {

        },

        debug: function (source, message) {

        },

        log: function (source, message) {

        },

        error: function (source, message) {

        },

        warn: function (source, message) {

        },

        info: function (source, message) {

        }
    };
}());

//Environment setup regarding gadgets
var gadgets = gadgets || {
    Prefs: function () {
        return {
            getLang: function () {
                return 'en';
            }
        }
    }
};
gadgets.Hub = gadgets.Hub || {
    publish: function (topic, payload) {
        
    },

    subscribe: function (topic, callback) {
        
    }
};


//Environment setup regarding UserServices
var UserServices = UserServices || {
    loadUser: function () {
        return new Promise(function (resolve, reject) {
            user = { "FirstName": "First", "LastName": "Last", "UserId": "330", "Login": "92028" }
            resolve(user);
        });
    }
};

//Environment setup for GadgetServices
var GadgetServices = GadgetServices || (function () {
    return {
        hub: {
            publish: function (topic, payload) {
                
            },

            subscribe: function (topic, callback) {
                
            }
        }
    }
})();

