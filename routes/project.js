const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyToken } = require('../config/auth/middleware');
const { create, list, byid, preview, update, deleter } = require('../controllers/project.controller');

// Configure multer storage
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files'); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1]; 
    const uniqueName = Date.now() + '.' + extension;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: myStorage });

// Routes
router.post('/create', verifyToken, upload.any('files'), create);
router.get('/list', verifyToken, list);
router.get('/byid/:id', byid);               // fixed missing '/'
router.get('/preview/:id', preview);
router.put('/update/:id', verifyToken, upload.any('files'), update);
router.delete('/delete/:id', deleter);

module.exports = router;