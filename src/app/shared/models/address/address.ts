import { City } from "../city/city"
import { District } from "../district/district"
import { Zone } from "../zone/zone"

export interface Address {
    name?: string ,
    street?: string,
    buildingNo?: number,
    landMark?:  string,
    isDefault?: boolean,
    city?: City
    lat?: any,
    long?: any,
    location?: string,
    icon?: number,
    district?: District
    zone?: Zone
    id?: number
}
