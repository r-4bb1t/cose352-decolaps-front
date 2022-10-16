import type { NextPage } from "next";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  return <Title>소프트웨어공학</Title>;
};

const Title = styled.div`
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
`;
export default Home;
