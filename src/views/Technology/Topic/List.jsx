import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { useParams } from "react-router-dom";

import PageHeader from '../../../containers/PageHeader';
import { AuthApi } from '../../../utils/api';

import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import TableTr from './TableTr';

export default function List() {

    const { technology_id } = useParams();

    const permission = localStorage.getItem("user_data");
    const newPermission = JSON.parse(permission);
    const rolePermission = newPermission?.user.role == "admin" ? true : false;

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [topics, setStages] = useState([]);
    const [technologies, setTechnologies] = useState([]);

    const getListing = async (pgNO) => {
        if (!technology_id) {
            console.error("No technology_id provided");
            return;
        }
        try {
            const listResponse = await AuthApi.get(`/topics/${technology_id}?pageNo=${pgNO}`);
            const { status, data } = listResponse;
            if (status === 200) {
                if (data.topics !== undefined) {
                    const filteredTopics = data.topics.filter(topic => !topic.isDeleted);
                    setStages(filteredTopics);
                }
                if (data.technology !== undefined) setTechnologies(data.technology);
                const { pagination: { per_page, total_record } } = data || {};
                setPerPage(per_page);
                setTotalRecords(total_record);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const deleteData = async (_id) => {
        try {
            const deleteResponse = await AuthApi.delete(`/topic-delete/${_id}`);
            console.log(deleteResponse, 'deleteResponse');
            const { status, data } = deleteResponse;
            toast.success(`Topic deleted successfully`);
            getListing(currentPage);
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
            <CRow>
                <CCol xl={12}>
                    <CCardHeader>
                        <div className="d-flex justify-content-between pt-3">
                            <p className="title mb-1"><b>Technology:-{technologies != undefined ? technologies.technology_name : ''}</b></p>
                            <CButton href={`/#/technologies`} color="secondary" size="small" className="ml-3 text-back">Back</CButton>
                        </div>
                    </CCardHeader>
                    <CCard>
                        {rolePermission ? (
                            <CCardHeader>
                                <PageHeader
                                    title="Topic Listing"
                                    addlink={`topic-add/${technology_id}`}
                                />
                            </CCardHeader>
                        ) : (
                            ""
                        )}
                        <CCardBody>
                            <table className="table bg-white white-table library-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center" style={{ width: '100px' }}>Sr. No</th>
                                        <th scope="col" style={{ width: '150px' }}>Topic Name</th>
                                        <th scope="col" style={{ width: '200px' }}>Document</th>
                                        <th scope="col" style={{ width: '200px' }}>URL</th>
                                        <th scope="col" style={{ width: '100px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        topics && topics.map((topic, i) => (
                                            <TableTr
                                                sr={i + 1}
                                                key={i}
                                                topic={topic}
                                                currentPage={currentPage}
                                                perPage={perPage}
                                                deleteData={deleteData}
                                                rolePermission={rolePermission}
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
        </>
    )
}
