# Use Node.js 21 official image
FROM node:21

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port your server uses
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]