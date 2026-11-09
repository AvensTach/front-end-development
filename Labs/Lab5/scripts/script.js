// Task 1: Show modal after 30 seconds of focus on the goal section
const goalSection = document.getElementById("portal-goal");
const modal = document.getElementById("rules-modal");
const closeModalBtn = document.getElementById("close-modal");
let focusTimer;

if (goalSection && modal) {
    goalSection.addEventListener("mouseenter", () => {
        focusTimer = setTimeout(() => {
            modal.style.display = "block";
        }, 30000); // 30 seconds
    });

    goalSection.addEventListener("mouseleave", () => {
        clearTimeout(focusTimer);
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}


// Task 2: Search functionality for topics
const searchInput = document.getElementById("search-topic");
const topics = document.querySelectorAll(".topic-card");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const filterText = this.value.toLowerCase();

        topics.forEach(topic => {
            const title = topic.querySelector(".topic-title").textContent.toLowerCase();

            if (title.includes(filterText)) {
                topic.style.display = "";
            } else {
                topic.style.display = "none";
            }
        });
    });
}

// Task 3: Accordion logic
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null; // Close accordion
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Open accordion
        }
    });
});


// Task 4: Hover effects and tooltip for the "Details" field
const detailsField = document.getElementById("details");
const tooltip = document.getElementById("details-tooltip");

if (detailsField && tooltip) {
    detailsField.addEventListener("mouseover", () => {

        detailsField.style.backgroundColor = "#e0f7fa";
        detailsField.style.border = "2px solid #00796b";
        detailsField.style.boxShadow = "3px 3px 8px rgba(0,0,0,0.4)";

        tooltip.style.display = "inline-block";
    });

    detailsField.addEventListener("mouseout", () => {

        detailsField.style.backgroundColor = "";
        detailsField.style.border = "";
        detailsField.style.boxShadow = "";
        tooltip.style.display = "none";
    });
}

const contactBlock = document.getElementsByTagName("footer").item(0);

if (contactBlock) {
    contactBlock.addEventListener("mouseover", () => {
        contactBlock.style.backgroundColor = "#ff0000";
        contactBlock.style.border = "2px solid #0070ff";
    });
    contactBlock.addEventListener("mouseleave", () => {
        contactBlock.style.backgroundColor = "";
        contactBlock.style.border = "";
    })
}


// Task 5: Check time and apply night mode if between 21:00 and 06:00
document.addEventListener("DOMContentLoaded", () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 21 || currentHour < 6) {
        document.documentElement.classList.add("night-mode");
        document.body.classList.add("night-mode");
    }
})