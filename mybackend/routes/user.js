const router = require('express').Router();
let User = require('../models/user.model');
const CreateUser = require('../models/createAnUser.model')
router.route('/').get((req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' +err));
}
);

router.route('/healthcheck').get((req, res) =>{
    console.log("hey i am triggered")
    res.status(200).json({App: "Working fine"})
})
router.route('/login').post((req,res)=>{
const password= req.body.password;
        const username=req.body.username;
        const newUser= new User({username,password});
        CreateUser.find({username: username}).then((data)=>{
            if(data.length > 0){
                User.find({username: username}).then((x)=>{
                    if(x.length === 0){
                        newUser.save()
                        .then(()=> res.json({message: 'Login Successfully'}))
                        .catch(err=> res.status(400).json('Error:'+err));
                    }else {
                        res.status(200).json({message: 'Login Successfully'})
                    }
                })
            } else {
                res.status(400).json({message: "User not found"})
            }
        })
}
);

router.route('/create').post((req,res)=>{
    
    const username= req.body.username;
      const password= req.body.password;
       const email = req.body.email;
       const phoneNumber= req.body.phoneNumber;
       var date = new Date()
       console.log(username)
       console.log(username.substring(0,2))
       const userId = `${username.substring(0,2) + date.getDate() + '_' + date.getMinutes() }`
            const createUserScheme= new CreateUser({username,password, phoneNumber, email, userId});
            createUserScheme.save()
            .then(()=> res.json({message: 'User Added Successfully'}))
            .catch(err=> res.status(400).json('Error:'+err));
    }
    );


module.exports=router;