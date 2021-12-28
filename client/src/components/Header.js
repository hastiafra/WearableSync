import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "./Navbar/SearchBar";
import SearchInput from "./Navbar/SearchInput";

import wearableLogo from "../assets/wearable-logo.png";


//children
import Cart from "./Navbar/Cart";
import LoginButton from "./Login/LoginButton";
import NavMenu from "./NavMenu/NavMenu";


const Header = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };
  return (
    <HeaderWrapper>
      <NavMenu />
      <Logo alt="Wearable Sync logo" src={wearableLogo} />
      <RightNavGroup>
        {/* to conditionally render the searchbar */}
        {isSearchClicked && <SearchInput />}
        {!isSearchClicked && (
          <SearchBar handleSearchClick={handleSearchClick} />
        )}
        <LoginButton />

        <Cart/>
      </RightNavGroup>
    </HeaderWrapper>
  );
};

//HeaderWrapper has been set to sticky so that it flows above the page and is always visible
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  width: 100%;
  background: rgba(220, 220, 208, 0.7);
  color: #fff;
  font-family: var(--font-family);
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 5px 50px;
  margin-bottom: -90px;
`;
const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;
const RightNavGroup = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 200px; */
`;
export default Header;
