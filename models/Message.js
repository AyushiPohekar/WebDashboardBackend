import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  orderID: {
    type: String,
    
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to:{
     type:String,
     
  },
  from:{
    type:String,
    
  },
  quantity: {
    type: Number,
    
  },
  price: {
    type: Number,
    
  },
});

export default mongoose.model('Message', messageSchema);
