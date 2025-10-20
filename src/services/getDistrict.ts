import {IDistrict} from "../models/DistrictInterface.ts";
import {DistrictsData} from "../data/DistrictsData.ts";
import {RDP} from "../scripts/RDP.ts";
import {IDistrictData} from "../models/DistrictDataInterface.ts";


export function getDistrict(districtKey: string, resolution: number): IDistrictData | IDistrictData[] {
    if (!districtKey || districtKey === "ALL_DISTRICTS") {
        return DistrictsData.map(d => buildDistrictForMap(d.key, resolution))
    }

    return buildDistrictForMap(districtKey, resolution);
}


function buildDistrictForMap(districtKey: string, resolution: number): IDistrictData {
    const districtRawInfos: IDistrict | undefined = DistrictsData.find(d => d.key === districtKey).districtInfos;
    const districtData: IDistrictData = {
        ...districtRawInfos,
        originalSize: districtRawInfos.coordinates.length,
        numberOfCoordinates: districtRawInfos.coordinates.length
    };

    if (resolution !== 0) {
        const simplifiedCoords = RDP(districtData.coordinates, resolution);
        districtData.coordinates = simplifiedCoords;
        districtData.numberOfCoordinates = simplifiedCoords.length;
    }

    return districtData;
}