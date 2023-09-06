import React, { useState, useEffect } from 'react';

const Rurl = () => {
	const [queryParams, setQueryParams] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Get the URL search parameters
		const searchParams = new URLSearchParams(window.location.search);

		// Convert the search parameters to an object
		const params = {};
		for (const [key, value] of searchParams) {
			params[key] = value;
		}

		// Update the state with the query parameters
		setQueryParams(params);
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{queryParams.Result === 'OK' ? <h1>Thank you </h1> : ''}
			{queryParams.Result === 'FAIL' ? <h1>Platba nebola uspesna</h1> : ''}
			{queryParams.Result === 'PENDING' ? <h1>Platba nebola uspesna</h1> : ''}
		</div>
	);
};

export default Rurl;
