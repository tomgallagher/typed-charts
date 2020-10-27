import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { useDomToJson } from './../hooks/useDomToJson';
import { AnimatedTreeChart } from './../chartComponents/animatedTreeChart';

export const AnimatedTreeExample = () => {
    const jsonData = useDomToJson(document.getElementById('root'));

    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Animated Dom Tree Chart</Header>
            <AnimatedTreeChart data={jsonData} />
            <div className='chartControls'>
                <Button>Update</Button>
            </div>
        </div>
    );
};
