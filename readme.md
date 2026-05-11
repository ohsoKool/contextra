# Contextra AI Assistant

Contextra AI Assistant is an enterprise-style knowledge assistant built using SAP CAP, SAPUI5, vector search, and Retrieval-Augmented Generation (RAG).

The project focuses on building a clean and understandable AI-powered document assistant while exploring enterprise application architecture on SAP BTP.

Users can upload PDF documents, store semantic embeddings, perform contextual retrieval, and ask grounded conversational questions based on uploaded content.

---

# Features

- PDF upload and ingestion
- Semantic document chunking
- Vector embedding generation
- ChromaDB vector storage
- Retrieval-Augmented Generation (RAG)
- Conversational AI responses
- SAP CAP backend services
- SAPUI5 frontend
- Structured logging and observability
- Modular enterprise-style architecture

---

# Tech Stack

## Backend

- Node.js
- SAP CAP
- Express
- Groq API
- Xenova Transformers

## Frontend

- SAPUI5
- XML Views
- JavaScript Controllers

## AI / RAG

- ChromaDB
- Semantic Retrieval
- Vector Embeddings
- Recursive Text Chunking

---

# Project Structure

```text
contextra/
│
├── ai/
│   ├── embeddings/
│   ├── ingestion/
│   ├── llm/
│   ├── memory/
│   ├── orchestration/
│   ├── prompts/
│   ├── retrieval/
│   └── vectorstore/
│
├── app/
│   └── ui5app/
│
├── srv/
│
├── db/
│
├── uploads/
│
├── tests/
│
└── utils/
```

---

# Architecture Overview

## Document Ingestion Flow

```text
PDF Upload
→ Text Extraction
→ Document Chunking
→ Embedding Generation
→ Vector Storage
```

## Question Answering Flow

```text
User Question
→ Query Embedding
→ Semantic Retrieval
→ Prompt Construction
→ LLM Response Generation
→ Grounded Answer
```

---

# Local Setup

## 1. Install Dependencies

```bash
npm install
```

If peer dependency issues occur:

```bash
npm install --legacy-peer-deps
```

---

## 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key

CHROMA_HOST=localhost
CHROMA_PORT=8000
```

---

## 3. Start ChromaDB

Run ChromaDB using Docker:

```bash
docker run -p 8000:8000 chromadb/chroma
```

---

## 4. Start CAP Backend

```bash
cds watch
```

---

## 5. Start SAPUI5 Frontend

```bash
cd app/ui5app
npm install
npm start
```

---

# Current Focus Areas

This project is currently focused on:

- enterprise AI architecture learning
- SAP CAP development
- Retrieval-Augmented Generation (RAG)
- SAPUI5 frontend architecture
- vector search concepts
- SAP BTP readiness

---

# Planned Improvements

- SAP HANA Cloud Vector Engine integration
- SAP BTP deployment
- XSUAA / IAS authentication
- Work Zone integration
- persistent conversation memory
- improved UI responsiveness
- multilingual i18n support

---

# Notes

This project is intentionally being built with a strong focus on:

- architecture clarity
- maintainability
- modularity
- learning enterprise AI concepts deeply

The goal is not only to build an AI assistant, but also to understand how enterprise AI applications are structured and evolved over time.
