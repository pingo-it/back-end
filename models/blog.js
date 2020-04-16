const mongoose =require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description :{
        type :String,
        required:true,
    },
    
    date:{
        type:Date,
      
    },
     image:{
     type :String,
     required:true,
    },
    publishedBy:[{
        type:ObjectId,
        ref:"User",
    
    }]
});

module.exports =mongoose.model("Blog",blogSchema);