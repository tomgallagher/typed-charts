import React from 'react';
import { Grid } from 'semantic-ui-react';
import { RacingBarExample } from './components/racingBarExample';
import { LineExample } from './components/lineExample';

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
            </Grid.Row>
        </Grid>
    );
}

export default App;
