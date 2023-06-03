import express from 'express';

import { manufacturerAuthMiddleware, requireSignIn } from '../middlewares/auth.js';
import { CreateMessage, getAllMessageRecievedByManufacturer, getAllMessageSentByManufacturer } from '../controllers/manufacturerController.js';

const router=express.Router();

router.post("/createmessage",requireSignIn,manufacturerAuthMiddleware,CreateMessage)
router.get("/getAllmessageSentbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageSentByManufacturer)
router.get("/getAllmessageRecievedbyManufacturer",requireSignIn,manufacturerAuthMiddleware,getAllMessageRecievedByManufacturer)

export default router;