import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { CheckCircle } from "@mui/icons-material";

const ChannelCard = ({ channelDetail, bacgroundColor, marginTop }) => {
  if (!channelDetail?.snippet) return "Loading...";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "86%",
        width: "100%",
        borderRadius: "0px",
        backgroundColor: `${bacgroundColor ? bacgroundColor : "#111"}`,
        padding: "20px",
        minHeight: "220px",
        marginTop: marginTop,
        zIndex: 20,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        {channelDetail?.snippet?.thumbnails?.high?.url ? (
          <CardMedia
            component="img"
            image={`${channelDetail.snippet.thumbnails.high.url}`}
            alt={channelDetail?.snippet?.title}
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        ) : (
          demoProfilePicture
        )}
      </Link>
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <Typography
          variant="h6"
          color="white"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {channelDetail?.snippet?.title}
          <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
        </Typography>
      </Link>

      {channelDetail?.statistics?.subscriberCount && (
        <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>
          {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString(
            "en-US"
          )}{" "}
          Subscribers
        </Typography>
      )}
    </Box>
  );
};

export default ChannelCard;
