import { ILanguage, IRepository } from "./types";

const getStickerName = (name: string) => {
  switch (name) {
    case "C++":
      return "cpp";
    case "C#":
      return "csharp";
    case "CSS":
      return "css3";
    default:
      return name.toLowerCase();
  }
};

export function createTotals(repos: IRepository[]) {
  const languages = repos.map((repo) => {
    let obj: { [key: string]: ILanguage } = {};
    repo.languages.nodes.forEach((node, index) => {
      const commits = repo.languages.edges[index].size;
      obj[node.name] = {
        ...node,
        codes: commits,
        sticker: getStickerName(node.name),
      };
    });
    return obj;
  });

  const colors = languages.reduce((total: { [key: string]: string }, item) => {
    const names = Object.keys(item);
    const obj = total;

    names.forEach((name) => {
      if (!total || !Object.keys(total).includes(name)) {
        obj[name] = item[name].color;
      }
    });

    return obj;
  }, {});

  const totals = languages.reduce((total: { [key: string]: number }, item) => {
    const names = Object.keys(item);
    const obj = total;

    names.forEach((name) => {
      if (!total || !Object.keys(total).includes(name)) {
        obj[name] = item[name].codes;
      } else {
        obj[name] = obj[name] + item[name].codes;
      }
    });

    return obj;
  }, {});

  const totalNum = Object.values(totals).reduce((a, b) => a + b, 0);

  const percentages = Object.keys(totals).map((name) => {
    const percentage = (100 / totalNum) * totals[name];
    const roundedNumber = Math.round((percentage + Number.EPSILON) * 100) / 100;

    return {
      name,
      sticker: getStickerName(name),
      codes: totals[name] /* roundedNumber */,
      color: colors[name],
    };
  });

  return {
    totalNum,
    percentages: percentages.sort((a, b) => b.codes - a.codes),
  };
}
