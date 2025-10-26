const Client = require('../models/client');

// CREATE
const create = (req, res) => {
  console.log('---- CREATE DEBUG ----');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  console.log('req.files:', req.files);
  console.log('headers:', req.headers);
  console.log('---------------------');

  if (req.file) req.body.image = req.file.filename;

  new Client(req.body)
    .save()
    .then(user => res.status(200).json({ message: 'Created', user }))
    .catch(err => {
  console.log('---- MONGOOSE ERROR ----');
  console.log(err);
  console.log('-----------------------');
  res.status(400).json({ message: 'Creation failed', error: err });
});
//   if (req.file) req.body.image = req.file.filename;

//   new Client(req.body)
//     .save()
//     .then(client => res.status(201).json({ message: 'Client created', client }))
//     .catch(err => {console.log('Create error:', err); res.status(400).json({ message: 'Creation failed', error: err })});
};

// LIST ALL
const list = (req, res) => {
  Client.find()
    .then(clients => res.status(200).json( clients ))
    .catch(err => res.status(500).json({ message: 'Failed to fetch clients', error: err }));
};

// GET BY ID
const byid = (req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json( client );
    })
    .catch(err => res.status(500).json({ message: 'Error fetching client', error: err }));
};

// UPDATE
const update = (req, res) => {
  if (req.file) req.body.image = req.file.filename;
  else delete req.body.image;

  Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(client => {
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json({ message: 'Client updated', client });
    })
    .catch(err => res.status(500).json({ message: 'Update failed', error: err }));
};

// DELETE
const deleter = (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(client => {
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json({ message: 'Client deleted', client });
    })
    .catch(err => res.status(500).json({ message: 'Deletion failed', error: err }));
};

module.exports = { create, list, byid, update, deleter };
// const Client = require('../models/client');
// const create=(req,res)=>{
//     if(req.file){req.body.image=req.file.filename}
//     new Client(req.body).save().then(user=>{
//         res.status(200).send(user)}).catch(err=>{res.status(400).send(err)});
// }
// const list=(req,res)=>{
//    Client.find().then((user)=>{
//         res.status(200).send(user);
//     }).catch((error)=>{res.status(500).send(error)});   

// };
// const byid=(req,res)=>{
//     Client.findById(req.params.id).then((user)=>{
//         if(!user){res.status(400).send('not found!')}
//         else{res.status(200).send(user);}
//     }).catch((error)=>{res.status(500).send(error)})};

// const update=(req,res)=>{
//     if(req.file){req.body.image=req.file.filename}
//     else{delete req.body.image}
//     Client.findByIdAndUpdate(req.params.id,req.body,{new : true}).then((user)=>{
//         if(!user){res.status(400).send('not found!')}
//         else{res.status(200).send('updated!',user);}
//     }).catch((error)=>{res.status(500).send(error)})};

// const deleter =(req,res)=>{
//     Client.findByIdAndDelete(req.params.id).then((user)=>{
//         if(!user){res.status(400).send('not found!')}
//         else{res.status(200).send('deleted!',user);}
//     }).catch((error)=>{res.status(500).send(error)})};


// module.exports={create,list,byid,update,deleter};