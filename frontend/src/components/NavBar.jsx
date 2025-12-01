  import React, { useContext, useState } from 'react'
  import { assets } from '../assets/assets'
  import { Link, NavLink } from 'react-router-dom'
  import { cn } from "@/lib/utils";
  import { ShopContext } from '../context/ShopContext';

  const NavBar = () => {
    const [visible, setVisible] = useState(false)

    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext)

    const logout = () =>{
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
      navigate('/login')
    }

    return (
      <div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm'>
        <div className='flex items-center justify-between py-5 px-[6vw] font-medium max-w-7xl mx-auto'>
          <Link to='/'>
            <img src={assets.logo} alt="Brand Logo" className='w-28' />
          </Link>

          {/* Main Menu */}
          <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/collection' className="flex flex-col items-center gap-1">
              <p>Collection</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/about' className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/contact' className="flex flex-col items-center gap-1">
              <p>Contact</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
          </ul>

          {/* Side Bar Menu */}
          <div className='flex items-center gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="Search Icon" className='w-5 cursor-pointer' />

            <div className='group relative'>
              <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} alt="Profile Icon" className='w-5 cursor-pointer' />
              {/* DropDown Menu */}
              {token && 
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 text-gray-500 rounded shadow'>
                  <p className='cursor-pointer hover:text-black'>My Profile</p>
                  <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={()=>logout()} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>}
              
            </div>

            <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} alt="Cart" className='w-5 min-w-5' />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                {getCartCount()}
              </p>
            </Link>

            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              alt="Menu"
              className='w-5 cursor-pointer sm:hidden'
            />
          </div>
        </div>

        {/* Sidebar mobile */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-40",
            visible ? "w-full" : "w-0"
          )}
        >
          <div className='flex flex-col text-gray-600 right-0'>
            <div
              onClick={() => setVisible(false)}
              className='flex items-center gap-4 p-3 cursor-pointer'
            >
              <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Close" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
          </div>
        </div>
      </div>
    )
  }

  export default NavBar
