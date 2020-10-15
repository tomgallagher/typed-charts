import React, { useState } from 'react';
import { Header, Divider, Button, Statistic } from 'semantic-ui-react';
import { useInterval } from '../hooks/useInterval';
import { RacingBarChart } from '../chartComponents/racingBar/racingBarChart';

const getRandomIndex = (array: any[]) => {
    return Math.floor(array.length * Math.random());
};
const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const RacingBarExample = () => {
    const [iteration, setIteration] = useState(0);
    const [start, setStart] = useState(false);
    const [data, setData] = useState([
        {
            name: 'alpha',
            value: 10,
            color: getRandomColor(),
        },
        {
            name: 'beta',
            value: 15,
            color: getRandomColor(),
        },
        {
            name: 'charlie',
            value: 20,
            color: getRandomColor(),
        },
        {
            name: 'delta',
            value: 25,
            color: getRandomColor(),
        },
        {
            name: 'echo',
            value: 30,
            color: getRandomColor(),
        },
        {
            name: 'foxtrot',
            value: 35,
            color: getRandomColor(),
        },
    ]);

    useInterval(() => {
        if (start) {
            //picl a random entry to increment
            const randomIndex = getRandomIndex(data);
            //change the data in state
            setData(
                data.map((entry, index) =>
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
        <div className='App'>
            <Header textAlign='center'>Racing Bar Chart</Header>
            <RacingBarChart data={data} />
            <Divider hidden />
            <Button onClick={() => setStart(!start)}>{start ? 'Stop the race' : 'Start the race!'}</Button>
            <Statistic floated='right'>
                <Statistic.Value>{iteration}</Statistic.Value>
                <Statistic.Label>Iterations</Statistic.Label>
            </Statistic>
        </div>
    );
};
