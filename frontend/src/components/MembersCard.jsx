import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removemember } from '../features/AuthSlice'
import { motion } from 'framer-motion'

const MembersCard = ({ members, orgId }) => {
  const dispatch = useDispatch()
  const [pending, setPending] = useState(null)

  return (
    <div className='mt-5  grid  text-black sm:grid-cols-2 md:grid-cols-3 break-all lg:grid-cols-4 gap-3'>

      {
        members?.length === '0' ? <div>No members</div> :
          members?.map(x => {
            return <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={x._id} className='relative overflow-x-auto  shadow-black shadow-[0_0_20px_rgba(0,0,0,0.3)] bg-[#0C1A2B] text-[#B6FF3B] p-5 rounded-xl'>
              <div className="flex justify-center items-center">
                <div className="rounded-full h-16 w-16 flex justify-center items-center font-bold text-2xl bg-[#B6FF3B] text-[#0C1A2B]">
                  {x.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h1 className='text-2xl font-[moto]'><span className='border-b'>Name </span>:{x.name}</h1>
              <h1 className='text-[19px] '><span className='border-b'>Email </span>:{x.email}</h1>
              <div>
                <button onClick={() => {
                  setPending({ id: x._id })
                }} className='cursor-pointer absolute top-2 right-4 bg-red-700 text-white rounded-sm py-1 active:scale-95 px-2'>remove</button>
                {
                  pending && (
                    <div onClick={() => { setPending(null) }} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#0C1A2B] p-6 rounded-xl shadow-xl">

                        <p className="mb-4">Member will be removed from the Organization </p>

                        <div className="flex gap-4 justify-center">

                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => dispatch(removemember({ userId: pending.id, orgId: orgId._id },
                              console.log({ userId: pending.id, orgId })
                            ))}>
                            Remove Anyway
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={() => setPending(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )
                }

              </div>

            </motion.div>
          })


      }
    </div>

  )
}

export default MembersCard
