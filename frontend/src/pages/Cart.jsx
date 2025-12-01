import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      {/* If cart is empty */}
      {cartData.length === 0 ? (
        <div className='text-center text-gray-500 py-20'>
          <p className='text-lg'>Your cart is empty 🛒</p>
          <p className='text-sm mt-2 mb-5'>Start shopping to add items to your cart!</p>
          <NavLink to='/collection'>
            <b className='inline-block text-base sm:text-lg font-semibold text-white bg-gray-800 hover:bg-gray-500 px-6 py-2 rounded-full transition-all duration-300'>See Our Collection</b>
          </NavLink>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-10 justify-between'>
          {/* Cart Items List */}
          <div className='flex-1'>
            {cartData.map((items, index) => {
              const productData = products.find((product) => product._id === items._id)
              if (!productData) return null

              return (
                <div
                  key={index}
                  className='py-4 border-t border-b text-gray-700 grid
                  grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                >
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.images[0]} alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>
                          {currency}
                          {productData.price}
                        </p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{items.size}</p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(items._id, items.size, Number(e.target.value))
                    }
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                    type='number'
                    min={1}
                    defaultValue={items.quantity}
                  />
                  <img
                    onClick={() => updateQuantity(items._id, items.size, 0)}
                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                    src={assets.bin_icon}
                    alt='remove item'
                  />
                </div>
              )
            })}
          </div>

          {/* Cart Total */}
          <div className='w-full lg:w-[350px]'>
            <div className='sticky top-30'>
              <CartTotal />
              <div className='w-full text-end'>
                <NavLink to='/place-order'>
                  <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
                </NavLink>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
