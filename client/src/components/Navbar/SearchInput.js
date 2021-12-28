import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import { ItemContext } from "../ItemContext";

//icons
import { RiCloseFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const { receiveSearchItemInfoFromServer } = useContext(ItemContext);
  const [searchTerm, setSearchTerm] = useState("");
  let history = useHistory();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClear = () => {
    setSearchTerm("");
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      fetch(`/api/searchterm?searchTerm=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.status !== 200) {
            history.push("/searcherror");
          } else {
            receiveSearchItemInfoFromServer(data.data);
            history.push("/search/search");
          }
        });
    }
  };

  const handleSubmit = () => {
    fetch(`/api/searchterm?searchTerm=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        
        receiveSearchItemInfoFromServer(data.data);
        history.push("/search/search");
      });
  };

  return (
    <Container>
      <ButtonSearch onClick={handleSubmit}>
        <BsSearch size={20} />
      </ButtonSearch>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={(ev) => handleKeyDown(ev)}
        placeholder="Search for products"
        aria-label="Search Wearable Sync Store"
      ></Input>
      <ButtonClear onClick={handleClear}>
        <RiCloseFill size={32} color={"gray"} />
      </ButtonClear>
    </Container>
  );
};

const Input = styled.input`
  height: 40px;
  width: 300px;
  font-size: 20px;
  font-family: var(--font-family);
  background-color: var(--sage);
  border: solid 1px white;
  outline: none;
  border-left: none;
  border-right: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  padding-right: 100px;
`;

const ButtonSearch = styled.button`
  background: none;
  border: 1px solid white;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: gray;
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-family);
  border-right: none;
  background-color: var(--sage);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px 0px 0px 10px;
`;

const ButtonClear = styled.button`
  background: none;
  border: 1px solid white;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  font-family: var(--font-family);
  border-right: none;
  background-color: var(--sage);
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SearchInput;
