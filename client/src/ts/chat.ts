import { MessageType, type ChatMessage } from "../../../common/interfaces"
import service from "./socketio.service"

export function chatSay(user: string, message: string) {
  if (message.trim() !== '') {
    service.socket.emit('message:create', { 
      id: 0,
      name: service.socket.auth.username,
      message: message,
      type: MessageType.Chat
    } as ChatMessage)
  }
}

export function onChatMessage(callback: Function) {
  service.socket.on('message:create', (message: ChatMessage) => callback(message))
}