import React from 'react'

const MemberRegister = () => {
  return (
    <div>
      <div className='flex justify-center items-center'>
        <form action="" className='rounded-xl p-6 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] gap-7  h-90 w-100 flex flex-col items-center justify-center '>
        <h1 className='font-[bold] w-full text-2xl hover:underline duration-300'>Member Registration</h1>

            <div className='flex flex-col w-full '>
              <label >Member Name</label>
            <input type="text" className='outline-0'   placeholder='John doe' />
            </div>
            <div className='flex flex-col w-full '>
              <label >Member Password</label>
            <input type="text" className='outline-0'  placeholder='••••••••' />
            </div>
            <div>
                <button>register</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default MemberRegister
