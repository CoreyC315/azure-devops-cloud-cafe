# Stage 1: Build (for installing dependencies)
# Use a Node.js base image. alpine images are smaller.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
# This means npm install will only rerun if package files change
COPY package*.json ./

# Install production Node.js dependencies
# --omit=dev prevents installation of devDependencies, reducing image size
RUN npm install --omit=dev

# Stage 2: Run (for the final application image)
# Use a smaller base image for the final runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of your application code (app.js, public/, etc.)
COPY . .

# Expose the port your application listens on (e.g., 3000 for Express)
EXPOSE 3000

# Define the command to run your application when the container starts
CMD ["node", "app.js"]