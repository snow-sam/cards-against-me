import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.SERVER_URL
const SERVER_PORT = process.env.SERVER_PORT

export const usePlayerSocket = () => {
    const [socket, setSocket] = useState<typeof Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`${SERVER_URL}:${SERVER_PORT}`)
        setSocket(newSocket)
        return () => {
            newSocket.disconnect();
            setSocket(null);
        }
    }, [])

    return socket
}