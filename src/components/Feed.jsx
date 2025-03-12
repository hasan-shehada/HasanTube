import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
      console.log(data.items);
    });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          variant="body2"
          sx={{ width: "fit-content", margin: "auto", mt: 1.5, color: "#fff" }}
        >
          Developed By <span style={{ color: "#FC1503" }}>Hasan Shehada</span> |
          2025
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "white", marginBottom: "10px" }}
        >
          {selectedCategory}
          <span style={{ color: "#FC1503" }}> Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
