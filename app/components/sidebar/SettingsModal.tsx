"use client"

import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Modal from "../Modal"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Input from "../inputs/Input"
import Button from "../Button"

interface SettingsModalProps {
    isOpen?: boolean
    onClose: () => void
    currentUser: User
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch("image")

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, { shouldValidate: true })
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post(`/api/settings`, data)
        .then(() => {
            router.refresh()
            onClose()
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                register={register}
                                required
                            />
                            <div>
                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    leading-6
                                    text-gray-900
                                ">
                                    Photo
                                </label>
                                <div className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-x-3
                                ">
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-lg"
                                        src={image || currentUser?.image || "/placeholder.jpg"}
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{maxFiles: 1}}
                                        onSuccess={handleUpload}
                                        uploadPreset="vtvupicf"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            onClick={onClose}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal