import { Category } from "../category/category";

export interface Section {
    icon1?: string;
    icon2?: string;
    icon3?: string;
    id?: number
    imagePath?: string;
    name?: string
    categories?: Category[]
}
