import React, { useEffect } from "react";
import { getUserOrders } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";

const OrderScreen = () => {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { loading, error, orders } = orderState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders(currentUser._id));
  }, [dispatch, currentUser._id]);
  return (
    <>
      <h1 className="text-center ">Your Orders </h1>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}
      {orders &&
        orders.map((order) => (
          <div className="container border p-4 bg-light">
            <Row>
              <Col md={4}>
                <h4>Items :</h4>
                {order.orderItems.map((item) => (
                  <h6 key={item.name}>
                    {item.name} [{item.varient}] * {item.quantity} ={" "}
                    {item.price}
                  </h6>
                ))}
              </Col>
              <Col md={3}>
                <h4>Address :</h4>
                <h6>Street : {order.shippingAddress.street}</h6>
                <h6>City : {order.shippingAddress.city}</h6>
                <h6>PinCode : {order.shippingAddress.picode}</h6>
                <h6>Country : {order.shippingAddress.country}</h6>
              </Col>
              <Col md={5}>
                <h4>Order Info :</h4>
                <h6>Order Amount : {order.orderAmount}</h6>
                <h6>Transaction id : {order.transectionId}</h6>
                <h6>Order id : {order._id}</h6>
                <h6>Order Date: {order.createdAt.substring(0, 10)}</h6>
              </Col>
              <Col md={3}>
                <h6>
                  Status :
                  {order.isDeliverd ? (
                    <h6 className="text-success">Delivered Successfully</h6>
                  ) : (
                    <h6 className="text-warning">To be delivered...</h6>
                  )}
                </h6>
              </Col>
            </Row>
          </div>
        ))}
    </>
  );
};

export default OrderScreen;
