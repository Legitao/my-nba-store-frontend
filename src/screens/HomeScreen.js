import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { pending, products, error } = productList;

  useEffect(() => {
    console.log('dispatch');
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {pending ? (
        <h2>loading products</h2>
      ) : error ? (
        <h3>error</h3>
      ) : (
        <div>
          <h1>Product List</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
