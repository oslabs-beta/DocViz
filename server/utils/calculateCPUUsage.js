module.exports = function calculateCPUUsage(stats) {
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    const numberOfCpus = stats.cpu_stats.online_cpus || 1;
    return `${((cpuDelta / systemDelta) * numberOfCpus * 100).toFixed(2)}%`;
};
