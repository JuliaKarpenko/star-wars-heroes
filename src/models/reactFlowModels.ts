export interface GraphNode {
	id: string;
	type: "starship" | "film";
	data: {
		label: string;
		model?: string;
		manufacturer?: string;
		film?: string;
	};
	position: { x: number; y: number };
}

export interface GraphEdge {
	id: string;
	source: string;
	target: string;
	type?: string;
}

export interface GraphData {
	nodes: GraphNode[];
	edges: GraphEdge[];
}
