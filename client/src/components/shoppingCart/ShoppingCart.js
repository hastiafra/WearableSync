import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../ItemContext";
import { useHistory, NavLink} from "react-router-dom";

//children
import CartItems from "./CartItems";

//styling
import styled from "styled-components";

const ShoppingCart = ({ checkOut }) => {


  let total = 0;
  let history = useHistory();

  const [cartItems, setCartItems] = useState([]);
  const { state, clearPurchase } = useContext(ItemContext);
  const { cart } = state;

  useEffect(() => {
    fetch("/api/cart-items/", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        
        setCartItems(data.data);
      });
  }, [cart]);


  const checkOutForm = () => {
    history.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Wrapper>
        <Title>Cart Summary</Title>
        <h1>Your cart is empty</h1>
      </Wrapper>
    );
  } else {
    return (
      <>
        <Title>Cart Summary</Title>
        
        {cartItems.map((item) => {
          const itmCost = item.price.slice(1,).split(",").join("");
          let cartInfo = [];
          if(state.hasLoaded) {
              cart.forEach((elem) => {
                  if (elem.product_id === item._id) {
                      cartInfo.push(elem);
                  }
              })
          }
          total += itmCost * cartInfo[0]?.quantity
          
          return <CartItems key={item._id} item={item} cart={cart} />;
        })}
        <div>
          <Para>
            Cart Total : <Span> ${total.toFixed(2)}</Span>
          </Para>
        </div>
        {checkOut !== true ? (
          <div>
            <Button onClick={clearPurchase}>Clear</Button>
            <Checkout onClick={()=> checkOutForm()}>Check out</Checkout>
          </div>
        ) : (
          <div>
            <Home to='/'>Continue Shopping</Home>
          </div>
        )}
      </>
    );
  }
};

export default ShoppingCart;


const Home = styled(NavLink)`
text-decoration:none;
color: #616060;
font-weight: bold;
font-size:20px;
font-family:var(--font-family);
border-bottom: 2px solid black;
padding-bottom: 10px;
`

const Para = styled.p`
  font-size: 18px;
  padding: 20px;
  font-family:var(--font-family);
`;

const Span = styled.span`
  color: #616060;
  font-weight: bold;
`;

const Button = styled.button`
  cursor: pointer;
  margin: 10px;
  font-size: 20px;
  border-radius: 10px;
  padding: 15px 10px;
  width: 150px;
  border: none;
  color: #616060;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  transition: 400ms ease;

  &:hover {
    background: lightGray;
    box-shadow: none;
  }
`;
const Checkout = styled(Button)`
  &:hover {
    background: var(--sage);
  }
`;

const Title = styled.h1`
  text-align: center;
  padding: 10px;
  color: #616060;
  font-family:var(--font-family);
  margin-top: 0;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
