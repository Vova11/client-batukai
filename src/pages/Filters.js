import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateFilters,
	updateMinPrice,
	clearFilters,
	getFilterProducts,
} from '../features/filter/filterSlice';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import {
	handleChange,
	clearAllProductsState,
	getAllProducts,
} from '../features/allProducts/allProductsSlice';

const Filters = () => {
	const [localSearch, setLocalSearch] = useState('');

	const {
		filtered_products,
		filters: { text, category, company, min_price, max_price, price },
		companies,
	} = useSelector((store) => store.filter);
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		dispatch(updateFilters({ name, value }));
		dispatch(handleChange({ name, value })); // Update sort in the state
		dispatch(getFilterProducts({ ...filtered_products, company: value }));
	};
	const handleClearingFilters = () => {
		dispatch(clearAllProductsState());
		dispatch(clearFilters());
		dispatch(getAllProducts());
	};

	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={(e) => e.preventDefault()}>
					{/* search input */}
					<div className='form-control-product'>
						<input
							type='text'
							name='text'
							value={text}
							placeholder='search'
							onChange={handleInputChange}
							className='search-input'
						/>
					</div>
					{/* end of search input */}
					{/* company */}
					<div className='form-control-product'>
						<h5>company</h5>
						<select
							name='company'
							value={company}
							onChange={handleInputChange}
							className='company'
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
					{/* price */}
					<div className='form-control-product'>
						<h5>price</h5>
						<p className='price'>{formatPrice(price)}</p>
						<input
							type='range'
							name='price'
							onChange={handleChange}
							min={min_price}
							max={max_price}
							value={price}
						/>
					</div>
					{/* end of price */}
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
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
		margin-bottom: 20px;
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
	.company {
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
