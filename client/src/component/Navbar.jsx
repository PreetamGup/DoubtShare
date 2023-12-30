import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import { useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import axios from 'axios';


const Navbar = () => {
  const [navActive, setActive]= React.useState(false)
  const {isLoggedIn, setIsLoggedIn, user:{name, notification}} = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogout =async()=>{
    try {
      const response = await axios.get("/user/logout",{withCredentials:true});

      if(response.data.success){

        localStorage.setItem("loggedIn", false);
        setIsLoggedIn(false)
        navigate("/")
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const changeColor=()=>{

    if(window.scrollY>=4){
      setActive(true)
    }else{
      setActive(false)
    }
  }

  React.useEffect(()=>{
    changeColor()
    window.addEventListener("scroll",changeColor)

   },[setActive])

  return (
    <div className={`h-[50px] flex justify-between items-center px-4 sticky top-0 ${navActive && "bg-blue-900 bg-opacity-40"}`}>
      <div className='py-2'>
        <span className='text-3xl text-white font-normal font-monoton '>DoubtShare</span>
      </div>

      <div>
        {isLoggedIn?
        <div className='flex justify-between gap-4'>
          <div className='flex items-center gap-1'>
            <FaCircleUser className='text-black text-xl self-center' />
            <span className='pl-1 font-semibold'>{name}</span>
            <div className='relative notification'>
              <div  className='notificationIcon'>
                <CiBellOn className=' text-black text-2xl ml-2 font-semibold ' />
                {
                  notification.length===0?"":
                  <>
                    <div className=' notificationLength absolute -top-[6px] z-10 -right-[8px] w-5 bg-red-500 rounded-full flex justify-center items-center text-sm'>
                      <span >{notification.length}</span>
                    </div>

                  
                  </>
                }
              </div>

              <div className='notificationContent hidden absolute z-40 top-5 w-48 -left-[70px] '>
                <div className='mt-2'></div>

                <div className='bg-slate-200 bg-opacity-15 rounded-sm px-1'>
                  {
                      notification.map((item,idx)=>(
                        <div className=' mt-2'>
                          <p>{item.message}</p>
                        </div>
                      ))
                    }
                </div>                 
                  
              </div>
            </div>
            
          </div>
          <button className='bg-blue-800 px-2 py-1 rounded-md text-slate-200' onClick={handleLogout}>Logout</button> 
        </div>
        : 
        
        <>
       
          <button  className='bg-blue-800 px-2 py-1 rounded-md text-slate-200' onClick={()=>navigate("/")}>Login</button>
        </>
        
        }
      </div>
  
    </div>
  )
}

export default Navbar