import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RandomNumber() {
  const [randomYear, setRandomYear] = useState(null);
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    // Fetch top albums when randomYear changes
    if (randomYear) {
      fetchTopAlbums(randomYear);
    }
  }, [randomYear]);

  const generateRandomYear = () => {
    const minYear = 1940;
    const maxYear = 2023;
    const randomYear =
      Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    setRandomYear(randomYear);
    setTopAlbums([]); // Clear the topAlbums state
  };

  const fetchTopAlbums = async (year) => {
    try {
      const LASTFM_API_KEY = "f86ed46576de5c75a9f0bcefb647dcd8";
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=${year}&api_key=${LASTFM_API_KEY}&format=json`
      );

      const data = await response.json();

      if (data.albums && data.albums.album) {
        const albums = data.albums.album.map((album) => {
          const image = album.image.find((img) => img.size === "extralarge");
          return {
            id: album.mbid,
            name: album.name,
            artists: album.artist.name,
            image: image ? image["#text"] : null,
            rank:
              album["@attr"] && album["@attr"].rank
                ? parseInt(album["@attr"].rank, 10)
                : 0,
          };
        });

        // Sort albums based on rank
        const sortedAlbums = albums.sort((a, b) => a.rank - b.rank);

        setTopAlbums(sortedAlbums);
      } else {
        console.error(
          "Error fetching top albums: Unexpected response structure",
          data
        );
      }
    } catch (error) {
      console.error("Error fetching top albums:", error);
    }
  };

  return (
    <div className="mt-15 container">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Card style={{ width: "18rem" }} className="random">
            <Card.Body>
              <Card.Title>
                <h1>Random Album Generator</h1>
              </Card.Title>
              <div>
                <button onClick={generateRandomYear}>
                  Generate Random Year
                </button>
                {randomYear && <div>Random Year: {randomYear}</div>}
                <h2>Top 20 Albums for {randomYear}</h2>
                <Row className="justify-content-center">
                  {topAlbums.map((album, index) => (
                    <Col key={album.id} md={4} className="mb-3">
                      <Card style={{ width: "15rem" }} className="mb-3">
                        {album.image && (
                          <Card.Img
                            variant="top"
                            src={album.image}
                            alt={`${album.name} Album Cover`}
                          />
                        )}
                        <Card.Body>
                          <Card.Title>{album.name}</Card.Title>
                          <Card.Text>{album.artists}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RandomNumber;
