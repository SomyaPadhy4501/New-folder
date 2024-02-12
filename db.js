const mongoose = require('mongoose');
function main() {
    try {
        const connection = mongoose.connect('mongodb+srv://aryan:aryan123@tatwa.ytam3bc.mongodb.net/');
         console.log("Connected to mongo");
        
    } catch (error) {
        console.error("Fail" , err);
    }
   
}

module.exports = main;
