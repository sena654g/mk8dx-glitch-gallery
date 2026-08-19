document.querySelectorAll('video').forEach(video => {
    video.addEventListener('loadedmetadata', () => {
        const savedVolume = localStorage.getItem('videoVolume');
        video.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
    });

    video.addEventListener('volumechange', () => {
        localStorage.setItem('videoVolume', video.volume);
    });
});