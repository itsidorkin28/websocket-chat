import React, {useEffect, useState} from 'react';
import { v1 } from 'uuid';
import './App.css';

type MessagesType = Array<{
    userId: number
    photo: string
    message: string
    userName: string
}>
function App() {
    const [value, setValue] = useState<string>('')
    const [messages, setMessages] = useState<MessagesType>([])
    const [socket, setSocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        let socket = new WebSocket('wss://social-network.samuraijs.com/handlers/chatHandler.ashx')
        setSocket(socket)
        socket.onmessage = function (e: MessageEvent) {
            setMessages(state => [...state, ...JSON.parse(e.data)])
        }
    }, [])


    const send = () => {
        socket?.send(value)
    }
    return (
        <div className="App">
            <div>
                {messages.map(m => <div key={v1()}>
                    <img src={m.photo}/>
                    <strong>{m.userName}</strong>
                    {m.message}
                </div>)}
            </div>
            <div>
                <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}

export default App;


