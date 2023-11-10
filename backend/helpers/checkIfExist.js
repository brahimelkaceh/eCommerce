const User = require("../models/User");
exports.checkingID = async (id) => {
    try {
        const user = User.findOne({ _id: id });
            return user;
       
    } catch (err) {
        console.log(err);
    }
}