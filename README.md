🛡️ VertiGuard-AI: Deep Learning-Based Fall & Dizziness Detection System

VertiGuard is an end-to-end AI-powered safety monitoring system that detects falls and dizziness in real time using smartphone motion sensor data. The system leverages a custom-trained 1D Convolutional Neural Network (1D-CNN) optimized for high recall to prioritize safety-critical event detection.

This project demonstrates a full-stack machine learning pipeline, including model inference via a Flask API, real-time alert logging, and an interactive AI safety assistant integrated into a modern web dashboard.

🚀 Key Features

Deep Learning Fall Detection: 1D-CNN model processes 6-axis time-series sensor data to classify fall vs normal activity in real time

Safety-First Optimization: Model optimized for high Recall to minimize missed fall events in safety-critical scenarios

Real-Time Alerts Dashboard: Logs and visualizes detected events dynamically for monitoring

AI Safety Assistant: Interactive chatbot providing fall-prevention tips and emergency guidance

Full-Stack ML Deployment: End-to-end integration of deep learning model, backend API, database, and frontend UI

Secure Authentication: User authentication and event storage using Supabase

🏗️ System Architecture

VertiGuard follows a modern 3-tier ML deployment architecture:

Frontend: React + Tailwind dashboard for visualization and interaction

Backend API: Python Flask server hosting the trained deep learning model for inference

Database & Auth: Supabase for authentication, user profiles, and event logging

This architecture simulates a production-ready machine learning inference pipeline.

🧠 AI Model Overview

Model Type: 1D Convolutional Neural Network (1D-CNN)

Dataset: KFall dataset (100Hz motion sensor data)

Input Shape: (200 timesteps × 6 features)

Accelerometer: AccX, AccY, AccZ

Gyroscope: GyrX, GyrY, GyrZ

The model analyzes 2-second sliding windows of motion data to classify:

Normal Activity

Fall Event

⚖️ Safety-First Modeling Strategy

The dataset is highly imbalanced with significantly more normal activity samples than fall events.
A naive model can achieve high accuracy by predicting only “Normal,” but this leads to extremely poor Recall and missed fall detections.

VertiGuard prioritizes Recall over Accuracy, ensuring real fall events are detected reliably, which is critical for safety applications.

Final Model Performance (Test Set)

Recall (Fall Class): 76.5%

Accuracy: 66%

True Positives: 767 fall events correctly detected

False Negatives: 236 missed fall events

This trade-off intentionally favors detecting real falls over minimizing false alarms, aligning with real-world safety requirements.

🖥️ Tech Stack

Frontend: React, TypeScript, Vite, Tailwind CSS
Backend (API): Python, Flask
Database & Auth: Supabase
Machine Learning: TensorFlow, Keras, Scikit-learn, Pandas, NumPy

📊 Demo Overview

The application provides:

Public landing page describing the AI pipeline and system functionality

Login-protected dashboard for real-time event monitoring

Alerts timeline showing detected normal activities and fall events

AI Safety Assistant chatbot for guidance and preventive tips

Live Demo: https://verti-guard-ai.vercel.app/

⚙️ Setup & Installation
Prerequisites

Node.js (v20+ recommended)

Python (3.10+ recommended)

Supabase account and project

Backend (Flask API)
git clone https://github.com/prishanasa/verti-guard-ai.git
cd verti-guard-ai
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors tensorflow scikit-learn joblib numpy
python app.py

The API runs on: http://localhost:5000

Frontend (React App)
cd frontend
npm install

Create a .env.local file:

VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Run the app:

npm run dev

Frontend runs on: http://localhost:5173

🔌 API Endpoint
POST /predict

Accepts a 200×6 sensor data window.

Request Body
{
  "window": [
    [0.1, 0.2, 9.8, 0.01, 0.02, 0.03],
    ...
    [1.2, 3.4, 4.5, 0.88, 0.91, 1.02]
  ]
}
Success Response
{
  "status": "Fall Detected",
  "confidence": 0.7647
}
Error Response
{
  "error": "Invalid data length. Expected 200 rows"
}
🎯 Project Highlights

Designed and deployed a deep learning inference pipeline for time-series fall detection

Implemented high-recall optimization to address severe class imbalance in safety data

Built real-time alert logging system with database integration

Developed a full-stack ML application with production-style architecture

Integrated AI assistant interface to enhance usability and real-world relevance

📌 Future Improvements

Integration with real wearable or smartphone sensor streams

Model fine-tuning using additional real-world fall datasets

Edge deployment for on-device inference

Enhanced evaluation pipeline with precision-recall trade-off tuning
