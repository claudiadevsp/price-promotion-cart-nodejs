const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK']

const getShoppingCart = (ids, productsList) => {
  
	const cartProducts = getProductsIds(ids, productsList);
	const categoryProducts = getProductsCategories(cartProducts);
	const quantity = getQuantity(categoryProducts);
	const promotion = getPromotion(quantity);
	const products = parseProducts(cartProducts);
	const regularPrice = getRegularPrices(cartProducts);
	const priceDiscounts = getPromotionPrices(cartProducts, promotion);
	const discountTotal = regularPrice - priceDiscounts;
	const discount = `${((discountTotal / regularPrice) * 100).toFixed(2)}%`;

	return {
		products,
		promotion,
		totalPrice: priceDiscounts.toFixed(2),
		discountValue: discountTotal.toFixed(2),
		discount,
	};
}

const getProductsIds = (ids, allProducts) => {
	return allProducts.filter((product) => ids.includes(product.id));
};

const getQuantity = (categories) => [...new Set(categories)].length;

const getRegularPrices = (cartProducts) =>
	cartProducts.reduce((value, product) => {
		return value + product.regularPrice;
	}, 0);

const getProductsCategories = (filteredProducts) => {
  return filteredProducts.map((product) => product.category);
};

const getPromotionPrices = (cartProducts, promotionRule) =>

	cartProducts.reduce((value, product) => {
		const promotionValue = product.promotions.find((promotion) =>
			promotion.looks.includes(promotionRule)
		);

		if (promotionValue) {
			value += promotionValue.price;
		} else {
			value += product.regularPrice;
		}
		return value;
	}, 0);

const getPromotion = total => {
	return total <= 3
    ? promotions[total - 1]
    : promotions[3];
}

parseProducts = products => {
	return products.map(({ name, category }) => {
		return { name, category };
	})
};

module.exports = { getShoppingCart };