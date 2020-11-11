import React from 'react';
import { Grid } from 'semantic-ui-react';
import { WorldMapExample } from '../components/worldMapExample';
import { RotatingWorldMapExample } from '../components/rotatingWorldMapEample';

function Maps() {
    return (
        <Grid stackable padded relaxed celled='internally'>
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

export default Maps;
