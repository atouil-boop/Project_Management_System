const express = require('express');
const router = express.Router();
const multer = require('multer');
const {verifyToken}=require('../config/auth/middleware');
 const{create,list,byid,update,deleter} = require('../controllers/client.controller');
const myStorage = multer.diskStorage({
  destination: './Cimages',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '.' + file.mimetype.split('/')[1];
    cb(null, uniqueName);
  }
});

const cimages = multer({ storage: myStorage }); // <--- must be defined before using it

router.post('/debug', cimages.single('image'), (req, res) => {
  try {
    console.log('Headers:', req.headers);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file || 'No file uploaded');
    res.json({ body: req.body, file: req.file || 'No file uploaded' });
  } catch (err) {
    console.error('Multer/Busboy error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post('/create',verifyToken,cimages.single('image'),create);
router.get('/list',list);
router.get('/byid/:id',byid);
router.put('/update/:id',cimages.single('image'),update);
router.delete('/delete/:id',deleter);  
module.exports=router;