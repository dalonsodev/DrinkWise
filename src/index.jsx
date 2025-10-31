import ReactDOM from "react-dom/client"
import App from "./App"
import "./i18n"

import "./styles/globals.css"
import "./styles/layout.css"
import "./styles/components.css"
import "./styles/pages.css"
import "./styles/utils.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)