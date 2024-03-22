import { store } from "@/app/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import '.././main.scss'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
