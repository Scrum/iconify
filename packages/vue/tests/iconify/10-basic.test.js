/**
 * @jest-environment jsdom
 */
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { Icon } from '../../';

const iconData = {
	body: '<path d="M4 19h16v2H4zm5-4h11v2H9zm-5-4h16v2H4zm0-8h16v2H4zm5 4h11v2H9z" fill="currentColor"/>',
	width: 24,
	height: 24,
};

describe('Creating component', () => {
	test('with wrapper', async () => {
		const Wrapper = {
			components: { Icon },
			template: `<Icon :icon='icon' />`,
			data() {
				return {
					icon: iconData,
				};
			},
		};

		const wrapper = mount(Wrapper, {});
		await nextTick();

		expect(wrapper.html().replace(/\s*\n\s*/g, '')).toEqual(
			'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 19h16v2H4zm5-4h11v2H9zm-5-4h16v2H4zm0-8h16v2H4zm5 4h11v2H9z" fill="currentColor"></path></svg>'
		);
	});

	test('without wrapper', async () => {
		const wrapper = mount(Icon, {
			props: {
				icon: iconData,
				onLoad: () => {
					// Should be called only for icons loaded from API
					throw new Error('onLoad called for object!');
				},
			},
		});
		await nextTick();

		expect(wrapper.html().replace(/\s*\n\s*/g, '')).toEqual(
			'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 19h16v2H4zm5-4h11v2H9zm-5-4h16v2H4zm0-8h16v2H4zm5 4h11v2H9z" fill="currentColor"></path></svg>'
		);
	});
});
