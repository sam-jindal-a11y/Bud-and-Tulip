// WebSocketClientComponent.jsx
import React, { useEffect } from 'react';

const WebSocketClientComponent = () => {
    useEffect(() => {
        const socket = new WebSocket('wss://payasvinimilk.com:3000/ws');

        socket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Client Example</h1>
        </div>
    );
};

export default WebSocketClientComponent;
