export type MovieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type DataType = {
    page: number;
    results: MovieType[];
    total_pages: number;
    total_results: number;
}

export type CastType = {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_deparment: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export type CrewType = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_deparment: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}