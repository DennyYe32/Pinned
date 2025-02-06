"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image'


export default function LandingNav() {
    const router = useRouter();

    const handleClick = () => {
        router.push('./sign-up')
    }
    return (
        <div className="fixed w-full bg-white p-3 border-b-2 border-black">
            <div className='flex justify-between items-center font-sans'>
                <Image 
                    src='/images/navpin.svg'           
                    alt={`Pinned Logo`} 
                    width={25} 
                    height={20}
                />
                <button className='text-grey pr-8'
                    onClick={handleClick}
                >
                    <strong className='text-2xl text-decoration-line: underline'><i>Signup</i></strong>
                </button>
            </div>
        </div>
    )
}