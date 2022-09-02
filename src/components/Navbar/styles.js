import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";



const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    contrastThreshold: 3,

    tonalOffset: 0.2,
  },
});


export default makeStyles ( () => ({
    appBar: {
        borderRadius:25,
        margin: '30px 0px',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        elevation: '6',
        width:'100%'
    },
    heading: {
        color: 'rgba(0, 183, 255, 1)',
        textDecoration: 'none'
    },
    image: {
        marginLeft: '15px'
    },
    toolbar: {
        display:'flex',
        justifyContent: 'flex-end',
        width: '400px'
    },
    profile: {
        display:'flex',
        justifyContent: 'space-between',
        width: '400px'
    },
    userName: {
        display: 'flex',
        alignItems: 'center'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
    }
}))