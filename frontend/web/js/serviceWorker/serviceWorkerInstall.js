if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function(err) {
            console.log(err);
        });
    });
} else {
    console.log('service worker is not supported');
}

window.addEventListener('appinstalled', (evt) => {
    fetch('/analytics/pwa_installed/', {
        method: 'GET',
        credentials: 'include',
    });
});
