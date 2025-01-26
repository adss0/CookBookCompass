<template>
    <div class="chat-system">
    <h1>Chat System</h1>
    <div class="chat-window">
    <div v-for="(message, index) in messages" :key="index" class="message">
    <strong>{{ message.sender }}:</strong> {{ message.text }}
    </div>
    </div>
    <div class="chat-input">
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
    <button @click="sendMessage">Send</button>
    </div>
    </div>
    </template>
    <script>
    import { ref, onMounted, onUnmounted } from 'vue';
    export default {
     setup() {
       const messages = ref([]); // Stores chat messages
       const newMessage = ref(''); // Stores the current message input
       const socket = ref(null); // WebSocket connection
    // Connect to the WebSocket server
       onMounted(() => {
         socket.value = new WebSocket('ws://localhost:3333');
         socket.value.onopen = () => {
           console.log('Connected to WebSocket server');
         };
         socket.value.onmessage = (event) => {
           const message = JSON.parse(event.data);
           messages.value.push({ sender: 'Server', text: message });
         };
         socket.value.onclose = () => {
           console.log('Disconnected from WebSocket server');
         };
         socket.value.onerror = (error) => {
           console.error('WebSocket error:', error);
         };
       });
    // Close the WebSocket connection when the component is destroyed
       onUnmounted(() => {
         if (socket.value) {
           socket.value.close();
         }
       });
    // Send a message to the server
       const sendMessage = () => {
         if (newMessage.value.trim() && socket.value) {
           socket.value.send(newMessage.value.trim());
           messages.value.push({ sender: 'You', text: newMessage.value.trim() });
           newMessage.value = ''; // Clear the input field
         }
       };
       return {
         messages,
         newMessage,
         sendMessage,
       };
     },
    };
    </script>
    <style scoped>
    .chat-system {
     max-width: 600px;
     margin: 0 auto;
     padding: 20px;
     border: 1px solid #ccc;
     border-radius: 8px;
     background-color: #f9f9f9;
    }
    .chat-window {
     height: 300px;
     overflow-y: auto;
     border: 1px solid #ddd;
     padding: 10px;
     margin-bottom: 10px;
     background-color: #fff;
    }
    .message {
     margin-bottom: 10px;
    }
    .chat-input {
     display: flex;
    }
    .chat-input input {
     flex: 1;
     padding: 10px;
     border: 1px solid #ddd;
     border-radius: 4px;
     margin-right: 10px;
    }
    .chat-input button {
     padding: 10px 20px;
     background-color: #007bff;
     color: #fff;
     border: none;
     border-radius: 4px;
     cursor: pointer;
    }
    .chat-input button:hover {
     background-color: #0056b3;
    }
    </style>
    has context menu