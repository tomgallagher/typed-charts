import React, { useState } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { AnimatedBarChart } from '../chartComponents/animatedBarChart';

export const AnimatedBarExample = () => {
    const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75].map((x) => ({ value: x })));

    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Animated Bar Chart</Header>
            <AnimatedBarChart data={data} />
            <div className='chartControls'>
                <Button onClick={() => setData(data.map((x) => ({ ...x, value: x.value + 5 })))}>Update</Button>
                <Button onClick={() => setData(data.filter((x) => x.value < 75))}>Filter</Button>
            </div>
        </div>
    );
};
