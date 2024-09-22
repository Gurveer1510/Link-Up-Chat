"use client"

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProp {
    currentUser?: User
}

const Avatar: React.FC<AvatarProp> = ({ currentUser }) => {
    
    
    return (
        <div className="relative">
            <div
                className="
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-9
                w-9
                md:h-11
                md:w-11
            "
            >
                <Image
                    alt="Avatar"
                    src={currentUser?.image || '/placeholder.jpg'}
                    fill
                />

            </div>
            <span
                className="
                    absolute
                    block
                    rounded-full
                    bg-[#41fc03]
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                "
            />
        </div>
    )
}

export default Avatar