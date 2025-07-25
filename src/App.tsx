import {Link} from 'react-router-dom';

import './App.css';

import AutoLayout from './ui/AutoLayout';
import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import HalfPinEditor from './ui/HalfPinEditor';
import Mirror from './ui/Mirror';
import PinCreator from './ui/PinCreator';
import PinEditor from './ui/PinEditor';
import Generate from './ui/Generate';
import Visualizer from './visualize/Visualizer';
import ConfigBanner from './ui/ConfigBanner';

export default function App() {
	return (
		<div className="App">
                        <header className="App-header">
                                <div>Dovetail Generator</div>
                                <ConfigBanner />
                        </header>
			<div className="Body">
				<div className="BodyLeft">
					<GlobalSettings />
					<GuideSettings />
					<AutoLayout />
					<Mirror />
					<Generate />
				</div>
				<div className="BodyRight">
					<Visualizer />
					<div className="VisualizerTray">
						<PinCreator />
						<PinEditor />
						<HalfPinEditor />
					</div>
				</div>
			</div>
			<div className="Footer">
				<ul>
					<li>&copy; 2021, Robert Bieber</li>
					<li>
						<a href="https://www.github.com/bieber/dovetails/">
							Source code on Github
						</a>
					</li>
					<li>
						<Link to="/instructions">Instructions</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
