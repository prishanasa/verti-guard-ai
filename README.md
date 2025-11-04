VertiGuard-AI 🛡️
AI-Powered Dizziness & Fall Detection System

VertiGuard is a full-stack proof-of-concept application designed to detect falls and dizziness in real-time using smartphone sensor data. It leverages a custom-trained Deep Learning model to prioritize user safety through a high-recall, "safety-first" prediction system.

This repository contains the complete project, including the Python/Flask API for the AI model and the React/Tailwind frontend application.

🚀 Core Features
AI-Powered Fall Detection: A 1D-Convolutional Neural Network (1D-CNN) that analyzes 2-second windows of sensor data to predict falls.

Safety-First Model: The AI is intentionally optimized for high Recall (76.5%) over simple accuracy, ensuring it is far more likely to catch a real fall.

Modern Frontend: A clean, responsive dashboard built with React and Tailwind CSS.

Full-Stack Architecture: A decoupled 3-tier system:

React Frontend (Client)

Python Flask API (AI Model Server)

Supabase (Authentication & Database)

Real-time Alerts: Simulates instant alerts and logs events to the database upon fall detection.

User Authentication: Secure sign-up, login, and user management via Supabase.

🏗️ Project Architecture
This project uses a modern 3-tier architecture:

Frontend (React): The user-facing web application. It handles user login and sends sensor data to the API.

Backend (Python/Flask): A simple API server whose only job is to load the AI model, receive data, and return a prediction.

Database (Supabase): Handles user authentication, stores user profiles, and logs fall events.

🧠 The AI Model: The "Safety-First" Approach
The heart of VertiGuard is its AI model.

Model Type: 1D Convolutional Neural Network (1D-CNN)

Dataset: KFall Dataset (100Hz sensor data)

Input Shape: (200, 6) - A 2-second window (200 timesteps @ 100Hz) with 6 features (AccX, AccY, AccZ, GyrX, GyrY, GyrZ).

Key Insight: Why 66% Accuracy is Better than 93%
This project's dataset is highly imbalanced (far more "Normal" data than "Fall" data).

A "Lazy" 93% Model: A naive model can achieve 93% accuracy by simply guessing "Normal" all the time. This model is useless because it has ~1% Recall, meaning it misses 99% of all real falls.

Our "Safety" 66% Model: By using class_weights, we forced the model to prioritize finding falls. Our final model has a lower accuracy but a high Recall of 76.5%.

This is the correct trade-off for a safety application: we would rather have a few false alarms (lower Precision) than miss a single real fall (high Recall).

Final Model Performance
This is the performance on the unseen test data:

Full Classification Report:

                precision    recall  f1-score   support

    0 (Normal)       0.98      0.66      0.79     14977
      1 (Fall)       0.13      0.76      0.22      1003

      accuracy                           0.66     15980
     macro avg       0.55      0.71      0.50     15980
  weighted avg       0.92      0.66      0.75     15980
Confusion Matrix:

[[9856  5121]  (True Neg, False Pos)
 [ 236   767]]  (False Neg, True Pos)
True Positives (We caught these!): 767

False Negatives (We missed these!): 236

🛠️ Tech Stack
Frontend: React, TypeScript, Vite, Tailwind CSS

Backend (API): Python, Flask

Backend (DB/Auth): Supabase

AI/ML: TensorFlow, Keras, Scikit-learn, Pandas, Joblib

📦 Setup & Installation
Prerequisites
Node.js (v20.19+ recommended)

Python (3.10+ recommended)

A Supabase Account (create a new project)

1. Backend (Flask AI Server)
This server runs on http://localhost:5000 and serves the AI model.

Bash

# 1. Clone the repository
git clone https://github.com/prishanasa/verti-guard-ai.git
cd verti-guard-ai

# 2. Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install backend dependencies
pip install flask flask-cors tensorflow scikit-learn joblib numpy

# 4. Run the API server!
# This will load the .keras and .joblib files
python app.py
2. Frontend (React App)
This app runs on http://localhost:5173.

Bash

# 1. In a NEW terminal, navigate to the frontend folder
cd frontend

# 2. Install Node.js packages
npm install

# 3. Set up your Supabase environment
#    - Rename the file .env.example to .env.local
#    - Add your Supabase Project URL and Anon Key to .env.local
#    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
#    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

# 4. Run the React app!
npm run dev
🚀 How to Run
Start the Backend API first (in terminal 1):

Bash

python app.py
Start the Frontend App second (in terminal 2):

Bash

npm run dev
Open your browser to http://localhost:5173 and the app will be running.

API Endpoint
The Flask server exposes one endpoint:

POST /predict
This endpoint expects a JSON payload containing a "window" of sensor data.

Request Body:

JSON

{
  "window": [
    [0.1, 0.2, 9.8, 0.01, 0.02, 0.03],
    [0.1, 0.2, 9.7, 0.02, 0.01, 0.04],
    ... 198 more rows ...
    [1.2, 3.4, 4.5, 0.88, 0.91, 1.02]
  ]
}
The window array must have exactly 200 rows and 6 columns.

Success Response (200):

JSON

{
  "status": "Fall Detected",
  "confidence": 0.7647
}
Error Response (400):

JSON

{
  "error": "Invalid data length. Expected 200 rows, got 199"
}
