
import Headings from '@/components/company/Headings'
import React from 'react'
import CompanyForm from '../../CompanyForm'
import { getDetailedViewData } from '@/app/actions/companyActions';

const Update = async ({params}: {params: {id: string}}) => {

  const data = await getDetailedViewData(params.id);

  if (!data) return <p>Loading...</p>
  
  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
      <Headings title='تعديل بيانات الشركة' subtitle='حدث بيانات الشركة حسب الحاجة' />
      <CompanyForm company={data} />
    </div>
  )
}

export default Update