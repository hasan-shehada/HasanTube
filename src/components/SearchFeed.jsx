import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
      console.log(data.items);
    });
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "white", marginBottom: "10px" }}
      >
        {`Search Results for: `}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
