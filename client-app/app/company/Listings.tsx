'use client'

import { useParamsStore } from '../../hooks/useParamsStore';
import { Company, PagedResult } from '@/types';
import { useEffect, useState } from 'react';
import { getData } from '../actions/companyActions';
import Filters from '@/app/company/Filters';
import CompanyCard from './CompanyCard';
import AppPagination from '@/components/company/AppPagination';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';

const Listings = () => {

    const [data, setData] = useState<PagedResult<Company>>();

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm
    }), shallow)

    const setParams = useParamsStore(state => state.setParams)
    
    const url: string = qs.stringifyUrl({ url: '', query: params });
    function setPageNumber(pageNumber: number) {
        setParams({pageNumber})
    }

    useEffect(() => {
        getData(url).then(data => {
            setData(data);
        })
    }, [url])

    if (!data) return <h3>Loading...</h3>

    return (
        <>
            <Filters />
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {data && data.data &&  data.data.map(company => (
                    <CompanyCard company={company} key={company.id} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination pageChanged={setPageNumber}
                    pageCount={data.pageCount} pageNumber={data.pageNumber} />
            </div>
        </>
    )
}

export default Listings