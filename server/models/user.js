var mongoose = require('mongoose');
var User = mongoose.model("User",{
  Email : {
    type: String,
    required : true,
    minlength : 1,
    trim : true
  }
});
module.exports = {User};

