import React, { useState } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export const Navigation = () => {
    const [active, setActive] = useState('charts');
    let history = useHistory();

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: any) => {
        setActive(data.name);
        history.push(`/${data.name}`);
    };

    return (
        <Menu stackable size='large'>
            <Menu.Item>
                <Image
                    src='https://camo.githubusercontent.com/586ccf0aad9684edc821658cee04146cf36d1f1d5ec904bbefd72728909ccb2e/68747470733a2f2f64336a732e6f72672f6c6f676f2e737667'
                    size='mini'
                />
            </Menu.Item>

            <Menu.Item name='charts' active={active === 'charts'} onClick={handleItemClick}>
                Charts
            </Menu.Item>
            <Menu.Item name='maps' active={active === 'maps'} onClick={handleItemClick}>
                Maps
            </Menu.Item>
            <Menu.Item name='visuals' active={active === 'visuals'} onClick={handleItemClick}>
                Visuals
            </Menu.Item>
            <Menu.Item>
                <Image
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbErme3WHnTAJjqqKRVlsnc6gfSTHFS_AfRA&usqp=CAU'
                    size='mini'
                    rounded={true}
                />
            </Menu.Item>
        </Menu>
    );
};
