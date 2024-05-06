// Circle progress function
function drawProgress(canvas, progress, strokeColor) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 8;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    // Write text in the center
    ctx.fillStyle = '#6b7280';
    ctx.font = 'bold 20px Arial'; 
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    ctx.fillText("$" + Math.round(progress), centerX, centerY); // Convert progress to integer
    
    // Draw progress arc
    const endAngle = (progress / 1000) * (2 * Math.PI);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle - 0.5 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = strokeColor; // Set stroke color here
    ctx.stroke();
}

function animateProgress(canvas, targetProgress, strokeColor) {
    let currentProgress = 0;
    const start = performance.now();
    const duration = 1000; // Animation duration in milliseconds

    function updateProgress(timestamp) {
        const progress = Math.min(1, (timestamp - start) / duration); // Calculate progress from 0 to 1
        currentProgress = progress * targetProgress;
        drawProgress(canvas, currentProgress, strokeColor);

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        }
    }

    requestAnimationFrame(updateProgress);
}


// Get canvas elements
const canvasElements = document.querySelectorAll('.progress-canvas');
const colors = ['#581c87', '#0369a1', '#be123c', '#0f766e']; // Array of colors
canvasElements.forEach((canvas, index) => {
    const initialProgress = parseFloat(canvas.getAttribute('data-progress'));
    const color = colors[index % colors.length]; // Assign color based on index
    animateProgress(canvas, initialProgress, color);
});


//Line chart initialization
const lineCtx = document.getElementById('lineChart').getContext('2d'); 


const progressChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Example labels
        datasets: [
            {
                label: 'Send',
                data: [40, 10, 50, 45, 90, 30, 40], // Example data
                borderColor: '#0369a1', // Example border color
                backgroundColor: '#f5f5f5', // Example background color
            },
            {
                label: 'Receive',
                data: [10, 30, 90, 110, 40, 75, 10], // Example data
                borderColor: 'red', // Example border color
                backgroundColor: '#f5f5f5', // Example background color
            },
            {
                label: 'cashback',
                data: [7, 30, 11, 1, 20, 10, 4], // Example data
                borderColor: '#0f766e', // Example border color
                backgroundColor: '#f5f5f5', // Example background color
            },
        ],
    },
    options: {
        scales: {
            x: {
                display: true, // Hide x-axis
            },
            y: {
                display: true, // Hide y-axis
            },
        },
        plugins: {
            legend: {
                display: true, // Hide legend
            },
        },
        elements: {
            line: {
                borderWidth: 2, // Set the line width to 1 (optional)
            },
            point: {
                radius: 2, // Set point radius to 0 to remove points (optional)
            },
        },
    }
});
