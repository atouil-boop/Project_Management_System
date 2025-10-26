const Board = require('../models/board');

const createB = (id)=>{

 
    let board = new Board();
    board.idProject = id;

    board.save()
        .then(
            (result)=>{
               console.log('created');
            }
        )
        .catch(
            (err)=>{
               console.log(err);
            }
        )

}
const byid=(req,res)=>{
    Board.findOne({idProject : req.params.id}).then((user)=>{
        if(!user){res.status(400).send('not found!')}
        else{res.status(200).send(user);}
    }).catch((error)=>{res.status(500).send(error)})};
    
const update=(req,res)=>{
    Board.findByIdAndUpdate({_id : req.params.id},req.body,{new : true}).then((user)=>{
        if(!user){res.status(400).send('not found!')}
        else{res.status(200).send('updated!',user);}
    }).catch((error)=>{res.status(500).send(error)})};

const deleter =(req,res)=>{
    Board.findByIdAndDelete({_id: req.params.id}).then((user)=>{
        if(!user){res.status(400).send('not found!')}
        else{res.status(200).send('deleted!',user);}
    }).catch((error)=>{res.status(500).send(error)})};


module.exports={createB,byid,update,deleter};