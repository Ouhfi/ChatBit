import User from "./user.model.js";
import Conversation from "./conversation.model.js";
import Message from "./message.model.js";

// User → Conversations
User.hasMany(Conversation, {
  foreignKey: "clientId",
  as: "clientConversations",
});

User.hasMany(Conversation, {
  foreignKey: "agentId",
  as: "agentConversations",
});

// Conversation → Users
Conversation.belongsTo(User, {
  foreignKey: "clientId",
  as: "client",
});

Conversation.belongsTo(User, {
  foreignKey: "agentId",
  as: "agent",
});

// Conversation → Messages
Conversation.hasMany(Message, {
  foreignKey: "conversationId",
  as: "messages",
});

Message.belongsTo(Conversation, {
  foreignKey: "conversationId",
  as: "conversation",
});

// User → Messages
User.hasMany(Message, {
  foreignKey: "senderId",
  as: "messages",
});

Message.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});

export {
  User,
  Conversation,
  Message,
};