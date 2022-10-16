import { useState } from "react";
import styled from "@emotion/styled";

export default function ShareButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "DECOLAPS",
        text: "description",
        url: window.location.href,
      });
    }
  };
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <rect width="48" height="48" rx="24" fill="#6b6b6b" />
          <path d="M19 24H16V32H32V24H29" stroke="#ffffff" strokeWidth="2" />
          <path
            d="M24 28L24 16M24 16L29 20M24 16L19 20"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>
      </button>
      {isModalOpen && (
        <ModalBackground
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <Modal
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="bebas font-medium tracking-normal bg-gradient-1 bg-clip-text lg:text-[50px] text-[30px] text-center text-transparent">
              SHARE THIS PAGE
            </div>
            <a
              href={window.location.href}
              id="test"
              rel="nofollow, noreferrer"
              target="_blank"
              onClick={(e) => e.preventDefault()}
              className="px-2 py-1 border-[1px] border-c-300 bg-white"
            >
              <span>{window.location.href}</span>
            </a>
            <div className="flex gap-5 w-full">
              <button
                className="bg-gradient-2 rounded-full w-full max-w-[200px] h-12 text-white font-bold"
                onClick={handleCopy}
              >
                COPY LINK
              </button>
              <button
                className="bg-gradient-2 rounded-full w-full max-w-[200px] h-12 text-white font-bold"
                onClick={handleShare}
              >
                SHARE
              </button>
            </div>
            {isCopied && (
              <div className="text-black-500 -mt-3">Link Copied!</div>
            )}
          </Modal>
        </ModalBackground>
      )}
    </>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: white;
  border-radius: 16px;
`;
