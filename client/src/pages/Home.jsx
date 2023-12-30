import {useEffect, useState} from 'react'
import { LoginForm, RegisterForm } from './LoginOrRegister'
import Navbar from '../component/Navbar'

const Home = () => {
    const [isLoginForm, setIsLoginForm]= useState(true)
  

  return (
    <div className='h-screen overflow-y-auto  bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>
        <Navbar/>
       <div className=' h-[680px] my-5 flex items-center justify-center'>
       {
            isLoginForm? <LoginForm  setIsLoginForm={setIsLoginForm}/> : <RegisterForm setIsLoginForm={setIsLoginForm}/>
        }
       </div>
    </div>
  )
}

export default Home