import express from 'express';

import { manufacturerAuthMiddleware, requireSignIn } from '../middlewares/auth.js';
import { CreateMessage, getAllMessageRecievedByManufacturer, getAllMessageSentByManufacturer, getAllTransporters, getDetailsByOrderId } from '../controllers/manufacturerController.js';

const router=express.Router();

router.post("/createmessage",requireSignIn,manufacturerAuthMiddleware,CreateMessage)
router.get("/getAllmessageSentbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageSentByManufacturer)
router.get("/getAllmessageRecievedbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageRecievedByManufacturer)
router.get("/getAlltransporters",requireSignIn,manufacturerAuthMiddleware,getAllTransporters)
router.get("/getDetails/:orderID",requireSignIn,getDetailsByOrderId)
export default router;