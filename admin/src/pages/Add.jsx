import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { cn } from '../lib/utils'
import axios from 'axios' 
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1 ] = useState(false)
  const [image2, setImage2 ] = useState(false)
  const [image3, setImage3 ] = useState(false)
  const [image4, setImage4 ] = useState(false)  

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)

  const onSubmitHandler = async(e) =>{
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)
      
      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}})
      
      if (response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setCategory('Men')
        setSubCategory('Topwear')
        setPrice('')
        setSizes([])
        setBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        console.log(response.data)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  
  return (
    <div className='p-4 sm:p-6 bg-gray-50 min-h-screen'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto'>
        <div className='w-full'>
          <p className='text-xl font-semibold mb-4 text-gray-800'>Upload Image</p>

          <div className='flex gap-4'>
            <div className='relative group'>
              <label htmlFor="image1" className='cursor-pointer'>
                <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md group-hover:border-blue-500 transition-colors' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
              </label>
              {image1 && (
                <button type="button" onClick={() => setImage1(false)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors">X</button>
              )}
            </div>

            <div className='relative group'>
              <label htmlFor="image2" className='cursor-pointer'>
                <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md group-hover:border-blue-500 transition-colors' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
              </label>
              {image2 && (
                <button type="button" onClick={() => setImage2(false)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors">X</button>
              )}
            </div>

            <div className='relative group'>
              <label htmlFor="image3" className='cursor-pointer'>
                <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md group-hover:border-blue-500 transition-colors' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
              </label>
              {image3 && (
                <button type="button" onClick={() => setImage3(false)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors">X</button>
              )}
            </div>

            <div className='relative group'>
              <label htmlFor="image4" className='cursor-pointer'>
                <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md group-hover:border-blue-500 transition-colors' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
              </label>
              {image4 && (
                <button type="button" onClick={() => setImage4(false)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors">X</button>
              )}
            </div>
          </div>
        </div>

        <div className='w-full mt-4'>
          <p className='text-base font-medium mb-2 text-gray-700'>Product Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Type Here' required/>
        </div>

        <div className='w-full mt-2'>
          <p className='text-base font-medium mb-2 text-gray-700'>Product Description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none' placeholder='Type Here' required></textarea>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row w-full sm:gap-8 mt-2'>
          <div className='w-full sm:w-auto'>
            <p className='mb-2 font-medium text-gray-700'>Product Category</p>
            <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className='w-full sm:w-auto'>
            <p className='mb-2 font-medium text-gray-700'>Sub Category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className='w-full sm:w-auto'>
            <p className='mb-2 font-medium text-gray-700'>Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="number" placeholder='25' required/>
          </div>
        </div>

        <div className='mt-4'>
          <p className='mb-2 font-medium text-gray-700'>Product Sizes</p>
          <div className='flex gap-3'>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]) }>
                <p className={cn(
                  "px-4 py-2 cursor-pointer border rounded-md transition-colors",
                  sizes.includes(size) ? "bg-black text-white border-black" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                )}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2 mt-4'>
          <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'/>
          <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestseller">Add to Bestseller</label>
        </div>

        <button type='submit' className='w-full sm:w-32 py-3 mt-6 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors shadow-sm'>ADD</button>
      </form>
    </div>
  )
}

export default Add