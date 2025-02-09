import { Chart, registerables } from 'chart.js';

// Register necessary Chart.js components globally
Chart.register(...registerables);

export default Chart;
