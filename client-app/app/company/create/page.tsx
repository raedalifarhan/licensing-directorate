import React from 'react'
import CompanyForm from '../CompanyForm'
import Headings from '@/components/company/Headings'

const Create = () => {
  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
      <Headings title='Add New Company' subtitle='Please enter the details of your company.' />
      <CompanyForm />
    </div>
  )
}

export default Create