import { useState } from 'react';
import React from "react";


export default function FilterBox ({title, categories, selectedCategories, setSelectedCategories}:{title: string, categories: string[], selectedCategories: string[], setSelectedCategories: Function}){

    // const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCheckboxChange = (category: string) => {
        setSelectedCategories((prev: any[]) =>
          prev.includes(category)
            ? prev.filter((c: string) => c !== category)
            : [...prev, category]
        );
      };

    return(
    <div className='bg-white rounded-md m-5'>
        <div className='text-center text-3xl font-inter font-bold text-red-500'>{title}</div>
        <ul className='w-full'>
            <li className='flex flex-col items-center'>
                <div className='py-1 align-middle'>
                    {categories.map((category) => (
                        <div key={category}>
                            <hr />
                            <input 
                                id="filter" 
                                type="checkbox" 
                                className="appearance-none cursor-pointer w-5 h-5 rounded-full border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none align-middle" 
                                checked={selectedCategories.includes(category)} 
                                onChange={() => handleCheckboxChange(category)} 
                                value="1" />
                            <label className='text-center align-middle text-2xl font-inter w-full py-3 ms-2'> {category}</label>
                        </div>
                    ))}
                </div>
            </li>
        </ul>
    </div>
    );
}

