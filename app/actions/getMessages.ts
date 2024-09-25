import prisma from "@/app/libs/prismadb"

const getMessages = async (
    conversationId: string
) => {
    try {
        const messages = await prisma.message.findMany({
            where:{
                conversationId : conversationId
            },
            include:{
                sender: true,
                seen: true
            },
            orderBy:{
                createdAt: "asc"
            }
        })
        return messages
    } catch (error: unknown) {
        console.log(error, "ERROR_GET_MESSAGES")
        return null
    }
}

export default getMessages