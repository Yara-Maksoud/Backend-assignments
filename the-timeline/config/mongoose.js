const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://maksoudyara2:yara1122@clusterposts.zc6ac.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPosts")
.then(() => {
    console.log("DB is connected");
    
})
.catch(err => {
    console.log(err);
    
})