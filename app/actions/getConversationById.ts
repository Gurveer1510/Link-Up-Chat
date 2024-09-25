import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversationById = async (conversationId : string) => {
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser?.email){
            return null
        }
        const conversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users: true
            }
        })
        return conversation
    } catch (error : unknown) {
        console.log(error, "ERROR_GET_CONVERSATION_BY_ID")
        return null
    }
}

export default getConversationById