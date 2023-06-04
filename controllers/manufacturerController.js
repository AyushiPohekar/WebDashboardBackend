import { nanoid } from "nanoid";
import Message from "../models/Message.js";
import User from "../models/User.js";

function generateOrderID() {
  const code = nanoid(6); // Generate a 6-character alphanumeric code
  return `XB${code.toUpperCase()}`;
}

export const CreateMessage = async (req, res, next) => {
  const orderID = generateOrderID();
  const manufacturerID = req.user.userId;
  try {
    const { to, from, quantity, address, content, sender, recipient } =
      req.body;
      const newMessage = new Message({
      orderID,
      to,
      from,
      quantity,
      address,
      content,
      sender: manufacturerID,
      recipient,
     });

    newMessage.save();
    res.status(200).send({
      success: true,
      message: "new message created",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While creating message",
    });
  }
};

export const getAllMessageSentByManufacturer=async(req,res,next)=>{
  try {
    
    const manufacturerID = req.user.userId; 
    //const transporter=await User.findById({recipient})
    const messages = await Message.find({ sender: manufacturerID }).populate("recipient")
    //console.log(messages)
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error while retrieving messages',
    });
  }
}
export const getAllMessageRecievedByManufacturer=async(req,res,next)=>{
  try {
    
    const manufacturerID = req.user.userId; 
    //const transporter=await User.findById({recipient})
    const messages = await Message.find({ recipient: manufacturerID }).populate("sender").populate("recipient")
    //console.log(messages)
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error while retrieving messages',
    });
  }
}




export const getAllTransporters=async(req,res,next)=>{
  try {
    const transporters = await User.find({ role: 'Transporter' });
    res.status(200).json({
      success: true,
      transporters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error while retrieving transporters',
    });
  }
}


export const getRecievedDetails=async(req,res,next)=>{
  try {
    
    const orderID = req.params.orderID; 
    //const transporter=await User.findById({recipient})
    const details = await Message.findOne({ orderID }).populate("sender").populate("recipient")
    //console.log(messages)
    res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error while retrieving messages',
    });
  }
}
export const getSentDetails=async(req,res,next)=>{
  try {
    
    const orderID = req.params.orderID; 
    //const transporter=await User.findById({recipient})
    const details = await Message.findOne({ orderID }).populate("sender").populate("recipient")
    //console.log(messages)
    res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error while retrieving messages',
    });
  }
}

export const Search=async(req,res)=>{
  const { orderID } = req.query;

try {
  const messages = await Message.find({ orderID: orderID }).populate('sender');

  res.status(200).json({
    success: true,
    messages,
  });
} catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    error,
    message: 'Error while retrieving messages',
  });
}
}

