# Contextra AI Assistant

Contextra AI Assistant is an enterprise-style knowledge intelligence platform built using SAP CAP, SAPUI5, SAP HANA Cloud Vector Engine, and Retrieval-Augmented Generation (RAG).

The project focuses on building a scalable and modular AI-powered document assistant while exploring enterprise application architecture patterns on SAP BTP.

Users can upload PDF documents, generate semantic embeddings, perform contextual retrieval, and interact with grounded conversational AI responses based on enterprise knowledge sources.

# Features

- PDF upload and ingestion
- Semantic document chunking
- Transformer-based embedding generation
- SAP HANA Cloud Vector Engine integration
- Vector similarity search
- Retrieval-Augmented Generation (RAG)
- Conversational AI responses
- SAP CAP backend services
- SAPUI5 frontend
- Structured logging and observability
- Modular enterprise-style architecture
- Contextual semantic retrieval workflows

# Tech Stack

## Backend

- Node.js
- SAP CAP
- Express.js
- Groq API
- Xenova Transformers

## Frontend

- SAPUI5
- XML Views
- JavaScript Controllers

## AI / RAG

- SAP HANA Cloud Vector Engine
- Semantic Retrieval
- Vector Embeddings
- Recursive Text Chunking
- Retrieval-Augmented Generation (RAG)

## SAP BTP Services

- Cloud Foundry
- SAP HANA Cloud
- XSUAA
- SAP Identity Authentication Service (IAS)
- SAP Build Work Zone

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

# Architecture Overview

## Document Ingestion Flow

```text
PDF Upload
→ Text Extraction
→ Recursive Chunking
→ Embedding Generation
→ SAP HANA Cloud Vector Storage
→ Semantic Indexing
```

## Question Answering Flow

```text
User Question
→ Query Embedding
→ Vector Similarity Search
→ Context Retrieval
→ Prompt Construction
→ LLM Response Generation
→ Grounded AI Response
```

# Local Setup

## 1. Install Dependencies

```bash
npm install
```

If peer dependency issues occur:

```bash
npm install --legacy-peer-deps
```

## 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key

HANA_HOST=your_hana_host
HANA_PORT=443
HANA_USER=your_hana_user
HANA_PASSWORD=your_hana_password
```

## 3. Start SAP CAP Backend

```bash
cds watch
```

## 4. Start SAPUI5 Frontend

```bash
cd app/ui5app
npm install
npm start
```

# Current Focus Areas

This project is currently focused on:

- enterprise AI architecture
- SAP CAP development
- Retrieval-Augmented Generation (RAG)
- SAPUI5 frontend architecture
- semantic retrieval workflows
- vector search concepts
- SAP BTP enterprise integration
- contextual AI orchestration

# Enterprise Architecture Goals

The project is being designed around:

- scalable service-oriented architecture
- modular AI orchestration
- enterprise security patterns
- contextual retrieval pipelines
- extensible CAP-based services
- maintainable AI workflow integration

# Planned Improvements

- Advanced SAP HANA Cloud Vector Engine optimization
- Multi-document contextual retrieval
- Persistent conversational memory
- SAP Joule Skills integration
- Agent-driven enterprise workflows
- Improved prompt orchestration strategies
- Enhanced UI responsiveness
- Multilingual i18n support
- Expanded observability and monitoring
- Kyma-based deployment exploration

# SAP BTP Deployment Scope

The platform is designed for enterprise deployment using:

- SAP BTP Cloud Foundry
- SAP HANA Cloud
- XSUAA authentication
- SAP Identity Authentication Service (IAS)
- SAP Build Work Zone integration
- Enterprise CAP service orchestration

# Notes

This project is intentionally being developed with a strong focus on:

- enterprise architecture clarity
- maintainability
- modularity
- scalable AI workflows
- semantic retrieval systems
- understanding enterprise AI application design deeply

The goal is not only to build an AI assistant, but also to understand how enterprise AI systems are architected, secured, deployed, and evolved within modern SAP BTP environments.
