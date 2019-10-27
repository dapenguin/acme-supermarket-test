/**
 * A single product in the basket.
 * @typedef {Object} BasketProduct
 * @property {string} code The unique code for the product.
 * @property {number} quantity The quantity of the product in the basket.
 */

/**
 * Promotion details.
 * @typedef {Object} PromotionDetails
 * @property {string} type Identifier for the type of promotion.
 * @property {number} qualifyingQuantity The quantity of the product that must
 *     be in the basket for it to qualify for discount.
 * @param {number} discount The discount that will be applied.
 */

/**
 * A product.
 * @typedef {Object} Product
 * @property {string} code The unique code for the product.
 * @property {string} name The name of the product.
 * @property {number} unitPrice The price for one unit of the product.
 * @property {PromotionDetails} promotion The promotion in place for the product.
 */

/**
 * The rules for applying prices to the products.
 * @typedef {Object} PricingRules
 * @property {Product[]} products The products in the rules.
 */

class Basket {
	/**
	 * Creates a Basket.
	 * @param {Object} pricingRules
	 */
	constructor(pricingRules) {
		this.pricingRules = pricingRules || {};
		this.items = [];
	}

	/**
	 * Adds a product to the basket.
	 * @param {string} productCode The unique code for the product to be added.
	 */
	add(productCode) {
		const basketItemIndex = this.items.findIndex(({code}) => code === productCode);

		if (basketItemIndex === -1) {
			this.items.push({
				code: productCode,
				quantity: 1
			});
		} else {
			this.items[basketItemIndex].quantity++;
		}
	}

	/**
	 * @returns {BasketProduct[]} The products that are in the basket.
	 */
	getItems() {
		return this.items;
	}

	/**
	 * Calculates the discount where purchasing a minimum quantity of a product
	 * qualifies you for the discount.
	 * @param {number} quantityInBasket The quantity of the product that is in
	 *     the basket.
	 * @param {number} qualifyingQuantity The quantity of the product that must
	 *     be in the basket for it to qualify for discount.
	 * @param {number} discount The discount that will be applied per item.
	 * @returns {number} The amount of discount to be applied. If the quantity
	 *     in the basket doesn't qualify for discount, then zero is returned.
	 */
	calculateMinItemsDiscount(quantityInBasket, qualifyingQuantity, discount) {
		return quantityInBasket >= qualifyingQuantity
			? quantityInBasket * discount
			: 0;
	}

	/**
	 * Calculates the discount where purchasing multiples of a product
	 * qualifies you for the discount. For example, for a buy one get one free
	 * offer, you need to purchase quantities in multiples of 2 to qualify.
	 * @param {number} quantityInBasket The quantity of the product that is in
	 *     the basket.
	 * @param {number} qualifyingQuantity The quantity of the product that must
	 *     be in the basket for it to qualify for discount.
	 * @param {number} discount The discount that will be applied per item.
	 * @returns {number} The amount of discount to be applied. If the quantity
	 *     in the basket doesn't qualify for discount, then zero is returned.
	 */
	calculatePerItemDiscount(quantityInBasket, qualifyingQuantity, discount) {
		const quantityToReceiveDiscount = Math.floor(quantityInBasket / qualifyingQuantity);

		return quantityToReceiveDiscount > 0
			? quantityToReceiveDiscount * discount
			: 0;
	}

	/**
	 * Calculates and returns the basket total in GBP.
	 * @returns {string} The total of the basket, formatted for the currency
	 *     used.
	 */
	total() {
		const basketTotal = this.items.reduce((total, { quantity, code: itemCode }) => {
			const pricingRule = this.pricingRules.products.find(({code}) => code === itemCode);

			if (!pricingRule) {
				throw new Error(
					`Error calculating the basket total. Pricing rule for ${itemCode} could not be found.`
				);
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
