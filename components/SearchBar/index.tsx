'use client'
import React, { FormEvent, useState } from 'react'
import { SearchManufacturer } from '..'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchButton = ({ otherStyles }: { otherStyles: string }) => {
    return (
        <button
            type='submit'
            className={`z-10 -ml-3 ${otherStyles}`}
        >
            <Image
                src={"/magnifying-glass.svg"}
                alt="search-icon"
                width={40}
                height={40}
                className='object-contain'
            />
        </button>
    )
}

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    const router = useRouter();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!manufacturer && !model) {
            return alert("Please provide some input")
        }

        updateSearchParams(manufacturer?.toLowerCase(), model?.toLowerCase());
    }

    const updateSearchParams = (manufacturer: string, model: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (manufacturer) searchParams.set("manufacturer", manufacturer);
        else searchParams.delete("manufacturer")

        if (model) searchParams.set("model", model);
        else searchParams.delete("model");

        const newPathname = `${window.location.pathname}?${searchParams?.toString()}`;

        router.push(newPathname, { scroll: false })
    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
                />

                <SearchButton otherStyles='sm:hidden' />
            </div>

            <div className='searchbar__item'>
                <Image
                    src={"/model-icon.png"}
                    alt='model'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                />

                <input
                    type='text'
                    name="model"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    placeholder='Tiguan'
                    className='searchbar__input'
                />

                <SearchButton otherStyles='sm:hidden' />
            </div>

            <SearchButton otherStyles='max-sm:hidden' />
        </form>
    )
}

export default SearchBar