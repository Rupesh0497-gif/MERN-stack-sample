const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemNameToAdd: {type: String, required: true},
    itemCategory: { type: String, required: true},
    itemId: {type: Number, required: true},
    itemImage: {type: String, required: false   }, 
    itemPrice: { type: Number,required: true  },
    itemOrigin: {type: String,required: true},
    itemAddedDate: {type: String,required: true}
  },
  {
    timestamps: true,
  }
);

const ItemDetails = mongoose.model("ItemDetails", itemSchema);
module.exports = ItemDetails;
