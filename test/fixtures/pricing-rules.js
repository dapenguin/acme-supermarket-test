const pricingRules = {
	products: [
		{
			code: 'FR1',
			name: 'Fruit tea',
			unitPrice: 3.11,
			promotion: {
				type: 'PER_X_ITEMS',
				qualifyingQuantity: 2,
				discount: 3.11
			}
		},
		{
			code: 'SR1',
			name: 'Strawberries',
			unitPrice: 5,
			promotion: {
				type: 'MIN_X_ITEMS',
				qualifyingQuantity: 3,
				discount: .5
			}
		},
		{
			code: 'CF1',
			name: 'Coffee',
			unitPrice: 11.23
		}
	]
};

module.exports = {
	pricingRules
};
