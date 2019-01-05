import { createMuiTheme } from "@material-ui/core/styles";

const theme = {
  palette: {
    background: "#31334b4d",
    primary: {
      light: "#555767",
      main: "#2B2D42",
      dark: "#1e1f2e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
};

const tableTheme = createMuiTheme({
  ...theme,
  overrides: {
    MUIDataTableSelectCell: {
      checked: { color: "#2B2D42 !important" }
    },
    MUIDataTableToolbar: {
      root: {
        background: "#eee"
      },
      iconActive: {
        color: "#2B2D42 !important"
      }
    },
    MuiSwitchBase: {
      input: {
        color: "#2B2D42 !important"
      }
    },
    MUIDataTableFilter: {
      resetLink: {
        color: "#2B2D42 !important",
        "&:hover": {
          color: "#f50057 !important"
        }
      }
    },
    MuiButtonBase: {
      root: {
        color: "#2B2D42 !important",
        "&:hover": {
          color: "#2B2D42 !important"
        }
      }
    },
    MuiInputBase: {
      root: {
        "&:hover, &:focus": {
          color: "#2B2D42 !important"
        }
      },
      focused: {
        color: "#2B2D42 !important"
      },
      formControl: {
        color: "#2B2D42 !important"
      }
    }
  }
});

export default createMuiTheme(theme);
export { tableTheme };
