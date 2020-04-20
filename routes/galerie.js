const router = require("express").Router();
const multer = require("multer");
const Image = require("../models/image");
const isAuth = require("./verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadsGalerie/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFileter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  )
    return cb(null, true);
  cb("file extention undefined", false);
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFileter,
});

function imagePath(arr) {
  let newarr = [];
  for (let i = 0; i < arr.length; i++) newarr[i] = arr[i].path;
  /*arr.forEach(element => {
    arr.push(element.path)
  });*/
  return newarr;
}

router.post("/", upload.array("image", 12), isAuth, async (req, res) => {
  const files = req.files;
  console.log(req.files);
  if (!files) return res.status(400).send("error");
  //SAVE IMAGE ON DB
  const newImage = new Image({
    title: req.body.title,
    image: imagePath(req.files),
  });
  try {
    newImage.save();
    res.status(200).json({ message: "image saved on DB" });
    console.log(newImage);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get all images
router.get("/", (req, res) => {
  Image.find().then((rec) => {
    if (rec) {
      res.status(200).json(rec);
    } else {
      res.status(500).json({ message: "can not find images" });
    }
  });
});

// GET IMAGES BY ID
router.get("/:id", (req, res) => {
  Image.findById({ _id: req.params.id }).then((rec) => {
    if (rec) return res.status(200).json(rec);
    res.status(400).json({ message: "Image not found" });
  });
});

//DELETE IMAGE
router.delete("/:id", isAuth, (req, res) => {
  Image.findOneAndDelete({ _id: req.params.id }, (err, rec) => {
    try {
      Image.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "images deleted" });
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  });
});

router.put("/:id", isAuth, (req, res) => {
  try {
    Image.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "Image was updated" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
