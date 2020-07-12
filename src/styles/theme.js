import { createMuiTheme } from "@material-ui/core/styles";

const palette1 = ["#492540", "#c03546", "#f26d5b", "#f6ea8c"];

const palette2 = [
  "#085f63",
  "#49beb7",
  "#facf5a",
  "#ff5959",
  "#364f6b",
  "#47688d",
];

const lightPalette = {
  type: "light",
  primary: {
    main: "",
  },
  secondary: {
    main: "",
  },
  background: {
    default: "#f6ea8c",
  },
};
const darkPalette = {
  type: "dark",
  primary: {
    main: "#49beb7",
    contrastText: "#085f63",
  },
  secondary: {
    main: "#ff5959",
  },
  background: {
    default: "#364f6b",
    light: "#47688d",
    dark: "#253649",
  },
  text: {
    primary: "#fff",
  },
};

const theme = createMuiTheme({
  palette: { ...darkPalette },
  typography: {
    fontFamily: [
      "source_sans_proregular",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  overrides: {
    MuiMenu: {
      paper: {
        backgroundColor: darkPalette.background.light,
      },
    },
    MuiButton: {
      root: {
        transition: "all 0.4s",
        "&:hover": {
          backgroundColor: "transparent",
          color: darkPalette.primary.main,
        },
      },
    },
    MuiIconButton: {
      root: {
        transition: "all 0.4s",
        "&:hover": {
          backgroundColor: "transparent",
          opacity: 0.7,
        },
      },
    },
  },
});

export { theme };
