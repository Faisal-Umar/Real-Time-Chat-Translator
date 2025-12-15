# Real-Time Multilingual Chat Translator

The Real-Time Multilingual Chat Translator is a cloud-based web application that enables users to communicate instantly while automatically translating messages into multiple languages. The system removes language barriers in real-time communication using AWS cloud services and modern web technologies.

---

## 🔹 Features

- Real-time messaging using Socket.io  
- Automatic language translation using AWS Translate  
- Multi-language support (English, Hindi, Urdu, Arabic, Spanish, French, etc.)  
- Modern, responsive chat interface  
- Cloud-deployed backend on AWS EC2  
- Browser-based frontend with no installation required  

---

## 🔹 Technologies Used

### Frontend
- HTML5  
- CSS3  
- JavaScript  

### Backend
- Node.js  
- Express.js  
- Socket.io  

### Cloud Services
- AWS EC2 (Backend Hosting)  
- AWS Translate (Language Translation)  
- AWS IAM (Access Management)  

### Tools
- PM2 (Process Manager)  
- Git & GitHub (Version Control)

---

## 🔹 System Architecture

1. User opens the frontend in a web browser.  
2. Socket.io establishes a real-time connection with the backend server.  
3. Messages sent by users are forwarded to the backend.  
4. AWS Translate processes the text and returns translated output.  
5. The server broadcasts original and translated messages to all connected users.  

---

## 🚀 Live Demo

👉 Click here to run the project:  
http://realtime-chat-frontend-faisal.s3-website-eu-north-1.amazonaws.com
http://16.170.237.72:3000


### Backend Setup
```bash
cd backend
npm install
node server.js
