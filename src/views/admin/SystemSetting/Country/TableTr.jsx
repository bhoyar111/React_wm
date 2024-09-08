import React from 'react';
import { Link } from '@material-ui/core';

export default function TableTr(props) {

    const { _id, technology_name } = props.techno;

    const { sr, currentPage, perPage } = props;


   const topicLink = `topic/${_id}`;

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
            <tr>
                <td className="text-center">{newSr}</td>
                <td>
                    <Link
                        href={`/#/${topicLink}`}
                        variant="contained"
                        color="blue"
                        title="topic add/edit"
                        >
                          {technology_name}
                    </Link>
                </td>
            </tr>
    )
}

