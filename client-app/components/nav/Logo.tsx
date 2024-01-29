"use client"

import React from 'react'
import Image from 'next/image'
import { useParamsStore } from '@/hooks/useParamsStore'
import Link from 'next/link'

const Logo = () => {
    const reset = useParamsStore(state => state.reset)
    return (
        <Link onClick={reset} href={'/'} className='cursor-pointer' >
            <Image
                src="/assests/logo.png"
                alt="image"
                width={150}
                height={150}
                priority={true} />
        </Link>
    )
}

export default Logo