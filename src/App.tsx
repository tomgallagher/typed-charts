import React from 'react';
import { Grid } from 'semantic-ui-react';
import { RacingBarExample } from './components/racingBarExample';
import { LineExample } from './components/lineExample';
import { AnimatedBarExample } from './components/animatedBarExample';
import { AnimatedTreeExample } from './components/animatedTreeExample';
import { WorldMapExample } from './components/worldMapExample';
import { RotatingWorldMapExample } from './components/rotatingWorldMapEample';

function App() {
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
            <Grid.Row columns={1}>
                <Grid.Column>
                    <AnimatedTreeExample />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    <WorldMapExample />
                </Grid.Column>
                <Grid.Column>
                    <RotatingWorldMapExample />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;
