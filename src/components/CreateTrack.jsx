import axios from "axios";
import { useState } from "react";
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

export function CreateTrack() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [artistId, setArtistId] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const track = {
      name: name,
      duration: duration,
      album_id: id,
      artista: artistId,
      link,
      link_image: image,
    }
    await axios.post('http://127.0.0.1:8000/api/v1/tracks', track).then(
      navigate('/')
    )
  }
  return(
    <ContainerForm>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="name">Nome da Música</Label>
            <Inputs type="text" id="name" name="name" placeholder="Informe o Nome da Música:" onChange={(e)=>setName(e.target.value)}/>
            <Label htmlFor="duration">Duração</Label>
            <Inputs type="text" id="duration" name="duration" placeholder="Informe a Duração da Música:" onChange={(e)=>setDuration(e.target.value)}/>
            <Label htmlFor="artistId">Artista</Label>
            <Inputs type="text" id="artistId" name="artistId" placeholder="Nome do Artista:" onChange={(e)=>setArtistId(e.target.value)}/>
            <Label htmlFor="link">Link da Música</Label>
            <Inputs type="text" id="link" name="link" placeholder="Informe link para a Música:" onChange={(e)=>setLink(e.target.value)}/>
            <Label htmlFor="link_image">Link da Imagem da Música:</Label>
            <Inputs type="text" id="link_image" name="link_image" placeholder="Informe o Link da Imagem:" onChange={(e)=>setImage(e.target.value)}/>
            <SendButton type="submit" id="submit_track_button" name='submit_track_button'  placeholder="Enviar" />
        </Form>
    </ContainerForm>
)
}

const ContainerForm = styled.div`
    margin-top:120px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;

`
const Label = styled.label`
    font-size: 16px;
    margin-bottom: 5px;
    color: #ffffff;
    text-align: center;
`
const Inputs = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #1E90FF;
        box-shadow: 0 0 5px rgba(30, 144, 255, 0.5); 
    }
`
const SendButton = styled.input`
    margin-top: 5px;
    background-color: #1E90FF;
    color: #fff;
    padding: 8px 20px; 
    border: none;
    margin-left: 5px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    font-size: 16px; 
    font-weight: bold; 

    &:hover {
        background-color: #4682B4; 
    }
`