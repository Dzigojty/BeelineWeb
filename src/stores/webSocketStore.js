// src/stores/webSocketStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('webSocket', () => {
  const socket = ref(null);
  const messages = ref([]);
  const isConnected = ref(false);
  const token = ref(null); // Храним токен пользователя
  console.log('WebSocket заход в метод')
  const connectWebSocket = () => {
    if (!token.value) {
      console.error('WebSocket не может подключиться без токена');
      return;
    }

    const url = `ws://185.112.83.36:8080/handleWebSocket?token=${token.value}`;
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket подключен');
      isConnected.value = true;
    };

    socket.value.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Новое сообщение:', message);
      messages.value.push({
        chatId: message.Chat_id,
        messageId: message.Mess_id,
        text: message.Text,
        sentAt: message.Sent_at,
        userId: message.User_id,
        avatar: message.Avatar,
        name: message.Name,
      });
    };

    socket.value.onclose = () => {
      console.log('WebSocket отключен. Переподключение...');
      isConnected.value = false;
    };

    socket.value.onerror = (error) => {
      console.error('WebSocket ошибка:', error);
    };
  };

  const setTokenAndConnect = (userToken) => {
    token.value = userToken;
    connectWebSocket();
  };

  return {
    setTokenAndConnect,
    messages,
    isConnected,
  };
});
