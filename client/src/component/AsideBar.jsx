import {useContext, Fragment} from 'react'
import { studentMenu, tutorMenu } from '../assets/userMenu'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/userContext'

const AsideBar = () => {
  const { user:{role}} = useContext(UserContext)
  return (
    <div className=' bg-slate-500 bg-opacity-40 rounded-lg my-1 h-[660px] w-1/6 sticky top-[55px]'>
      <ul className='flex flex-col items-center mx-3 text-slate-300  mt-2'>
      { role==="student" &&
        studentMenu.map((item, idx)=>(
          <Fragment key={idx}>
            <Link to={item.onclick}>
              <li  className='bg-blue-900 my-2 px-3 py-1 w-40 text-center rounded-md cursor-pointer' >
                  {item.tab}
              </li> 
            </Link>          
          </Fragment>
        ))       

      }

      
        { role==="tutor" &&
        tutorMenu.map((item, idx)=>(
          <Fragment key={idx}>
            <Link to={item.onclick}>
              <li  className='bg-blue-900 my-2 px-3 py-1 w-40 text-center rounded-md cursor-pointer' >
                  {item.tab}
              </li> 
            </Link>          
          </Fragment>
        ))       

      }
      


      </ul>
    </div>
  )
}

export default AsideBar