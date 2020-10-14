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
import {
  showProductDetails,
  createProductReview,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductDetailScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  // component level state
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // app level state from redux
  const productDetails = useSelector((rootState) => rootState.productDetails);
  const { pending, product, error } = productDetails;
  const cartItems = useSelector((rootState) => rootState.cart.cartItems);
  const user = useSelector((rootState) => rootState.user);
  const { userInfo } = user;
  const productReviewCreate = useSelector(
    (rootState) => rootState.productReviewCreate
  );
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const itemInCart = cartItems.find(
    (item) => item.productId === match.params.id
  );
  const itemQtyInCart = itemInCart ? itemInCart.qty : 0;

  // fetch the product details data
  // When successProductReview changes from undefined to true, it'll run again
  useEffect(() => {
    dispatch(showProductDetails(match.params.id));
  }, [dispatch, match.params.id, successProductReview]);

  const addToCardHandler = () => {
    dispatch(addToCart(match.params.id, qty));
    // redirect to CartScreen
    history.push(`/cart`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
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
                <ListGroup.Item>
                  Price: ${product.price.toFixed(2)}
                </ListGroup.Item>
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
                        {product.countInStock - itemQtyInCart > 0
                          ? 'In stock'
                          : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock - itemQtyInCart > 0 && (
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
                            {[
                              ...Array(
                                product.countInStock - itemQtyInCart
                              ).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
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
                      onClick={addToCardHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <h1 className='reviews'>Reviews</h1>
              {product.reviews.length === 0 && (
                <Message variant='secondary'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.userName}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {successProductReview && (
                    <Message variant='success'>Review submitted</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen;
