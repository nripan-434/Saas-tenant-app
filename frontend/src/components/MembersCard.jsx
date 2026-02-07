import React from 'react'

const MembersCard = ({members}) => {
  return (
        <div className='  grid grid-cols-2'>

    <div>
        {
            members?.length==='0'?<div>No members</div>:
            members?.map(x=>{
                    return <div key={x._id} className='relative bg-green-300 p-5 rounded-xl'>
                <h1 className='text-2xl font-[moto]'>Name:{x.name}</h1>
                <h1 className='text-[19px]'>email:{x.email}</h1>
                <h1>status</h1>
                <div>
                <button className='absolute bottom-2 right-4 bg-red-700 text-white rounded-xl  p-2'>remove</button>

                </div>

            </div>
            })
           

        }
    </div>
    </div>

  )
}

export default MembersCard
