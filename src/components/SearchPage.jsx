import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const SearchPage = () => {
  const [singleArtist, setSingleArtist] = useState();
  const params = useParams();

  const fetchArtist = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${params.artistName}`);
      if (response.ok) {
        const data = await response.json();
        setSingleArtist(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <div className="row">
        <div className="col-10">
          <div id="searchResults">
            <h2>Search Results</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
              {singleArtist?.map((e) => (
                <div className="col text-center" key={e.id}>
                  <Link to={`/album/${e.id}`}>
                    <img className="img-fluid" src={e.album?.cover_medium} alt="1" />
                  </Link>
                  <p>
                    <Link to={`/album/${e.album.id}`}>
                      Album:
                      {e.album?.title?.length < 16 ? `${e.album?.title}` : `${e.album?.title.substring(0, 16)}...`}
                      <br />
                    </Link>
                    <Link to={`/artist/${e.artist.name}`}>Artist: {e.artist?.name} </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
