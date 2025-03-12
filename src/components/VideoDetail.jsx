import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setRelatedVideos(data.items);
      }
    );
  }, [id]);

  if (!videoDetail) {
    return "Loading...";
  }

  return (
    <Box minHeight="95vh">
      <Stack alignItems={"center"}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Stack direction="row" alignItems="center">
                <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                  <Typography
                    variant={{ xs: "subtitle1", md: "h6" }}
                    color="#fff"
                    fontFamily="roboto"
                  >
                    {videoDetail?.snippet?.channelTitle}
                    <CheckCircle
                      sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                    />
                  </Typography>
                </Link>
                <Typography sx={{ ml: 2, color: "gray", fontSize: "12px" }}>
                  {timeAgo(videoDetail?.snippet?.publishedAt)}
                </Typography>
              </Stack>
              <Stack
                sx={{ mr: "10px" }}
                direction="row"
                gap={2}
                alignItems="center"
              >
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ xs: 5, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedVideos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
