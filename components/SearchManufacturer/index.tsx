'use client'
import Image from "next/image";
import { useState, Fragment } from "react";

import { manufacturers } from "@/contants";
import { Combobox, Transition } from "@headlessui/react";

interface IProps {
    manufacturer: string;
    setManufacturer: React.Dispatch<React.SetStateAction<string>>
}

const SearchManufacturer = ({ manufacturer, setManufacturer }: IProps) => {
    const [query, setQuery] = useState("");

    const filteredManufacture =
        query === ''
            ? manufacturers
            : manufacturers.filter((manufacturer) =>
                manufacturer
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    return (
        <div className="search-manufacturer">
            <Combobox
                value={manufacturer}
                onChange={setManufacturer}
            >
                <div className="relative w-full">
                    <Combobox.Button className={"absolute top-[14px]"}>
                        <Image
                            src="/car-logo.svg"
                            alt="Car Logo"
                            width={20}
                            height={20}
                            className="ml-4"
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className={"search-manufacturer__input"}
                        displayValue={(manufacturer: string) => manufacturer}
                        placeholder="Volkswagen"
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className={"search-manufacturer__options"}>
                            {
                                filteredManufacture.map(manufacturer => (
                                    <Combobox.Option
                                        key={manufacturer}
                                        className={({ active }) =>
                                            `relative search-manufacturer__option
                                            ${active ? 'bg-primary-blue text-white' : ''}
                                            `
                                        }
                                        value={manufacturer}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {manufacturer}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer