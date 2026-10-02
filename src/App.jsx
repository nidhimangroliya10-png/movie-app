import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Edit from "./page/Edit";
import Sort from "./components/MovieSort";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#243554",
      },
    },
  });

  const toggleTheme = () => {
    setMode(
      mode === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Navbar
          search={search}
          setSearch={setSearch}
          mode={mode}
          toggleTheme={toggleTheme}
        />

        <Routes>
          <Route
            path="/"
            element={<Home search={search} />}
          />

          <Route
            path="/edit"
            element={<Edit />}
          />

          <Route
            path="/sort"
            element={<Sort />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;