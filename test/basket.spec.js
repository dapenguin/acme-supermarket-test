const { Basket } = require('../src/basket');
const { pricingRules } = require('./fixtures/pricing-rules');

describe('the customer adds fruit tea, then strawberries, then fruit tea, and then coffee to their basket', () => {
	let basket;

	beforeAll(() => {
		basket = new Basket(pricingRules);
		basket.add('FR1');
		basket.add('SR1');
		basket.add('FR1');
		basket.add('CF1');
	});

	describe('the basket contents', () => {
		test('should have the correct quantities', () => {
			const basketContents = basket.getItems();
			expect(basketContents).toEqual([
				{
					code: 'FR1',
					quantity: 2
				},
				{
					code: 'SR1',
					quantity: 1
				},
				{
					code: 'CF1',
					quantity: 1
				}
			]);
		});
	});

	describe('the basket total', () => {
		test('should have the correct total', () => {
			const total = basket.total();
			expect(total).toBe('£19.34');
		});
	});
});

describe('the customer adds two fruit teas to their basket', () => {
	let basket;

	beforeAll(() => {
		basket = new Basket(pricingRules);
		basket.add('FR1');
		basket.add('FR1');
	});

	describe('the basket contents', () => {
		test('should have the correct quantities', () => {
			const basketContents = basket.getItems();
			expect(basketContents).toEqual([
				{
					code: 'FR1',
					quantity: 2
				}
			]);
		});
	});

	describe('the basket total', () => {
		test('should have the correct total', () => {
			const total = basket.total();
			expect(total).toBe('£3.11');
		});
	});
});

describe('the customer adds two strawberries, then fruit tea, and then strawberries to their basket', () => {
	let basket;

	beforeAll(() => {
		basket = new Basket(pricingRules);
		basket.add('SR1');
		basket.add('SR1');
		basket.add('FR1');
		basket.add('SR1');
	});

	describe('the basket contents', () => {
		test('should have the correct quantities', () => {
			const basketContents = basket.getItems();
			expect(basketContents).toEqual([
				{
					code: 'SR1',
					quantity: 3
				},
				{
					code: 'FR1',
					quantity: 1
				}
			]);
		});
	});

	describe('the basket total', () => {
		test('should have the correct total', () => {
			const total = basket.total();
			expect(total).toBe('£16.61');
		});
	});
});
