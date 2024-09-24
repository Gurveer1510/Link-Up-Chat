"use client"

import useConversation from "@/app/hooks/useConversation"
import MessageBox from "./MessageBox"
import { FullMessageType } from "@/app/types"
import { useState, useRef } from "react"
import React from "react"

interface BodyProps {
  initialMessage: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
  initialMessage
}) => {
  const [messages, setMessages] = useState(initialMessage)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()
  return (
    <div className="flex-1 overflow-y-auto">
      {
        messages.map((message, index) => (
          <MessageBox
            isLast={index === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))
      }
      <div ref={bottomRef} className="pt-24"/>
    </div>
  )
}

export default Body