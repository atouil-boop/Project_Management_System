  const User=require('../models/user');
const bc=require('bcrypt');
const jwt=require('jsonwebtoken');
const Admin = async () => {
    try {
 
        const { NAME, EMAIL, PASS, TEL, IMAGE } = process.env;
        if (!NAME || !EMAIL || !PASS || !TEL || !IMAGE) {
            console.error(' Missing admin environment variables!');
            return;
        }

        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('Admin already exists ');
            return;
        }

        const hashedPassword = bc.hashSync(PASS, 10);

        const newAdmin = new User({
            fullname: NAME,
            email: EMAIL,
            password: hashedPassword,
            tel: Number(TEL),
            role: 'admin',
			image : IMAGE
        });

        await newAdmin.save();
        console.log('Admin created successfully ');

    } catch (err) {
        console.error('Error creating admin:', err);
    }
};
// const Admin = () => {
//     User.findOne({ role: 'admin' })
//         .then(admin => {
//             if (!admin) {
//                 // No admin → create one
//                 const data = {
//                     fullname: process.env.NAME,
//                     email: process.env.EMAIL,
//                     password: process.env.PASS,
//                     tel: Number(process.env.TEL),
//                     role: 'admin'
//                 };
//                 console.log('PASS:', data.password);
//                 data.password = bc.hashSync(data.password,10);

//                 new User(data).save()
//                     .then(() => console.log('admin created'))
//                     .catch(err => console.log(err));
//             } else {
//                 console.log('admin already exists');
//             }
//         })
//         .catch(err => console.log(err));
// };
const create=(req,res)=>{

    let { fullname, email, password, tel, tags,role } = req.body;
    tags = JSON.parse(tags);
    password=bc.hashSync(password,10);
    if(req.file){req.body.image=req.file.filename}
    new User({ fullname, email, password, tel, tags,role }).save().then(user=>{
        const {password1,...data} = user.toObject();
        res.status(200).send(data)}).catch(err=>{res.status(400).send(err)});
}
const signin=(req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email}).then((user)=>{console.log(user);
        if(!user){return res.status(400).send('incorrect credentials!')}
    
    const ismatch=bc.compareSync(req.body.password,user.password);
    if(!ismatch){return res.status(400).send('incorrect credentials!')}
    let payload={_id : user._id,
                      role:user.role};
                      let token=jwt.sign(payload,process.env.SECRET_KEY)
                      console.log(token);
                      res.status(200).send({Token : token});
                    
}).catch((error)=>{res.status(500).send(error);console.log(error);});}

const list=(req,res)=>{
    User.find({role : 'user'},{password:0}).then((user)=>{
        res.status(200).send(user);
    }).catch((error)=>{res.status(500).send(error)});   

};
const byid=(req,res)=>{
    User.findById( {_id:req.params.id},{password:0}).then((user)=>{
        if(!user){res.status(400).send('not found!')}
        else{res.status(200).send(user);
            console.log(user);
        }
    }).catch((error)=>{res.status(500).send(error)})};

const update=(req,res)=>{
    req.body.tags=JSON.parse(req.body.tags);
    if(req.file){req.body.image=req.file.filename}
    else{delete req.body.image}
    if(req.body.password){
        req.body.password=bc.hashSync(req.body.password,10);
    }
    User.findByIdAndUpdate({_id:req.params.id},req.body,{new : true}).then((user)=>{
        if(!user){res.status(400).send('not found!')}
        else{res.status(200).send({message:'updated!',user});}
    }).catch((error)=>{res.status(500).send(error)})};

    const deleter =(req,res)=>{
        User.findByIdAndDelete({_id:req.params.id}).then((user)=>{
            if(!user){res.status(400).send('not found!')}
            else{res.status(200).send('deleted!',user);}
        }).catch((error)=>{res.status(500).send(error)})};


module.exports={Admin,create,signin,list,byid,update,deleter};