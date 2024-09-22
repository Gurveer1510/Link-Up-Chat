"use client"

import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"

interface MobileItemPropsType {
    href: string
    label: string
    icon: IconType
    active?: boolean
    onClick?: () => void
}

function MobileItem({
    href,
    label,
    icon: Icon,
    active,
    onClick
}: MobileItemPropsType) {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (

        <Link onClick={handleClick} href={href}
            className={clsx(`
                    group
                    flex
                    gap-x-3
                    text-sm
                    leading-6
                    font-semibold
                    w-full
                    justify-center
                    p-4
                    text-gray-500
                    hover:bg-gray-100

                `, active && 'bg-gray-100 text-black')}
        >
            <Icon className="h-6 w-6" />
            <span className="sr-only">{label}</span>
        </Link>

    )
}

export default MobileItem