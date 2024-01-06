export interface Recipe {
    pk: number;
    title: string;
    total_time: number;
    description: string;
    instructions: string;
    ingredients_list: string[];
    image: string;
    created_at: Date;
    updated_at: Date;
    yields: string;
    member: string;
    collectors: number;
}