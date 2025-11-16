import { CssVarsProvider } from "@mui/joy/styles";

// @ts-ignore
import "@fontsource/inter"

import {HomePage} from "./pages/home/HomePage.tsx";

function App() {
  return (
    <CssVarsProvider>
      <HomePage/>
    </CssVarsProvider>
  )
}

export default App
