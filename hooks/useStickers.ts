import { useCallback, useEffect, useState } from "react";
import {
  defaultStickers,
  stickers as localStickers,
} from "../components/sticker/stickers";
import { useSession } from "next-auth/react";
import { createTotals } from "../utils/createTotals";
import { ILanguage, IRepositoryResponse } from "../utils/types";
import { format } from "date-fns";

const useStickers = () => {
  const { data: session } = useSession();
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [loading, setLoading] = useState(false);
  const ds = Object.keys(defaultStickers).map((s, i) => {
    return {
      name: s,
      index: i,
      description: `✔ 기본 제공 스티커\n획득일: ${format(
        new Date(),
        "yyyy-MM-dd"
      )}`,
    };
  });
  const [stickers, setStickers] = useState(ds);
  const fetchLanguages = useCallback(async () => {
    if (!session?.user?.id) {
      return;
    }
    setLoading(true);
    const result = (await (
      await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          query: `query {
              user(login: "${session.user.id}") {
                repositories(first: 100) {
                  nodes {
                    name
                    languages(first: 100) {
                      edges {
                        size
                      }
                      nodes {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }`,
        }),
      })
    ).json()) as IRepositoryResponse;
    setLoading(false);

    const t = createTotals(result.data.user.repositories.nodes);
    setLanguages(t.percentages);
  }, [session?.user?.id]);

  useEffect(() => {
    setStickers((stickers) => [
      ...ds,
      ...languages
        .filter(
          (lan) =>
            Object.keys(localStickers).includes(lan.sticker) &&
            !ds.map((ds) => ds.name).includes(lan.sticker)
        )
        .map((s, ii) => {
          return {
            name: s.sticker,
            index: stickers.length + ii,
            description: `✔ 깃허브 기록으로 획득!\n획득일: ${format(
              new Date(),
              "yyyy-MM-dd"
            )}`,
          };
        }),
    ]);
  }, [languages]);

  useEffect(() => {
    if (session?.user) fetchLanguages();
  }, [fetchLanguages, session?.user]);

  return { loading, stickers };
};

export default useStickers;
