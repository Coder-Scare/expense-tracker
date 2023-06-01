import React from 'react'

// Import React Icon
import { AiOutlinePlusCircle } from 'react-icons/ai';

const AddBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div className='flex items-center justify-center py-5'>
            <button
            onClick={onClick}
            className='bg-white rounded-full px-2 font-medium text-blue-600 flex items-center gap-1'
            >
                Add new
                <AiOutlinePlusCircle />
            </button>
        </div>
    );
};

export default AddBtn