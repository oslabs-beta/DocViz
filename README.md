DocViz: Docker Observability Tool

Overview

DocViz is a powerful Docker observability tool designed to provide developers with a structured and convenient way to monitor their local Docker containers. It seamlessly integrates with the Docker Desktop application and presents real-time container statistics in an intuitive and visually appealing manner.

Features

Comprehensive Container Monitoring: Displays all running and stopped containers with real-time status indicators (green for running, red for stopped).

Dashboard View: Provides essential metrics for each container, including:

Network I/O

Memory Usage

CPU Usage

Container ID & Name

Real-Time Polling: Utilizes WebSockets for efficient real-time data polling, ensuring up-to-date monitoring.

Interactive UI: Built with React, Chart.js, and Bootstrap, ensuring a responsive and visually engaging user experience.

Seamless Docker Integration: Utilizes the Dockerode library to communicate with the Docker socket for real-time container insights.

Multi-Platform Compatibility: The application is containerized, allowing developers to pull and run it from Docker Hub for easy deployment and execution.

Concurrent Execution: Uses concurrency to run the frontend and backend simultaneously, enhancing performance and usability.

Tech Stack

Frontend: React, Chart.js, Bootstrap

Backend: Express.js

Real-Time Communication: WebSockets

Docker Integration: Dockerode

Containerization: Multi-platform compatibility for deployment

Concurrency Management: Runs front and backend concurrently for seamless execution

Installation & Setup

Prerequisites

Ensure you have the following installed on your machine:

Docker Desktop (latest version recommended)

Node.js (for local development)

Running Locally

Clone the repository:

git clone https://github.com/oslabs-beta/DocViz
cd DocViz

Install dependencies:

npm install

Start the backend server:

npm run server

Start the frontend:

npm start

Open http://localhost:3000 in your browser to access DocViz.

Running via Docker

You can run DocViz as a container by pulling the image from Docker Hub:

 docker pull your-dockerhub-username/docviz:latest
 docker run -d -p 3000:3000 --name docviz your-dockerhub-username/docviz

Then, open http://localhost:3000 in your browser.

Usage

Home Page: Displays all containers as interactive cards with real-time status indicators.

Dashboard Page: Click on any container card to view its detailed stats and performance metrics.

Monitor Efficiently: Keep track of memory, CPU, and network usage for individual containers in an organized manner.

Contributing

We welcome contributions! If you'd like to contribute:

Fork the repository

Create a new branch (feature-branch)

Commit your changes and push to your fork

Submit a pull request

Authors

Kaishaer Mahemuti 
Elie Beaubrun
Nicole Duchitanga
Sierra Rivera
Jose Sanchez

