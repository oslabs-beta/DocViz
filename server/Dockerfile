# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 5003

# Start the backend server
CMD ["npm", "start"]
