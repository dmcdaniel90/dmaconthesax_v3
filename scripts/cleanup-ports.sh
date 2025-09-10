#!/bin/bash

# Script to clean up ports for CI
# Usage: ./scripts/cleanup-ports.sh [PORT]

PORT=${1:-3001}

echo "Cleaning up port $PORT..."

# Kill processes using the specified port
if command -v lsof >/dev/null 2>&1; then
    PIDS=$(lsof -ti:$PORT 2>/dev/null)
    if [ ! -z "$PIDS" ]; then
        echo "Found processes using port $PORT: $PIDS"
        echo "$PIDS" | xargs kill -9 2>/dev/null || true
        echo "Killed processes on port $PORT"
    else
        echo "No processes found using port $PORT"
    fi
else
    echo "lsof not available, trying alternative method..."
    # Alternative method using netstat (if available)
    if command -v netstat >/dev/null 2>&1; then
        PIDS=$(netstat -tlnp 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1 | sort -u)
        if [ ! -z "$PIDS" ]; then
            echo "Found processes using port $PORT: $PIDS"
            echo "$PIDS" | xargs kill -9 2>/dev/null || true
        fi
    fi
fi

# Wait a moment for processes to be killed
sleep 2

# Verify port is free
if command -v lsof >/dev/null 2>&1; then
    if lsof -i:$PORT >/dev/null 2>&1; then
        echo "Warning: Port $PORT is still in use"
        exit 1
    else
        echo "Port $PORT is now free"
    fi
fi

echo "Port cleanup completed"
