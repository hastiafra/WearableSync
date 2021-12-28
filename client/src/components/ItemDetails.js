import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { ItemContext } from './ItemContext'
import LoadingSpinner from './LoadingSpinner'
import { useHistory } from 'react-router'


const ItemDetails = () => {
    let history = useHistory();
    const {_id}  = useParams();

    const [selectedItem, setSelectedItem] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    
    const { state, setLoadingState, unsetLoadingState, addPurchase } = useContext(ItemContext)
    
    // Fetch product by Id & match with the company

    useEffect(() => {
        setLoadingState()
        fetch(`/api/product/${_id}`)
        .then((res) => res.json())
        .then((data) => {            
            if (data.status !== 200) {
                console.log(data)
                history.push('/error')
            } else {
                setSelectedItem(data.data)
                
                fetch(`/api/company/${data.data.companyId}`)
                    .then((res) => res.json())
                    .then((res) => {  
                        if (res.status !== 200) {
                            console.log(res)
                        } else {
                            setSelectedCompany(res.data)
                            unsetLoadingState()
                        }
                    })
            }
        })
    }, []) //eslint-disable-line

    

    if (!state.hasLoaded) {
        return (
        <Wrapper>
            <LoadingSpinner />
        </Wrapper>
        ); 
        
    } else {

        return (
            <ItemWrapper>
                <ImgContainer>
                    <StyledImg src={selectedItem?.imageSrc} alt="product-image" />
                </ImgContainer>
                <SpecsWrapper>
                    <Title>{selectedItem.name}</Title>
                    <span>Best worn on: </span>
                    <span>{selectedItem.body_location}</span>
                    <p><span>Category: </span>{selectedItem.category}</p>
                    </SpecsWrapper>
                    <PriceBtnWrapper>
                        {selectedItem.numInStock > 0 ? (
                            selectedItem.numInStock && (
                                <>
                                    <PriceSpan>{selectedItem.price}</PriceSpan>
                                    <StyledBtn onClick={() => addPurchase([{product_id: selectedItem._id, quantity: 1 }])}><span>Add to Cart</span></StyledBtn>
                                </>
                                ) 
                                ) : (
                                <OutOfStock>Currently Out Of Stock</OutOfStock>
                            )
                        }
                </PriceBtnWrapper>
                <div>
                    {selectedCompany && (
                        <>
                            <a href={selectedCompany.url}>{selectedCompany.name}</a>
                            <p>{selectedCompany.country}</p>
                        </>
                    )}
                </div>
            </ItemWrapper>
        )
    }
}


const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;

`;

const ItemWrapper = styled.div`
background-color: #fff;
border-radius: 15px;
min-width: 800px;
width: 100%;
margin: auto;
box-sizing: border-box;
padding: 6rem 8rem;
display: flex;
align-items: center;
margin-top: 100px;
margin-bottom: 50px;
font-family: var(--font-family);
`;

const ImgContainer = styled.div`
box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
margin-right: 30px;
box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

`;

const StyledImg = styled.img`
flex: 1;
margin-right: 4rem;
padding: 50px;
`;

const SpecsWrapper = styled.div`
line-height: 1.5;
position: absolute;
top: 220px;
left: 500px;
`;

const PriceBtnWrapper = styled.div`
display: flex;
position: absolute;
top: 400px;
left: 500px;
width: 300px;
height: 50px;
text-align: center;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const PriceSpan = styled.span`
background-color: var(--dusty-rose);
width: 30%;
font-weight: bolder;
color: #FFFFFF;
padding: 10px;
`;



const StyledBtn = styled.button`
width: 70%;
padding: 10px 20px;
background-color: var(--cool-gray);
border: none;
font-weight: bolder;
color: #FFFFFF;
cursor: pointer;

& span {
    opacity: 0.8;
}

&:hover {
    opacity: 0.9;
    transition: 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) ease-in-out;
}

`;

const OutOfStock = styled.span`
width: 100%;
padding: 10px 20px;
background-color: var(--cool-gray);
opacity: 60%;
color: #FFFFFF;
font-weight: bolder;

`;

const Title = styled.p`
font-weight: bolder;
`;




export default ItemDetails;




