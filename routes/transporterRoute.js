import express from 'express';
import { requireSignIn, transportAuthMiddleware } from '../middlewares/auth.js';
import { CreateMessageTransporter, getRecievedDetails, getSentDetails } from '../controllers/transporterController.js';
import { getAllMessageRecievedByManufacturer, getAllMessageSentByManufacturer } from '../controllers/manufacturerController.js';



const router=express.Router();


router.post("/createmessage",requireSignIn,transportAuthMiddleware,CreateMessageTransporter)
router.get("/getAllmessageSentbyTransporter",requireSignIn,transportAuthMiddleware,getAllMessageSentByManufacturer)
router.get("/getAllmessageRecievedbyTransporter",requireSignIn,transportAuthMiddleware,getAllMessageRecievedByManufacturer)
router.get("/details/recieved/:orderID",requireSignIn,transportAuthMiddleware,getRecievedDetails)
router.get("/details/sent/:orderID",requireSignIn,transportAuthMiddleware,getSentDetails)

export default router;