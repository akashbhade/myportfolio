// script.js

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const formDataObject = {};
        formData.forEach(function (value, key) {
            formDataObject[key] = value;
        });

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            responseMessage.textContent = 'Form submitted successfully!';
            responseMessage.style.color = 'green';
            contactForm.reset();
        })
        .catch(error => {
            console.error('There was a problem with the form submission:', error);
            responseMessage.textContent = 'There was an error submitting the form. Please try again later.';
            responseMessage.style.color = 'red';
        });
    });
});
