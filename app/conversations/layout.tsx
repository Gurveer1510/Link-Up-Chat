
import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers"
import SideBar from "../components/sidebar/SideBar"
import ConversationList from "./components/ConversationList"

export default async function ConversationLayout({
    children
} : { children: React.ReactNode }) {

    const conversations = await getConversations()
    const users = await getUsers()
    return (
        <SideBar>
            <div className="h-full">
                <ConversationList 
                    users={users}
                    initialItems = {conversations}
                />

            {children}
            </div>
        </SideBar>
    )
}