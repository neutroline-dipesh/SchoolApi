const mongoose = require("mongoose");

const OurStaffAdminSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      faculties: {
        type: String,
        require: true,
      },
      profile_pic: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
    });

module.exports = mongoose.model("ourStaffAdmin", OurStaffAdminSchema);
