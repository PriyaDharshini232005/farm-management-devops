# Use Node.js 21
FROM node:21

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all project files (backend + frontend)
COPY . .

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]