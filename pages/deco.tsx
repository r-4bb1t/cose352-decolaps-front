import type { NextPage } from "next";
import { useRef, useState } from "react";
import Editor from "../components/editor/Editor";
import { MainButton } from "../components/MainButton";
import { Navigation } from "../components/Navigation";
import {
  allStickers,
  stickers as localStickers,
} from "../components/sticker/stickers";
import useStickers from "../hooks/useStickers";
import { Laptop, LaptopLayout } from "../types/Layout";
import { Sticker } from "../types/Sticker";
import { toPng } from "html-to-image";

const sampleLaptop: Laptop = {
  color: "white",
  manufacturer: "Texas",
};

interface StickerResponse {
  index: string;
  name: string;
  price: string;
  owner: string;
}

const Deco: NextPage = () => {
  const { loading, stickers } = useStickers();

  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;

    toPng(ref.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "export.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <>
      <Navigation />
      <div className="overflow-hidden w-full h-[100vh] relative text-center">
        <div className="flex justify-center pt-32">
          <Editor
            state={editorState}
            onStateChange={setEditorState}
            currentSticker={currentSticker}
            style={{ width: 512, height: 320 }}
            divRef={ref}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <MainButton
            onClick={() =>
              setEditorState({
                laptop: sampleLaptop,
                stickers: [],
              })
            }
          >
            <p className="text-xl font-black text-black uppercase">restart!</p>
          </MainButton>
          <button
            className="flex gap-2 items-center font-black text-black uppercase"
            onClick={() => handleDownload()}
          >
            download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 459.999 459.999"
              className="w-8 h-8 fill-black"
            >
              <g>
                <g>
                  <g>
                    <path d="M212.991,249.518c9.767,9.66,25.508,9.624,35.25-0.1l74.888-74.887c9.763-9.763,9.763-25.592,0-35.355     c-9.762-9.763-25.591-9.763-35.355,0l-32.21,32.209V47.596c0-13.808-11.193-25-25-25s-25,11.192-25,25v123.79l-32.21-32.209     c-9.764-9.764-25.593-9.764-35.355,0c-9.763,9.764-9.763,25.593,0,35.355C139.121,175.656,211.868,248.403,212.991,249.518z" />
                    <path d="M431.654,312.404H28.346C12.691,312.404,0,325.094,0,340.75v68.307c0,15.655,12.691,28.346,28.346,28.346h403.307     c15.655,0,28.346-12.691,28.346-28.346V340.75C460,325.094,447.309,312.404,431.654,312.404z" />
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="bg-[url('/assets/bg-image.png')] bg-cover w-[840px] h-[20vh] align-center absolute bottom-0 overflow-hidden">
            <div className="flex h-full gap-4 pl-4 overflow-x-scroll row">
              {loading
                ? [...Array(16)].map((_, i) => (
                    <div
                      className="relative h-[15vh] w-[15vh] bg-contain flex items-center justify-center shrink-0 group rounded pt-8"
                      key={i}
                    >
                      <div className="h-2/3 w-2/3 bg-zinc-600 animate-pulse"></div>
                    </div>
                  ))
                : stickers.map((s) => (
                    <div
                      className="h-[15vh] w-[15vh] bg-contain bg-no-repeat bg-center shrink-0 mt-4"
                      onClick={() =>
                        setCurrentSticker(
                          allStickers[s.name as keyof typeof allStickers]
                        )
                      }
                      key={s.index}
                      style={{
                        backgroundImage: `url('/assets/${
                          allStickers[s.name as keyof typeof allStickers].url
                        }')`,
                      }}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deco;
