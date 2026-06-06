import React, {
    createContext,
    Dispatch,
    SetStateAction,
} from "react";

export type GenerationDetails = {
    ingredients: string[];
    leftovers: string[];
    isChecked: boolean;

};

export type GenerationDetailsType = [
    GenerationDetails,
    Dispatch<SetStateAction<GenerationDetails>>,
];

const initialGenerationDetails: GenerationDetails = {
    ingredients: [],
    leftovers: [],
    isChecked: false,

};

export const GenerationDetailsContext = createContext<GenerationDetailsType>([
    initialGenerationDetails,
    () => { },
]);