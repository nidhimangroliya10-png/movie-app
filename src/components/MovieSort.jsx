import { useState } from "react";
import movies from "../data/movies";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

function MovieSort() {
  const [sort, setSort] = useState("");

  let sortedMovies = [...movies];

  if (sort === "az") {
    sortedMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "za") {
    sortedMovies.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <Box className="sort-page">
      <Typography variant="h4" className="sort-title">
        Sort Movies
      </Typography>

      <FormControl className="sort-control">
        <InputLabel>Sort By</InputLabel>

        <Select
          value={sort}
          label="Sort By"
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="az">A → Z</MenuItem>
          <MenuItem value="za">Z → A</MenuItem>
        </Select>
      </FormControl>

      {sortedMovies.map((movie) => (
        <Box key={movie.id} className="movie-sort-card">
          <Typography
            variant="h6"
            className="movie-sort-title"
          >
            {movie.title}
          </Typography>

          <Typography className="movie-sort-year">
            Year: {movie.year}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default MovieSort;