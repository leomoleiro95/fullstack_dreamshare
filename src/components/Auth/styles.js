import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
  },
  root: {
    "& .MuiTextField-root": {
      //margin: 1,
    },
  },
  avatar: {
    margin: 1,
    //backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 3,
  },
  submit: {
    marginTop: '3px'
  },
  googleButton: {
    marginBottom: 2,
  },
}));