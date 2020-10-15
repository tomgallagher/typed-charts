import React from 'react';
import { Grid } from 'semantic-ui-react';
import { RacingBarExample } from './components/racingBarExample';

function App() {
    return (
        <Grid stackable padded relaxed celled='internally'>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    <RacingBarExample />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;
