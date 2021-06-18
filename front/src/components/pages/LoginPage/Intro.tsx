import React from "react";
import styled from "styled-components";
const IntroContainer = styled.div`
  flex: 1 1 200px;
  padding-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
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
  flex: 1 0 200px;
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
