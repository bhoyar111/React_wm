import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CCard, CCardBody, CCol, CRow, CWidgetDropdown } from '@coreui/react';
import Pagination from "react-js-pagination";

import TableTr from './TableTr';
import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

export default function List() {

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [technologies, setTechnology] = useState([]);

    const permission = localStorage.getItem("user_data");
    const newPermission = JSON.parse(permission);
    const rolePermission = newPermission?.user.role == "admin" ? true : false;

    const getListing = async (pgNO) => {
        try {
            const listResponse = await AuthApi.get(`/technologies?pageNo=${pgNO}`);
            const { status, data } = listResponse;
            if (status === 200 && data.technologies !== undefined) {
                setTechnology(data.technologies);
                const { pagination: { per_page, total_record } } = data || {};
                setPerPage(per_page);
                setTotalRecords(total_record);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const deleteData = async (id) => {
        try {
            const deleteResponse = await AuthApi.delete(`/admin/country-delete/${id}`);
            const { status, data } = deleteResponse;
            if (status === 200 && data.country !== undefined) {
                toast.success(`Country deleted successfully`);
                getListing(currentPage);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const getClickedPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
        getListing(pageNumber);
    }

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

    const getTextByTechnologyName = (name) => {
        switch (name.toLowerCase()) {
            case 'python':
                return '05';
            case 'reactjs':
                return '04';
            case 'nodejs':
                return '03';
            case 'expressjs':
                return '01';
            case 'angular':
                return '02';
            case 'mongodb':
                return '01';
            case 'mysql':
                return '0';
            case 'postgresql':
                return '0';
            case 'ai/ml':
                return '0';
            default:
                return '0';
        }
    };

    useEffect(() => {
        getListing(currentPage)
    }, []);

    return (
        <>
            {rolePermission ? (
                <CRow>
                    <CCol xl={12}>
                        <CCard>
                            <CCardBody>
                                <table className="table bg-white white-table library-table mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No</th>
                                            <th scope="col">Technology Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            technologies && technologies.map((techno, i) => (
                                                <TableTr
                                                    sr={i + 1}
                                                    key={i}
                                                    techno={techno}
                                                    deleteData={deleteData}
                                                    currentPage={currentPage}
                                                    perPage={perPage}
                                                />
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="d-flex flex-row py-4 justify-content-center">
                                    <Pagination
                                        activePage={currentPage}
                                        prevPageText='prev'
                                        nextPageText='next'
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        pageRangeDisplayed={5}
                                        itemsCountPerPage={perPage}
                                        totalItemsCount={totalRecords}
                                        onChange={getClickedPageNo}
                                    />
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <CRow>
                    {technologies.map((tech, index) => (
                        <CCol key={index} sm="6" lg="3">
                            <Link to={`/topic/${tech._id}`} style={{ textDecoration: 'none' }}>
                                <CWidgetDropdown
                                    color={getColorByTechnologyName(tech.technology_name)}
                                    header={tech.technology_name}
                                    text={getTextByTechnologyName(tech.technology_name)}
                                >
                                </CWidgetDropdown>
                            </Link>
                        </CCol>
                    ))}
                </CRow>
            )}
        </>
    )
}
