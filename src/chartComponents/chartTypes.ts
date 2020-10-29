import { v4 as uuidv4 } from 'uuid';

export enum ChartType {
    RacingBar = 'racingBar',
    Bar = 'bar',
    Line = 'line',
}

export const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export class RacingBarData {
    name: string;
    value: number;
    color: string;
    unique_id: string;
    //set default values for name, number, color and unique id
    constructor(item: any) {
        this.name = item.name || 'No Name';
        this.value = item.value || 0;
        this.color = item.color || getRandomColor();
        this.unique_id = item.unique_id || uuidv4();
    }
}
