import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navigation: React.FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <nav className="flex fixed w-full items-center justify-between p-4 bg-black z-50 h-[64px]">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/assets/logo@3x.png" alt="" width={120} height={30} />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/shop">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="w-4 h-4 fill-black cursor-pointer"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
              >
                <g>
                  <g>
                    <path d="m475.5,475.9l-29.5-329.4c-0.9-10.5-9.8-18.6-20.5-18.6h-77.5c-18.1-59.3-49.1-116.9-92-116.9-43,0-73.9,57.6-92.2,116.9h-77.5c-10.6,0-19.5,8.1-20.5,18.6l-29.6,332.3c-1.1,14.8 9.2,22.2 20.5,22.2h398.7c0.1,0 0.1,0 0.2,0 13,0 21.5-11.2 19.9-25.1zm-219.5-424.1c14.3-1.42109e-14 33.8,34 48.7,76.1h-97.4c14.8-42.1 34.4-76.1 48.7-76.1zm-177,408.4l26.1-291.4h48.1c-5.8,26.9-8.7,51.2-8.7,67.2 0,11.3 9.2,20.4 20.5,20.4s20.5-9.1 20.5-20.4c0-19.8 3.7-43.5 9.5-67.2h121.9c5.8,23.7 9.5,47.4 9.5,67.2 0,11.3 9.2,20.4 20.5,20.4 11.3,0 20.5-9.1 20.5-20.4 0-16-2.9-40.3-8.7-67.2h48.1l26.1,291.4h-353.9z" />
                  </g>
                </g>
              </svg>
            </button>
          </Link>
          {session ? (
            <div className="group">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={session.user?.image || ""} />
              </div>
              <div className="absolute top-0 right-6">
                <ul className="hidden mt-14 group-focus:flex group-hover:flex flex-col bg-white rounded">
                  <li className="p-4 font-bold flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      viewBox="0 0 30 30"
                      width="30px"
                      height="30px"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                    </svg>
                    {session.user?.name}
                  </li>
                  <Link href="/my">
                    <li className="hover:bg-zinc-200 p-4 transition-all cursor-pointer">
                      My page
                    </li>
                  </Link>
                  <li
                    className="hover:bg-zinc-200 p-4 transition-all cursor-pointer"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                signIn("github");
              }}
              className="flex items-center px-4 py-2 rounded text-white gap-4 bg-zinc-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
              </svg>
              Sign in with Github
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
