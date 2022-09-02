import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  
});

export default makeStyles(() => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));
