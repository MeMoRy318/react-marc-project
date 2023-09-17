import React, { FC, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { IGenre } from '../../interface';


interface IProps {
    children?: ReactNode
    genre: IGenre
}

const GenreBadge: FC<IProps> = ({ genre }) => {

    const { id, name } = genre;
    const navigate = useNavigate();

    const nameLength = name.length * 10;

    return (
        <>
            <span
                style={{
                    background: `rgb(
                    ${Math.ceil(Math.random() * 150) + nameLength}
                    ${Math.ceil(Math.random() * 150) + nameLength}
                    ${Math.ceil(Math.random() * 150) + nameLength}
                      )`,
                    display: 'inline-block',
                    borderRadius: '5px',
                    color: 'white',
                    fontSize: '12px',
                    padding: '1% 2%',
                    cursor: 'pointer',
                    marginLeft: '1%',

                }}
                onClick={() => navigate(`/filter/${id}`)}
            >{name}</span>
        </>
    );
};

export { GenreBadge };
