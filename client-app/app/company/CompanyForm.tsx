'use client'

import DateInput from '@/components/DateInput';
import Input from '@/components/Input';
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { createCompany, updateCompany } from '../actions/companyActions';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CompanyDetailedView } from '@/types/company_details';

interface Props {
  company?: CompanyDetailedView
}

const CompanyForm = ({ company }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { control, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
      mode: 'onTouched'
    });

  useEffect(() => {
    if (company) {
      const { violationsAndPenalties, complianceOfficer, companyName, code, licenceNo, oldComericalName, phoneNumber, address, notes, commercialRegistrationNo, applicationFee, companyCapital, licenceFee, financialGuarantee } = company;
      reset({ violationsAndPenalties, complianceOfficer, companyName, code, licenceNo, oldComericalName, phoneNumber, address, notes, commercialRegistrationNo, applicationFee, companyCapital, licenceFee, financialGuarantee });
    }
    setFocus('companyName');
  }, [setFocus])

  async function onSubmit(data: FieldValues) {
    try {
      let id = '';
      let res;
      if (pathname === '/company/create') {
        res = await createCompany(data);
        id = res;
      } else {
        if (company) {
          res = await updateCompany(data, company.id)
          id = res;
        }
      }
      if (res.error) {
        throw new Error(res.error);
      }
      router.push(`/company/details/${id}`)
    } catch (error: any) {
      toast.error(error.status + ' ' + error.message)
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={ handleSubmit(onSubmit) }>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='Company name' name='companyName'
          control={control}
          rules={{ required: 'Company name is required' }} />

        <Input label='Company code' name='code'
          control={control}
          rules={{ required: 'Company code is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='Old comerical name'
          name='oldComericalName' control={control}
          rules={{ required: 'old comerical name is required' }} />

        <Input label='Phone number'
          name='phoneNumber' control={control}
          rules={{ required: 'Phone number is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='Address' name='address'
          control={control}
          rules={{ required: 'Address is required' }} />

        <Input label='Notes' name='notes' control={control}
          rules={{ required: 'Notes is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='Commercial Registration no.'
          name='commercialRegistrationNo' control={control}
          rules={{ required: 'Commercial registration number. is required' }} />

        <Input label='Licence no.' name='licenceNo'
          control={control}
          rules={{ required: 'Licence no. is required' }} />
      </div>


      <Input label='Violations and penalties'
        name='violationsAndPenalties'
        control={control}
        rules={{ required: 'Violations and penalties is required' }} />

      <Input label='Compliance officer'
        name='complianceOfficer'
        control={control}
        rules={{ required: 'Compliance officer is required' }} />

      <div className='grid grid-cols-4 gap-4'>
        <Input label='Application Fee' name='applicationFee' control={control} type='number'
          rules={{ required: 'Application Fee is required' }} />

        <Input label='Company Capital' name='companyCapital' control={control} type='number'
          rules={{ required: 'Company Capital is required' }} />

        <Input label='Licence Fee' name='licenceFee' control={control} type='number'
          rules={{ required: 'Licence Fee is required' }} />

        <Input label='Financial Guarantee' name='financialGuarantee' control={control} type='number'
          rules={{ required: 'Financial Guarantee is required' }} />
      </div>

      {pathname === '/company/create' &&
        <>
          <div className='grid grid-cols-4 gap-4'>
            <DateInput
              label='Date of application'
              name='dateOfApplication'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of application is required' }} />

            <DateInput
              label='Licence request date'
              name='licenceRequestDate'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Licence request date is required' }} />

            <DateInput label='Create date'
              name='createDate'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Create date is required' }} />

            <DateInput label='Date of preliminary approval'
              name='dateOfPreliminaryApproval'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of preliminary approval is required' }} />
          </div>
        </>}
      <div className='flex justify-between gap-2 items-center'>
        <Button outline color='gray' onClick={() => { router.push('/') }} >Cancel</Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline color='success' >Submit</Button>
      </div>
    </form>
  )
}

export default CompanyForm