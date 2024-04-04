import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrimaryInputWSearchIcon } from "../components/SearchInput";
import Albums from '../components/Albums';
import { Tracks } from "../components/Tracks";

export function AlbumsList() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState("");
  const [searchTracks, setSearchTracks] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/tracks")
      .then((response) => {
        const tracksData = response.data.data;
        setTracks(tracksData);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/v1/albums")
      .then((response) => {
        const albumsData = response.data.data;
        setAlbums(albumsData);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  function handleAlbums(id, title) {
    navigate(`/album/${id}/${title}`);
  }

  return (
    <FlexContainer>
      <Title>Lista de Álbuns</Title>
      <SearchContainer>
        <PrimaryInputWSearchIcon
          onChange={(e) => setSearchAlbums(e.target.value)}
          placeholder="Procurando Álbum específico?"
          value={searchAlbums}
          name='searchInputAlbum'
          id='searchInputAlbum'
        />
        <PrimaryInputWSearchIcon
          onChange={(e) => setSearchTracks(e.target.value)}
          placeholder="Procurando Alguma Música?"
          value={searchTracks}
          name='searchInputTrack'
          id='searchInputTrack'
        />
      </SearchContainer>

      <GridContainer>
        {Array.isArray(albums) && albums.length > 0 && albums.map((album) => (
          <Albums key={album.id} album={album} handleAlbums={handleAlbums} />
        ))}
      </GridContainer>

      <GridContainer>
        {Array.isArray(tracks) && tracks.length > 0 && tracks.map((track) => (
          <Tracks key={track.id} track={track} setSearchTracks={setSearchTracks} />
        ))}
      </GridContainer>
    </FlexContainer>
  );
}

const Title = styled.h2`
  color: #ffffff;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
