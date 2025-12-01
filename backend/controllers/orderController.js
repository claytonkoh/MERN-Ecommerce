import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import { Xendit } from 'xendit-node'

// Global Variables
const currency = "IDR"
const deliveryCharge = 10

// Gateway Initialize
const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

// Placing Order using COD order
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success: true, message: "Order Placed Successfully", newOrder})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Failed to place order"})
    }
}

// Placing Order using Stripe Payment
const placeOrderXendit = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
        const {origin}= req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Xendit",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        const line_items = items.map((item) => ({
            name: item.name,
            price: item.price * 15000,
            quantity: item.quantity
        }))

        line_items.push({
            name: "Delivery Charge",
            price: deliveryCharge * 15000,
            quantity: 1
        })

        const invoice = await xendit.Invoice.createInvoice({
            data: {
                externalId: newOrder._id.toString(),
                amount: amount * 15000,
                payerEmail: address.email,
                description: "Payment for Order " + newOrder._id,
                invoiceDuration: 86400,
                successRedirectUrl: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                failureRedirectUrl: `${origin}/verify?success=false&orderId=${newOrder._id}`,
                currency: currency,
                items: line_items
            }
        })
        res.json({success:true, session_url:invoice.invoiceUrl})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to place order"})
    }
}

// Verify Payment
const verifyXendit = async(req,res) =>{
    const {orderId, success, userId } = req.body
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true, message:"Payment Verified Successfully"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to verify payment"})
    }
}

// All Order data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to fetch orders"})
    }
}

// User Order Data for FrontEnd
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({userId})

        if (orders){
            res.json({success: true, message: "Orders fetched successfully", orders})
        }else{
            res.json({success: false, message: "No orders found"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Failed to fetch orders"})
    }
}

// Update Order Status from admin
const updateOrderStatus = async (req, res) => {
    try {
        const {userId, orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Order status updated successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to update order status"})
    }
}

export {placeOrder, placeOrderXendit, verifyXendit, allOrders, userOrders, updateOrderStatus}