"use client"

import { IconType } from "react-icons"
import clsx from "clsx"
import Link from "next/link"

interface DesktopItemPropsType {
    href: string
    label: string
    icon: IconType
    active?: boolean
    onClick?: () => void
}

function DesktopItem({
    href,
    label,
    icon: Icon,
    active,
    onClick
}: DesktopItemPropsType) {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <li onClick={handleClick}>
            <Link
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-500
                    hover:text-black
                    hover:bg-gray-100
                `,
                    active && 'bg-gray-100 text-black'
                )}
                href={href}>
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem