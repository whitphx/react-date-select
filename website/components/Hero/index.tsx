import styled from "@emotion/styled";
import Snippet from "./Snippet";
import EyeCatchDateSelect from "../EyeCatchDateSelect";

const HeroContainer = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #a733d8; /* fallback color */
  background: linear-gradient(150deg, #f9b600 0%, #a432d5 100%);
  height: 360px;
  width: 100%;

  @media (max-width: 640px) {
    height: 200px;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #efefef;
  text-transform: uppercase;
  display: block;
  font-size: 3em;

  @media (max-width: 640px) {
    font-size: 1.5em;
  }
`;

const Subtitle = styled.h2`
  color: #efefef;
  display: block;
  font-size: 1em;
`;

const BodyContainer = styled.div`
  z-index: 10;
  text-align: center;
  color: #eee;
`;

const SnippetBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 16px auto 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SnippetContainer = styled.p`
  margin-bottom: 4px;
`;

const EyeCatchDateSelectContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 16px auto 0;
`;

function Hero() {
  return (
    <HeroContainer>
      <TitleContainer>
        <Title>react-ymd-date-select</Title>
        <Subtitle>Hooks and components for Y-M-D dropdowns with React</Subtitle>
      </TitleContainer>

      <BodyContainer>
        <SnippetBlockContainer>
          <SnippetContainer>
            <Snippet>npm install react-ymd-date-select</Snippet>
          </SnippetContainer>
          <SnippetContainer>
            <Snippet>yarn add react-ymd-date-select</Snippet>
          </SnippetContainer>
        </SnippetBlockContainer>

        <EyeCatchDateSelectContainer>
          <EyeCatchDateSelect />
        </EyeCatchDateSelectContainer>
      </BodyContainer>
    </HeroContainer>
  );
}

export default Hero;
