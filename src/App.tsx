import React, { useState } from "react";
import HeroList from "./components/HeroList/HeroList"; // component for displaying a list of heroes
import HeroGraph from "./components/HeroGraph/HeroGraph"; // component for displaying a graph with details of the hero
import "./App.css";
import Header from "./components/Header/Header";

const App: React.FC = () => {
	// State for storing the selected hero
	const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

	// Function for handling hero selection
	const handleHeroSelect = (id: number) => {
		setSelectedHeroId(id);
	};

	return (
		<div className="App">
			<Header />
			<div className="container">
				<HeroList onHeroSelect={handleHeroSelect} />
				{selectedHeroId && <HeroGraph heroId={selectedHeroId} />}
			</div>
		</div>
	);
};

export default App;
