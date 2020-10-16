import React, { useState } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { LineChart } from '../chartComponents/lineChart';

export const LineExample = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75].map((x) => ({ value: x })));

    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Line Chart</Header>
            <LineChart data={data} />
            <div className='chartControls'>
                <Button onClick={() => setData(data.map((x) => ({ ...x, value: x.value + 10 })))}>Update</Button>
                <Button onClick={() => setData(data.filter((x) => x.value > 35))}>Filter</Button>
            </div>
        </div>
    );
};
