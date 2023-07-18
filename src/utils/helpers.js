export const formatPrice = (number) => {
	return new Intl.NumberFormat('lt-LT', {
		style: 'currency',
		currency: 'EUR',
	}).format(number / 100);
};

export const getUniqueValues = (data, type) => {
	let unique = Array.from(data.values()).map((item) => item[type]);
	if (type === 'colors') {
		unique = unique.flat();
	}
	if (type === 'company') {
		unique = unique.flat();
	}
	if (type === 'category') {
		unique = unique.flat();
	}

	return ['all', ...new Set(unique)];
};
