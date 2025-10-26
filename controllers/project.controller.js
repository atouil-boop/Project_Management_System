const Project = require('../models/project');
const {createB} = require('./board.controller');

const create = (req, res) => {
    
        req.body.team = JSON.parse(req.body.team);
        // If multiple files were uploaded, extract filenames
        if (req.files && req.files.length > 0) {
            req.body.files = req.files.map(file => file.filename);
        } else {
            req.body.files = []; // no files uploaded
        }
        new Project(req.body).save()
            .then(project =>{createB(project._id); res.status(201).send(project)})
            .catch(err => res.status(400).send(err));

   
};

const list = (req, res) => {
    Project.find().populate({
                path: 'client',
                model: 'Client'
            })
            .populate({
                path:'team',
                model: 'User'
            })
            .exec()
        .then(projects => res.status(200).send(projects))
        .catch(error => res.status(500).send(error));
};

const byid = (req, res) => {
    Project.findById({_id:req.params.id})
        .then(project => {
            if (!project) return res.status(404).send('Not found!');
            res.status(200).send(project);
        })
        .catch(error => res.status(500).send(error));
};

const preview = (req, res) => {
    Project.findById({_id: req.params.id}).populate({path:'client',
         model:'Client'
    }).populate({path:'team',model:'User'}).exec()
        .then(project => {
            if (!project) return res.status(404).send('Not found!');
            res.status(200).send(project);
        } 
        )  
            
        
        .catch(error => res.status(500).send(error));
    }

const update = (req, res) => {
    
        req.body.team = JSON.parse(req.body.team);
        // If multiple files were uploaded, extract filenames
        if (req.files && req.files.length > 0) {
            req.body.files = req.files.map(file => file.filename);
        } else {
            delete req.body.files;
        }

        Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(project => {
                if (!project) return res.status(404).send('Not found!');
                res.status(200).send(project);
            })
            .catch(error => res.status(500).send(error));
    
};

const deleter = (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(project => {
            if (!project) return res.status(404).send('Not found!');
            res.status(200).send(project);
        })
        .catch(error => res.status(500).send(error));
};

module.exports = { create, list, byid, preview, update, deleter };