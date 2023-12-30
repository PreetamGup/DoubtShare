import React from 'react'
import { Outlet } from 'react-router-dom'
import AsideBar from './AsideBar'
import Navbar from './Navbar'


const Layout = () => {
  return (
    <div className='flex flex-col h-screen bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>
        <Navbar/>
        <div className='flex px-4 h-[660px]'>
            <AsideBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout