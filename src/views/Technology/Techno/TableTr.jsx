import React, { useEffect, useState } from 'react';
import { Link } from '@material-ui/core';
import { CCol, CWidgetDropdown } from '@coreui/react';
import { AuthApi } from '../../../utils/api';

export default function TableTr(props) {

    const permission = localStorage.getItem("user_data");
    const newPermission = JSON.parse(permission);
    const rolePermission = newPermission?.user.role === "admin";

    const { _id, technology_name } = props.techno;
    const { sr, currentPage, perPage } = props;

    const [topicCounts, setTopicCounts] = useState(0);

    const topicLink = `topic/${_id}`;
    const newSr = ((currentPage - 1) * perPage) + sr;

    const countTopicData = async () => {
        try {
            const countResponse = await AuthApi.get(`/topic-tech-count/${_id}`);
            const { data } = countResponse;
            setTopicCounts(data.total_record);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    };

    useEffect(() => {
        countTopicData();
    }, [_id]);

    // Ensure the topic count is properly rendered
    const renderTopicCount = topicCounts !== null ? topicCounts : 'Loading...';

    const counts =  `(${renderTopicCount})` 

    // Handle color assignment based on technology name
    const getColorByTechnologyName = (name) => {
        switch (name.toLowerCase()) {
            case 'python':
                return 'gradient-warning';
            case 'reactjs':
                return 'gradient-info';
            case 'nodejs':
                return 'gradient-warning';
            case 'expressjs':
                return 'gradient-success';
            case 'angular':
                return 'gradient-info';
            case 'mongodb':
                return 'gradient-dark';
            case 'mysql':
                return 'gradient-dark';
            case 'postgresql':
                return 'gradient-dark';
            case 'ai/ml':
                return 'gradient-primary';
            default:
                return 'gradient-primary';
        }
    };

    return (
        <>
            {rolePermission ? (
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
            ) : (
                <CCol sm="6" lg="3" key={_id} >
                    <Link href={`/#/${topicLink}`} style={{ textDecoration: 'none' }}>
                        <CWidgetDropdown
                            color={getColorByTechnologyName(technology_name)}
                            header={technology_name}
                            text={counts}
                        />
                    </Link>
                </CCol>
            )}
        </>
    );
}
