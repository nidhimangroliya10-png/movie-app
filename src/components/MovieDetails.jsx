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
        <IconButton
          onClick={onClose}
          className="movie-details-close"
        >
          <CloseIcon />
        </IconButton>

        <CardMedia
          component="img"
          image={movie.image}
          alt={movie.title}
          className="movie-details-poster"
        />

        <Box className="movie-details-info">
          <Typography
            variant="h5"
            className="movie-details-title"
          >
            {movie.title}
          </Typography>

          <Typography className="movie-details-description">
            {movie.description}
          </Typography>

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Duration:
            </span>

            <span>
              {movie.duration}
            </span>
          </Box>

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Release Date:
            </span>

            <span>
              {movie.releaseDate}
            </span>
          </Box>

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Cast:
            </span>

            <span>
              {movie.cast}
            </span>
          </Box>

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Director:
            </span>

            <span>
              {movie.director}
            </span>
          </Box>

          <Box className="movie-details-row">
            <span className="movie-details-label">
              Producer:
            </span>

            <span>
              {movie.producer}
            </span>
          </Box>

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