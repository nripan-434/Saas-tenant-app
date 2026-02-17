import React from 'react'
import { useDispatch } from 'react-redux'
import { removemember } from '../features/AuthSlice'

const MembersCard = ({ members, orgId }) => {
    const dispatch = useDispatch()

    return (
        <div className='m-5  grid  text-black sm:grid-cols-2 md:grid-cols-3 break-all lg:grid-cols-4 gap-3'>

            {
                members?.length === '0' ? <div>No members</div> :
                    members?.map(x => {
                        return <div key={x._id} className='relative overflow-x-auto bg-gray-300 p-5 rounded-xl'>
                            <h1 className='text-2xl font-[moto]'>Name:{x.name}</h1>
                            <h1 className='text-[19px]'>email:{x.email}</h1>
                            <h1>status</h1>
                            <div>
                                <button onClick={() => {
                                    const confirmDelete = window.confirm(
                                        `Are you sure you want to remove ${x.name} from this organization?`
                                    );
                                    if (confirmDelete) {
                                        dispatch(removemember({ userId: x._id, orgId }))
                                    }
                                }} className='cursor-pointer absolute bottom-2 right-4 bg-red-700 text-white rounded-xl  p-2'>remove</button>

                            </div>

                        </div>
                    })


            }
        </div>

    )
}

export default MembersCard
