import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../features/allProducts/allProductsSlice';
import styled from 'styled-components';
const PageBtnContainer = () => {
	const { numOfPages, page } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const onPageChange = (pageNumber) => {
		dispatch(changePage(pageNumber));
	};

	const renderPaginationItems = () => {
		const items = [];
		for (let i = 1; i <= numOfPages; i++) {
			items.push(
				<Pagination.Item
					key={i}
					active={i === page}
					onClick={() => onPageChange(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
		return items;
	};

	return (
		<Wrapper>
			<Pagination size='lg'>
				<Pagination.Prev
					disabled={page === 1}
					onClick={() => onPageChange(page - 1)}
				/>
				{renderPaginationItems()}
				<Pagination.Next
					disabled={page === numOfPages}
					onClick={() => onPageChange(page + 1)}
				/>
			</Pagination>
		</Wrapper>
	);
};

export default PageBtnContainer;

const Wrapper = styled.section`
	.page-link {
		color: var(--clr-grey-3);
	}
	.active > .page-link {
		background-color: var(--clr-primary-5);
		border-color: var(--clr-primary-5);
		color: white;
	}
`;
