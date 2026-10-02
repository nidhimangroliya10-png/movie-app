import { useState } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import MovieDetails from "./MovieDetails";

import "./MovieCard.css";

function MovieCard({ movie }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="movie-card">

        {/* =========================
            MOVIE IMAGE
        ========================= */}

        <Box className="movie-image-wrapper">

          <CardMedia
            component="img"
            image={movie.image}
            alt={movie.title}
            className="movie-image"
          />

        </Box>


        {/* =========================
            MOVIE INFORMATION
        ========================= */}

        <CardContent className="movie-content">

          {/* Movie Title */}

          <Typography
            variant="h6"
            className="movie-title"
          >
            {movie.title}
          </Typography>


          {/* Year */}

          <Typography
            className="movie-year"
          >
            • {movie.year}
          </Typography>


          {/* Description */}

          <Typography
            className="movie-description"
          >
            {movie.description}
          </Typography>


          {/* View Details */}

          <Button
            className="view-details-button"
            onClick={() => setOpen(true)}
            fullWidth
          >
            VIEW DETAILS
          </Button>

        </CardContent>

      </Card>


      {/* =========================
          MOVIE DETAILS
      ========================= */}

      <MovieDetails
        movie={movie}
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}

export default MovieCard;