import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar({
  search,
  setSearch,
  mode,
  toggleTheme,
}) {
  return (
    <Box className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Typography className="navbar-logo">
        🎬 MoviesApp
      </Typography>


      {/* =========================
          SEARCH
      ========================= */}

      <TextField
        size="small"
        label="Search Movie"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* =========================
          HOME
      ========================= */}

      <Button
        component={Link}
        to="/"
      >
        Home
      </Button>


      {/* =========================
          EDIT
      ========================= */}

      <Button
        component={Link}
        to="/edit"
      >
        Edit
      </Button>


      {/* =========================
          DARK / LIGHT MODE
      ========================= */}

      <Button
        onClick={toggleTheme}
      >
        {mode === "light"
          ? "🌙"
          : "☀️"}
      </Button>

    </Box>
  );
}

export default Navbar;