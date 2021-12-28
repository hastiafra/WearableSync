import React,{ useEffect } from "react";
import { useParams } from "react-router";


//styling and icons
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

//importing header and footer components
import Footer from "./Footer";
import Header from "./Header";

//date formatter
import { format } from "date-fns"


const ConfirmationPage = () => {
  const {id} = useParams()
  let purchaseInfo = JSON.parse(window.localStorage.getItem("checkOutInfo"))
  
  useEffect(() => {
    
    return () => {
      window.localStorage.clear();
    };
    }, []);
  
  
  
  return (
    <>
      <Header />
      <Wrapper>
        <FaCheckCircle size={40} />
        <OrderReceived>We've received your order.</OrderReceived>
        <ConfirmationContainer>
          <OrderDetails>Order Details: </OrderDetails>
          <OrderNumber>
            <Paragraph><Span>Order Number:</Span> {id}</Paragraph>
            <Paragraph><Span>Order Date:</Span> {format(new Date(), "EEE MMM dd yyy")}</Paragraph>
            <Paragraph><Span>Customer:</Span> {purchaseInfo.firstName}</Paragraph>
            <Paragraph>
              Please keep your order number for reference. Please allow up to 24
              hours for us to process your order for shipment.
            </Paragraph>
          </OrderNumber>
          <OrderSummary><Span>Order Summary:</Span> </OrderSummary>
          <Paragraph><Span>Shipping Method:</Span> Standard ground delivery (4-6 business days)</Paragraph>
          <Paragraph><Span>Shipping Address:</Span> {purchaseInfo.address}, {purchaseInfo.city}, {purchaseInfo.province}</Paragraph>
        </ConfirmationContainer>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family);
  background-color: var(--dusty-rose);
  flex-direction: column;
`;

const ConfirmationContainer = styled.div`
  width: 900px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  padding-left: 20px;
`;

const OrderReceived = styled.h1`
  font-family: var(--font-family);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const OrderDetails = styled.h2`
  padding: 20px 0px;
`;

const OrderNumber = styled.div`
  border-bottom: 2px solid gray;
`;

const Paragraph = styled.p`
  padding: 5px 0px;
`;
const OrderSummary = styled.h2`
  padding: 20px 0px;
`;

const Span = styled.span`
font-weight: 700;`
export default ConfirmationPage;
