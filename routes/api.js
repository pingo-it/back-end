
const bodyParser = require("body-parser");
const  router =require ("express").Router();
const  Event =require('../models/event');
const mongoose =require("mongoose");
const  Blog =require('../models/blog');
const isAuth = require("../routes/verifyToken");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// multer  
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploadblog/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
   
    fileFilter: fileFilter
  });
  

//



 

router.post("/event",isAuth,(req,res)=>{
    
    const  newEvent= new  Event ({
        title: req.body.title,
        description :req.body.description,
        location :req.body.location,
        date:req.body.date,
    });
    console.log(newEvent);
    newEvent.save().then(
        (rec)=>{
            res.status(200).json(rec);
           

        },(err)=>{
            res.status(500).json({error :err});
        }
    );
});

//get  all  events

router.get("/",(req,res)=>{
    Event.find().then(rec=>{
        if(rec){
            res.status(200).json(rec);

        }else{
            res.status(500).json({message:'event not found'});

        }
    });
});

// get  event  avec  se  id 
router.get('/event/:id',(req,res)=>{
    
    Event.findOne({_id:req.params.id},(err,rec)=>{
        if(err){
            res.status(500).json({message:"event  not  found"});


        }else{
            res.status(200).json(rec);

        }
    });
});


//update un event  avec  se  id  

router.put('/event/:id',isAuth,(req,res)=>{
    Event.findOneAndUpdate({_id:req.params.id},req.body).then(rec=>{
        if(rec){
            res.status(200).json({message:"event was updated"});
        }else{
            res.status(500).json({error:"error"});
        }
    });
});
//Delete  une event  appartire  les  id

router.delete('/event/:id',isAuth,(req,res)=>{

    Event.findOneAndDelete({_id:req.params.id},(err,rec)=>{
        if(rec){
            res.status(200).json({message  :"event is  delated"});
            
        }else 
       { res.status(500).json({error:"error"});
    }
    })
});

//blog////////////////////////////////////////////////////////////////////////:///
router.post("/upload", isAuth,upload.single("image"), (req, res,next) => {
   

    const  newBlog= new  Blog ({
        title: req.body.title,
        description :req.body.description,
        image:req.file.path,
        date:Date.now(),
       // publishedBy:req.body.publishedBy.map(user=>user._id)||[]
    });
    console.log(newBlog);
    newBlog.save().then(
        (rec)=>{
            res.status(200).json({
                message:"create blog sucessfully"
                    
                });

        
           

        },(err)=>{
            res.status(500).json({error :err});
        }
    );
    
});

//get  all  blog

router.get("/",(req,res)=>{
    Blog.find().then(rec=>{
        if(rec){
            res.status(200).json(rec);

        }else{
            res.status(500).json({message:'blog not found'});

        }
    });
});

// get  blog avec  se  id 
router.get('/blog/:id',(req,res)=>{
    
    Blog.findOne({_id:req.params.id},(err,rec)=>{
        if(err){
            res.status(500).json({message:"BLOG not  found"});


        }else{
            res.status(200).json(rec);

        }
    });
});


//update un BLOG  avec  se  id  

router.put('/blog/:id',isAuth,(req,res)=>{
    Blog.findOneAndUpdate({_id:req.params.id},req.body).then(rec=>{
        if(rec){
            res.status(200).json({message:"blog was updated"});
        }else{
            res.status(500).json({error:"error"});
        }
    });
});
//Delete  une blog appartire  les  id

router.delete('/blog/:id',isAuth,(req,res)=>{

   Blog.findOneAndDelete({_id:req.params.id},(err,rec)=>{
        if(rec){
            res.status(200).json({message  :"blog is  delated"});
            
        }else 
       { res.status(500).json({error:"error"});
    }
    })
});



  


module.exports = router;
