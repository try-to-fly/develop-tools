import { IFavoriteGroup } from "./type";

export const FAVORITE_DATA: IFavoriteGroup[] = [
  {
    name: "在线编辑器",
    list: [
      { name: "stackblitz", url: "https://stackblitz.com/" },
      { name: "codepen", url: "https://codepen.io/" },
      { name: "jsfiddle", url: "https://jsfiddle.net/" },
    ],
  },
  {
    name: "在线调试",
    list: [
      { name: "正则调试", url: "https://regex101.com/" },
      { name: "sass转css", url: "https://www.sassmeister.com/" },
      { name: "ts转js", url: "https://www.typescriptlang.org/play" },
      { name: "babel 在线编译", url: "https://babeljs.io/repl" },
    ],
  },
];
