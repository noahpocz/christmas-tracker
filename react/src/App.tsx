import { CssVarsProvider } from "@mui/joy/styles";
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
