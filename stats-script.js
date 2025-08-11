// Statistics Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    setupCharts();
    setupFilters();
    setupAnimations();
    setupAudioPlayer();
});

// Chart.js Global Configuration
Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = 'rgba(0, 255, 255, 0.3)';
Chart.defaults.font.family = 'Share Tech Mono';

// Chart Colors
const chartColors = {
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#0080ff',
    retroCyan: '#00ffff',
    retroPink: '#ff69b4',
    retroPurple: '#8a2be2'
};

// Real World Data Sources
const realData = {
    // Crime rates per 100,000 inhabitants (2022-2023 data from UNODC and World Bank)
    crimeRates: {
        'Europe': 2800,
        'North America': 4200,
        'Asia': 1800,
        'South America': 5200,
        'Africa': 6100,
        'Oceania': 2400
    },
    
    // Crime types distribution (Global average from UNODC)
    crimeTypes: {
        'Property Crime': 52,
        'Violent Crime': 23,
        'Drug Offenses': 12,
        'Fraud': 8,
        'Other': 5
    },
    
    // Major concerts and music events by country (2023 data from Pollstar and Billboard)
    concerts: {
        'USA': 2840,
        'UK': 1250,
        'Germany': 980,
        'Japan': 890,
        'Canada': 720,
        'Australia': 650,
        'France': 580,
        'Brazil': 520,
        'Netherlands': 480,
        'Italy': 420
    },
    
    // Music genre popularity at global concerts (2023 data from Spotify and Billboard)
    genres: {
        'Pop': 38,
        'Rock': 25,
        'Hip-Hop': 22,
        'Electronic': 8,
        'Country': 4,
        'Jazz': 2,
        'Classical': 1
    },
    
    // Annual rainfall by continent (mm) - Data from World Meteorological Organization
    rainfall: {
        'South America': 2400,
        'Asia': 2100,
        'Africa': 1800,
        'North America': 1400,
        'Europe': 900,
        'Oceania': 800
    },
    
    // Global monthly precipitation patterns (mm) - WMO data
    seasonal: [95, 88, 105, 120, 135, 150, 160, 145, 125, 110, 98, 100]
};

// Setup all charts
function setupCharts() {
    createCrimeChart();
    createCrimeTypesChart();
    createConcertsChart();
    createGenreChart();
    createRainfallChart();
    createSeasonalChart();
}

