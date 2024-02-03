'use client'
import { getDetailedViewData } from '@/app/actions/companyActions';
import CompanyImg from '../../CompanyImg';
import EditButton from '../../update/[id]/EditButton';
import FileUpload from '@/components/FileUpload';
import { useEffect, useState } from 'react';
import { CompanyDetailedView } from '@/types/company_details';
import DispalayDate from '@/components/DispalayDate';
import DownloadButton from '@/components/DownloadButton';

export default function Details({ params }: { params: { id: string } }) {
  const [data, setData] = useState<CompanyDetailedView>();
  const [uploadClick, setUploadClick] = useState(0);

  useEffect( () => {
    getDetailedViewData(params.id).then(res => {
      setData(res);
    });
  }, [uploadClick])

  if (!data) return <p>Loading...</p>

  function updatePage() {
    setUploadClick(10);
  }
  // Perform a null check before using startsWith
  const imageSrc = data.imageUrl && data.imageUrl.startsWith('http')
    ? data.imageUrl
    : `http://localhost:7000/images/${data.imageUrl}`;

  return (
    <>
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow border-b-2 text-slate-700 border-slate-200">
        <div className="grid grid-cols-2 gap-6">
          <div className='w-full aspect-h-15 aspect-w-15 rounded-lg overflow-hidden'>
            {data.imageUrl &&
              <CompanyImg imageUrl={imageSrc} />
            }
          </div>

          <div>
            <div className='my-2'>
              <EditButton id={data.id} />
            </div>

            <strong>اسم الشركة</strong>
            <p className="mb-2">{data.companyName}</p>

            <strong>النمط</strong>
            <p className="mb-2">{data.companyType}</p>

            <strong>الرمز</strong>
            <p className="mb-2">{data.code}</p>

            <strong>رقم السجيل التجاري</strong>
            <p className="mb-2">{data.commercialRegistrationNo}</p>

            <strong>رقم الهاتف</strong>
            <p className="mb-2">{data.phoneNumber}</p>

            <strong>العنوان</strong>
            <p className="mb-2">{data.address}</p>

            <div className='bg-slate-400 h-0.5 my-3'></div>

            <div className='flex flex-col gap-2'>
              <strong>رفع صورة</strong>
              <p className="mb-2" onClick={updatePage}>
                <FileUpload id={data.id} label='image' />
                </p>
            </div>

            <div className='flex flex-col gap-2'>
              <strong>رفع ملف</strong>
              <p className="mb-2"><FileUpload id={data.id} label='file' /></p>
            </div>

            <div className='flex flex-col gap-2 p-5 border-2 border-slate-200 rounded-md'>
              <strong>ملف مرفق</strong>
              <p className="mb-2"><DownloadButton fileName={data.licenseFileAttached || ''} /></p>
            </div>
          </div>

        </div>

        <div className="my-8">
          <strong>معلومات الشركة</strong>
          <p>{data.info}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">تفاصيل الرخصة</h2>
            <strong>رقم الرخصة</strong>
            <p className="mb-2">{data.licenceNo ? data.licenceNo : 'N/A'}</p>

            <strong>حالة الرخصة</strong>
            <p className="mb-2">{data.licenceStatus}</p>

            <strong>حالة طلب الرخصة</strong>
            <p className="mb-2">{data.licenceRequestStatus}</p>

            <strong>تاريخ طلب الرخصة</strong>
            <p className="mb-2"><DispalayDate date={data.licenceRequestDate} /></p>

            <strong>تاريخ الموافقة المبدأية</strong>
            <p className="mb-2"><DispalayDate date={data.dateOfPreliminaryApproval} /></p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">التفاصيل المالية</h2>
            <strong>رأس المال</strong>
            <p className="mb-2">${data.companyCapital!.toLocaleString()}</p>

            <strong>رسوم الطلب</strong>
            <p className="mb-2">${data.applicationFee ? data.applicationFee.toLocaleString() : 'N/A'}</p>

            <strong>رسم الترخيص</strong>
            <p className="mb-2">${data.licenceFee ? data.licenceFee.toLocaleString() : 'N/A'}</p>

            <strong>الضمانة المالية</strong>
            <p className="mb-2">${data.financialGuarantee ? data.financialGuarantee.toLocaleString() : 'N/A'}</p>
          </div>
        </div>

      </div>
    </>
  );
}