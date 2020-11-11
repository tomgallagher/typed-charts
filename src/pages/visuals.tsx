import React from 'react';
import { Grid } from 'semantic-ui-react';
import { GameOfLifeExample } from '../components/gameOfLifeExample';
import { AnimatedTreeExample } from '../components/animatedTreeExample';

function Visuals() {
    return (
        <Grid stackable padded relaxed celled='internally'>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <GameOfLifeExample />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <AnimatedTreeExample />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Visuals;
