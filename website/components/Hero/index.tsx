import styled from "@emotion/styled";
import { Link } from "@chakra-ui/react";
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
    height: 240px;
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

const HeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
`;

const Header = styled.div`
  margin: 0 auto;
  max-width: 960px;
  text-align: right;
`;

const GitHubLink = styled(Link)`
  display: inline-flex;
  margin-top: 8px;
  color: #eee;
  align-items: center;
`;

// The logo SVG is from https://github.com/simple-icons/simple-icons
const GitHubLogo = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  mask: url(https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/github.svg)
    no-repeat center;
  background: #eee;
  margin-right: 8px;
`;

const GitHubLinkText = styled.span`
  padding-top: 2px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const EyeCatchDateSelectContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 16px auto 0;
`;

function Hero() {
  return (
    <HeroContainer>
      <HeaderContainer>
        <Header>
          <GitHubLink
            href="https://github.com/whitphx/react-ymd-date-select"
            isExternal
          >
            <GitHubLogo />
            <GitHubLinkText>See on GitHub</GitHubLinkText>
          </GitHubLink>
        </Header>
      </HeaderContainer>

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
