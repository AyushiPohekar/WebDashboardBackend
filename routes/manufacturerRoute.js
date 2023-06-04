import express from 'express';

import { manufacturerAuthMiddleware, requireSignIn } from '../middlewares/auth.js';
import { CreateMessage, getAllMessageRecievedByManufacturer, getAllMessageSentByManufacturer, getAllTransporters} from '../controllers/manufacturerController.js';
import { Search, getRecievedDetails, getSentDetails } from '../controllers/transporterController.js';

const router=express.Router();

router.post("/createmessage",requireSignIn,manufacturerAuthMiddleware,CreateMessage)
router.get("/getAllmessageSentbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageSentByManufacturer)
router.get("/getAllmessageRecievedbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageRecievedByManufacturer)
router.get("/getAlltransporters",requireSignIn,manufacturerAuthMiddleware,getAllTransporters)
router.get("/details/recieved/:orderID",requireSignIn,manufacturerAuthMiddleware,getRecievedDetails)
router.get("/details/sent/:orderID",requireSignIn,manufacturerAuthMiddleware,getSentDetails)
router.get("/messages/search",requireSignIn,manufacturerAuthMiddleware,Search)
export default router;