import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function Albums({ album, handleAlbums }) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 240, width: 210 }}
          image={album.LinkImagemCapa}
          title="Album Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {album.Título}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ano: {album.Ano}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Artista: {album.Artista}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            size="small"
            onClick={() => handleAlbums(album.id, album.Título)}
          >
            Ver Álbum
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Albums;
