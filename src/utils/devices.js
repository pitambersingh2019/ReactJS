const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  LaptopM: "1280",
  LaptopML: "1366",
  laptopL: "1440px",
  desktopS: "1680px",
  desktopL: "1920px",
  desktopH: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: 320px) and (max-width: 1024px)`,
  laptopL: `(min-width: 1024px) and (max-width: 1280px)`,
  desktop: `(min-width: 1280px) and (max-width: 1366px)`,
  LaptopM: `(min-width: 1366px) and (max-width: 1440px)`,
  LaptopML: `(min-width: 1440px) and (max-width: 1680px)`,
  desktopS: `(min-width: 1680px) and (max-width: 1920px)`,
  desktopL: `(min-width: 1920px) and (max-width: 2560px)`,
};
