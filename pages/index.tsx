import type { NextPage } from "next";
import styled from "@emotion/styled";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Laptop = styled.div`
  width: 720px;
  height: 450px;
  background: url("/assets/laptop-filled.png");
  background-size: cover;
  background-position: center;
  border: 1px solid #a5a6ac;
  border-radius: 30px;
`;

const DecoButton = styled.a`
  width: 320px;
  height: 64px;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;

  &:hover {
    background: white;
  }
`;

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">
        <section className="z-0 flex flex-col gap-16 items-center justify-center w-full h-screen pt-32">
          <Laptop className="z-50 w-[320px] h-[200px] lg:w-[32vw] lg:h-[20vw] shrink-0" />
          {session && (
            <Link href="/deco">
              <DecoButton>DECORATE!</DecoButton>
            </Link>
          )}
        </section>
      </main>
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
