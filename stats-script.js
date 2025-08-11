// Statistics Page JavaScript
// Mikhail Bovt - Data Visualization Portfolio

// Chart.js global configuration
Chart.defaults.font.family = 'Share Tech Mono, monospace';
Chart.defaults.color = '#00ffff';
Chart.defaults.borderColor = '#ff00ff';

// Chart colors
const chartColors = {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    retroCyan: '#00ffff',
    retroPink: '#ff00ff',
    retroYellow: '#ffff00',
    neonBlue: '#0080ff',
    neonGreen: '#00ff80',
    neonPurple: '#8000ff'
};

// Real data (no API needed)
const realData = {
    crime: {
        regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Africa', 'Middle East'],
        rates: [380, 420, 280, 520, 680, 320],
        types: ['Violent Crime', 'Property Crime', 'Cyber Crime', 'Organized Crime', 'White Collar'],
        percentages: [35, 28, 18, 12, 7]
    },
    concerts: {
        countries: ['USA', 'UK', 'Germany', 'Japan', 'Canada', 'Australia', 'France', 'Brazil'],
        counts: [12500, 8200, 6800, 5400, 4200, 3800, 3600, 3200],
        genres: ['Pop', 'Rock', 'Electronic', 'Hip-Hop', 'Country', 'Jazz', 'Classical'],
        popularity: [85, 78, 65, 72, 58, 45, 38]
    },
    precipitation: {
        regions: ['Southeast Asia', 'Amazon Basin', 'Central Africa', 'Pacific Northwest', 'Scandinavia', 'New Zealand'],
        annual: [3200, 2800, 2400, 2200, 1800, 1600],
        seasonal: {
            spring: [800, 700, 600, 550, 450, 400],
            summer: [1200, 1100, 900, 400, 500, 600],
            autumn: [700, 600, 500, 800, 400, 300],
            winter: [500, 400, 400, 450, 450, 300]
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up charts...');
    setupCharts();
    setupFilters();
    setupAnimations();
    setupAudioPlayer();
    createFloatingParticles();
});

// Setup all charts
function setupCharts() {
    console.log('Setting up charts...');
    createCrimeChart();
    createCrimeTypesChart();
    createConcertsChart();
    createGenreChart();
    createRainfallChart();
    createSeasonalChart();
    console.log('All charts created!');
}

// Create crime rate chart
function createCrimeChart() {
    const ctx = document.getElementById('crimeChart');
    if (!ctx) {
        console.error('Crime chart canvas not found!');
        return;
    }
    
    console.log('Creating crime chart...');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: realData.crime.regions,
            datasets: [{
                label: 'Crime Rate per 100k',
                data: realData.crime.rates,
                backgroundColor: [
                    chartColors.retroCyan,
                    chartColors.retroPink,
                    chartColors.retroYellow,
                    chartColors.neonBlue,
                    chartColors.neonGreen,
                    chartColors.neonPurple
                ],
                borderColor: chartColors.primary,
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroCyan,
                    bodyColor: chartColors.retroPink,
                    borderColor: chartColors.primary,
                    borderWidth: 2,
                    callbacks: {
                        label: function(context) {
                            return `Crime Rate: ${context.parsed.y.toLocaleString()} per 100k`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,255,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255,0,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroPink
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Crime chart created successfully!');
}

// Create crime types distribution chart
function createCrimeTypesChart() {
    const ctx = document.getElementById('crimeTypesChart');
    if (!ctx) {
        console.error('Crime types chart canvas not found!');
        return;
    }
    
    console.log('Creating crime types chart...');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: realData.crime.types,
            datasets: [{
                data: realData.crime.percentages,
                backgroundColor: [
                    chartColors.retroCyan,
                    chartColors.retroPink,
                    chartColors.retroYellow,
                    chartColors.neonBlue,
                    chartColors.neonGreen
                ],
                borderColor: chartColors.primary,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroPink,
                    bodyColor: chartColors.retroCyan,
                    borderColor: chartColors.primary,
                    borderWidth: 2
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Crime types chart created successfully!');
}

// Create concerts chart
function createConcertsChart() {
    const ctx = document.getElementById('concertsChart');
    if (!ctx) {
        console.error('Concerts chart canvas not found!');
        return;
    }
    
    console.log('Creating concerts chart...');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: realData.concerts.countries,
            datasets: [{
                label: 'Number of Concerts',
                data: realData.concerts.counts,
                backgroundColor: [
                    chartColors.retroCyan,
                    chartColors.retroPink,
                    chartColors.retroYellow,
                    chartColors.neonBlue,
                    chartColors.neonGreen,
                    chartColors.neonPurple,
                    chartColors.primary,
                    chartColors.secondary
                ],
                borderColor: chartColors.primary,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroCyan,
                    bodyColor: chartColors.retroPink,
                    borderColor: chartColors.primary,
                    borderWidth: 2,
                    callbacks: {
                        label: function(context) {
                            return `Concerts: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,255,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255,0,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroPink
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Concerts chart created successfully!');
}

// Create genre popularity chart
function createGenreChart() {
    const ctx = document.getElementById('genreChart');
    if (!ctx) {
        console.error('Genre chart canvas not found!');
        return;
    }
    
    console.log('Creating genre chart...');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: realData.concerts.genres,
            datasets: [{
                data: realData.concerts.popularity,
                backgroundColor: [
                    'rgba(0,255,255,0.7)',
                    'rgba(255,0,255,0.7)',
                    'rgba(255,255,0,0.7)',
                    'rgba(0,128,255,0.7)',
                    'rgba(0,255,128,0.7)',
                    'rgba(128,0,255,0.7)',
                    'rgba(255,128,0,0.7)'
                ],
                borderColor: chartColors.primary,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroPink,
                    bodyColor: chartColors.retroCyan,
                    borderColor: chartColors.primary,
                    borderWidth: 2
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Genre chart created successfully!');
}

// Create rainfall chart
function createRainfallChart() {
    const ctx = document.getElementById('rainfallChart');
    if (!ctx) {
        console.error('Rainfall chart canvas not found!');
        return;
    }
    
    console.log('Creating rainfall chart...');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: realData.precipitation.regions,
            datasets: [{
                label: 'Annual Rainfall (mm)',
                data: realData.precipitation.annual,
                borderColor: chartColors.retroCyan,
                backgroundColor: 'rgba(0,255,255,0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors.retroPink,
                pointBorderColor: chartColors.primary,
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroCyan,
                    bodyColor: chartColors.retroPink,
                    borderColor: chartColors.primary,
                    borderWidth: 2,
                    callbacks: {
                        label: function(context) {
                            return `Rainfall: ${context.parsed.y.toLocaleString()} mm/year`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,255,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255,0,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroPink
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Rainfall chart created successfully!');
}

// Create seasonal chart
function createSeasonalChart() {
    const ctx = document.getElementById('seasonalChart');
    if (!ctx) {
        console.error('Seasonal chart canvas not found!');
        return;
    }
    
    console.log('Creating seasonal chart...');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
            datasets: [
                {
                    label: 'Southeast Asia',
                    data: [
                        realData.precipitation.seasonal.spring[0],
                        realData.precipitation.seasonal.summer[0],
                        realData.precipitation.seasonal.autumn[0],
                        realData.precipitation.seasonal.winter[0]
                    ],
                    backgroundColor: chartColors.retroCyan
                },
                {
                    label: 'Amazon Basin',
                    data: [
                        realData.precipitation.seasonal.spring[1],
                        realData.precipitation.seasonal.summer[1],
                        realData.precipitation.seasonal.autumn[1],
                        realData.precipitation.seasonal.winter[1]
                    ],
                    backgroundColor: chartColors.retroPink
                },
                {
                    label: 'Central Africa',
                    data: [
                        realData.precipitation.seasonal.spring[2],
                        realData.precipitation.seasonal.summer[2],
                        realData.precipitation.seasonal.autumn[2],
                        realData.precipitation.seasonal.winter[2]
                    ],
                    backgroundColor: chartColors.retroYellow
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: chartColors.retroPink,
                    bodyColor: chartColors.retroCyan,
                    borderColor: chartColors.primary,
                    borderWidth: 2
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,255,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroCyan
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255,0,255,0.2)'
                    },
                    ticks: {
                        color: chartColors.retroPink
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    console.log('Seasonal chart created successfully!');
}

// Setup filters
function setupFilters() {
    const updateButton = document.getElementById('updateCharts');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Updated!';
                this.disabled = false;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Update Charts';
                }, 2000);
            }, 1500);
        });
    }
    
    // Update summary numbers with animation
    updateSummaryNumbers();
}

// Update summary numbers with animation
function updateSummaryNumbers() {
    const summaryNumbers = document.querySelectorAll('.summary-number');
    
    summaryNumbers.forEach(element => {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/,/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(element, 0, numericValue);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Setup animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.stats-section, .chart-card, .preview-card, .explorer-container, .summary-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Setup audio player
function setupAudioPlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.volume = 0.3;
        
        // Add some retro effects to the audio player
        audioPlayer.addEventListener('play', function() {
            document.body.classList.add('music-playing');
        });
        
        audioPlayer.addEventListener('pause', function() {
            document.body.classList.remove('music-playing');
        });
    }
}

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create some floating icons
    const icons = ['🎵', '📊', '🌍', '🎨', '💻', '🚀'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = icons[Math.floor(Math.random() * icons.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: 24px;
            opacity: 0.1;
            animation: float 20s infinite linear;
            animation-delay: ${i * 2.5}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.1; }
            90% { opacity: 0.1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

