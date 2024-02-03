'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    const setParams = useParamsStore(state => state.setParams)
    const router = useRouter();
    const pathname = usePathname();

    const setSearchValue = useParamsStore(state => state.setSearchValue)
    const searchValue = useParamsStore(state => state.searchValue)

    function onChange(event: any) {
        setSearchValue(event.target.value)
    }

    function search() {
        if (pathname !== '/') router.push('/');
        setParams({ searchTerm: searchValue })
    }
    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm bg-gray-50'>
            <input
                onKeyDown={(e: any) => {
                    if (e.key === 'Enter') search();
                }}
                value={searchValue}
                onChange={onChange}
                type="text"
                placeholder='البحث عن طريق اسم او زمر الشركة'
                className='
                    flex-grow
                    pl-5
                    bg-transparent
                    focus:outline-none
                    border-transparent
                    focus:border-transparent
                    focus:ring-0
                    text-base
                  text-gray-600
                '
            />
            <button onClick={search}>
                <FaSearch
                    size={34}
                    className={'bg-red-400 text-white rounded-full p-2 curser-pointer mx-2'} />
            </button>
        </div>
    )
}

export default Search