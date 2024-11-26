const images = [
    "cityhall_1.png",
    "harland_2.png",
    "queens_3.png",
    "hedges_4.png",
    "causeway_5.png",
    "umbrellas_6.png"
];

const imageContainer = document.getElementById('image-container');
const textContainer = document.getElementById('text-container'); 1

let imageIndex = 0;
let textIndex = 0;

function changeImageAndText() {
    imageContainer.style.backgroundImage = `url('static/${images[imageIndex]}')`;
    textContainer.textContent = texts[textIndex];

    imageIndex = (imageIndex + 1) % images.length;
    textIndex = (textIndex + 1) % texts.length;
}

setInterval(changeImageAndText, 5000); // Change image and text every 5 seconds

const tickerContainer = document.getElementById('ticker-container');
const tickerList = document.getElementById('ticker-list');

// Function to fetch and display ticker data
function fetchAndDisplayTickerData() {
    fetch('static/ticker_data.txt')
        .then(response => response.text())
        .then(data => {
            const tickerItems = data.split('\n');
            tickerItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `  -   ${item}`;
                tickerList.appendChild(li);
            });

            // Start the ticker animation with a delay
            setTimeout(() => {
                animateTicker(tickerList.children);
            }, 6000); // Adjust the delay as needed
        })
        .catch(error => {
            console.error('Error fetching ticker data:', error);
        });
}

// Initial fetch and display
fetchAndDisplayTickerData();

// Function to animate the ticker
function animateTicker(items) {
    let currentIndex = 0;
    let visibleItems = 1; // Adjust the number of visible items as needed

    function showItem() {
        for (let i = 0; i < visibleItems; i++) {
            const itemIndex = (currentIndex + i) % items.length;
            items[itemIndex].style.transform = 'translateX(0)';
            items[itemIndex].style.opacity = 1;
        }

        currentIndex = (currentIndex + 1) % items.length;

        setTimeout(showItem, 5000); // Adjust the delay as needed
    }

    showItem();
}

//Calculate Time and Distance
function calculateDistanceAndTime() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    const service = new google.maps.DistanceMatrixService();

    const request = {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL // For miles
    };

    service.getDistanceMatrix(request, (response, status) => {
        if (status == 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
            const duration = response.rows[0].elements[0].duration.text;


            document.getElementById('distance').textContent = distance;
            document.getElementById('duration').textContent = duration;

        } else {
            console.error('Error calculating distance:', status);
        }
    });
}