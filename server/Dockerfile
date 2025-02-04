# Use Node.js as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ../../package*.json ./

# Install dependencies
RUN npm install

# Copy only the server files (assuming the backend is in 'server/')
COPY . .

# Expose the API port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
