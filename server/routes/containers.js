const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const calculateCPUUsage = require('../utils/calculateCPUUsage');
const calculateNetworkIO = require('../utils/calculateNetworkIO');
const dockerConfig = require('../config/dockerConfig');

const docker = new Docker(dockerConfig);

// Function to fetch container stats
const getContainerStats = async () => {
  try {
    const containers = await docker.listContainers({ all: true });

    const statsPromises = containers.map(
      (container) =>
        new Promise((resolve, reject) => {
          const containerInstance = docker.getContainer(container.Id);
          containerInstance.stats({ stream: false }, (err, stats) => {
            if (err) return reject(err);

            resolve({
              id: container.Id,
              image: container.Image,
              status: container.Status,
              cpuUsage: calculateCPUUsage(stats),
              memoryUsage: `${(
                stats.memory_stats.usage /
                (1024 * 1024)
              ).toFixed(2)} MB`,
              networkIO: calculateNetworkIO(stats),
            });
          });
        })
    );

    return await Promise.all(statsPromises);
  } catch (error) {
    console.error('Error fetching container stats:', error.message);
    throw error; // Throw error for both HTTP and WebSocket handlers to handle
  }
};

// HTTP GET /api/containers route
router.get('/', async (req, res) => {
  try {
    const stats = await getContainerStats();
    res.json(stats);
  } catch (error) {
    res.status(500).send('Error fetching container stats');
  }
});

module.exports = { router, getContainerStats };
