import {atom} from "recoil";
import {CoordsOrNull} from "../types/GeneralTypes";

export const ModifiedElement = atom({
    key: 'ModifiedElement',
    default: null as CoordsOrNull
})