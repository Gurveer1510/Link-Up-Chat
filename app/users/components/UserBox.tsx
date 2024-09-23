"use client"

import Avatar from '@/app/components/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import React from 'react'

interface UserBoxProps {
    data: User
}

function UserBox({ data }: UserBoxProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(async () => {
        setIsLoading(true)

        try {
            const response = await axios.post("/api/conversations", {
                userId: data.id
            })
            if(response.data){
                router.push(`/conversations/${data.id}`)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            
        } finally{
            setIsLoading(false)
        }

    }, [data, router])

    return (
        <div
            onClick={handleClick}
            className='
                w-full
                relative
                flex
                items-center
                space-x-3
                bg-white
                p-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
            '
        >
            <Avatar currentUser={data}/>
            <div className='min-w-0 flex-1'>
                <div className="focus:outline-none">
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-sm font-medium text-gray-900'>
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox