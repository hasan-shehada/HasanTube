import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoThumbnailUrl,
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "../utils/constants";

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

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "0px",
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ height: "130px", width: "100%" }}
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: "#1e1e1e",
          height: "95px",
          position: "relative",
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="gray"
            sx={{ position: "absolute", bottom: "5px", left: "5px" }}
          >
            {snippet?.channelTitle.slice(0, 60) ||
              demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
        <Typography
          sx={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            color: "gray",
            fontSize: "12px",
          }}
        >
          {timeAgo(snippet?.publishedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
