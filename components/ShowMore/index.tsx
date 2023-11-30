'use client'

import React from 'react'
import { Button } from '..';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';

interface IProps {
    pageNumber: number;
    isNext: boolean;
}

const ShowMore = ({ pageNumber, isNext }: IProps) => {
    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;

        const newPathname = updateSearchParams("limit", newLimit?.toString());

        router.push(newPathname, { scroll: false })
    }
    return (
        <div className='w-full flex-center gap-5 mt-10'>
            {
                !isNext &&
                <Button
                    title='Show More'
                    handleClick={handleNavigation}
                    containerStyles='bg-primary-blue rounded-full text-white'
                />
            }
        </div>
    )
}

export default ShowMore