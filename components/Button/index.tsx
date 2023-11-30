'use client'
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

interface IButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>
    textStyles?: string;
    rightIcon?:string;
}

const Button = ({ title, containerStyles, textStyles, rightIcon, handleClick }: IButtonProps) => {
    return (
        <button
            className={`custom-btn ${containerStyles}`}
            type='button'
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>

            {
                rightIcon &&
                <div className='relative w-6 h-6'>
                    <Image
                        src={rightIcon}
                        alt={"right icon"}
                        fill
                        className='object-contain'
                    />
                </div>
            }
        </button>
    )
}

export default Button