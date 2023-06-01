import React from 'react'

// Array for Information
// Look to make a prop for this later
const info = [
    {
        key: 1,
        text: 'Further expense costs based on your industry'
    },
    {
        key: 2,
        text: 'Please provide us with as many of your expenses as possible.'
    },
    {
        key: 3,
        text: 'These can be anything from equipment costs to marketing budgets.'
    },
]

const Info = () => {
  return (
    <div className='py-5'>
      <h1 className='text-3xl font-medium pb-4'>{info[0].text}</h1>
      <p className='text-slate-500'>{info[1].text}</p>
      <p className='text-slate-500'>{info[2].text}</p>
      <p className='text-slate-500'>If you make a loss, this can be carried forward - click on the <b>help</b> icon for more information. If your expenses are under £1,000, we will apply a £1,000 <a href="#" className='text-blue-600 hover:underline'>trading allowance</a> instead.</p>
    </div>
  )
}

export default Info
