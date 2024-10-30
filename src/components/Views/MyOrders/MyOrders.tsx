import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dropdown, DropdownButton, ListGroup, Spinner, Table, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from '../../../redux/orderRedux';
import { useAppSelector } from '../../../redux/hooks';
import { OrderStatusesEnum } from '../../../types/enums';
import styles from './MyOrders.module.scss';

const Component: React.FC = () => {
  const isAdmin = useAppSelector(state => state.user.isAdmin ?? false);
  const email = useAppSelector(state => state.user.email ?? undefined);
  const { data: ordersData = [] } = useFetchOrdersQuery({email, isAdmin}, { skip: !email});
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  
  const [visibleOrders, setVisibleOrders] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusesEnum | 'All'>('All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [orders, setOrders] = useState(ordersData);

  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);

  const toggleOrderDetails = (orderId: string) => {
    setVisibleOrders((prevVisibleOrders) =>
      prevVisibleOrders.includes(orderId)
        ? prevVisibleOrders.filter((id) => id !== orderId)
        : [...prevVisibleOrders, orderId]
    );
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatusesEnum) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      // ADD: send notification to customer that their order has changed status
      setOrders(prevOrders => prevOrders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));

      setToastMessage(`Order status updated to '${newStatus}'`);
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to update order status.');
      setShowToast(true);
    }
  };

  const filteredOrders = selectedStatus === 'All'
    ? orders
    : orders.filter(order => order.orderStatus === selectedStatus);

  if (orders) {
    return (
      <Container className={styles.root} fluid={'md'}>
        <h2>My orders</h2>
        <DropdownButton
          title={`Filter by Status: ${selectedStatus}`}
          onSelect={(status) => setSelectedStatus(status as OrderStatusesEnum)}
          variant='secondary'
          className='mb-3'
        >
          <Dropdown.Item eventKey='All'>All</Dropdown.Item>
          {Object.values(OrderStatusesEnum).map((status) => (
            <Dropdown.Item key={status} eventKey={status}>{status}</Dropdown.Item>
          ))}
        </DropdownButton>
        {filteredOrders.map((order) => {
          const isVisible = visibleOrders.includes(order._id);
          return (
            <Card key={order._id} className='mb-4'>
              <Card.Header>
                <div className='d-flex justify-content-between align-items-center'>
                  <h5>Order ID: {order._id}</h5>
                  {isAdmin ? (
                    <DropdownButton
                      title={order.orderStatus}
                      variant='info'
                      onSelect={(newStatus) => handleStatusChange(order._id, newStatus as OrderStatusesEnum)}
                      className='ms-auto'>
                      {Object.values(OrderStatusesEnum).map((status) => (
                        <Dropdown.Item key={status} eventKey={status}>{status}</Dropdown.Item>
                      ))}
                    </DropdownButton>
                  ) : (
                    <span className='badge bg-info ms-auto'>{order.orderStatus}</span>
                  )}
                  <Button variant='link' onClick={() => toggleOrderDetails(order._id)}>
                    {isVisible ? (
                      <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} />
                    )}
                  </Button>
                </div>
              </Card.Header>

              {isVisible && (
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <strong>Contact:</strong> {order.contact}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Address:</strong> {order.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {order.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Payment Method:</strong> {order.payment}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Shipping:</strong> {order.shipping}
                    </ListGroup.Item>
                    {order.message && (
                      <ListGroup.Item>
                        <strong>Message:</strong> {order.message}
                      </ListGroup.Item>
                    )}
                  </ListGroup>

                  <h5 className='mt-3'>Items:</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              )}

              {isVisible && (
                <Card.Footer>
                  <strong>Delivery Fee:</strong> ${order.deliveryFee.toFixed(2)}
                  <br />
                  <strong>Total to Pay:</strong> ${order.toPay.toFixed(2)}
                </Card.Footer>
              )}
            </Card>
          );
        })}
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className={styles.toast}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </Container>
    );
  }
  else {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }
};

export {
  Component as MyOrders,
  Component as MyOrdersComponent,
};
