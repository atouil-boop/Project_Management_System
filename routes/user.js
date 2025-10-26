const express=require('express');
const router=express.Router();
const multer = require('multer');
const {create,signin,list,byid,update,deleter} = require('../controllers/user.controller');
const myStorage = multer.diskStorage({
    destination:'./images',
    filename: (req,file,redirect)=>{ let uniquename=Date.now()+'.'+file.mimetype.split('/')[1];
        redirect(null,uniquename);}

})
const images=multer({storage:myStorage});
router.post('/create',images.single('image'),create);
router.post('/signin',signin);
router.get('/list',list);
router.get('/byid/:id',byid);
router.put('/update/:id',images.single('images'),update);
router.delete('/delete/:id',deleter);
module.exports=router;