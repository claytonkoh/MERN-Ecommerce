import React from 'react'
import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParam, setSearchParam] = useSearchParams()

    const success = searchParam.get('success')
    const orderId = searchParam.get('orderId')
    
    const verifyPayment = async() =>{
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendUrl + '/api/orders/verifyXendit', {success, orderId}, {headers:{token}})
            if(response.data.success){
                setCartItems([])
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            toast.error("Failed to verify payment")
            navigate('/cart')
        }
    }

    useEffect(()=>{
        verifyPayment()
    }, [token])
  return (
    <div>

    </div>
  )
}

export default Verify