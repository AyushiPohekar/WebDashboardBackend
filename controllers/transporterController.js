import Message from "../models/Message.js";

export const CreateMessageTransporter = async (req, res, next) => {
  
    const transporterID = req.user.userId;
    try {
      const {  orderID,content, sender, recipient, price } =
        req.body;
        console.log(orderID)
      const newMessage = new Message({
        orderID,
        content,
        sender: transporterID,
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
  
  export const getAllmessageSentbyTransporter=async(req,res,next)=>{
    try {
      
      const transporterID = req.user.userId; 
      //const transporter=await User.findById({recipient})
      const messages = await Message.find({ sender: transporterID }).populate("recipient")
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
  export const getAllmessageRecievedbyTransporter=async(req,res,next)=>{
    try {
      
      const transporterID = req.user.userId; 
      //const transporter=await User.findById({recipient})
      const messages = await Message.find({ recipient: transporterID }).populate("sender")
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
  