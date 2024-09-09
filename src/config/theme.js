import { DarkTheme } from "@react-navigation/native";
import { DefaultTheme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const ThemeDark = {
  ...MD3DarkTheme,
  colors: {
    primary: "rgb(193, 193, 255)",
    onPrimary: "rgb(26, 9, 161)",
    primaryContainer: "rgb(52, 48, 182)",
    onPrimaryContainer: "rgb(226, 223, 255)",
    secondary: "rgb(192, 193, 255)",
    onSecondary: "rgb(17, 8, 164)",
    secondaryContainer: "rgb(47, 48, 185)",
    onSecondaryContainer: "rgb(225, 224, 255)",
    tertiary: "rgb(190, 194, 255)",
    onTertiary: "rgb(32, 37, 120)",
    tertiaryContainer: "rgb(56, 62, 143)",
    onTertiaryContainer: "rgb(224, 224, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(28, 27, 31)",
    onBackground: "rgb(229, 225, 230)",
    surface: "rgb(28, 27, 31)",
    onSurface: "rgb(229, 225, 230)",
    surfaceVariant: "rgb(71, 70, 79)",
    onSurfaceVariant: "rgb(200, 197, 208)",
    outline: "rgb(145, 143, 154)",
    outlineVariant: "rgb(71, 70, 79)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(229, 225, 230)",
    inverseOnSurface: "rgb(49, 48, 52)",
    inversePrimary: "rgb(78, 76, 206)",
    elevation: {
      level0: "transparent",
      level1: "rgb(36, 35, 42)",
      level2: "rgb(41, 40, 49)",
      level3: "rgb(46, 45, 56)",
      level4: "rgb(48, 47, 58)",
      level5: "rgb(51, 50, 62)",
    },
    surfaceDisabled: "rgba(229, 225, 230, 0.12)",
    onSurfaceDisabled: "rgba(229, 225, 230, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
};

const ThemeDarkNavigation = {
  ...DarkTheme,
};

const ThemeLight = {
  ...MD3LightTheme,
  colors: {
    primary: "rgb(78, 76, 206)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(226, 223, 255)",
    onPrimaryContainer: "rgb(11, 0, 107)",
    secondary: "rgb(73, 77, 209)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(225, 224, 255)",
    onSecondaryContainer: "rgb(5, 0, 109)",
    tertiary: "rgb(80, 86, 169)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(224, 224, 255)",
    onTertiaryContainer: "rgb(5, 8, 101)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(242, 239, 248)",
    onBackground: "rgb(28, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(28, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(71, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(200, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(49, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(193, 193, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(255, 255, 255)",
      level2: "rgb(255, 255, 255)",
      level3: "rgb(255, 255, 255)",
      level4: "rgb(255, 255, 255)",
      level5: "rgb(255, 255, 255)",
    },
    surfaceDisabled: "rgba(28, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(28, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
};

const ThemeLightNavigation = {
  ...DefaultTheme,
};

export { ThemeDark, ThemeDarkNavigation, ThemeLight, ThemeLightNavigation };
