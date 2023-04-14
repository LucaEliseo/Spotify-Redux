import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, playSongs } from "../redux/actions";

export const ArtistPage = () => {
  const params = useParams();
  const [artist, setArtist] = useState();
  const fav = useSelector((state) => state.songs.favourite);
  const dispatch = useDispatch();

  const getFetchArtist = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${params.artist}`);
      if (response.ok) {
        const data = await response.json();
        setArtist(data);
      } else {
        console.log("artist errore in if");
      }
    } catch (err) {
      console.log("artist err in catch");
    }
  };

  useEffect(() => {
    getFetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10 col-lg-10 mt-5">
          <h2 className="titleMain">{params.artist}</h2>
          <div id="followers">{artist?.rank}</div>
          <div className="d-flex justify-content-center" id="button-container">
            <button className="btn btn-success mr-2 mainButton" id="playButton">
              PLAY
            </button>
            <button className="btn btn-outline-light mainButton" id="followButton">
              FOLLOW
            </button>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-10 offset-1 col-md-10 col-lg-10 p-0">
          <div className="mt-4 d-flex justify-content-start">
            <h2 className="text-white font-weight-bold">Tracks</h2>
          </div>
          <div className="pt-5 mb-5">
            <div className="row" id="apiLoaded">
              {artist?.data.map((e) => (
                <>
                  <div className="col-sm-auto col-md-auto text-center mb-5">
                    <Link>
                      <img key={e?.id} src={e?.album.cover_medium} alt="cover" />
                    </Link>
                    <div className="p-2 fs-0">
                      <Link className="text-decoration-none text-light" to={`/album-page/${e?.album.id}`}>
                        <p>
                          Album:
                          {e.album.title.length < 16 ? `${e.album.title}` : `${e.album.title.substring(0, 16)}...`}
                        </p>
                      </Link>
                      <Link
                        className="text-decoration-none text-light"
                        to={`/artist-page/${e?.artist.name}`}
                        onClick={() => dispatch(playSongs(e))}
                      >
                        <p>
                          Track:
                          {e?.title_short.length < 16 ? `${e.title_short}` : `${e.title_short.substring(0, 16)}...`}
                        </p>{" "}
                        <AiFillHeart
                          onClick={() => dispatch(addToFav(e))}
                          style={{
                            color: fav.map((f) => (f === e.id ? "red" : "white"))
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
