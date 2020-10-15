import { useState } from 'react';
import { RacingBarData } from './../chartComponents/chartTypes';

//incoming objects in array must at least have a value property
type RaceBarData = {
    name?: string;
    value: number;
    color?: string;
    unique_id?: string;
};

export const useRacingBarData = (initialArray: RaceBarData[]) => {
    //transform the incoming array and set initial state
    const [data, setData] = useState(initialArray.map((item) => new RacingBarData(item)));
    //allow for the data to be updated
    const updataData = (array: RaceBarData[]) => setData(array.map((item) => new RacingBarData(item)));
    // here, we freeze the array to a tuple
    return [data, updataData] as const;
};
