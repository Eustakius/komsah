#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo "Stopping servers..."
    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID
    fi
    exit
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT

echo "Starting Komsah Development Environment..."

# Pre-flight cleanup
echo "Cleaning up ports 8000 and 5173..."
fuser -k 8000/tcp > /dev/null 2>&1
fuser -k 5173/tcp > /dev/null 2>&1
sleep 1

# Start Backend
echo "Starting Laravel Backend..."
cd komsah-api
php artisan serve --host=0.0.0.0 --port=8000 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting React Frontend..."
cd komsah-frontend
npm run dev -- --host &
FRONTEND_PID=$!
cd ..

echo "Servers are running."
echo "Backend API: http://localhost:8000"
echo "Frontend App: http://localhost:5173"
echo "Press Ctrl+C to stop both servers."

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
