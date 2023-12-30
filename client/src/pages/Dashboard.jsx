import {useContext} from 'react'
import { UserContext } from '../Context/userContext'



const Dashboard = () => {
  const { user:{role}} = useContext(UserContext)

  return (
    <div className='bg-slate-500 bg-opacity-30 w-full h-full overflow-y-auto  mt-1 ml-4 rounded-lg '>
      {
        role==="student" && 
        <div className='m-4'>
          <h1 className='text-2xl text-center mt-2'>Student Dashboard</h1>
        </div>
      }


      {
        role==="tutor" &&
        <div>
          <h1 className='text-2xl text-center mt-2'>Tutor Dashboard</h1>
        </div>
      }
    </div>
  )
}

export default Dashboard