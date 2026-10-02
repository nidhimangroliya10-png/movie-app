import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

import { useTheme } from "@mui/material/styles";

import movies from "../data/movies";
import "./Edit.css";

function Edit() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [rows, setRows] = useState(movies);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [editMovieData, setEditMovieData] = useState({
    id: "",
    title: "",
    description: "",
    duration: "",
    releaseDate: "",
    cast: "",
    director: "",
    producer: "",
    rating: "",
    trailer: "",
  });

  const filteredRows = rows.filter((movie) => {
    const text = search.toLowerCase();

    return (
      String(movie.id || "").toLowerCase().includes(text) ||
      String(movie.title || "").toLowerCase().includes(text) ||
      String(movie.description || "").toLowerCase().includes(text) ||
      String(movie.duration || "").toLowerCase().includes(text) ||
      String(movie.releaseDate || "").toLowerCase().includes(text) ||
      String(movie.cast || "").toLowerCase().includes(text) ||
      String(movie.director || "").toLowerCase().includes(text) ||
      String(movie.producer || "").toLowerCase().includes(text) ||
      String(movie.rating || "").toLowerCase().includes(text)
    );
  });

  const editMovie = (movie) => {
    setEditMovieData({
      id: movie.id,
      title: movie.title || "",
      description: movie.description || "",
      duration: movie.duration || "",
      releaseDate: movie.releaseDate || "",
      cast: movie.cast || "",
      director: movie.director || "",
      producer: movie.producer || "",
      rating: movie.rating || "",
      trailer: movie.trailer || "",
    });

    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditMovieData({
      ...editMovieData,
      [name]: value,
    });
  };

  const saveMovie = () => {
    setRows(
      rows.map((movie) =>
        movie.id === editMovieData.id
          ? {
              ...movie,
              title: editMovieData.title,
              description: editMovieData.description,
              duration: editMovieData.duration,
              releaseDate: editMovieData.releaseDate,
              cast: editMovieData.cast,
              director: editMovieData.director,
              producer: editMovieData.producer,
              rating: editMovieData.rating,
              trailer: editMovieData.trailer,
            }
          : movie
      )
    );

    setOpen(false);
  };

  const downloadCSV = () => {
    const headers = [
      "ID",
      "Movie Name",
      "Description",
      "Duration",
      "Release Date",
      "Cast",
      "Director",
      "Producer",
      "Rating",
      "Trailer URL",
    ];

    const data = filteredRows.map((movie) => [
      movie.id,
      movie.title,
      movie.description,
      movie.duration,
      movie.releaseDate,
      movie.cast,
      movie.director,
      movie.producer,
      movie.rating,
      movie.trailer,
    ]);

    const csv = [headers, ...data]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "movies.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setAnchorEl(null);
  };

  const printMovies = () => {
    window.print();
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "title",
      headerName: "Movie Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 130,
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      width: 150,
    },
    {
      field: "cast",
      headerName: "Cast",
      width: 220,
    },
    {
      field: "director",
      headerName: "Director",
      width: 160,
    },
    {
      field: "producer",
      headerName: "Producer",
      width: 160,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
    },
    {
      field: "trailer",
      headerName: "Trailer URL",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => editMovie(params.row)}
          className="edit-button"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box className={isDark ? "edit-page dark" : "edit-page"}>
      <Box className="edit-main">
        <Typography
          variant="h4"
          className="edit-title"
        >
          Edit Movies
        </Typography>

        <Box className="table-box">
          <Box className="edit-toolbar">
            <Box className="search-box">
              <SearchIcon className="search-icon" />

              <InputBase
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </Box>

            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className="download-button"
            >
              <DownloadIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                className: isDark
                  ? "export-menu dark"
                  : "export-menu",
              }}
            >
              <MenuItem onClick={printMovies}>
                🖨️ Print
              </MenuItem>

              <MenuItem onClick={downloadCSV}>
                📥 Download as CSV
              </MenuItem>
            </Menu>
          </Box>

          <Box className="data-grid-box">
            <DataGrid
              rows={filteredRows}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                    page: 0,
                  },
                },
              }}
              disableRowSelectionOnClick
              className={
                isDark
                  ? "movie-data-grid dark"
                  : "movie-data-grid"
              }
            />
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          className: isDark
            ? "edit-dialog dark"
            : "edit-dialog",
        }}
      >
        <DialogTitle className="dialog-title">
          ✏️ Edit Movie
        </DialogTitle>

        <DialogContent className="dialog-content">
          <Box className="form-grid">
            <TextField
              label="Movie Name"
              name="title"
              value={editMovieData.title}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Duration"
              name="duration"
              value={editMovieData.duration}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Release Date"
              name="releaseDate"
              value={editMovieData.releaseDate}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Rating"
              name="rating"
              value={editMovieData.rating}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Cast"
              name="cast"
              value={editMovieData.cast}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Director"
              name="director"
              value={editMovieData.director}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Producer"
              name="producer"
              value={editMovieData.producer}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Trailer URL"
              name="trailer"
              value={editMovieData.trailer}
              onChange={handleChange}
              fullWidth
              size="small"
              className="edit-text-field"
            />

            <TextField
              label="Description"
              name="description"
              value={editMovieData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              className="edit-text-field description-field"
            />
          </Box>
        </DialogContent>

        <DialogActions className="dialog-actions">
          <Button
            onClick={() => setOpen(false)}
            className="cancel-button"
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveMovie}
            className="save-button"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Edit;