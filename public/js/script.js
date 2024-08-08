window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    document.getElementById('load-time').textContent = loadTime;
    document.getElementById('page-size').textContent = (performance.getEntriesByType('resource').reduce((total, resource) => total + resource.transferSize, 0) / 1024).toFixed(2);
});
