# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy root-level package files and install server (and root-level) dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the repository into the container
COPY . .

# --- Setup the Client ---
# Change directory to the client folder and install client dependencies
WORKDIR /app/client
RUN npm install
# (Optional) Run build command if needed:
# RUN npm run build

# Return to the root directory
WORKDIR /app

# Expose the port your server listens on (adjust if needed)
EXPOSE 3000

# Start the application using the combined start script from package.json
CMD ["npm", "start"]
