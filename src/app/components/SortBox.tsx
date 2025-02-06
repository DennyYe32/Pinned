import { useState } from 'react';
import React from "react";


const sortTypes = ["Name", "Area", "Type", "Distance"];


export default function SortBox ({sorts, setSort}: {sorts: string, setSort: Function}){

    // const handleCheckboxChange = (sort: string) => {

    //     setSort(sort);
    //   };

    return(
    <div className='bg-white rounded-md m-5'>
        <div className='text-center text-3xl font-inter font-bold text-red-500'>Sort</div>
        <ul className='w-full'>
            <li className='flex flex-col items-center'>
                <div className='py-1 align-middle'>
                    {sortTypes.map((sort) => (
                        <div key={sort}>
                            <hr />
                            <input 
                                id="sort" 
                                type="checkbox" 
                                className="appearance-none cursor-pointer w-5 h-5 rounded-full border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none align-middle" 
                                checked={sorts === sort} 
                                onChange={() => setSort(sort)} 
                                value="1" />
                            <label className='text-center align-middle text-2xl font-inter w-full py-3 ms-2'> {sort}</label>
                        </div>
                    ))}
                </div>
            </li>
        </ul>
    </div>
    );
}

