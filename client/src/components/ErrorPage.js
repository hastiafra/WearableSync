import React from "react";

//styling
import styled from "styled-components";
import { NavLink } from "react-router-dom";

//header and footer component imports
import Header from "./Header";
import Footer from "./Footer";

import errorIcon from "../assets/error-icon.png"

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <H1>Uh Oh !</H1>
        <Image src={errorIcon} alt={"Error"}/>
        <H2>Page not found</H2>
        <Paragraph>
          Please refresh the page or click <LinkHome to={"/"}>here</LinkHome> to
          return home.
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
  padding-top: 10px;
`;

const LinkHome = styled(NavLink)`
  font-weight: 700;
`;

export default ErrorPage;
