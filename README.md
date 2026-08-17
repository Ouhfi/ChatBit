# ChatBit

Real-time customer support mobile application for Souq Express.

## Overview

ChatBit is a mobile customer support application that allows
clients and support agents to communicate in real time.

The application provides:

- Secure authentication with JWT
- Real-time messaging
- Conversation management
- Typing indicators
- Online/offline presence
- Persistent message history
- Client and agent roles

## Tech Stack

### Mobile
- Expo
- React Native
- Expo Router
- Axios
- TanStack Query
- Socket.IO Client

### Backend
- Node.js
- Express
- Socket.IO
- PostgreSQL
- JWT
- bcrypt

### Database
- PostgreSQL
- Parameterized SQL queries
- No ORM

## Installation

### Mobile

```bash
cd mobile
npm install
npx expo start