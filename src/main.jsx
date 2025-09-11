import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style


import { ConfigProvider, App as AntdApp } from "antd"

createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      // components: {
      //   Button: {
      //     colorPrimary: '#808080',
      //   },
      //   Input: {
      //     colorPrimary: '#eb2f96',
      //   }
      // },
      token: {
        colorPrimary: "#7132f5",
      }
    }}
  >
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
)
