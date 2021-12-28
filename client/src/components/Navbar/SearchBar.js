import React from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
const SearchBar = ({ handleSearchClick }) => {
  return (
    <Button onClick={handleSearchClick}>
      <BsSearch color={"gray"}/>
    </Button>
  );
};
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
`;
export default SearchBar;
