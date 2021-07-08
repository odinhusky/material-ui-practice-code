import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Layout from './component/Layout'


import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { blue, green, purple } from '@material-ui/core/colors';


const theme = createMuiTheme({
  // 修改主題色
  palette: {
    // 精準設定]
    // primary: {
    //   main: '#fefefe'
    // },

    // 直接這樣使用色票就可以不用一個一個設定 light | main | dark | contrastColor
    primary: blue,
    secondary: purple,
    odin: '#ffffff'
  },

  //字體設定
  typography: {
    fontFamily: 'Quicksand',
    fontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 1000
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1500,
      odin: 1700,
      xxl: 1920,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <ThemeProvider theme={addNewTheme}> */}
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </Layout>
        </Router>
      {/* </ThemeProvider> */}
    </ThemeProvider>

  );
}

export default App;
