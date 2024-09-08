import React from 'react';
import { Button } from '@material-ui/core';
import { SERVER_BASE_URL } from '../../../utils/api';
import useConfirm from '../../../utils/useConfirm';

export default function TableTr(props) {

    const { _id, topic_name, document, url } = props.topic;
    const { sr, currentPage, perPage, deleteData, rolePermission } = props;
    const newSr = ((currentPage - 1) * perPage) + sr;

    const deleteSubmit = (closeDialog) => {
        deleteData(_id)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'Topic');

    return (
        <tr>
            <td className="text-center">{newSr}</td>
            <td> {topic_name} </td>
            <td>
                <a href={SERVER_BASE_URL + `public/` + document} download target="_blank" style={{ display: 'block', width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Viewer
                </a>
            </td>
            <td> <a href={url} target="_blank" style={{ display: 'block', width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</a> </td>
            <td>
                {rolePermission ? (
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className="black-btn-mui mr-3"
                        onClick={showDialog}
                    >
                        Delete
                    </Button>
                ) : ("-")
                }

            </td>
        </tr>
    )
}

