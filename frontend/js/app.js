
import GlobalMeasurements from './modules/global-measurements';
import { watchForReveals } from './modules/reveals';
import { initMedia } from './modules/media';
import { initCarouselTextImage } from './modules/carousel-text-image';

window.addEventListener("DOMContentLoaded", function() {
  // Add the site credit
  console.log('Built by Bone Digital - www.bone.digital');

  // Load additional modules
  GlobalMeasurements.start();
  watchForReveals();
  initMedia();
  initCarouselTextImage();
}, false);
