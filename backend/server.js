// backend/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const AWS = require('aws-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// AWS Translate Config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const translate = new AWS.Translate();

// Temporary in-memory message history
let messages = []; 

// API endpoint to view last messages (optional)
app.get('/messages', (req, res) => {
  res.json(messages.slice(-50)); 
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // send last messages to new user
  socket.emit('init', messages.slice(-20));

  // message received from a client
  socket.on('send_message', async (data) => {
    const { from, text, targetLang } = data;

    let translated = text;

    // translate only if target language is selected
    if (targetLang && targetLang !== "") {
      try {
        const params = {
          SourceLanguageCode: "auto",
          TargetLanguageCode: targetLang,
          Text: text
        };

        const result = await translate.translateText(params).promise();
        translated = result.TranslatedText;
      } catch (err) {
        console.log("Translation error:", err);
      }
    }

    const msg = {
      id: socket.id + "-" + Date.now(),
      from,
      text,
      translated,
      targetLang,
      timestamp: new Date().toISOString()
    };

    messages.push(msg);

    // broadcast to all connected users
    io.emit('new_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server running on port:", process.env.PORT);
});
