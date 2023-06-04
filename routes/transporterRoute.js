import express from 'express';
import { requireSignIn, transportAuthMiddleware } from '../middlewares/auth.js';
import { CreateMessageTransporter, Search, getRecievedDetails, getSentDetails } from '../controllers/transporterController.js';
import { getAllMessageRecievedByManufacturer, getAllMessageSentByManufacturer } from '../controllers/manufacturerController.js';



const router=express.Router();


router.post("/createmessage",requireSignIn,transportAuthMiddleware,CreateMessageTransporter)
router.get("/getAllmessageSentbyTransporter",requireSignIn,transportAuthMiddleware,getAllMessageSentByManufacturer)
router.get("/getAllmessageRecievedbyTransporter",requireSignIn,transportAuthMiddleware,getAllMessageRecievedByManufacturer)
router.get("/details/recieved/:orderID",requireSignIn,transportAuthMiddleware,getRecievedDetails)
router.get("/details/sent/:orderID",requireSignIn,transportAuthMiddleware,getSentDetails)
router.get("/messages/search",requireSignIn,transportAuthMiddleware,Search)

export default router;