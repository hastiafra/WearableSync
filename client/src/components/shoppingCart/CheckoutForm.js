import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ItemContext } from "../ItemContext";
import { useHistory } from "react-router";


//children
import ShoppingCart from "./ShoppingCart";

//styling
import styled from "styled-components";
import checkOut from "../../assets/checkOut.jpg";



// there are 2 piece of info with quantity, productId:""

const CheckOutForm = () => {
  let history = useHistory();
  const { state, purchaseInfo, setPurchaseInfo, clearPurchase } = useContext(ItemContext);
  
  let year = new Date().getYear().toString()
  let currentYear = Number(year.substring(1))


  let month = new Date().getMonth();
  let currentMonth = month + 1;
  
  const { user, isAuthenticated } = useAuth0();

  useEffect (() => {
    if (isAuthenticated) {
      setPurchaseInfo({ ...purchaseInfo, firstName: user.given_name, lastName: user.family_name, email: user.email })
    }
    },[]) // eslint-disable-line

  const getInfo = (ev) => {
    setPurchaseInfo({ ...purchaseInfo, [ev.target.id]: ev.target.value });

  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    let checkOutInfo = {...purchaseInfo, cart: state.cart}

    if(purchaseInfo.expiryY < currentYear && purchaseInfo.expiryM < currentMonth){ window.alert("your card is expired") }

    fetch("/api/add-new-purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(checkOutInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.status !== 200) {
          return <h1>please fill the missing info</h1>;
        } else {
          window.localStorage.setItem("checkOutInfo", JSON.stringify(checkOutInfo));
          clearPurchase()
          history.push(`/confirmation/${data.data}`)
        }
      });
  };

  return (
    <Wrapper>
      <SideBar>
      <ShoppingCart checkOut={true} />
      </SideBar>
      <Title>Shipping Info</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          <Input
            type="text"
            onChange={getInfo}
            id="firstName"
            value={purchaseInfo.firstName}
            placeholder="First Name"
            required
          ></Input>
        </Label>
        <Label>
          Last Name:
          <Input
            type="text"
            onChange={getInfo}
            id="lastName"
            value={purchaseInfo.lastName}
            placeholder="Last Name"
            required
          ></Input>
        </Label>
        <Label>
          Phone Number:
          <Input
            type="tel"
            value={purchaseInfo.phoneNum}
            id="phoneNum"
            onChange={getInfo}
            placeholder="Phone Number"
            required
          ></Input>
        </Label>
        <Label>
          email:
          <Input
            type="email"
            value={purchaseInfo.email}
            id="email"
            onChange={getInfo}
            placeholder="Last Name"
            required
          ></Input>
        </Label>
        <Label>
          Address:
          <Input
            type="text"
            value={purchaseInfo.address}
            id="address"
            onChange={getInfo}
            placeholder="Address"
            required
          ></Input>
        </Label>
        <Label>
          City:
          <Input
            type="text"
            value={purchaseInfo.city}
            id="city"
            onChange={getInfo}
            placeholder="City"
            required
          ></Input>
        </Label>
        <Label>
          Postal Code:
          <Input
            type="text"
            value={purchaseInfo.postalCode}
            id="postalCode"
            onChange={getInfo}
            placeholder="postal code"
            required
          ></Input>
        </Label>
        <Label>
          <Select
            onChange={getInfo}
            value={purchaseInfo.province}
            id="province"
            required
          >
            <option value disabled >
              Province
            </option>
            <option defaultValue="AB" >Alberta</option>
            <option value="BC">British Colombia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="NU">Nunavut</option>
            <option value="ON">Ontario</option>
            <option value="PEI">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon</option>
          </Select>
        </Label>
        <Label>
          Credit card:
          <Input
            value={purchaseInfo.creditCardNum}
            id="creditCardNum"
            onChange={getInfo}
            type="text"
            placeholder="card number"
            required
          ></Input>
        </Label>
        <Label>
          Expiry:
          <Expiry
            value={purchaseInfo.expiryM}
            id="expiryM"
            onChange={getInfo}
            type="text"
            placeholder="MM"
            name="month"
            maxLength="2"
            size="2"
            required
          />
          <span> /</span>
          <Expiry
            value={purchaseInfo.expiryY}
            id="expiryY"
            onChange={getInfo}
            type="text"
            name="year"
            placeholder="YY"
            maxLength="2"
            size="2"
            required
          />
        </Label>
        <Submit type="submit">Submit</Submit>
      </Form>
    </Wrapper>
  );
};

export default CheckOutForm;


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
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;


const Select = styled.select`

border:none;
padding:10px;
border-radius:5px;
`

const Expiry = styled.input`
border: 0;
margin-left: 10px;
font-size:15px;
padding:5px;
`


const Input =styled.input`
margin-left: 10px;
width: 190px;
border: 0;
height:20px;
padding:10px;
font-size:15px;
border-radius:5px;
`


const Label = styled.label`
font-family: var(--font-family);
padding:10px;
font-weight:bold;
`

const Title = styled.h1`
text-align:center;
padding:20px 0px;
font-family: var(--font-family);
font-size:40px;

`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  margin-right:600px;
`;

const Wrapper = styled.div`
  background-image: url(${checkOut});
  min-height: 100vh;
  background-size: cover;
`;

const Submit = styled.button`
  height: 50px;
  width: 200px;
  margin:10px;
  border-radius:10px;
  font-size:18px;
  font-weight:bold;
  border:none;
  color:white;
  background-color: var(--cool-gray);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: 400ms ease; 
  cursor:pointer;

  &:hover{
   
    background-color: var(--dusty-rose);
    box-shadow:none;
    color:#616060;
  }
`;
