document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var modalButton = document.querySelector('[data-modal-target="popup-modal"]');
        if (modalButton) {
            modalButton.click();
        }
    }, 2000);
});
