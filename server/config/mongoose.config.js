const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect("mongodb://localhost/pets", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connection with the database has been established!");
    }
    catch (err){
        console.log("Uh, oh! You had some issue connecting to the server!");
    }
})();