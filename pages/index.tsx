import type { NextPage } from "next";
import styled from "@emotion/styled";
import { Layout } from "../components/Layout";
import ShareButton from "../components/ShareButton";

const Home: NextPage = () => {
  return (
    <Layout>
      <Title>소프트웨어공학</Title>
      <ShareButton />
    </Layout>
  );
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
