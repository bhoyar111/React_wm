import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import Pagination from "react-js-pagination";

import TableTr from './TableTr';
import { AuthApi } from '../../../utils/api';
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
            const deleteResponse = await AuthApi.delete(`/technology-delete/${id}`);
            const { status, data } = deleteResponse;
            if (status === 200 && data.technology !== undefined) {
                toast.success(`technology deleted successfully`);
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
                    {technologies && technologies.map((techno, i) => (
                        <TableTr
                        sr={i + 1}
                        key={i}
                        techno={techno}
                    />
                    ))}
                </CRow>
                
            )}
        </>
    )
}
