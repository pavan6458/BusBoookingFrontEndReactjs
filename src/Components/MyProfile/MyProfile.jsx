import React from 'react'
import Header from '../Header/Header'
import MyProfileImage from './MyProfileImage'
import MyProfileData from './MyProfileData'

function MyProfile() {
  return (
    <div >
         <Header/>
         <div className='flex relative bg-gray-100 h-[100vh]'>
            <div className='w-[30%] flex flex-row-reverse px-10 py-16'><div className=''>
                <MyProfileImage/>
                </div></div>
            <div className='w-[70%] px-10 py-16'><MyProfileData/></div>
         </div>
    </div>
  )
}

export default MyProfile