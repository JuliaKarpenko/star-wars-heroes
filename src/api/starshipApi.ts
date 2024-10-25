import axios from "axios";
import { Starships } from "../models/starship";
import { STARSHIPS_API_URL } from "../api/apiUrls";

// Request to get a list of spaceships by movie and hero
export const fetchStarshipsByFilm = async (
	filmId: number[],
	heroId: number
): Promise<Starships> => {
	const response = await axios.get(
		`${STARSHIPS_API_URL}?films_in=${filmId}&pilots=${heroId}`
	);
	return response.data;
};
