import React from 'react';
import { Grid } from 'semantic-ui-react';
import { RacingBarExample } from '../components/racingBarExample';
import { LineExample } from '../components/lineExample';
import { AnimatedBarExample } from '../components/animatedBarExample';

function Charts() {
    return (
        <Grid stackable padded relaxed celled='internally'>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    <RacingBarExample />
                </Grid.Column>
                <Grid.Column>
                    <LineExample />
                </Grid.Column>
                <Grid.Column>
                    <AnimatedBarExample />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Charts;
