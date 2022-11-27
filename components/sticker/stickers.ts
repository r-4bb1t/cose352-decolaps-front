import { Sticker } from "../../types/Sticker";

const s = (x: number, y: number, id: string, format?: string): Sticker => ({
  id,
  alt: id,
  url: `sticker/${id}.${format || "svg"}`,
  originalHeight: y,
  originalWidth: x,
});

export const defaultStickers = {
  bash: s(137, 153, "bash"),
  hanbyeol: s(204, 204, "hanbyeol", "png"),
  mysql: s(214, 153, "mysql"),
  nodejs: s(164, 153, "nodejs"),
  powershell: s(168, 133, "powershell"),
};

export const stickers = {
  c: s(139, 153, "c"),
  cpp: s(139, 153, "cpp"),
  csharp: s(139, 153, "csharp"),
  css3: s(138, 153, "css3"),
  go: s(282, 121, "go"),
  html: s(138, 153, "html"),
  java: s(120, 154, "java"),
  javascript: s(153, 153, "javascript"),
  kotlin: s(153, 153, "kotlin"),
  php: s(192, 105, "php"),
  python: s(153, 153, "python"),
  ruby: s(153, 153, "ruby"),
  typescript: s(153, 191, "typescript"),
};

export const allStickers = { ...defaultStickers, ...stickers };
