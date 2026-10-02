import { useState } from "react";

import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./Home.css";

function Home({ search }) {
  const [sort, setSort] = useState("");

  // =========================
  // SEARCH MOVIES
  // =========================

  let filteredMovies = movies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // SORT A → Z
  // =========================

  if (sort === "az") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) =>
        a.title.localeCompare(b.title)
    );
  }

  // =========================
  // SORT Z → A
  // =========================

  if (sort === "za") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) =>
        b.title.localeCompare(a.title)
    );
  }

  return (
    <Box className="home-page">

      <Container
        maxWidth="xl"
        className="home-container"
      >

        {/* =========================
            PAGE HEADER
        ========================= */}

        <Box className="movies-header">

          <Typography
            variant="h3"
            className="movies-title"
          >
            Movies
          </Typography>

          {/* SORT BUTTONS */}

          <Box className="sort-buttons">

            <Button
              className={`sort-button ${
                sort === "az"
                  ? "sort-active"
                  : ""
              }`}
              variant={
                sort === "az"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                setSort("az")
              }
            >
              A → Z
            </Button>

            <Button
              className={`sort-button ${
                sort === "za"
                  ? "sort-active"
                  : ""
              }`}
              variant={
                sort === "za"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                setSort("za")
              }
            >
              Z → A
            </Button>

          </Box>
        </Box>


        {/* =========================
            MOVIE GRID
        ========================= */}

        <Grid
          container
          spacing={3}
          className="movies-grid"
        >

          {filteredMovies.map(
            (movie) => (
              <Grid
                key={movie.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <MovieCard
                  movie={movie}
                />
              </Grid>
            )
          )}

        </Grid>


        {/* =========================
            NO MOVIES
        ========================= */}

        {filteredMovies.length === 0 && (
          <Box className="no-movies">

            <Typography
              variant="h6"
            >
              😔 No movies found
            </Typography>

            <Typography
              variant="body2"
            >
              Try searching with
              another movie name.
            </Typography>

          </Box>
        )}

      </Container>

    </Box>
  );
}

export default Home;