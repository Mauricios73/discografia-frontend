import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteDialog } from "../components/DeleteDialog";
import { Tracks } from "../components/Tracks";
import styled from "styled-components";
import { PrimaryInputWSearchIcon } from "../components/SearchInput";

export function Album() {
  const navigate = useNavigate();
  const { id, AlbumTitle } = useParams();
  const [searchTracks, setSearchTracks] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/albums/${id}/tracks`)
      .then((response) => {
        setTracks(response.data);
      });
  }, [id]);

  function handleSearchTracks(event) {
    setSearchTracks(event.target.value);
  }

  return (
    <FlexContainer>
      <Title>Lista de Músicas do Álbum {AlbumTitle}:</Title>
      <TagButton
        onClick={() => {
          navigate(`/CreateTrack/${id}`);
        }}
      >
        Adicionar Música ao Álbum Atual
      </TagButton>
      <PrimaryInputWSearchIcon
        onChange={(e) => handleSearchTracks(e.target.value)}
        placeholder="Procurando uma Música específica?"
        name="search_tracks_input"
        id="search_tracks_input"
      />
      <GridContainer>
        {!searchTracks
          ? tracks.map((track) => <Tracks key={track.id} track={track} />)
          : tracks
              .filter((track) =>
                track.title
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(searchTracks.toLowerCase().replace(/\s+/g, ""))
              )
              .map((track) => <Tracks key={track.id} track={track} />)}
      </GridContainer>
      <DeleteDialog Id={id} config={"Álbum"} />
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
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 730px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const TagButton = styled.button`
  margin-bottom: 5px;
  background-color: #1e90ff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  margin-left: 30px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #4682b4;
  }
`;
