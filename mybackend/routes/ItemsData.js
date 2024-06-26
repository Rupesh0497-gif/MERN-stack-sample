const router = require('express').Router();
let ItemsData = require('../models/fetchItem.model');

router.route('/').get((req,res)=>{
    console.log("============")
    ItemsData.find()
    .then(itemDetails => res.json(itemDetails))
    .catch(err => res.status(400).json('Error:' +err));
}
);

router.route('/add').post((req,res)=>{
   const itemNameToAdd=req.body.itemNameToAdd;
   const itemCategory=req.body.itemCategory;
   const itemImage=req.body.itemImage;
   const itemId = req.body.itemId;
   const itemPrice=Number(req.body.itemPrice);
   const itemOrigin=req.body.itemOrigin;
   let date = new Date();
   console.log(date);
   const itemAddedDate= date.toISOString();


   const itemDetails= new ItemsData({
    itemNameToAdd,
    itemCategory,
    itemImage,
    itemPrice,
    itemOrigin,
    itemAddedDate,
    itemId
   });
   itemDetails.save()
   .then(()=> res.status(200).json({"message":'Item added successfully'}))
   .catch(err => res.status(400).json('Error:'+err));
}
);


router.route('/:id').get((req,res)=>{
    ItemsData.findById(req.params.id)
    .then(itemDetails => res.json(itemDetails))
    .catch(err => res.status(400).json('Error:' +err));
}
);



router.route('/:id').delete((req,res)=>{
    ItemsData.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted"))
    .catch(err => res.status(400).json('Error:' +err));
}
);

router.route('/update/:id').post((req,res)=>{
    ItemsData.findById(req.params.id)
    .then(itemDetails => {
        itemDetails.itemNameToAdd=req.body.itemNameToAdd;
        itemDetails.itemCategory=req.body.itemCategory;
        itemDetails.itemImage=req.body.itemImage;
        itemDetails.itemPrice=Number(req.body.itemPrice);
        itemDetails.itemOrigin=req.body.itemOrigin;
        itemDetails.itemAddedDate=req.body.itemAddedDate;
        ItemsData.save()
        .then(()=> res.json('item updated'))
        .catch(err => res.status(400).json('Error:' +err));
    })
    .catch(err => res.status(400).json('Error:' +err));
}
);



module.exports = router;