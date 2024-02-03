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
import SelectInput from '@/components/SelectInput';

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
        toast.success(`company created successfuly`)
      } else {
        if (company) {
          res = await updateCompany(data, company.id)
          id = res;
          toast.success(`company info updated successfuly`)
        }
      }
      if (res.error) {
        toast.success(`${res.error.status} ${res.error.message}`)
        throw new Error(res.error);
      }
      router.push(`/company/details/${id}`)
    } catch (error: any) {
      toast.error(error.status + ' ' + error.message + ' or there is no changes.')
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={ handleSubmit(onSubmit) }>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='اسم الشركة' name='companyName'
          control={control}
          rules={{ required: 'Company name is required' }} />

        <Input label='كود الشركة' name='code'
          control={control}
          rules={{ required: 'Company code is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='اسم الشركة القديم'
          name='oldComericalName' control={control}
          rules={{ required: 'old comerical name is required' }} />

        <Input label='رقم الهاتف'
          name='phoneNumber' control={control}
          rules={{ required: 'Phone number is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='العنوان' name='address'
          control={control}
          rules={{ required: 'Address is required' }} />

        <Input label='ملاحظات' name='notes' control={control}
          rules={{ required: 'Notes is required' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='رقم السجل التجاري'
          name='commercialRegistrationNo' control={control}
          rules={{ required: 'Commercial registration number. is required' }} />

        <Input label='رقم الرخصة' name='licenceNo'
          control={control}
          rules={{ required: 'Licence no. is required' }} />
      </div>


      <Input label='المخالفات و العقوبات'
        name='violationsAndPenalties'
        control={control}
        rules={{ required: 'Violations and penalties is required' }} />

      <Input label='الشكاوي'
        name='complianceOfficer'
        control={control}
        rules={{ required: 'Compliance officer is required' }} />

      <div className='grid grid-cols-4 gap-4'>
        <Input label='رسوم الطلب' name='applicationFee' control={control} type='number'
          rules={{ required: 'Application Fee is required' }} />

        <Input label='رأس المال' name='companyCapital' control={control} type='number'
          rules={{ required: 'Company Capital is required' }} />

        <Input label='رسوم الرخصة' name='licenceFee' control={control} type='number'
          rules={{ required: 'Licence Fee is required' }} />

        <Input label='الضمانة المالية' name='financialGuarantee' control={control} type='number'
          rules={{ required: 'Financial Guarantee is required' }} />
      </div>

      {pathname === '/company/create' &&
        <>
          <div className='grid grid-cols-4 gap-4'>
            <DateInput
              label='تاريخ تقديم الطلب'
              name='dateOfApplication'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of application is required' }} />

            <DateInput
              label='تاريخ طلب الرخصة'
              name='licenceRequestDate'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Licence request date is required' }} />

            <DateInput label='تاريخ الانشاء'
              name='createDate'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Create date is required' }} />

            <DateInput label='تاريخ الموافقة المبدأية'
              name='dateOfPreliminaryApproval'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of preliminary approval is required' }} />
          </div>
        </>}

        <div className='grid grid-cols-2 gap-4'>
        <SelectInput
          label='نوع الشركة'
          name='companyType'
          control={control}
          rules={{ required: 'Company type is required' }}
          options={[
            { label: 'مكتب', value: 'مكتب' },
            { label: 'شركة', value: 'شركة' },
          ]}
        />
      </div>

      <div className='flex justify-between gap-2 items-center'>
        <Button outline color='gray' onClick={() => { router.push('/') }} >الغاء</Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline color='success' >حفظ</Button>
      </div>
    </form>
  )
}

export default CompanyForm