import axios from "axios";
import { Films } from "../models/film";
import { FILMS_API_URL } from "../api/apiUrls";

// Request to receive a list of movies by hero
export const fetchFilmsByHero = async (heroId: Number): Promise<Films> => {
	const response = await axios.get(`${FILMS_API_URL}?characters=${heroId}`);
	return response.data;
};
