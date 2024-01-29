'use server'

import { fetchWrapper } from '@/lib/fetchWrapper';
import { Company, PagedResult } from '@/types';
import { CompanyDetailedView } from '@/types/company_details';
import { revalidatePath } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export async function getData(query: string): Promise<PagedResult<Company>> {
    try {
        return await fetchWrapper.get(`companies${query}`);
    } catch (error) {
        console.error('Error during fetch:', error);
        throw new Error('Failed to fetch data.');
    }
}

export async function createCompany(data: FieldValues) {
    try {
        return await fetchWrapper.post(`companies`, data);
    } catch (error) {
        console.error('Error during saving data:', error);
        throw new Error('Error during saving data.');
    }
}

export async function getDetailedViewData(id: string): Promise<CompanyDetailedView> {
    const res = await fetchWrapper.get(`companies/${id}`);
    revalidatePath(`companies/${id}`);
    return res;
}

export async function updateCompany(data: FieldValues, id: string) {
    try {
        const res = await fetchWrapper.put(`companies/${id}`, data);
        revalidatePath(`companies/${id}`);
        return res;
    } catch (error) {
        console.error('Error during saving data:', error);
        throw new Error('Error during saving data.');
    }
}

export async function UploadFile(formData: FormData) {
    try {
        const res = await fetchWrapper.uploadFile(`companies/upload`, formData);
        revalidatePath(`companies/upload`);
        return res;
    } catch (error) {
        console.error('Error during saving data:', error);
        throw new Error('Error during saving data.');
    }
}