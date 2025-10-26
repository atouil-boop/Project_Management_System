const express=require('express');
const router=express.Router();
const{byid,update,deleter}= require('../controllers/board.controller');


router.get('/byid/:id',byid);
router.put('/update/:id',update);
router.delete('/delete/:id',deleter);
module.exports=router;