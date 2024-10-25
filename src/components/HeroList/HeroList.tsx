import React, { useEffect, useState } from "react";
import { getHeroes } from "../../api/heroApi"; // import for the request to fetch heroes
import { Hero } from "../../models/hero"; // import for the hero interface
import "./HeroList.css";

interface HeroListProps {
	onHeroSelect: (id: number) => void; // prop for handling hero selection
}

const HeroList: React.FC<HeroListProps> = ({ onHeroSelect }) => {
	const [heroes, setHeroes] = useState<Hero[]>([]); // state to store the list of heroes
	const [loading, setLoading] = useState<boolean>(false); // state to display loading
	const [error, setError] = useState<string | null>(null); // state for error handling

	useEffect(() => {
		// Function to load heroes from API
		const fetchHeroes = async () => {
			setLoading(true);
			try {
				const data = await getHeroes(); // fetching heroes from the API
				setHeroes(data.results); // storing the list of heroes
				setLoading(false);
			} catch (error) {
				setError("Failed to load heroes");
				setLoading(false);
			}
		};

		fetchHeroes();
	}, []);

	const handleHeroClick = (id: number) => {
		onHeroSelect(id); // passing selected hero's ID to the parent component (App.tsx)
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			<h3>Star Wars Heroes</h3>
			<ul className="container-list">
				{heroes.map((hero) => (
					<li
						className="item"
						key={hero.name}
						onClick={() => handleHeroClick(hero.id)}
					>
						<img
							className="img"
							src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
							alt={hero.name}
						/>

						<div className="info">
							<p className="name">{hero.name}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HeroList;
