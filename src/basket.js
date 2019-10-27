class Basket {
	constructor(pricingRules) {
		this.pricingRules = pricingRules || {};
		this.items = [];
	}

	add(itemCode) {
		const basketItemIndex = this.items.findIndex(({code}) => code === itemCode);

		if (basketItemIndex === -1) {
			this.items.push({
				code: itemCode,
				quantity: 1
			});
		} else {
			this.items[basketItemIndex].quantity++;
		}
	}

	getItems() {
		return this.items;
	}

	calculateMinItemsDiscount(quantityInBasket, qualifyingQuantity, discount) {
		return quantityInBasket >= qualifyingQuantity
			? quantityInBasket * discount
			: 0;
	}

	calculatePerItemDiscount(quantityInBasket, qualifyingQuantity, discount) {
		const quantityToReceiveDiscount = Math.floor(quantityInBasket / qualifyingQuantity);

		return quantityToReceiveDiscount > 0
			? quantityToReceiveDiscount * discount
			: 0;
	}

	total() {
		const basketTotal = this.items.reduce((total, { quantity, code: itemCode }) => {
			const pricingRule = this.pricingRules.products.find(({code}) => code === itemCode);

			if (!pricingRule) {
				throw new Error('Error calculating the basket total.');
			}

			const { unitPrice, promotion } = pricingRule;
			const itemTotal = quantity * unitPrice;

			let itemDiscount = 0;

			if (promotion){
				const { type, qualifyingQuantity, discount } = promotion;

				switch (type) {
					case 'MIN_X_ITEMS':
						itemDiscount = this.calculateMinItemsDiscount(
							quantity,
							qualifyingQuantity,
							discount,
						);
						break;
					case 'PER_X_ITEMS':
						itemDiscount = this.calculatePerItemDiscount(
							quantity,
							qualifyingQuantity,
							discount,
						);
						break;
					default:
						itemDiscount = 0;
						break;
				}
			}

			return total + (itemTotal - itemDiscount);
		}, 0);

		return `£${basketTotal}`;
	}
}

module.exports = {
	Basket
};
