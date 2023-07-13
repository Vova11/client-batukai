import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import FormRowSelect from '../../pages/FormRowSelect';
import FormRowSelectPublished from '../../pages/FormRowSelectPublished';
import { useState, useMemo } from 'react';
import {
	handleChange,
	clearFilters,
} from '../../features/allProducts/allProductsSlice';

const SearchContainer = () => {
	const [localSearch, seLocalSearch] = useState('');
	const {
		isLoading,
		search,
		published,
		searchStatus,
		searchType,
		sort,
		sortOptions,
	} = useSelector((store) => store.products);
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		const { value, name } = e.target;
		dispatch(handleChange({ name, value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		seLocalSearch('');
		dispatch(clearFilters());
	};

	const debounce = () => {
		console.log('debounce');
		let timeoutID;
		return (e) => {
			seLocalSearch(e.target.value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				dispatch(handleChange({ name: e.target.name, value: e.target.value }));
			}, 1000);
		};
	};
	const optimizedDebounce = useMemo(() => debounce(), []);

	return (
		<Wrapper>
			<Form>
				<Row className='mb-3'>
					{/** SEARCH BY NAME */}
					<FormRow
						col='6'
						type='text'
						id='search'
						label='Search by name'
						name='search'
						value={localSearch}
						onChange={optimizedDebounce}
					/>
					<FormRowSelectPublished
						col={6}
						type='select'
						id='published'
						label='published'
						name='published'
						value={published}
						onChange={handleSearch}
						options={[
							{ value: 'all', label: 'all' },
							{ value: 'true', label: 'published' },
							{ value: 'false', label: 'not published' },
						]}
					/>

					<FormRowSelect
						type='select'
						col={6}
						label='Sort'
						id='sort'
						name='sort'
						value={sort}
						onChange={handleSearch}
						options={sortOptions}
					/>
				</Row>
				<button type='button' className='btn' onClick={handleSubmit}>
					Clear filters
				</button>
			</Form>
		</Wrapper>
	);
};

export default SearchContainer;

const Wrapper = styled.section`
	background: white;
	padding: 20px;
`;
