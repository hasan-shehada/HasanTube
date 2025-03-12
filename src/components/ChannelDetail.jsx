import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  console.log(channelDetail, videos);

  return (
    <Box minHeight="90vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(to right, #d21919, #d1237c, #945fbc, #377fc7, #1e8daa)",
            zIndex: 10,
            height: "300px",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ChannelCard
            channelDetail={channelDetail}
            bacgroundColor={"transparent"}
            marginTop={"-93px"}
          />
        </Box>
      </Box>
      <Box sx={{ ml: { xs: "5%", sm: "15%" }, mr: { xs: "5%", sm: "15%" } }}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
