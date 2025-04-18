import React from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
	setGridView,
	setListView,
	updateSort,
} from '../features/filter/filterSlice';
import { handleChange } from '../features/allProducts/allProductsSlice';
import { getFilterProducts } from '../features/filter/filterSlice';
const Sort = () => {
	const {
		filtered_products: products,
		grid_view,
		sort,
		filtered_products,
	} = useSelector((store) => store.filter);
	const dispatch = useDispatch();

	const handleSortChange = (event) => {
		const selectedSort = event.target.value;
		console.log(selectedSort);
		dispatch(updateSort(selectedSort)); // Dispatch the updateSort action with the selected value
		dispatch(handleChange({ name: 'sort', value: selectedSort })); // Update sort in the state
		dispatch(getFilterProducts({ ...filtered_products, sort: selectedSort })); // Fetch products with updated sorting
	};

	return (
		<Wrapper>
			<div className='btn-container'>
				<button
					onClick={() => dispatch(setGridView())}
					className={`${grid_view ? 'active' : null}`}
				>
					<BsFillGridFill />
				</button>
				<button
					onClick={() => dispatch(setListView())}
					className={`${!grid_view ? 'active' : null}`}
				>
					<BsList />
				</button>
			</div>
			<p>{products.length} products found</p>
			<hr />
			<form>
				<label htmlFor='sort'>sort by</label>
				<select
					name='sort'
					id='sort'
					value={sort}
					onChange={handleSortChange} // Call the handleSortChange function on change
					className='sort-input'
				>
					<option value='oldest'>oldest</option>
					<option value='latest'>latest</option>
					<option value='price-lowest'>price (lowest)</option>
					<option value='price-highest'>price (highest)</option>
					<option value='a-z'>name (a - z)</option>
					<option value='z-a'>name (z - a)</option>
				</select>
			</form>
		</Wrapper>
	);
};

export default Sort;

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: auto auto 1fr auto;
	align-items: center;
	margin-bottom: 2rem;
	column-gap: 2rem;
	@media (max-width: 576px) {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.75rem;
		.btn-container {
			width: 50px;
		}
		label {
			display: inline-block;
			margin-right: 0.5rem;
		}
	}
	@media (min-width: 768px) {
		column-gap: 2rem;
	}
	p {
		text-transform: capitalize;
		margin-bottom: 0;
	}
	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.5rem;
		button {
			background: transparent;
			border: 1px solid var(--clr-black);
			color: var(--clr-black);
			width: 1.5rem;
			border-radius: var(--radius);
			height: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			svg {
				font-size: 1rem;
			}
		}
		.active {
			background: var(--clr-black);
			color: var(--clr-white);
		}
	}
	.sort-input {
		border-color: transparent;
		font-size: 1rem;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
	}
	label {
		font-size: 1rem;
		text-transform: capitalize;
	}
`;
