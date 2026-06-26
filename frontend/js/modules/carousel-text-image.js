import Swiper from 'swiper';
import { Pagination, A11y, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export function initCarouselTextImage() {
	const sliders = document.querySelectorAll('[data-carousel-text-image]');
	if (!sliders.length) return;

	sliders.forEach((slider) => {
		const pagination = slider.querySelector('[data-carousel-text-image-pagination]');

		new Swiper(slider, {
				modules: [Pagination, A11y, EffectFade],
			slidesPerView: 1,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
			speed: 500,
			pagination: pagination
				? {
					el: pagination,
					clickable: true
				}
				: undefined,
			a11y: {
				enabled: true
			}
		});
	});
}