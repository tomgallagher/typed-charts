import React, { useState } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { useInterval } from '../hooks/useInterval';
import { GameOfLife } from '../chartComponents/gameOfLife';

const SquareGridArray = (rowsColumns: number): boolean[][] => {
    return Array.from(Array(rowsColumns).keys()).map(() => Array(rowsColumns).fill(false));
};

const removeOrphansAndCrowded = (copy: boolean[][]): boolean[][] => {
    let mutated = copy.slice(0);
    copy.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === true) {
                //the square to the left is index - 1 with a floor of 0
                const leftPosition = columnIndex === 0 ? 0 : columnIndex - 1;
                //then we get the item for this , with the current row and the new left position
                const left = copy[rowIndex][leftPosition];
                //the square to the right is index + 1 with a max of row width
                const rightPosition = columnIndex === row.length - 1 ? row.length - 1 : columnIndex + 1;
                //then we get the item for this
                const right = copy[rowIndex][rightPosition];
                //the square to the top is one row above, with the same column index, with a floor of 0
                const topPosition = rowIndex === 0 ? 0 : rowIndex - 1;
                //then we get the item for this
                const top = copy[topPosition][columnIndex];
                //the square under this has the same column index but we need to have the max number of rows, which we get from the copy
                const bottomPosition = rowIndex === copy.length - 1 ? copy.length - 1 : rowIndex + 1;
                //then get the item at this position
                const bottom = copy[bottomPosition][columnIndex];
                //the others we have already worked out
                const topLeft = copy[topPosition][leftPosition];
                const topRight = copy[topPosition][rightPosition];
                const bottomRight = copy[bottomPosition][rightPosition];
                const bottomLeft = copy[bottomPosition][leftPosition];
                const positions = [left, right, top, bottom, topLeft, topRight, bottomRight, bottomLeft];
                //then we want a count of all those that are true
                const liveCount = positions.filter(Boolean).length;
                //if less than 2 then we kill it
                if (liveCount < 2 || liveCount > 3) {
                    mutated[rowIndex][columnIndex] = false;
                }
            }
        });
    });
    return mutated;
};

const addNewBirths = (copy: boolean[][]): boolean[][] => {
    let mutated = copy.slice(0);
    copy.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === false) {
                //the square to the left is index - 1 with a floor of 0
                const leftPosition = columnIndex === 0 ? 0 : columnIndex - 1;
                //then we get the item for this , with the current row and the new left position
                const left = copy[rowIndex][leftPosition];
                //the square to the right is index + 1 with a max of row width
                const rightPosition = columnIndex === row.length - 1 ? row.length - 1 : columnIndex + 1;
                //then we get the item for this
                const right = copy[rowIndex][rightPosition];
                //the square to the top is one row above, with the same column index, with a floor of 0
                const topPosition = rowIndex === 0 ? 0 : rowIndex - 1;
                //then we get the item for this
                const top = copy[topPosition][columnIndex];
                //the square under this has the same column index but we need to have the max number of rows, which we get from the copy
                const bottomPosition = rowIndex === copy.length - 1 ? copy.length - 1 : rowIndex + 1;
                //then get the item at this position
                const bottom = copy[bottomPosition][columnIndex];
                //the others we have already worked out
                const topLeft = copy[topPosition][leftPosition];
                const topRight = copy[topPosition][rightPosition];
                const bottomRight = copy[bottomPosition][rightPosition];
                const bottomLeft = copy[bottomPosition][leftPosition];
                const positions = [left, right, top, bottom, topLeft, topRight, bottomRight, bottomLeft];
                //then we want a count of all those that are true
                const liveCount = positions.filter(Boolean).length;
                //if less than 2 then we kill it
                if (liveCount === 3) {
                    mutated[rowIndex][columnIndex] = true;
                }
            }
        });
    });
    return mutated;
};

export const GameOfLifeExample = () => {
    const [data, setData] = useState<boolean[][]>(SquareGridArray(40));
    const [start, setStart] = useState<boolean>(false);

    const seedArray = () => {
        //so we want 300 seeds, with a position between 0 and 39
        const seeds = Array.from(Array(400).keys()).map((x) => [
            Math.floor(Math.random() * 39),
            Math.floor(Math.random() * 39),
        ]);
        //then we want to create a copy of the data BUT we have to slice(0) otherwise React won't see this as a new array
        const seeded = data.slice(0);
        //then we want to loop through all the values in the seed to mutate individual cells in the data
        seeds.forEach(([x, y]) => {
            //reference with double brackets for 2d array
            seeded[x][y] = true;
        });
        //then set the data
        setData(seeded);
    };

    const mutateArray = () => {
        //this starts the timer that we will eventually use to chage the UI over time
        setStart(!start);
        //create the copy so React knows we have a state change
        const copy = data.slice(0);
        //then kill everything that does not have at least two live neighbours
        const killed = removeOrphansAndCrowded(copy);
        const animated = addNewBirths(killed);
        //then update data
        setData(animated);
    };

    useInterval(() => {
        if (start) {
            //this is where we eventually put the mutate command
        }
    }, 5000);

    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Game of Life</Header>
            <GameOfLife data={data} />
            <div className='chartControls'>
                <Button onClick={seedArray}>Seed Game</Button>
                <Button onClick={mutateArray}>{start ? 'Stop growing' : 'Start growing!'}</Button>
            </div>
        </div>
    );
};
