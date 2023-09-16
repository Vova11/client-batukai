export const formatPrice = (number) => {
	return new Intl.NumberFormat('sk-SK', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2, // Specify the number of decimal places
		maximumFractionDigits: 2, // Specify the number of decimal places
	}).format(number);
};

export const formatNiceDateString = (dateString) => {
	const dateObject = new Date(dateString);

	// Get the day of the week (e.g., "Wednesday")
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const dayOfWeek = daysOfWeek[dateObject.getDay()];

	// Format the date as "YYYY-MM-DD" (e.g., "2023-09-07")
	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(dateObject.getDate()).padStart(2, '0');

	// Combine the date and day of the week
	const niceDateString = `${day}-${month}-${year}- (${dayOfWeek})`;

	return niceDateString;
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
