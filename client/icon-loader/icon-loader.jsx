import { SvgXml } from "react-native-svg";
import mingcuteIcons from "@iconify-json/mingcute/icons.json";

export const CustomIcon = ({
  name,
  size = 24,
  color = "black",
  filled = false,
}) => {
  const key = `${name}-${filled ? "fill" : "line"}`;
  const icon = mingcuteIcons.icons[key];
  if (!icon) return null;

  let body = icon.body;

  if (/fill="(?!none)[^"]*"/.test(body)) {
    body = body.replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
  }

  if (/stroke="(?!none)[^"]*"/.test(body)) {
    body = body.replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`);
  }

  const xml = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 ${icon.width ?? 24} ${icon.height ?? 24}">
      ${body}
    </svg>
  `;

  return <SvgXml xml={xml} width={size} height={size} />;
};
