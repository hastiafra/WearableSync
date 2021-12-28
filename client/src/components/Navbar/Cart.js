import React, { useContext, useState } from "react";
import { ItemContext } from "../ItemContext";


//styling
import styled from "styled-components";


//children
import ShoppingCart from "../shoppingCart/ShoppingCart";

//icons
import {RiCloseFill} from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";


const Cart = () => {
  const [opened, setOpened] = useState(false);
  const {state} = useContext(ItemContext);

  return (
    <>
      {opened ? (  
        <SideBar>
          <Xwrapper onClick={()=>{setOpened(false)}}>
          <RiCloseFill size={35} color={"#616060"}  />
          </Xwrapper>
          <ShoppingCart />
        </SideBar>
      ) : null}

      <CartNav
        onClick={() => {setOpened(true)}}
      >
        <BsCart3 />
      </CartNav>
      
      { state.cart?.length > 0 &&
      <Total>
        <p>{state.cart.length}</p>
      </Total>
      }
    </>
  );
};

export default Cart;

const Xwrapper = styled.button`
background:none;
border:none;
position:absolute;
top:10px;
right:10px;
cursor:pointer;
padding:10px;

`

const Total = styled.div`
  position: absolute;
  right: 40px;
  background: var(--dusty-rose);
  border-radius: 50%;
  width: 10px;
`;


const CartNav = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
`;


const SideBar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  z-index: 300;
  background-color: var(--dusty-rose);
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
