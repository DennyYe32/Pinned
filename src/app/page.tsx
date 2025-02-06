"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import LandingNav from './components/LandingNav';

export default function Home() {
    const router = useRouter();

    const handleGuestClick = () => {
        router.push('./guest-home')
    }

    const handleLoginClick = () => {
        router.push('./login')
    }

    return (
        // gradient pink color scheme
        <div className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 h-screen">
            <div>
                <LandingNav />
            </div>
            <div className="flex justify-center">
                <Image className="mt-[20vh]"
                    src='/images/Pinned-Logo.png'           
                    alt={`Pinned Logo`} 
                    width={500} 
                    height={400}
                    priority />
            </div>
            <div className='text-center font-sans text-7xl pt-[10vh] text-white'>
                <i>Start Pinning Now!</i>
            </div>
            <div className='flex justify-center pt-[15vh] text-sans text-2xl'>
                <button className='bg-white font-sans border-4 border-black font-bold cursor-pointer w-80 h-20 rounded-full align-items-center'
                    onClick={handleGuestClick}
                >
                    <i>Continue as Guest</i>
                </button>
                <button className='ml-[25vh] bg-white border-4 border-black font-sans font-bold cursor-pointer w-80 h-20 rounded-full align-items-center'
                    onClick={handleLoginClick}
                >
                    <i>User Login</i>
                </button>
            </div>
        </div>
    )
}
