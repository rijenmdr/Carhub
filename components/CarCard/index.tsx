'use client'
import { ICar } from '@/types/car'
import { calculateCarRent } from '@/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, CarDetail } from '..';

interface IProps {
    car: ICar
}

const CarCard = ({ car }: IProps) => {
    const { make, model, city_mpg, year, transmission, drive, highway_mpg } = car;

    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year)
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {make} {model}
                </h2>
            </div>

            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    $
                </span>
                {carRent}
                <span className='self-end text-[14px] font-semibold'>
                    /day
                </span>
            </p>

            <div className='relative w-full h-40 my-3'>
                <Image
                    src={"/hero.png"}
                    alt="car model"
                    fill
                    priority
                    className='object-contain'
                />
            </div>

            <div className='relative w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between items-center'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image
                            src={"/steering-wheel.svg"}
                            width={20}
                            height={20}
                            alt='steering wheel'
                        />
                        <p className='text-[14px]'>
                            {transmission === "a" ? 'Automatic' : 'Manual'}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image
                            src={"/tire.svg"}
                            width={20}
                            height={20}
                            alt='tire'
                        />
                        <p className='text-[14px]'>
                            {drive?.toUpperCase()}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image
                            src={"/gas.svg"}
                            width={20}
                            height={20}
                            alt='gas'
                        />
                        <p className='text-[14px]'>
                            {highway_mpg} MPG
                        </p>
                    </div>
                </div>
                <div className='car-card__btn-container'>
                    <Button
                        title='View More'
                        containerStyles='w-full py-[16px] justify-between bg-primary-blue rounded-full'
                        textStyles='text-white text-[14px] leading-[17px] font-bold' 
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>

            <CarDetail
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                car={car}
            />
        </div>
    )
}

export default CarCard