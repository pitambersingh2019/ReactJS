import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primaryBlue: string;
      primaryBlueHover: string;
      primaryBlueDisabled: string;
      secondaryBlue: string;
      secondaryBlueHover: string;
      secondaryBlueDisabled: string;
      blue2: string;
      blue4: string;
      blue5: string;
      lightBlue1: string;
      lightBlue2: string;
      lightBlue3: string;
      lightBlue4: string;
      white: string;
      black: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      lightGray1: string;
      lightGray2: string;
      lightGray3: string;
      lightGray4: string;
      lightGray5: string;
      lightGray6: string;
      lightGray7: string;
      red: string;
      purple: string;
      purpleHover: string;
      purpleDisabled: string;
      purple3: string;
    };
    dir?: "ltr" | "ltr" | string;
    language?: string;
  }
}
