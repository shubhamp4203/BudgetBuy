import React, { useState } from "react";
import styled from "styled-components";
import applogo from "../../data/applogo.png";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #131313; /* Change as needed */
  visibility: ${props => props.$show ? "visible" : "hidden"};
`;

const Logo = styled.img`
  width: 240px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 20px;
`;

const Splash = () => {
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
        setLoading(false);
        navigate("/home")
    }, 2000);
  }, []);
  return (
    <SplashContainer $show={loading.toString()}>
      <Logo src={applogo} alt="BudgetBuy Logo" />
    </SplashContainer>
  );
};

export default Splash;
