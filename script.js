// Navigation Handling
const navbarLinksEl = document.getElementById('navbarLinks');
const toggleButtonEl = document.getElementById("toggleButton");
const cancelButtonEl = document.getElementById("cancelButton");
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');
const bottomSection = document.querySelector('.main-bottom-section');
const navElement = document.querySelector('nav');

// Toggle navigation visibility on button clicks
toggleButtonEl.addEventListener("click", function() {
    navbarLinksEl.classList.toggle("hide-show-navbar");
    toggleButtonEl.style.display = 'none';
    cancelButtonEl.style.display = 'inline';
});

cancelButtonEl.addEventListener("click", function() {
    navbarLinksEl.classList.toggle("hide-show-navbar");
    cancelButtonEl.style.display = 'none';
    toggleButtonEl.style.display = 'inline';
});

// Scroll Handling for Header
document.addEventListener('scroll', () => {
    const bottomSectionHeight = bottomSection.offsetHeight;
    const headerHeight = header.offsetHeight;
    const isScrolled = window.scrollY > (bottomSectionHeight + headerHeight - 83);
    header.classList.toggle('scrolled', isScrolled);
    AOS.init();
});







// Role Changing Logic
const roles = [
    "Full Stack Developer",
    "Web Developer & Creative Thinker",
    "Lifelong Learner & Problem Solver",
    "HTML5 & CSS3 Specialist",
    "JavaScript Developer",
    "Python Developer",
    "Responsive Design Advocate"
];

let currentIndex = 0;
const paragraph = document.querySelector('.bottom-section-paragraph');

function changeRole() {
    paragraph.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % roles.length;
        paragraph.textContent = roles[currentIndex];
        paragraph.style.opacity = 1;
    }, 500);
}

setInterval(changeRole, 5000);

//_____________________________________________Project Link---------------------------------

const projectLinks = {
    project1: {
        liveView: 'https://delightful-daifuku-7b5fc9.netlify.app/',
    },
    project2: {
        liveView: 'https://poojanirali2411.github.io/VR-Products-/',
    },
    project3: {
        liveView: 'https://poojanirali2411.github.io/to-do-application/',
    },
    project4: {
        liveView: 'https://poojanirali2411.github.io/Calculator-/',
    },
    project5: {
        liveView: 'https://poojanirali2411.github.io/Wikipedia/',
    },
    project6: {
        liveView: 'https://poojanirali2411.github.io/coffee-shop-website-/',
    },
    // Add more projects here as needed
};


// Select all buttons with the class 'live-view' or '.btn'
// I'll use '.live-view' as it's more specific to your use case.
const liveViewButtons = document.querySelectorAll('.live-view');

liveViewButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Stop the browser from executing any default button action
        event.preventDefault(); 
        
        // 1. Get the project identifier from the button's 'data-id' attribute
        const projectId = button.getAttribute('data-id');
        
        // 2. Safely retrieve the liveView URL using the ID
        // The '?' ensures the code doesn't crash if a link is missing
        const urlToOpen = projectLinks[projectId]?.liveView;

        // 3. Check if the URL was found
        if (urlToOpen) {
            // 4. OPEN THE LINK IN A NEW TAB!
            // '_blank' is the key to opening a new tab/window.
            window.open(urlToOpen, '_blank');
        } else {
            console.error(`Error: Live View URL not found for project ID: ${projectId}`);
            // You can optionally add a user-friendly message here
            // alert("Sorry, this project link is not yet available.");
        }
    });
});

//-------------------------------------------------Project Link_____________________________________________________________



// Form Submission Handling
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const json = JSON.stringify(data);
    result.innerHTML = "🔄 Please wait...";
    result.style.display = "block";
    result.classList.add("show");

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                result.innerHTML = "✅ Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "❗ Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.classList.remove("show");
                result.classList.add("hide");

                setTimeout(() => {
                    result.style.display = "none";
                    result.classList.remove("hide");
                }, 500);
            }, 3000);
        });
});