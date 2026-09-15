#!/bin/bash

echo "Build script starting..."

# 1. Install all backend and frontend dependencies
npm install

# 2. Compile the Vite frontend into the production static folder (dist)
npm run build

echo "Build script completed successfully!"
