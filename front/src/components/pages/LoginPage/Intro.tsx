import React from "react";
import styled from "styled-components";
const IntroContainer = styled.div`
  flex: 1 1 350px;
  padding-right: 50px;
  position: relative;
  margin-bottom:40px;
  display:flex;
  justify-content:center;
  align-items:center
`;
const Title = styled.div`
  color: blue;
  font-size: 3em;
  font-weight: bold;
`;
const IntroMessage = styled.div`
  font-size: 20px;
`;
const IntroWrapper = styled.div`

`;
const Intro = () => {
  return (
    <IntroContainer>
      <IntroWrapper>
        <Title>edubsu</Title>
        <IntroMessage>
          Edubsu помогает вам всегда оставаться на связи и общаться со своими
          знакомыми
        </IntroMessage>
      </IntroWrapper>
    </IntroContainer>
  );
};

export default Intro;
