import type { NextPage } from "next";
import styled from "@emotion/styled";
import { Layout } from "../components/Layout";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "../contexts/useWallet";
import useStickers from "../hooks/useStickers";
import { shopStickers } from "../components/sticker/stickers";
import cc from "classcat";
import Link from "next/link";
import {chainInfo} from "../config/chain"


const Home: NextPage = () => {
  const { data: session } = useSession();
  const { keplr, connectWallet } = useWallet();
  const { stickers } = useStickers();
  const [address, setAddress] = useState("");

  const getAddress = useCallback(async () => {
    const key = await keplr?.getKey(chainInfo.chainId); //chainId
    if (key?.address) {
      let s = "Wallet Connected";
      setAddress(s);
    }
  }, [keplr]);
  useEffect(() => {
    getAddress();
  }, [keplr]);

  return (
    <Layout>
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover flex">
        <aside className="w-[20vw] pt-40 h-screen bg-white">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
              <img src={session?.user?.image || ""} />
            </div>
            <div className="p-4 font-bold text-lg flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
              </svg>
              {session?.user?.name}
            </div>
            {keplr ? (
              <>
                <div>{address}</div>
              </>
            ) : (
              <button className="bg-black text-white px-4 w-48 rounded font-bold py-2">
                Connect Wallet
              </button>
            )}
            <Link href="/my">
              <button className="border-black border-[1px] border-solid w-48 px-4 rounded font-bold py-2 mt-2">
                My page
              </button>
            </Link>
          </div>
        </aside>
        <section className="z-0 flex flex-col gap-8 items-center justify-center w-full h-screen overflow-y-auto pb-10">
          <div className="w-full px-12 flex flex-col items-center">
            <div className="grid grid-cols-4 place-items-center h-[70vh] gap-4">
              {Object.keys(shopStickers)
                .map((s) => shopStickers[s as keyof typeof shopStickers])
                .map((s) => (
                  <div key={s.id} className="flex flex-col items-center">
                    <div
                      className="relative h-[15vh] w-[15vh] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{
                        backgroundImage: `url('/assets/${
                          shopStickers[s.id as keyof typeof shopStickers].url
                        }')`,
                      }}
                    ></div>
                    <div className="w-full text-center text-sm px-2 py-1 text-black rounded">
                      <div className="font-bold mb-1">[{s.id}]</div>
                      {s.description.split("\n").map((s, i) => (
                        <span key={i}>
                          {s}
                          <br />
                        </span>
                      ))}
                      <div className="font-bold mt-2 flex items-center justify-center gap-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black text-white text-xs">
                          $
                        </div>
                        {s.price} DECO
                      </div>
                    </div>
                    <button
                      className={cc([
                        "bg-black text-white px-2 py-1 rounded mt-3",
                        !keplr && "bg-zinc-500",
                      ])}
                      disabled={!keplr}
                    >
                      Purchase
                    </button>
                  </div>
                ))}
            </div>
          </div>
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
