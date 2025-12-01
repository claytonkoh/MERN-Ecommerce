import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async() =>{
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, {headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders.reverse())
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  const statusHandler = async(e, orderId) =>{
    try {
      const response = await axios.post(backendUrl + "/api/orders/update", {orderId, status: e.target.value}, {headers:{token}})
      if (response.data.success){
        await fetchAllOrders()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-4 sm:p-6 bg-gray-50 min-h-screen'>
      <h3 className='text-2xl font-bold mb-6 text-gray-800'>Order Page</h3>
      <div className='flex flex-col gap-4'>
        {
          orders.map((order, index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-4 items-start border border-gray-200 bg-white shadow-sm rounded-lg p-5 md:p-8 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12 h-12 object-contain' src={assets.parcel_icon} alt="" />
              <div className='flex flex-col gap-1'>
                <div>
                  {order.items.map((item,index)=>{
                    if(index === order.items.length - 1){
                      return <p className='py-0.5 font-medium' key={index}>{item.name} x {item.quantity} <span className='text-gray-500'>({item.size})</span></p>
                    }else{
                      return <p className='py-0.5 font-medium' key={index}>{item.name} x {item.quantity} <span className='text-gray-500'>({item.size})</span>,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-1 font-semibold text-gray-900'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-gray-600'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                </div>
                <p className='text-gray-600'>{order.address.phone}</p>
              </div>

              <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>{order.payment ? "Paid" : "Pending"}</span></p>
                <p>Date : {new Date(order.date).toLocaleDateString() + ' | ' + new Date(order.date).toLocaleTimeString()}</p>
              </div>
              <p className='text-sm sm:text-base font-bold text-gray-800'>{currency}{order.amount}</p>
              <select onChange={(e)=>statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
                <option value="Order Place">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Out For delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders