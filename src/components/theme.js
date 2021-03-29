import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  shadows: ["none"],
  typography: {
    fontFamily: ["-apple-system", "Roboto", "sans-serif"].join(","),
    allVariants: {
      color: "#333",
    },
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#0171B6",
    },
    secondary: {
      main: "#DB1A20",
    },
  },
});

export default theme;
