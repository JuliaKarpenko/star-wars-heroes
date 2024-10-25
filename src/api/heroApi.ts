import axios from "axios";
import { Hero, Heroes } from "../models/hero";
import { PEOPLE_API_URL } from "../api/apiUrls";

// Request to get list of heroes
export const getHeroes = async (): Promise<Heroes> => {
	const response = await axios.get(`${PEOPLE_API_URL}`);
	return response.data;
};

export const getHeroesPagination = async (url: string): Promise<Heroes> => {
	const response = await axios.get(`${url}`);
	return response.data;
};

// Request to get details about the hero
export const getHeroDetails = async (id: number): Promise<Hero> => {
	const response = await axios.get(`${PEOPLE_API_URL}${id}/`);
	return response.data;
};
