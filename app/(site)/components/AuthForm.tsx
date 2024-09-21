"use client"
import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/Button"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { FaEye, FaEyeSlash, FaLess } from "react-icons/fa";
import axios from "axios"
import toast from "react-hot-toast"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordHidden, setPasswordHidden] = useState(true)

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER")
        } else {
            setVariant("LOGIN")
        }
    }, [variant])

    const { handleSubmit, register, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant == "REGISTER") {
            axios.post("/api/register", data)
            .catch(() => toast.error("something went wrong"))
            .finally(() => setIsLoading(false))
        }
        if (variant == "LOGIN") {
            //NextAuth call
            signIn("credentials", {
                ...data,
                redirect: true
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error("invalid credentials")
                }

                if(callback?.ok && !callback?.error){
                    toast.success("Logged In")
                }
            })
            .finally(() => setIsLoading(false))
        }

    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action,{ redirect: false })
        .then((callback) => {
            if(callback?.error){
                toast.error("Invalid Credentials")
            }
            if(callback?.ok && !callback?.error){
                toast.success("Logged in")
            }
        })
        .finally(() => setIsLoading(false))
    }

    const togglePasswordVisibility = () => {
        setPasswordHidden(prev => !prev)
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        variant === "REGISTER" && (
                            <Input
                                id="name"
                                label="Name"
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            />
                        )
                    }
                    <Input
                        id="email"
                        label="Email Address"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div className="relative ">
                        <Input
                            id="password"
                            label="Password"
                            type={passwordHidden ? "password" : "text"}
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                        <button onClick={(e) => {
                            e.preventDefault()
                            togglePasswordVisibility()
                        }} className="absolute right-2 top-12 transform -translate-y-1/2">
                            <span className="text-xl">{passwordHidden ? <FaEye /> : <FaEyeSlash />}</span>
                        </button>
                    </div>

                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type='submit'
                        >
                            {
                                variant === "LOGIN" ? "Sign In" : "Register"
                            }
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center    
                                    "
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div
                            className="
                                        relative
                                        flex
                                        justify-center
                                        text-sm
                                    "
                        >
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />

                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {
                            variant === "LOGIN" ? 'New to Link UP?' : "Already have an account?"
                        }
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm