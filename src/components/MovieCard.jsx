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
        <Box className="movie-image-wrapper">
          <CardMedia
            component="img"
            image={movie.image}
            alt={movie.title}
            className="movie-image"
          />
        </Box>

        <CardContent className="movie-content">
          <Typography
            variant="h6"
            className="movie-title"
          >
            {movie.title}
          </Typography>

          <Typography className="movie-year">
            • {movie.year}
          </Typography>

          <Typography className="movie-description">
            {movie.description}
          </Typography>

          <Button
            className="view-details-button"
            onClick={() => setOpen(true)}
            fullWidth
          >
            VIEW DETAILS
          </Button>
        </CardContent>
      </Card>

      <MovieDetails
        movie={movie}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default MovieCard;