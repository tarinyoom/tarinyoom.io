import Menu from "../Menu";

function Zodiac() {
	return (
		<div className="App">
			<Menu />
			<h1>
				Zo:diac: NLP-Generated Horoscopes
			</h1>
			<h4>
				<a href="https://zodiac.tarinyoom.io/">Click here to try out the demo!</a>
			</h4>
			<p>
				Zo:diac is an NLP-driven horoscope generator, created 
				for the <a href="https://lablab.ai/event/generative-ai-hackathon">co:here Generative AI Hackathon</a>.
				You can use zo:diac to generate a horoscope based on your birthday, and then ask for follow-up advice based on 
				topics that you specify.<br />
				Zo:diac uses a serverless backend hosted using <a href="https://workers.cloudflare.com/">Cloudflare</a>.
				The frontend was written in <a href="https://create-react-app.dev/">React</a>. (<a href="https://github.com/tarinyoom/zodiac">repo</a>).
			</p>
		</div>
	);
}

export default Zodiac;
