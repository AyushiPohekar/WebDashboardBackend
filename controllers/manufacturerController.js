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
    const { to, from, quantity, address, content, sender, recipient, price } =
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
       price,
     
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
    const messages = await Message.find({ recipient: manufacturerID }).populate("sender")
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
