module.exports = function calculateNetworkIO(stats) {
    const rxBytes = stats.networks
        ? Object.values(stats.networks).reduce((acc, iface) => acc + iface.rx_bytes, 0)
        : 0;
    const txBytes = stats.networks
        ? Object.values(stats.networks).reduce((acc, iface) => acc + iface.tx_bytes, 0)
        : 0;
    return `RX: ${(rxBytes / (1024 * 1024)).toFixed(2)} MB, TX: ${(txBytes / (1024 * 1024)).toFixed(2)} MB`;
};
