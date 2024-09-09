document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Perform custom validation and add appropriate classes
        Array.from(form.elements).forEach(function (input) {
            if (input.checkValidity()) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            }
        });

        if (form.checkValidity()) {
            // Form is valid, proceed with form submission (if needed)
            form.classList.add('was-validated');
        }
    }, false);
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let formIsValid = true;

        // Perform custom validation and add appropriate classes
        Array.from(form.elements).forEach(function (input) {
            if (input.checkValidity()) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                formIsValid = false;
            }
        });

        if (formIsValid) {
            // Form is valid, proceed with redirection
            form.classList.add('was-validated');
            window.location.href = 'index.html';
        }
    }, false);
});
