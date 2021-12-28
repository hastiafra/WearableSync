import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';


//styling
import styled from 'styled-components';

import { ItemContext } from '../ItemContext';
import { useHistory } from 'react-router';

const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([])
    const { state, setLoadingState, unsetLoadingState, receiveCategoryItemInfoFromServer } = useContext(ItemContext);
    
    let history = useHistory()

    //this will deploy the dropdown menu
    const toggling = () => setIsOpen(!isOpen);
    if (categories.length === 0) {
        fetch('/api/categories')
        .then(res => res.json())
        .then(data => {
            if (data.status !== 200) {
                console.log(data)
                
            } else {
                setCategories(data.data);
            }});
    }
    

    const handleClick = (category) => {
        setLoadingState();
        fetch(`/api/products-by-category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status !== 200) {
                    console.log(data);
                } else {
                    console.log(data);
                    receiveCategoryItemInfoFromServer(data.data);
                    unsetLoadingState()
                    history.push('/category/category');
        }
      });
    }
    
    return (
        <Wrapper>
            <NavMenuLink to='/'>Home</NavMenuLink>
            <div>
            <DropDownContainer>
            <DropDownHeader onClick={toggling}>
            Categories
            </DropDownHeader>
            {(isOpen && state.hasLoaded) && (
                <DropDownListContainer>
                    <DropDownList>
                    {categories?.map((category, index) => (
                        <ListItem onClick={()=>handleClick(category)} key={index}>
                        {category}
                        </ListItem>
                    ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
            </DropDownContainer>
            </div>
        </Wrapper>
    )
}

const NavMenuLink = styled(NavLink)`
    color:#616060;
    font-family: var(--font-family);
    margin-left: 15px;
    text-decoration: none;
    font-size: 25px;
    font-weight:bold;
&:hover{
    color: var(--dusty-rose)
}
`
const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`
const DropDownContainer = styled("div")`
    z-index:100;
    margin-left: 25px;
    text-align: center;
`
const DropDownHeader = styled("div")`
font-size: 25px;
color:#616060;
text-align: center;
z-index:100;
cursor: pointer;
font-weight:bold;

&:hover{
    color: var(--dusty-rose);
}
`;

const DropDownListContainer = styled("div")`
position:absolute;
z-index:100;
top: 90px;

`;

const DropDownList = styled("ul")`
padding: 0;
margin: 0;
background: rgba(220, 220, 208, 0.7);
box-sizing: border-box;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
display: flex;
flex-direction: row;
border-radius:5px;
`;

const ListItem = styled("li")`
list-style: none;
margin: 0 15px;
padding: 5px;
color:#616060;
text-align: center;
font-size: 22px;
&:hover {
background: #D3BAB1;
cursor: pointer;
}
`;


export default NavMenu;