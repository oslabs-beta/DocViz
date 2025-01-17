const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const calculateCPUUsage = require('../utils/calculateCPUUsage');
const calculateNetworkIO = require('../utils/calculateNetworkIO');
const dockerConfig = require('../config/dockerConfig');

const docker = new Docker(dockerConfig);

router.get('/', async (req, res) => {
    try {
        const containers = await docker.listContainers({ all: true });
        const statsPromises = containers.map(container =>
            new Promise((resolve, reject) => {
                const containerInstance = docker.getContainer(container.Id);
                containerInstance.stats({ stream: false }, (err, stats) => {
                    if (err) return reject(err);
                    resolve({
                        id: container.Id,
                        image: container.Image,
                        status: container.Status,
                        cpuUsage: calculateCPUUsage(stats),
                        memoryUsage: `${(stats.memory_stats.usage / (1024 * 1024)).toFixed(2)} MB`,
                        networkIO: calculateNetworkIO(stats),
                    });
                });
            })
        );
        const stats = await Promise.all(statsPromises);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching container stats:', error.message);
        res.status(500).send('Error fetching container stats');
    }
});

module.exports = router;
