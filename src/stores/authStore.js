// // src/services/authService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8080';

// export async function loginUser(login, password) {
//     try {
//         const response = await axios.post(`${API_URL}/login`, {
//             Login: login,
//             password: password,
//         });

//         if (response.data.status === 'success') {
//             return response.data.data;
//         } else {
//             throw new Error(response.data.message || 'Login failed');
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         throw error;
//     }
// }

// export function initializeWebSocket(token, onMessageCallback) {
//     const socketUrl = `ws://localhost:8080/handleWebSocket?token=${token}`;
//     const ws = new WebSocket(socketUrl);

//     ws.onopen = () => {
//         console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//         try {
//             const messageData = JSON.parse(event.data);
//             onMessageCallback(messageData);
//         } catch (error) {
//             console.error('Error parsing WebSocket message:', error);
//         }
//     };

//     ws.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//         console.log('WebSocket connection closed');
//     };

//     return ws;
// }