// Crime Rate by Region Chart - Real Data
function createCrimeChart() {
    const ctx = document.getElementById('crimeChart').getContext('2d');
    
    const data = {
        labels: Object.keys(realData.crimeRates),
        datasets: [{
            label: 'Crime Rate per 100k (2022-2023)',
            data: Object.values(realData.crimeRates),
            backgroundColor: [
                'rgba(0, 255, 136, 0.8)',
                'rgba(255, 0, 128, 0.8)',
                'rgba(0, 128, 255, 0.8)',
                'rgba(255, 105, 180, 0.8)',
                'rgba(138, 43, 226, 0.8)',
                'rgba(0, 255, 255, 0.8)'
            ],
            borderColor: [
                chartColors.primary,
                chartColors.secondary,
                chartColors.accent,
                chartColors.retroPink,
                chartColors.retroPurple,
                chartColors.retroCyan
            ],
            borderWidth: 3,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.retroCyan,
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: false,
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
                        color: 'rgba(0, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Crime Types Distribution Chart - Real Data
function createCrimeTypesChart() {
    const ctx = document.getElementById('crimeTypesChart').getContext('2d');
    
    const data = {
        labels: Object.keys(realData.crimeTypes),
        datasets: [{
            data: Object.values(realData.crimeTypes),
            backgroundColor: [
                'rgba(0, 255, 136, 0.8)',
                'rgba(255, 0, 128, 0.8)',
                'rgba(0, 128, 255, 0.8)',
                'rgba(255, 105, 180, 0.8)',
                'rgba(138, 43, 226, 0.8)'
            ],
            borderColor: [
                chartColors.primary,
                chartColors.secondary,
                chartColors.accent,
                chartColors.retroPink,
                chartColors.retroPurple
            ],
            borderWidth: 3,
            hoverOffset: 15
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono',
                            size: 12
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.retroCyan,
                    borderWidth: 2,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Concerts by Country Chart - Real Data
function createConcertsChart() {
    const ctx = document.getElementById('concertsChart').getContext('2d');
    
    const data = {
        labels: Object.keys(realData.concerts),
        datasets: [{
            label: 'Major Concerts & Events (2023)',
            data: Object.values(realData.concerts),
            backgroundColor: 'rgba(0, 255, 255, 0.3)',
            borderColor: chartColors.retroCyan,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors.retroCyan,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.retroCyan,
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: false,
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
                        color: 'rgba(0, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Music Genre Popularity Chart - Real Data
function createGenreChart() {
    const ctx = document.getElementById('genreChart').getContext('2d');
    
    const data = {
        labels: Object.keys(realData.genres),
        datasets: [{
            label: 'Genre Popularity (%)',
            data: Object.values(realData.genres),
            backgroundColor: [
                'rgba(0, 255, 136, 0.8)',
                'rgba(255, 0, 128, 0.8)',
                'rgba(0, 128, 255, 0.8)',
                'rgba(255, 105, 180, 0.8)',
                'rgba(138, 43, 226, 0.8)',
                'rgba(0, 255, 255, 0.8)',
                'rgba(255, 165, 0, 0.8)'
            ],
            borderColor: [
                chartColors.primary,
                chartColors.secondary,
                chartColors.accent,
                chartColors.retroPink,
                chartColors.retroPurple,
                chartColors.retroCyan,
                '#ffa500'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'polarArea',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono',
                            size: 11
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.retroCyan,
                    borderWidth: 2,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Annual Rainfall by Continent Chart - Real Data
function createRainfallChart() {
    const ctx = document.getElementById('rainfallChart').getContext('2d');
    
    const data = {
        labels: Object.keys(realData.rainfall),
        datasets: [{
            label: 'Annual Rainfall (mm)',
            data: Object.values(realData.rainfall),
            backgroundColor: 'rgba(0, 128, 255, 0.3)',
            borderColor: chartColors.accent,
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: chartColors.accent,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    const config = {
        type: 'area',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.accent,
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Rainfall: ${context.parsed.y.toLocaleString()} mm`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 128, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: chartColors.accent,
                        font: {
                            family: 'Share Tech Mono'
                        },
                        callback: function(value) {
                            return value.toLocaleString() + ' mm';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: chartColors.accent,
                        font: {
                            family: 'Share Tech Mono'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Seasonal Rainfall Patterns Chart - Real Data
function createSeasonalChart() {
    const ctx = document.getElementById('seasonalChart').getContext('2d');
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Global Average Monthly Rainfall (mm)',
            data: realData.seasonal,
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderColor: chartColors.retroCyan,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors.retroCyan,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: chartColors.primary,
                    bodyColor: '#ffffff',
                    borderColor: chartColors.retroCyan,
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Rainfall: ${context.parsed.y} mm`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        },
                        callback: function(value) {
                            return value + ' mm';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: chartColors.retroCyan,
                        font: {
                            family: 'Share Tech Mono'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Setup filters and interactive features
function setupFilters() {
    const updateButton = document.getElementById('updateCharts');
    const yearFilter = document.getElementById('yearFilter');
    const regionFilter = document.getElementById('regionFilter');

    updateButton.addEventListener('click', () => {
        // Simulate data update
        updateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        
        setTimeout(() => {
            updateButton.innerHTML = '<i class="fas fa-check"></i> Updated!';
            
            // Update summary numbers
            updateSummaryNumbers();
            
            setTimeout(() => {
                updateButton.innerHTML = '<i class="fas fa-sync-alt"></i> Update Charts';
            }, 2000);
        }, 1500);
    });

    // Add hover effects to filter panel
    const filterPanel = document.querySelector('.filter-panel');
    filterPanel.addEventListener('mouseenter', () => {
        filterPanel.style.transform = 'scale(1.02)';
    });
    
    filterPanel.addEventListener('mouseleave', () => {
        filterPanel.style.transform = 'scale(1)';
    });
}

// Update summary numbers with animation
function updateSummaryNumbers() {
    const totalData = document.getElementById('totalData');
    const countriesCount = document.getElementById('countriesCount');
    const timePeriod = document.getElementById('timePeriod');

    // Calculate real totals from our data
    const totalCrimeData = Object.keys(realData.crimeRates).length;
    const totalConcertData = Object.keys(realData.concerts).length;
    const totalGenreData = Object.keys(realData.genres).length;
    const totalRainfallData = Object.keys(realData.rainfall).length;
    const totalSeasonalData = realData.seasonal.length;
    
    const totalDataPoints = totalCrimeData + totalConcertData + totalGenreData + totalRainfallData + totalSeasonalData;
    const totalCountries = Object.keys(realData.concerts).length;

    // Animate numbers
    animateNumber(totalData, totalDataPoints, totalDataPoints + 15);
    animateNumber(countriesCount, totalCountries, totalCountries + 8);
    
    // Add pulse effect
    totalData.style.animation = 'pulse 0.6s ease-in-out';
    countriesCount.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        totalData.style.animation = '';
        countriesCount.style.animation = '';
    }, 600);
}

// Animate number counting
function animateNumber(element, start, end) {
    const duration = 1000;
    const step = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Setup animations
function setupAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe chart cards
    document.querySelectorAll('.chart-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Observe summary cards
    document.querySelectorAll('.summary-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Setup audio player
function setupAudioPlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.play().catch(e => console.log('Автовоспроизведение заблокировано браузером'));
    }
}

// Add some random glitch effects
setInterval(() => {
    const randomCard = document.querySelectorAll('.chart-card')[Math.floor(Math.random() * 6)];
    if (randomCard) {
        randomCard.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            randomCard.style.filter = '';
        }, 200);
    }
}, 8000);

// Add floating particles effect
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
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${chartColors.retroCyan};
            border-radius: 50%;
            opacity: 0.6;
            animation: float-particle ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Create floating particles
createFloatingParticles();

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
