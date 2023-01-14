import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProjectCard({title, img, description, demo, src}:
  {title: string, img: string, description: string, demo: string, src: string}) {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={demo} target="_blank" rel="noopener noreferrer">
          <Button size="large">Demo</Button>
        </a>
        <a href={src} target="_blank" rel="noopener noreferrer">
          <Button size="large">Source</Button>
        </a>
        
      </CardActions>
    </Card>
  );
}
