import React from "react";

//Styling and icons
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SiTiktok } from "react-icons/si";
import { BsFacebook, BsTwitter, BsReddit } from "react-icons/bs";

//Scroll to top and logout button functions
import ScrollToTop from "./ScrollToTop";
import LogoutButton from "./Login/LogoutButton";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <div>
          Wearable Sync 2021<span>&#8482;</span>
        </div>
        <AboutUs to={"/about"}>About Us</AboutUs>
        <SocialContainer>
          <BsFacebook size={32} />
          <BsTwitter size={32} />
          <BsReddit size={32} />
          <SiTiktok size={32} />
        </SocialContainer>
        <LogoutButton />
        <Scroll>
          <ScrollToTop />
        </Scroll>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 10px 0px;
  font-family: var(--font-family);
  font-weight: 700;
  color: white;
  background-color: var(--cool-gray);
  height: 100px;
  font-size: 30px;
`;

const AboutUs = styled(NavLink)`
  text-decoration: none;
  color: white;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

const SocialContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-evenly;
  cursor: pointer;
`;

const Scroll = styled.button`
  text-decoration: none;
  background-color: var(--cool-gray);
  border: none;
  color: white;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;
export default Footer;
