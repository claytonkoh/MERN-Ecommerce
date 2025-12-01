import express from "express";
import {placeOrder, placeOrderXendit, verifyXendit, allOrders, userOrders, updateOrderStatus} from "../controllers/orderController.js"
import { adminAuth } from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router()

// Admin Routes
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/update',adminAuth, updateOrderStatus)

// Payment Routes
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/xendit',authUser, placeOrderXendit)

// User Routes
orderRouter.post('/userorders',authUser, userOrders)

// Verify Routes
orderRouter.post('/verifyXendit',authUser, verifyXendit)

export default orderRouter  
