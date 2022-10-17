import Image from "next/image";

export const Navigation: React.FC = () => {
  return (
    <>
      <nav className="flex fixed w-full items-center justify-between p-4 bg-black z-50 h-[64px]">
        <div className="flex items-center">
          <Image src="/assets/logo@3x.png" alt="" width={120} height={30} />
        </div>
        <div className="flex gap-4"></div>
      </nav>
    </>
  );
};
