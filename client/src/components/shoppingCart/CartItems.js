import React, { useContext } from "react";
import { ItemContext } from "../ItemContext";

//styling
import styled from "styled-components";



const CartItems = ({item, cart}) => {
    const {state, addQuantity, removePurchase, lowerQuantity} = useContext(ItemContext)

    let cartInfo = [];
    if(state.hasLoaded) {
        cart.forEach((elem) => {
            if (elem.product_id === item._id) {
                cartInfo.push(elem);
            }
        })
    }

    let disabledLower = cartInfo[0]?.quantity === 1 ? true : false;
    let disabledAdd = cartInfo[0]?.quantity < item.numInStock ? false : true;


    return (
        <Wrapper>
                <ImgWrapper>
                    <StyledImg src={item.imageSrc} alt={item.name}/>
                </ImgWrapper>
                <NameWrapper>
                    <Name>{item.name}</Name>
                </NameWrapper>
                    <Qtypara>QTY</Qtypara>
                    <OrderQTY>{cartInfo[0]?.quantity}</OrderQTY>
                    <StyledBtn onClick={() => addQuantity(cartInfo)} disabled={disabledAdd} > + </StyledBtn>
                    <StyledBtn onClick={() => lowerQuantity(cartInfo)} disabled={disabledLower}> - </StyledBtn>
                    <PricePara>{item.price}</PricePara>
                    <RemoveBtn onClick={() => removePurchase(cartInfo)}>Remove</RemoveBtn>
        </Wrapper>
    )
}

const Wrapper = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: flex-column;
align-items: center;
justify-content: space-around;
margin: 10px;
padding: 8px;
width: 100%;

&:hover {
border-radius: 20px;
box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}


`;

const ImgWrapper = styled.div`
margin-left: 10px;
margin-right: 10px;
padding: 2px;
margin-bottom: 20px;

`;


const StyledImg = styled.img`
width: 35px;
height: 35px;
mix-blend-mode: multiply;
`;

const NameWrapper = styled.div`
align-items: flex-start;
width: 20%;
`;


const Name = styled.p`
font-size: 10px;
font-weight: bolder;
`;

const Qtypara = styled.span`
font-size: 10px;
color: var(--cool-gray);
font-weight: bolder;

`;

const StyledBtn = styled.button`
display: inline;
width: 20px;
height: 20px;
color: var(--cool-gray);
font-weight: bolder;
background: transparent;
border: none;
border-radius: 50%;
margin: 5px;

box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;

&:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    color: black;
}

`;


const OrderQTY = styled.span`
font-size: 12px;
font-weight: bolder;
padding: 5px;

`;

const PricePara = styled.p`
font-size: 12px;
font-weight: bolder;

`;

const RemoveBtn = styled.button`
display: inline-block;
background-color: transparent;
border: none;
text-decoration: underline;
margin-right: 10px;
margin-left: 10px;
&:hover {
    color: #ffffff;
}

`;


export default CartItems