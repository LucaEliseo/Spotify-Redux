import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, playSongs } from "../redux/actions";
import { AiFillHeart } from "react-icons/ai";

export const AlbumPage = () => {
  const [getAlbum, setGetAlbum] = useState();
  const [getSongs, setGetSongs] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.songs.favourite);
  console.log(fav);

  const getFetchAlbum = async () => {
    try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${params.album}`);
      if (res.ok) {
        let data = await res.json();
        setGetSongs(data.tracks.data);
        setGetAlbum(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFetchAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="col-md-10 mb-5" id="trackList">
      <div className="row">
        <div className="col-md-3 pt-5 text-center" id="img-container">
          <img src={getAlbum?.cover_medium} class="card-img img-fluid" alt="1" />
          <div class="mt-4 text-center">
            <p class="album-title">{getAlbum?.title}</p>
          </div>
          <div class="text-center">
            <p class="artist-name">{getAlbum?.artist.name}</p>
          </div>
          <div class="mt-4 text-center">
            <button id="btnPlay" class="btn btn-success" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="col-md-8 p-5">
          <div className="row">
            <div className="col-md-12 mb-5" id="trackList">
              {getSongs &&
                getSongs.map((e) => (
                  <>
                    <AiFillHeart
                      onClick={() => dispatch(addToFav(e.id))}
                      style={{
                        color: fav.map((f) => (f !== e.id ? "white" : "red"))
                      }}
                    />
                    <div class="py-3 trackHover">
                      <Link
                        href="#"
                        class="card-title trackHover px-3"
                        style={{ color: "white" }}
                        onClick={() => dispatch(playSongs(e))}
                      >
                        {e?.title}
                      </Link>
                      <small class="duration" style={{ color: "white" }}>
                        {Math.floor(
                          parseInt(e?.duration) / 60 // setting the duration minutes
                        )}
                        :
                        {parseInt(e?.duration) % 60 < 10
                          ? "0" + (parseInt(e?.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
                          : parseInt(e?.duration) % 60}
                      </small>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
