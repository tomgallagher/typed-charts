import React, { useState } from 'react';
import { Header, Dropdown, DropdownProps } from 'semantic-ui-react';
import data from './../data_files/custom.geo.json';
import { WorldMap } from '../chartComponents/worldMap';

const options = [
    { key: 'pop_est', text: 'Population', value: 'pop_est' },
    { key: 'name_len', text: 'Name Length', value: 'name_len' },
    { key: 'gdp_md_est', text: 'GDP', value: 'gdp_md_est' },
];

export const WorldMapExample = () => {
    const [property, setProperty] = useState<string | null>(null);
    const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setProperty(String(data.value));
    };
    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>World Map</Header>
            <WorldMap data={data} property={property} />
            <div className='chartControls'>
                <Dropdown placeholder='Select Property' fluid selection options={options} onChange={handleChange} />
            </div>
        </div>
    );
};
