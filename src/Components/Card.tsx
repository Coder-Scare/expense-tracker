import React from 'react'


// Import Components
import HelpModal from './HelpModal'
import Logo from './Logo'
import Info from './Info'
import Button from './Button'
// Import React Icons
import {AiOutlineCheck} from 'react-icons/ai';
import {IoMdArrowBack} from 'react-icons/io';
import ExpenseForm from './ExpenseForm'




const Card = () => {
  return (
    <div className='grid grid-cols-1 bg-blue-50 rounded-xl p-5 max-w-xl m-auto'>
        <div className='flex justify-end'>
            <HelpModal />
        </div>

        <Logo />
        <Info />
        
        <ExpenseForm />
 

        <div className='flex flex-row justify-between'>
          <Button name='Back' className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded-full shadow flex items-center gap-2' iconPosition='left' icon={<IoMdArrowBack/>}/>
          <Button name='Update' className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow flex items-center gap-2' iconPosition='right' icon={<AiOutlineCheck/>}/>
        </div>
        
      
    </div>
  )
}

export default Card
