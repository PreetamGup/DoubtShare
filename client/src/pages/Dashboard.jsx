import {useContext} from 'react'
import { UserContext } from '../Context/userContext'



const Dashboard = () => {
  const { user:{role}} = useContext(UserContext)

  return (
    <div className='bg-slate-500 bg-opacity-30 w-full h-full overflow-y-auto  mt-1 ml-4 rounded-lg '>
      
    </div>
  )
}

export default Dashboard