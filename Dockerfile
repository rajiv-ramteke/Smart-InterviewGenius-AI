# Use the official Node.js image
FROM node:20-slim

# Install necessary dependencies for Puppeteer/Chromium to run inside Docker
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libnss3 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies and build the Frontend
WORKDIR /app/Frontend
RUN npm install
RUN npm run build

# Install dependencies for the Backend
WORKDIR /app/Backend
RUN npm install

# Expose Hugging Face's default port
EXPOSE 7860

# Set Environment Variables
ENV PORT=7860

# Start the Backend Server (which now serves the Frontend as well)
CMD ["npm", "start"]
