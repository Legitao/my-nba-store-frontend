import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { showProductDetails } from '../actions/productActions';

const ProductDetailScreen = ({ match }) => {
  // component level state
  const [qty, setQty] = useState(0);

  // app level state from redux
  const productDetails = useSelector((rootState) => rootState.productDetails);
  const { pending, product, error } = productDetails;

  // dispatch actions
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  // useEffect happens after the render, so the initial render won't have data ready
  // Rating component will show warning because it set props to be required
  // Solution: use a guard to check if pending is undefined(means this component hasn't dispatch action)
  // so that we can conditionally render the details screen when the data is ready
  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {pending || pending === undefined ? (
        // loader
        <Loader />
      ) : error ? (
        // error message
        <Message variant='danger'>{error}</Message>
      ) : (
        // product details screen
        <div>
          <Row>
            {/* product image */}
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            {/* info about product name, rating, price, description */}
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* add to cart */}
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                              console.log('onchange', e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen;
