"use client"

import { SessionProvider } from "next-auth/react";

interface AuthContextType {
    children : React.ReactNode
}

const AuthContext = ({children} : AuthContextType) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthContext