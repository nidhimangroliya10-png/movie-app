import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

import { useTheme } from "@mui/material/styles";

import movies from "../data/movies";
import "./Edit.css";

function Edit() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [rows, setRows] = useState(movies);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);

  const [movie, setMovie] = useState({
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

  const filteredMovies = rows.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const editMovie = (item) => {
    setMovie(item);
    setOpen(true);
  };

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const saveMovie = () => {
    setRows(
      rows.map((item) =>
        item.id === movie.id ? movie : item
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
      "Trailer",
    ];

    const data = rows.map((item) => [
      item.id,
      item.title,
      item.description,
      item.duration,
      item.releaseDate,
      item.cast,
      item.director,
      item.producer,
      item.rating,
      item.trailer,
    ]);

    const csv = [headers, ...data]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "movies.csv";
    link.click();

    URL.revokeObjectURL(url);
    setMenu(null);
  };

  const printMovies = () => {
    window.print();
    setMenu(null);
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
      headerName: "Trailer",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => editMovie(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box className={isDark ? "edit-page dark" : "edit-page"}>

      <Typography
        variant="h4"
        className="edit-title"
      >
        Edit Movies
      </Typography>

      <Box className="edit-toolbar">

        <Box className="search-box">
          <SearchIcon className="search-icon" />

          <InputBase
            placeholder="Search movie..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </Box>

        <IconButton
          onClick={(e) =>
            setMenu(e.currentTarget)
          }
        >
          <DownloadIcon />
        </IconButton>

        <Menu
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={() => setMenu(null)}
        >
          <MenuItem onClick={printMovies}>
            🖨️ Print
          </MenuItem>

          <MenuItem onClick={downloadCSV}>
            📥 Download CSV
          </MenuItem>
        </Menu>

      </Box>

      <Box className="data-grid-box">
        <DataGrid
          rows={filteredMovies}
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
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>
          ✏️ Edit Movie
        </DialogTitle>

        <DialogContent>

          <Box className="form-grid">

            <TextField
              label="Movie Name"
              name="title"
              value={movie.title}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Duration"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Release Date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Rating"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Cast"
              name="cast"
              value={movie.cast}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Director"
              name="director"
              value={movie.director}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Producer"
              name="producer"
              value={movie.producer}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Trailer URL"
              name="trailer"
              value={movie.trailer}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Description"
              name="description"
              value={movie.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              className="description-field"
            />

          </Box>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveMovie}
          >
            Save Changes
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}

export default Edit;