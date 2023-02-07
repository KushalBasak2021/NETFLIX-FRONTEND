import { useContext, useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import ClipLoader from "react-spinners/ClipLoader";
import "./home.scss";

import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";

const Home = ({ type }) => {
  let [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-backend-c5fq.onrender.com/api/lists${
            type ? "?type=" + type : ""
          }${type !== undefined && genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );
        setLoading(false);
        setLists(res.data);
      } catch (err) {
        if (err.response.status === 403) {
          dispatch(logout());
          window.location.replace("/");
        }
      }
    };
    getRandomLists();
  }, [type, genre, user, dispatch]);

  console.log(user);
  return (
    <>
      {loading ? (
        <div className="loader">
          <ClipLoader />
        </div>
      ) : (
        <div className="home">
          <Navbar />
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list, index) => (
            <List list={list} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
