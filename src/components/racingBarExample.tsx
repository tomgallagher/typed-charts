import React, { useState } from 'react';
import { Header, Button, Statistic } from 'semantic-ui-react';
import { useInterval } from '../hooks/useInterval';
import { useRacingBarData } from '../hooks/useRacingBarData';
import { RacingBarChart } from '../chartComponents/racingBarChart';

const getRandomIndex = (array: any[]) => {
    return Math.floor(array.length * Math.random());
};

export const RacingBarExample = () => {
    const [iteration, setIteration] = useState(0);
    const [start, setStart] = useState(false);
    //custom hook to transform data into format expected by the chart
    const [racingBarData, setRacingData] = useRacingBarData([10, 15, 20, 25, 30, 35].map((x) => ({ value: x })));

    useInterval(() => {
        if (start) {
            //picl a random entry to increment
            const randomIndex = getRandomIndex(racingBarData);
            //change the data in state
            setRacingData(
                racingBarData.map((entry, index) =>
                    //if index is chosen, increment value by 10
                    index === randomIndex
                        ? {
                              ...entry,
                              value: entry.value + 10,
                          }
                        : entry
                )
            );
            //increment the iteration counter
            setIteration(iteration + 1);
        }
    }, 500);

    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Racing Bar Chart</Header>
            <RacingBarChart data={racingBarData} />
            <div className='chartControls'>
                <Button onClick={() => setStart(!start)}>{start ? 'Stop the race' : 'Start the race!'}</Button>
                <Statistic style={{ margin: '0px' }}>
                    <Statistic.Value>{iteration}</Statistic.Value>
                    <Statistic.Label>Iterations</Statistic.Label>
                </Statistic>
            </div>
        </div>
    );
};
