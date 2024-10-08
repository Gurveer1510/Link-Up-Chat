"use client"

import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Modal from "@/app/components/Modal"
import SelectCustom from "@/app/components/SelectCustom"
import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/Button"

interface GroupChatModalProps {
    isOpen?: boolean
    onClose: () => void
    users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    })

    const members = watch("members")

    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        setIsLoading(true)
        axios.post("/api/conversations", {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="
                        space-y-12
                    "
                >
                    <div className="
                        border-b
                        border-gray-900/10
                        pb-12
                    ">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Create a group chat
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                textgray-600
                            "
                        >
                            Create a chat with more than 2 people
                        </p>
                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input 
                                register={register}
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <SelectCustom 
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue("members", value, {shouldValidate: true}) }
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-x-6
                ">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="submit"
                        
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}


export default GroupChatModal