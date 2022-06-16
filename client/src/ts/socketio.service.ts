import { io } from 'socket.io-client'
import { generateUsername } from 'unique-username-generator'

class SocketioService {
  socket: any
  constructor() {}

  setupSocketConnection() {
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT as string, {
      auth: { 
        username: generateUsername('-') 
      }
    })

  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}

const service = new SocketioService()

export default service