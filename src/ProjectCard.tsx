import * as React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import d3Logo from './img/logos/d3.png';
import lambdaLogo from './img/logos/lambda.png';
import reactLogo from './img/logos/react.png';
import rustLogo from './img/logos/rust.png';
import toneLogo from './img/logos/tone.png';
import nodeLogo from './img/logos/node.png';
import workersLogo from './img/logos/workers.png';
import typeScriptLogo from './img/logos/typeScript.png';
import RefIcon from './RefIcon';

const TECHNOLOGY_LOOKUP: {[key: string]: {name: string, logo: string, url: string}} = {
  "d3": {
    "name": "d3.js",
    "logo": d3Logo,
    "url": "https://d3js.org/"
  },
  "lambda": {
    "name": "AWS Lambda",
    "logo": lambdaLogo,
    "url": "https://aws.amazon.com/lambda/"
  },
  "react": {
    "name": "React",
    "logo": reactLogo,
    "url": "https://reactjs.org/"
  },
  "rust": {
    "name": "Rust",
    "logo": rustLogo,
    "url": "https://www.rust-lang.org/"
  },
  "tone": {
    "name": "tone.js",
    "logo": toneLogo,
    "url": "https://tonejs.github.io/"
  },
  "node": {
    "name": "node.js",
    "logo": nodeLogo,
    "url": "https://nodejs.org/"
  },
  "workers": {
    "name": "Cloudflare Workers",
    "logo": workersLogo,
    "url": "https://workers.cloudflare.com/"
  },
  "typeScript": {
    "name": "typeScript",
    "logo": typeScriptLogo,
    "url": "https://www.typescriptlang.org/"
  }
}

export default function ProjectCard({title, img, description, demo, demoLinkName, src, technologies}:
  {title: string, img: string, description: string, demo: string, demoLinkName: string, src: string, technologies: string[]}) {
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
      <CardContent>
        <Grid container
          direction="row"
          justifyContent="left">
          {technologies.map((technology) => {
              const traits = TECHNOLOGY_LOOKUP[technology];
              return <RefIcon key={technology} href={traits.url} src={traits.logo} name={traits.name} />
            }
            )}
        </Grid>

      </CardContent>
      <CardActions>
        <a href={demo}>
          <Button size="large">{demoLinkName}</Button>
        </a>
        <a href={src}>
          <Button size="large">Source</Button>
        </a>
        
      </CardActions>
    </Card>
  );
}
