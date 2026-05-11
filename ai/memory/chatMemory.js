import log from "../../utils/logger.js";

/*
  Temporary in-memory conversation storage.

  NOTE:
  This is currently shared across all users and sessions.

  Later this can be replaced with:
  - database-backed memory
  - Redis
  - SAP HANA
  - session-based conversation storage
*/

const chatHistory = [];

export function addToChatHistory(role, message) {
  chatHistory.push(`${role}: ${message}`);

  log.info("MEMORY", `Added message to chat history`);
}

export function getChatHistory() {
  return chatHistory;
}

export function clearChatHistory() {
  chatHistory.length = 0;

  log.warn("MEMORY", "Chat history cleared");
}
