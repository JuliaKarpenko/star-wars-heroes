import React, { useEffect, useState } from "react";
import ReactFlow, {
	Node,
	Edge,
	Background,
	Controls,
	useEdgesState,
	useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { getHeroDetails } from "../../api/heroApi"; // Request to get hero details
import { fetchFilmsByHero } from "../../api/filmApi"; // Query to get movie details
import { fetchStarshipsByFilm } from "../../api/starshipApi"; // Query for getting ship details
import { Hero } from "../../models/hero";

interface HeroGraphProps {
	heroId: number; // the heroId parameter passed from the parent component
}

const HeroGraph: React.FC<HeroGraphProps> = ({ heroId }) => {
	const [hero, setHero] = useState<Hero>();
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Getting information about the hero
				const heroData = await getHeroDetails(heroId);
				setHero(heroData);

				// Get movies with a hero in them
				const filmsData = await fetchFilmsByHero(heroId);

				// Get spaceships for each movie
				const starshipPromises = filmsData.results.map((film) =>
					fetchStarshipsByFilm([film.id], heroId)
				);
				const starshipResults = await Promise.all(starshipPromises);

				// Combining all spaceships into one array
				const allStarships = starshipResults.flatMap(
					(result) => result.results
				);

				// Create nodes for the graph
				const heroNode: Node = {
					id: `hero-${heroId}`,
					data: { label: heroData.name },
					position: { x: 250, y: 50 },
					type: "default",
				};

				const filmNodes: Node[] = filmsData.results.map((film, index) => ({
					id: `film-${film.id}`,
					data: { label: film.title },
					position: { x: 100 + 200 * index, y: 150 },
					type: "default",
				}));

				const starshipNodes: Node[] = allStarships.map((starship, index) => ({
					id: `starship-${starship.id}`,
					data: { label: starship.name },
					position: { x: 100 + 35 * index, y: 350 },
					type: "default",
				}));

				setNodes([heroNode, ...filmNodes, ...starshipNodes]);

				// Create edges for the graph
				const filmEdges: Edge[] = filmsData.results.map((film) => ({
					id: `edge-hero-film-${film.id}`,
					source: `hero-${heroId}`,
					target: `film-${film.id}`,
					type: "default",
				}));

				// Create links between each movie and the spaceships associated with that movie
				let starshipEdges: Edge[] = [];
				starshipResults.forEach((starshipResult, filmIndex) => {
					const film = filmsData.results[filmIndex]; // Take a suitable movie

					starshipResult.results.forEach((starship) => {
						starshipEdges.push({
							id: `edge-film-starship-${film.id}-${starship.id}`,
							source: `film-${film.id}`,
							target: `starship-${starship.id}`,
							type: "default",
						});
					});
				});

				setEdges([...filmEdges, ...starshipEdges]);
			} catch (error) {
				console.error("Error loading data for hero graph", error);
			}
		};

		fetchData();
	}, [heroId]);

	return (
		<div style={{ height: 500, width: "100%" }}>
			<h3>Graph for Hero: {hero?.name}</h3>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default HeroGraph;
