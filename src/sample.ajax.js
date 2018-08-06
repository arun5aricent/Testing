var handler = {
  success: function(data) {
      console.log("success");      
  },
  fail: function(data) {
    console.log("error");
  }
};
var testObj = {
  ajaxFunction: function() {
    var promise =
      $.ajax({
        url: 'someURL',
        type: 'GET'
      });
    promise.done(function(data, status) {
      handler.success(data);
    });
    promise.fail(function(status, error) {
      handler.fail(error);
    });
  }
};



var testObj1 = {
    ajaxFunction: function (url) {
        $.ajax({ url: url }).done(this.successFunction.bind(this));
    },
    successFunction: function (data) {
        console.log(data);
    }
}

