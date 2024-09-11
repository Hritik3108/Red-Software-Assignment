const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require('../model/users.model')

exports.login = (req,res) => {
    const {email,password} = req.body;
    userModel.findOne({email}).then(data=>{
        if(!data){
            return res.status(404).json({message:"Invalid Email"});
        }

        let isValidPassword = bcrypt.compareSync(password,data.password);
        if(!isValidPassword){
            res.status(403).send({message:"Invalid Password"});
        }

        let token = jwt.sign({id:data._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        data.password=undefined;
        res.status(200).send({user:data,accessToken:token});
    })
}

exports.register = (req,res) =>{
    console.log(req.body.fullName)
    const {fullName,email,password} = req.body;
    const newUser = new userModel({
        fullName,email,password:bcrypt.hashSync(password,10)
    })

    userModel.findOne({email}).then(data=>{
        if(!data){

            newUser.save().then(data=>{
                let token = jwt.sign({id:data._id},'jwtlock',{expiresIn:"1h"});
                data.password=undefined;
                res.status(200).json({user:data,accessToken: token});
            }).catch(function(error){res.status(400).json('Internal Server Error')});
        
        }else{
            res.status(400).send({message:'User already exists!'});
        }
    }).catch(function(error){res.status(500).json({message: error.message})});
}