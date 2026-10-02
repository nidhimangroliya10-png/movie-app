import {
  Card,
  CardMedia,
  Typography,
  Button,
  Modal,
  IconButton,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./MovieDetails.css";

function MovieDetails({ movie, open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="movie-details-modal"
    >
      <Card className="movie-details-card">

        {/* =========================
            CLOSE BUTTON
        ========================= */}

        <IconButton
          onClick={onClose}
          className="movie-details-close"
        >
          <CloseIcon />
        </IconButton>


        {/* =========================
            MOVIE POSTER
        ========================= */}

        <CardMedia
          component="img"
          image={movie.image}
          alt={movie.title}
          className="movie-details-poster"
        />


        {/* =========================
            MOVIE INFORMATION
        ========================= */}

        <Box className="movie-details-info">

          {/* Movie Title */}

          <Typography
            variant="h5"
            className="movie-details-title"
          >
            {movie.title}
          </Typography>


          {/* Description */}

          <Typography
            className="movie-details-description"
          >
            {movie.description}
          </Typography>


          {/* Duration */}

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Duration:
            </span>

            <span>
              {movie.duration}
            </span>
          </Box>


          {/* Release Date */}

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Release Date:
            </span>

            <span>
              {movie.releaseDate}
            </span>
          </Box>


          {/* Cast */}

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Cast:
            </span>

            <span>
              {movie.cast}
            </span>
          </Box>


          {/* Director */}

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Director:
            </span>

            <span>
              {movie.director}
            </span>
          </Box>


          {/* Producer */}

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Producer:
            </span>

            <span>
              {movie.producer}
            </span>
          </Box>


          {/* =========================
              TRAILER
          ========================= */}

          <Button
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="movie-details-trailer"
          >
            ▶ Watch Trailer
          </Button>

        </Box>

      </Card>
    </Modal>
  );
}

export default MovieDetails;