import React from 'react'
import ReactDOM from 'react-dom'
import 'reset-css/reset.css'
import App from './App'
import { ThemeProvider } from 'react-jss'
import registerServiceWorker from './registerServiceWorker'


const theme = {
  baseFontSize: 16,
  colorDark: '#272727',

  get init () {
    return {
      fontSize: this.baseFontSize,
      margin: this.baseFontSize * 0.625,
      lineHeight: this.baseFontSize * 1.2,
      colorDark: this.colorDark
    }
  }
}


const Main = () => (
  <ThemeProvider theme={theme.init}>
    <App/>
  </ThemeProvider>
)

ReactDOM.render(<Main/>, document.getElementById('root'))
registerServiceWorker()
