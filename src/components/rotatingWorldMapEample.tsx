import React, { useState } from 'react';
import { Header, Dropdown, DropdownProps } from 'semantic-ui-react';
import data from './../data_files/custom.geo.json';
import { RotatingWorldMap } from '../chartComponents/rotatingWorldMap';

const options = [
    { key: 'pop_est', text: 'Population', value: 'pop_est' },
    { key: 'name_len', text: 'Name Length', value: 'name_len' },
    { key: 'gdp_md_est', text: 'GDP', value: 'gdp_md_est' },
];

export const RotatingWorldMapExample = () => {
    const [property, setProperty] = useState<string>('pop_est');
    const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setProperty(String(data.value));
    };
    return (
        <div className='chartWrapper'>
            <Header textAlign='center'>Rotating Globe</Header>
            <RotatingWorldMap data={data} property={property} />
            <div className='chartControls'>
                <Dropdown placeholder='Select Property' fluid selection options={options} onChange={handleChange} />
            </div>
        </div>
    );
};
