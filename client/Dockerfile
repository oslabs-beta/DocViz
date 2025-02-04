# Use Node.js to build the React app
FROM node:18 AS builder

# Set working directory 
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Fix OpenSSL issue in Node 18+
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy the rest of the app
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html 

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
