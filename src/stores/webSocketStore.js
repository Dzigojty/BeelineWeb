// src/stores/webSocketStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useWebSocketStore = defineStore('webSocket', () => {
  const socket = ref(null);
  const isConnected = ref(false);
  const token = ref(null); // Храним токен пользователя

  // Массив сообщений (чат)
  const messages = ref([]);

  // Уведомления
  const notifications = ref(JSON.parse(localStorage.getItem('notifications')) || []);

  console.log('WebSocket заход в метод');

  const connectWebSocket = () => {
    console.log("WebSocket connectWebSocket");
    if (!token.value) {
      console.error('WebSocket не может подключиться без токена');
      return;
    }

    const url = `ws://localhost:8080/handleWebSocket?token=${token.value}`;
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket подключен');
      isConnected.value = true;
    };

    socket.value.onmessage = (event) => {
      console.log("WebSocket onmessage");
      const message = JSON.parse(event.data);
      console.log('Новое сообщение:', message);

      // Проверяем, является ли сообщение уведомлением
      if (message.Header && message.Header.startsWith("reg_")) {
        // Добавляем уведомление в массив
        const newNotification = {
          avatar: message.Avatar,
          header: message.Header,
          name: message.Name,
          orderId: message.Order_id,
          regAt: message.Reg_at,
          text: message.Text,
          userId: message.User_id,
          userRole: message.User_role,
        };

        notifications.value.unshift(newNotification); // Добавляем в начало списка

        // Сохраняем в localStorage
        localStorage.setItem('notifications', JSON.stringify(notifications.value));
      } else {
        // Это сообщение в чат
        messages.value.push({
          chatId: message.Chat_id,
          messageId: message.Mess_id,
          text: message.Text,
          sentAt: message.Sent_at,
          userId: message.User_id,
          avatar: message.Avatar,
          name: message.Name,
        });
      }
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
    console.log("WebSocket setTokenAndConnect");
    token.value = userToken;
    connectWebSocket();
  };

  return {
    setTokenAndConnect,
    messages,
    notifications,
    isConnected,
  };
});
