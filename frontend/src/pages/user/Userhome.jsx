import React, { useState } from 'react'
import Menu from '../../components/Menu'
import { Link } from 'react-router-dom'

const Userhome = () => {
  const [menu,setMenu]=useState(false)

  return (
    
    <div className=' overflow-y-auto min-h-[calc(100vh-160px)] flex '>
      {/* sidebar */}
      <div className={ ` bg-blue-300 transition-all duration-500 ease-in-out ${menu?'flex-2  ':'flex-1'}`}>
        <Menu setMenu={setMenu} menu={menu} />
      </div>
      {/* section */}
      <div className='flex-5 md:flex-15  flex flex-col'>
        {/* header */}
        <div className='flex items-center p-4 h-20 justify-between'> 
          <h1>username</h1>
          <div>
            <Link>add task</Link>
          </div>
        </div>
        {/* cards */}
        <div className='h-full bg-red-300'>
          <div className='grid grid-cols-1 h-full'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Userhome






