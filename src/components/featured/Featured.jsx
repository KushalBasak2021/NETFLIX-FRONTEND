import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-backend-c5fq.onrender.com/api/movies/random?type=${type}`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );
        setContent(res.data[0]);
      } catch (err) {
        if (err.response.status === 403) {
          dispatch(logout());
          window.location.replace("/");
        }
      }
    };
    getRandomContent();
  }, [type, user, dispatch]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" loading="lazy" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
