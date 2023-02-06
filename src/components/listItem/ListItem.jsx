import "./listItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-backend-c5fq.onrender.com/api/movies/find/${item}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setMovieData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieInfo();
  }, [item]);
  return (
    <Link to="/watch" state={{ movieData: movieData }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movieData?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movieData.trailer} autoPlay={true} loop muted />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownOffAltOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movieData.duration || "1h 14m"}</span>
                <span className="limit">+{movieData.limit}</span>
                <span>{movieData.year}</span>
              </div>
              <div className="desc">{movieData.desc}</div>
              <div className="genre">{movieData.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
