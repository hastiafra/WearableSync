import React from "react";

//styling
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import ErrorIcon from "../../assets/error-icon.png";

//header and footer component imports
import Header from "../Header";
import Footer from "../Footer";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <H1>Uh Oh !</H1>
        <Image src={ErrorIcon} />
        <H2>No results found</H2>
        <Paragraph>
          No matching results found for your search term. Here are some
          suggestions for search terms:
          <UnorderedList>
            <List>* wearables, watch, tracker etc...</List>
            <List>* heart, heart rate, monitor...</List>
            <List>* fitness, activity, tracking...</List>
            <List>* body location like wrist, waist...</List>
            <List>* company name like Garmin, Casio...</List>
          </UnorderedList>{" "}
          Please search again using the suggestions above or click{" "}
          <LinkHome to={"/"}>here</LinkHome> to return home.
        </Paragraph>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 90px;
  height: 800px;
  background-color: var(--dusty-rose);
  font-family: var(--font-family);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  background-color: var(--dusty-rose);
`;

const H1 = styled.h1`
  padding-bottom: 15px;
  width: 200px;
  font-size: 50px;
  text-decoration: underline;
`;

const H2 = styled.div`
  font-weight: 600;
  font-size: 30px;
  width: 250px;
`;

const Paragraph = styled.p`
  padding-top: 15px;
  font-size: 25px;
`;

const LinkHome = styled(NavLink)`
  font-weight: 700;
`;
const UnorderedList = styled.ul`
  font-size: 20px;
`;

const List = styled.li`
  font-size: 25px;
  padding: 5px;
`;
export default ErrorPage;
