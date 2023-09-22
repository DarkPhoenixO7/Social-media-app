import express from 'express';
import multer from 'multer';

const route = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

// Handle the file upload
route.post('/', upload.single('file'), (req, res) => {
  try {
    res.status(200).json('Picture uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

export default route;




