import ProjectCard from "./ProjectCard";
import { Grid } from "@mui/material";
import zodiac from './img/zodiac.png';
import sonic from './img/sonic.png';
import AppBar from './MyAppBar';

function Home() {
	return (
	  <div className="App">
		<AppBar />

		<Grid
			container
			spacing={3}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
			>

			<Grid item />

			<Grid item>
				<ProjectCard
					title="ODE Integrator"
					img={sonic}
					description="Parallelized numerical integration of 2nd order ODEs. Plays an animation with sound to show solution trajectories."
					demo="https://ode.tarinyoom.io"
					demoLinkName="Demo"
					src="https://github.com/tarinyoom/ode-integrators"
					technologies={["typeScript", "d3", "tone", "react", "rust", "lambda", ]} />
			</Grid>

			<Grid item>
				<ProjectCard
					title="Zo:diac"
					img={zodiac}
					description="NLP-driven horoscope generator, created for the co:here Generative AI Hackathon.
					Made in collaboration with Aditya Tuladhar."
					demo="https://zodiac.tarinyoom.io"
					demoLinkName="Demo"
					src="https://github.com/tarinyoom/zodiac"
					technologies={["typeScript", "react", "node", "workers"]} />
			</Grid>
			<Grid item />
		</Grid>
	  </div>
	);
  }
  
export default Home;
