import React from "react";
import { Grid } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos }) => {
  return (
    <Grid container spacing={2} justifyContent="start" alignItems={"stretch"}>
      {videos.map((video, idx) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={idx}
          style={{ display: "flex" }}
        >
          {video.id.channelId ? (
            <ChannelCard channelDetail={video} />
          ) : (
            <VideoCard video={video} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Videos;
