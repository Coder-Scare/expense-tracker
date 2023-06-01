'use client' /* By default next.js makes components on server side for improved UX and rendering, have to explicitly call "use client" in order to render on browser and utilise useState etc */

import React, { useEffect, useState } from 'react';
// Import Searchable Dropdown
import SearchableDropdown from './SearchableDropdown';
// Import react icon
import { LuTrash } from 'react-icons/lu';
// Import components
import AddBtn from './AddBtn';

// Array of Objects for dropdown options
const options = [
  { key: 1, value: 'Travel' },
  { key: 2, value: 'Utility Bills' },
  { key: 3, value: 'Office Supplies' },
  { key: 4, value: 'Activities' },
  { key: 5, value: 'Insurance' },
];

// Type and titles to keep track of saved, edited and deleted forms and helps track an instance of a form
type Form = {
    key: number;
    selectedOption: number | null;
    amount: string;
    description: string;
}

const ExpenseForm = () => {
// States
const [displayForm, setDisplayForm] = useState(false);
const [editForm, setEditForm] = useState<number | null>(null);
// Keeps up with state from all forms including the current one in the array of forms
const [form, setForm] = useState<Form[]>([]);
// State for clearing the form component upon creating a new form so old data does not persist
const [newForm, setNewForm] = useState<Form>({
    key: new Date().getTime(),
    selectedOption: null,
    amount: '',
    description: '',
});

//Function helps to handle event after done button is clicked
const handleDone = () => {
    setForm((prev) =>
      [
        ...prev,
        {
            ...newForm,
        },
      ].sort((a, b) => a.key - b.key) //help to ensure form is in the right place upon edit or deletion
    );
    //   This sets what is seen once you click add new each time - a clean form
    setNewForm({
        key: new Date().getTime(),
        selectedOption: null,
        amount: '',
        description: '',
    });
    // after done button clicked, close the form
    setDisplayForm(false);
    setEditForm(null);
};
// useEffect used to dynamically update state everytime a specific element is re-rendered/changed 
useEffect(() => {
    if (typeof editForm !== 'number') return; //prevents errors as this should always be true at the start - editForm should not be clicked--editForm is the represents the key
    const formToBeEdited = form.find((f) => f.key === editForm); // Now check for key of form to be edited so the date/time of form creation
    if (!formToBeEdited) return //if they are not equal do nothing
    setNewForm(formToBeEdited); //put the form clicked as the form to be edited and put this into setNewForm state so it updates
    setForm((prev) => prev.filter((p) => p.key !== editForm));
}, [editForm]) //useEffect triggered each time dependency array changes

// This tracks form state continously upon changing any inputs on the form.
const onFormChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewForm((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
    }));
};

  return (
    <div className='pb-4'>
      <div>
        {form.map((f) => (
            <div
              key={f.key}
              onClick={() => {
                if (editForm) return; // to avoid clicking on new form if we're already editing a form
                setDisplayForm(true); //displays form
                setEditForm(f.key); //displays form with that specific key
              }}
              className='hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-3 item-center justify-center bg-white rounded-lg p-3 mb-3 hover:ring hover:ring-blue-200'
            >
              <p className='flex-grow-[2]'>{f.description}</p>
              <p className='flex-grow bg-blue-50 text-blue-800 py-2 px-5 rounded-md'>
                {options.find((o) => o.key === f.selectedOption)?.value}
              </p>
              <p className='flex-grow bg-blue-50 text-blue-800 py-2 px-5 rounded-md'>
                £{f.amount}
              </p>
              <button
                onClick={(event) => {
                    event.stopPropagation(); // prevents further changes to code happening
                    //then find specific key of form to be removed and set it's display to false - basically hides form
                    setForm((prev) => prev.filter((p) => p.key !== f.key));
                    setDisplayForm(false);
                }}
                className='bg-red-100 p-2 rounded-full hover:bg-red-300'
                >
                  <LuTrash />
              </button>
            </div>
        ))}
        {!displayForm && (
            <div className='flex justify-center'>
                <AddBtn onClick={() => setDisplayForm(true)} />
            </div>
        )}
        {displayForm && (
            <form
              onSubmit={handleDone}
              className='grid grid-cols-4 gap-2 flex item-center bg-white rounded-lg p-3'
              >
             <div className='col-span-2'>
                <SearchableDropdown
                  options={options}
                  onSelectedOption={(key) => {
                    console.log(key);
                    setNewForm((prev) => ({
                        ...prev,
                        selectedOption: key,
                    }));
                  }}
                  selectedKey={newForm.selectedOption}
                />
             </div>
             <div className='relative col-span-1'>
                  <input
                    className='py-3 px-4 pl-8 block border shadow-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full' 
                    type='number'
                    required
                    placeholder=''
                    name='amount'
                    value={newForm.amount}
                    onChange={onFormChange}
                  />
                <div 
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 overscroll-none">
                  <span className="text-gray-500">
                    £
                  </span>
                </div>
             </div>
             {newForm.selectedOption && (
             <div className='col-span-3'>
                <input
                  className='py-3 px-4 pl-8  block border shadow-sm rounded-md focus:ring-blue-200 focus:outline-none focus:ring w-full'
                  value={newForm.description} 
                  type="text"
                  name='description'
                  placeholder='Description (optional)'
                  maxlength='100'
                  onChange={onFormChange}
                />
             </div>
             )}
             {newForm.selectedOption && (
                <div className='flex justify-center'>
                    <button
                    disabled={!newForm.amount || !newForm.selectedOption}
                    type='submit'
                    className={`bg-blue-500 transition-colors self-end text-white font-semibold px-5 py-2 rounded-full text-s flex items-center gap-2 ${
                        newForm.amount && newForm.selectedOption ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-500 cursor-not-allowed opacity-50'
                    }`}
                    >
                    Done
                    </button>
                </div>
             )}
            </form>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm
