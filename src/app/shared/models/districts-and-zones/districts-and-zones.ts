import { District } from "../district/district";
import { Zone } from "../zone/zone";

export interface DistrictsAndZones {
    zones?: Zone[],
    districts?: District[];
}
