import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../Context/userContext'

const AllDoubt = () => {
    const [doubts, setDoubts] = React.useState([])
    const [subject, setSubject] = React.useState("")
    const [sortBy, setSortBy]= React.useState("")
    const {user:{_id}} = useContext(UserContext);
    
    const fetchDoubtHistory=async()=>{
       try {
        const response = await axios.get(`/doubt/alldoubt/${_id}`,
        {
          params:{
            subject,
            sortBy
          },
          withCredentials:true
        }
        );

        if(response.data.success){
            setDoubts(response.data.allDoubt)
        }
       } catch (error) {
        console.error(error)
       }
    }

    useEffect(()=>{
        fetchDoubtHistory()
    },[subject, sortBy])
  return (
    <div className='mx-auto w-full rounded-sm mt-1 relative'>
        <h1 className="text-2xl font-serif font-semibold text-center">Your Doubt History</h1>
        <div className=' relative -right-10 w-64'>
            <label className=" mb-4 flex w-full items-center gap-3">
              <span className="text-gray-900 text-xl font-semibold">Filter:</span>
              <select
                className="mt-1 p-2 w-42 border rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value={""}>Select subject</option>
                <option value="english">English</option>
                <option value="maths">Maths</option>
                <option value="science">Science</option>
              </select>

              <span className="text-gray-900 text-xl font-semibold">Sort:</span>
              <select
                className="mt-1 p-2 w-56 border rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                required
              >
                <option value={""}>Sort by</option>
                <option value="recent">Recent</option>
                <option value="older">Older</option>
              
              </select>
            </label>
          
        </div>
        <div className="doubtHistory w-5/6  rounded-sm mx-auto mt-4">
            {
              doubts.length===0? <div className='text-center mt-36 text-xl font-semibold'>You have not asked any doubt till now</div>
              :
              doubts.map((doubt, idx)=>(
                <div key={doubt._id} className='px-2 py-5 mb-3 bg-slate-300 bg-opacity-20 rounded text-slate-100'>
                  <div className='mb-4'>
                    <span className='px-2 py-1 mx-2 rounded-lg  bg-violet-400 '>Subject: {doubt.subject.toUpperCase()}</span>
                     <span className='px-2 py-1 mx-2 rounded-lg  bg-violet-400'>Topic: {doubt.topic}</span> 
                     <span className={`px-2 py-1 mx-2 rounded-lg ${doubt.isAccepted?"  bg-green-600": "bg-red-600" }`}>{doubt.isAccepted?"Answered":"Not Answered"}</span>
                  </div>
                  <div className='px-2 text-black ' >
                    <span className='font-bold text-lg'>Doubt:</span> <br />
                    <div className='bg-slate-300 p-2 text-black rounded-md'>
                      {doubt.doubt}
                    </div>
                  </div>
                  
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default AllDoubt