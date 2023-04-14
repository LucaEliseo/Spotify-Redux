import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CardComponent = (props) => {
  const [singleArtist, setSingleArtist] = useState();

  const fetchArtist = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${props.artistName}`);
      if (response.ok) {
        const data = await response.json();
        setSingleArtist(data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {singleArtist && (
        <div>
          <div className="col text-center" key={singleArtist.id}>
            <Link to={`/album-page/${singleArtist.album.id}`}>
              <img className="img-fluid" src={singleArtist.album.cover_medium} alt="1" />
            </Link>
            <p>
              <Link to={`/album-page/${singleArtist.album.id}`}>
                Album:
                {singleArtist.album?.title?.length < 16
                  ? `${singleArtist.album?.title}`
                  : `${singleArtist.album?.title.substring(0, 16)}...`}
                <br />
              </Link>
              <Link to={`/artist-page/${singleArtist.artist.name}`}>Artist: {singleArtist.artist.name} </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
