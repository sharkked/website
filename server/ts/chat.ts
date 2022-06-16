import type { Server, Socket } from "socket.io";
import logger from './logger'
import { MessageType, type ChatMessage } from "@common/interfaces";

export default (io: Server, socket: Socket) => {
  const createMessage = (msg: ChatMessage) => {
    logger.info(`${msg.name}: ${msg.message}`)
    io.emit('message:create', msg)
  }

  socket.on('message:create', createMessage)
}

export function serverMessage(msg: string) {
  return {
    id: 0,
    name: "SERVER",
    message: msg,
    type: MessageType.System
  }
}