import React from 'react';
import { Button } from '@material-ui/core';

import useConfirm from '../../../../utils/useConfirm';
import { getEncryptId } from '../../../../utils/secure';

export default function TableTr(props) {

    const { id, role_name, description } = props.role;

    const { sr, deleteData, currentPage, perPage } = props;

    const encId = getEncryptId(id);

    const editLink = `role-edit/${encId}`;

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'Role');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
            <tr>
                <td className="text-center">{newSr}</td>
                <td>{role_name}</td>
                <td>{description}</td>
                <td className="text-center">
                    <Button
                        href={`/#/${editLink}`}
                        size="small"
                        variant="contained"                        
                        className="grey-btn-mui mr-3"
                        >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        className="black-btn-mui mr-3"
                        onClick={showDialog}
                        >
                        Delete
                    </Button>
                </td>
            </tr>
    )
}

