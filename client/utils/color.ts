const hexToRgbTuple = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return [0, 0, 0];
  }
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const [r, g, b] = hexToRgbTuple(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const lightenColor = (hex: string, amount: number): string => {
  const [r, g, b] = hexToRgbTuple(hex);
  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

export const darkenColor = (hex: string, amount: number): string => {
  const [r, g, b] = hexToRgbTuple(hex);
  const mix = (channel: number) => Math.round(channel * (1 - amount));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

export const darkenColorRgba = (
  hex: string,
  amount: number,
  alpha: number,
): string => {
  const [r, g, b] = hexToRgbTuple(hex);
  const mix = (channel: number) => Math.round(channel * (1 - amount));
  return `rgba(${mix(r)}, ${mix(g)}, ${mix(b)}, ${alpha})`;
};
