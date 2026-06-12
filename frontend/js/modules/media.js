export function initMedia() {
    // Initialize both observers, with early returns if no matching elements exist
    initVimeoObserver('.media-container--oembed iframe');
    initVideoObserver('.media-container--video video');
}

function initVimeoObserver(selector) {
    const videos = document.querySelectorAll(selector);
    if (!videos || videos.length === 0) return;

    const observer = createIntersectionObserver(handleVimeoIntersection);
    videos.forEach(video => observer.observe(video));
}

function initVideoObserver(selector) {
    const videos = document.querySelectorAll(selector);
    if (!videos || videos.length === 0) return;

    const observer = createIntersectionObserver(handleVideoIntersection);
    videos.forEach(video => observer.observe(video));
}

function createIntersectionObserver(callback) {
    return new IntersectionObserver(callback, { 
        threshold: 0.5,
        rootMargin: '10px'
    });
}

function handleVimeoIntersection(entries) {
    entries.forEach(entry => {
        const video = entry.target;
        
        // Early return if video doesn't have required attributes
        if (!video?.contentWindow?.postMessage || !video.hasAttribute('data-autoplay')) {
            return;
        }

        try {
            const message = JSON.stringify({
                method: entry.intersectionRatio >= 0.5 ? 'play' : 'pause'
            });
            
            video.contentWindow.postMessage(message, '*');
        } catch (error) {
            console.warn('Failed to control Vimeo player:', error);
        }
    });
}

function handleVideoIntersection(entries) {
    entries.forEach(entry => {
        const video = entry.target;
        
        // Early return if not a valid video element or not set to autoplay
        if (!video?.play || !video?.pause || !video.hasAttribute('data-autoplay')) {
            return;
        }

        try {
            if (entry.intersectionRatio >= 0.5) {
                if (video.paused && video.readyState >= 2) {
                    const playPromise = video.play();
                    if (playPromise) {
                        playPromise.catch(error => {
                            console.warn('Video playback failed:', error);
                        });
                    }
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        } catch (error) {
            console.warn('Failed to control video playback:', error);
        }
    });
}