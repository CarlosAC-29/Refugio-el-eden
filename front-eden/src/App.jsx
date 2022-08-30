
import Routes from "./RoutesPage";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Footer from "./Components/Footer";
import theme from "./Theme";


// const theme = createTheme({
//   typography: {
//     fontFamily: 'Public Sans, sans-serif',
//     fontWeightRegular: 400,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//   },
//   overrides: {
//     MuiCssBaseline: {
//       '@global': {
//         '@font-face': [],
//       },
//     },
//   },
// });


function App() {
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes/>
      </ThemeProvider>
    </div>
  );
}

export default App;
