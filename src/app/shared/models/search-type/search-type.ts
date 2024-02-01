import { SearchTypes } from "../../enums/search-types/search-types";

export interface SearchType {
    name: string,
    typeId?: SearchTypes,
    url?: string
}
