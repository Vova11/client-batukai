export const formatPrice = (number) => {
	return new Intl.NumberFormat('lt-LT', {
		style: 'currency',
		currency: 'EUR',
	}).format(number / 100);
};

export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => item[type]);
	console.log(unique);
	// let unique = data.map((item) => item[type]);
	// return ['all', ...new Set(unique)];
	// if (type === 'colors') {
	// 	unique = unique.flat();
	// }
	// if (type === 'company') {
	// 	unique = unique.flat();
	// }
	// if (type === 'category') {
	// 	unique = unique.flat();
	// }
	// return ['all', ...new Set(unique)];
};

// Function to randomly select 3 products from an array
export const getThreeRandomProducts = (productsArray) => {
	const randomProducts = [];
	const copyOfProducts = [...productsArray]; // Create a copy of the array

	while (randomProducts.length < 3 && copyOfProducts.length > 0) {
		const randomIndex = Math.floor(Math.random() * copyOfProducts.length);
		randomProducts.push(copyOfProducts[randomIndex]);
		copyOfProducts.splice(randomIndex, 1); // Remove the selected product from the copy
	}

	return randomProducts;
};
