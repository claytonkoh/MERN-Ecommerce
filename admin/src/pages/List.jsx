import React, { useEffect } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'


const List = ({token}) => {
  const [list, setList] = useState([])
  const fetchList = async() =>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list')

      if (response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  
  useEffect(()=>{
    fetchList()
  },[])

  const removeProduct = async(id) =>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', 
                                        {id}, {headers:{token}})
      if (response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }

  }

  
  return (
    <div className='p-4 sm:p-6 bg-gray-50 min-h-screen'>
      <p className='text-2xl font-bold mb-6 text-gray-800'>All Product List</p>
      <div className='flex flex-col gap-2 bg-white rounded-lg shadow-md overflow-hidden'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border-b bg-gray-100 text-sm font-semibold text-gray-700'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Actions</b>
        </div>

        {/* Product List  */}
        <div className='flex flex-col'>
          {
            list.map((item, index)=>{
              return(
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b text-sm hover:bg-gray-50 transition-colors last:border-b-0' key={index}>
                  <img className='w-12 h-12 object-contain' src={item.images[0]} alt="Image" />
                  <p className='w-full whitespace-normal wrap-break-words line-clamp-2 font-medium text-gray-800'>{item.name}</p>
                  <p className='text-gray-600'>{item.category}</p>
                  <p className='font-semibold text-gray-900'>{currency}{item.price}</p>
                  <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700 transition-colors'>X</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default List