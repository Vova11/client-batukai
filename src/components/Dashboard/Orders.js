import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getAllOrders,
	deleteOrder,
	deleteOrderFromOrdersState,
} from '../../features/orders/ordersSlice.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from './Spinner.js';
import { formatNiceDateString } from '../../utils/helpers.js';
const Orders = () => {
	const dispatch = useDispatch();
	const { orders, isLoading } = useSelector((store) => store.orders);

	useEffect(() => {
		dispatch(getAllOrders());
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	const removeOrder = (id) => {
		dispatch(deleteOrder(id));
		dispatch(deleteOrderFromOrdersState(id));
	};
	console.log(orders);
	return (
		<div>
			<h2>Orders</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Total</th>
						<th>SubTotal</th>
						<th>Shipping Fee</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{order.status}</td>
							<td>{parseInt(order.total).toFixed(2)}</td>
							<td>{parseInt(order.subtotal).toFixed(2)}</td>
							<td>{order.shippingFee}</td>
							<td>{formatNiceDateString(order.createdAt)}</td>
							<td>
								{/* Buttons for Show, Update, and Delete */}
								<Link to={`/dashboard/orders/${order.id}`}>
									<Button variant='info' size='sm'>
										Show
									</Button>
								</Link>
								<Button variant='warning' size='sm'>
									Update
								</Button>
								<Button
									variant='danger'
									size='sm'
									onClick={() => removeOrder(order.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Orders;
