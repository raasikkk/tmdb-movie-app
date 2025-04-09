export type MovieType = {
    id: number;
    adult: boolean;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export type DataType = {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: MovieType[];
    total_pages: number;
    total_results: number;
}