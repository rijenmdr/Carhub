'use client'
import React from 'react'
import { Button } from '../'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();

    const handleScroll = () => {
        router.push('/#discover')
    }

    return (
        <div className='hero'>
            <div className="flex-1 pt-36 padding-x">
                <h1 className='hero__title'>
                    Find, book, or rent a car — quickly and easily!
                </h1>

                <p className='hero__subtitle'> Streamline your car rental experience with our effortless booking process.</p>

                <Button
                    title='Explore More'
                    containerStyles='bg-primary-blue text-white rounded-full mt-10'
                    handleClick={handleScroll}
                />
            </div>

            <div className='hero__image-container'>
                <div className='hero__image'>
                    <Image
                        src={"/hero.png"}
                        alt="hero"
                        fill
                        className='object-contain'
                    />

                </div>
                <div className='hero__image-overlay' />
            </div>
        </div>
    )
}

export default Hero