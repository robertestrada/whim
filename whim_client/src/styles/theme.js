import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(25,42,50)'
    }
  }
});

export default theme;
