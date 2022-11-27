import type { NextPage } from "next";
import { useEffect, useState } from "react";
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
  const { stickers } = useStickers();

  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null);

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
          />
        </div>
        <div className="pt-8" />
        <MainButton
          onClick={() =>
            setEditorState({
              laptop: sampleLaptop,
              stickers: [],
            })
          }
        >
          <p className="text-3xl font-black text-black uppercase">restart!</p>
        </MainButton>
        <div className="flex justify-center">
          <div className="bg-[url('/assets/bg-image.png')] bg-cover w-[840px] h-[20vh] align-center absolute bottom-0 overflow-hidden">
            <div className="flex h-full gap-4 pl-4 overflow-x-scroll row">
              {stickers.map((s) => (
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
