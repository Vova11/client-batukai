import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateFilters,
	updateMinPrice,
	clearFilters,
	fetchInitialData,
	getFilterProducts,
} from '../features/filter/filterSlice';
import { formatPrice } from '../utils/helpers';

import {
	handleChange,
	clearAllProductsState,
	getAllProducts,
} from '../features/allProducts/allProductsSlice';

const Filters = () => {
	const [localSearch, setLocalSearch] = useState('');
	const {
		filtered_products,
		filters: {
			search,
			category,
			company,
			min_price,
			max_price,
			price,
			nicotine,
		},
		companies,
	} = useSelector((store) => store.filter);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(updateFilters({ name, value }));
		dispatch(handleChange({ name, value })); // Update sort in the state
		dispatch(getFilterProducts({ ...filtered_products, filters: value }));
	};

	const handleClearingFilters = () => {
		setLocalSearch('');
		dispatch(clearAllProductsState());
		dispatch(clearFilters());
		dispatch(getAllProducts());
	};

	const debounce = () => {
		console.log('debounce');
		let timeoutID;
		return (e) => {
			const name = e.target.name;
			const value = e.target.value;
			setLocalSearch(value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				dispatch(updateFilters({ name, value }));
				dispatch(handleChange({ name, value })); // Update sort in the state
				dispatch(getFilterProducts({ ...filtered_products, filters: value }));
			}, 1000);
		};
	};
	const optimizedDebounce = useMemo(() => debounce(), []);

	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={(e) => e.preventDefault()}>
					{/* search input */}
					<div className='form-control-product form-control-product-filters'>
						<input
							type='search'
							name='search'
							placeholder='search'
							value={localSearch}
							onChange={optimizedDebounce}
							className='search-input setwidth'
						/>
					</div>
					{/* end of search input */}
					{/* company */}
					<div className='form-control-product form-control-product-filters'>
						<h5>company</h5>
						<select
							name='company'
							value={company}
							onChange={handleInputChange}
							className='company setwidth'
						>
							{companies.map((c, index) => {
								return (
									<option key={index} value={c}>
										{c}
									</option>
								);
							})}
						</select>
					</div>
					{/* end of company */}
					{/* start of nicotine */}
					<div className='form-control-product form-control-product-filters'>
						<h5>Nikotín</h5>
						<select
							name='nicotine'
							value={nicotine} // Assuming you have a 'nicotine' state to store the selected value
							onChange={handleInputChange} // Assuming this function handles changes in the state
							className='nicotine setwidth' // You may want to use a suitable class name here
						>
							{[
								{ label: 'Všetky', value: 'all' },
								{ label: 'Áno', value: true },
								{ label: 'Nie', value: false },
							].map((option, index) => (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					{/* end of nicotine */}
				</form>
				<button
					type='button'
					className='clear-btn'
					onClick={handleClearingFilters}
				>
					clear filters
				</button>
			</div>
		</Wrapper>
	);
};

export default Filters;

const Wrapper = styled.section`
	.form-control-product-filters {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
		.setwidth {
			width: 80%;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}
	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company,
	.nicotine {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

// Implement later
// 	/* price */
// }
// <div className='form-control-product'>
// 	<h5>Price</h5>
// 	<p className='price'>{formatPrice(price)}</p>
// 	<input
// 		type='range'
// 		name='price'
// 		onChange={handleInputChange}
// 		min={min_price}
// 		max={max_price}
// 		value={price}
// 	/>
// </div>;
// {
// 	/* end of price */
// }
