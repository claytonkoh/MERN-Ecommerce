import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ipsam atque dolorum odio repudiandae suscipit mollitia laboriosam assumenda impedit sapiente, consectetur quasi eos, iure labore excepturi deserunt voluptatem, vel ut?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, tenetur impedit consectetur ad, officiis perferendis laboriosam expedita quas explicabo sit necessitatibus voluptas soluta quam. Numquam officia ipsum adipisci iusto rerum!</p>
          <b className='text-gray800'>Our Mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit nostrum reiciendis corporis explicabo dolores tenetur odio labore ut harum nemo hic quia, temporibus, sequi soluta nulla cumque accusantium similique voluptates!</p>

        </div>
      </div>

      <div className='text-4xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsa fugit nostrum placeat ducimus maxime doloribus sed praesentium aspernatur porro perferendis nam labore quod, minima cupiditate beatae quisquam aliquid. Obcaecati!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsa fugit nostrum placeat ducimus maxime doloribus sed praesentium aspernatur porro perferendis nam labore quod, minima cupiditate beatae quisquam aliquid. Obcaecati!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsa fugit nostrum placeat ducimus maxime doloribus sed praesentium aspernatur porro perferendis nam labore quod, minima cupiditate beatae quisquam aliquid. Obcaecati!</p>
        </div>
      </div>

      <NewsLetterbox />
      
    </div>
  )
}

export default About
