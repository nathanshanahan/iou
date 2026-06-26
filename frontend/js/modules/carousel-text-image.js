import Swiper from 'swiper';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';

export function initCarouselTextImage() {
	const sliders = document.querySelectorAll('[data-carousel-text-image]');
	if (!sliders.length) return;

	sliders.forEach((slider) => {
		const pagination = slider.querySelector('[data-carousel-text-image-pagination]');

		new Swiper(slider, {
			modules: [Pagination, A11y],
			slidesPerView: 1,
			spaceBetween: 24,
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