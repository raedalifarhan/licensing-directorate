
import { getDetailedViewData } from '@/app/actions/companyActions';
import CompanyImg from '../../CompanyImg';
import EditButton from '../../update/[id]/EditButton';
import FileUpload from '@/components/FileUpload';

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);

  if (!data) return <p>Loading...</p>

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

            <strong>Company Name</strong>
            <p className="mb-2">{data.companyName}</p>

            <strong>Type</strong>
            <p className="mb-2">{data.companyType}</p>

            <strong>Code</strong>
            <p className="mb-2">{data.code}</p>

            <strong>Commercial Registration No</strong>
            <p className="mb-2">{data.commercialRegistrationNo}</p>

            <strong>Phone Number</strong>
            <p className="mb-2">{data.phoneNumber}</p>

            <strong>Address</strong>
            <p className="mb-2">{data.address}</p>

            <div className='bg-slate-400 h-0.5 my-3'></div>

            {!data.imageUrl && <div className='flex flex-col gap-2'>
              <strong>Update Image</strong>
              <p className="mb-2"><FileUpload id={data.id} label='image' /></p>
            </div>}

            {!data.licenseFileAttached && <div className='flex flex-col gap-2'>
              <strong>Update File</strong>
              <p className="mb-2"><FileUpload id={data.id} label='file' /></p>
            </div>}
          </div>

        </div>

        <div className="my-8">
          <strong>Company Information</strong>
          <p>{data.info}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Licence Details</h2>
            <strong>Licence No</strong>
            <p className="mb-2">{data.licenceNo ? data.licenceNo : 'N/A'}</p>

            <strong>Licence Status</strong>
            <p className="mb-2">{data.licenceStatus}</p>

            <strong>Licence Request Status</strong>
            <p className="mb-2">{data.licenceRequestStatus}</p>

            <strong>Licence Request Date</strong>
            <p className="mb-2">{data.licenceRequestDate ? data.licenceRequestDate : 'N/A'}</p>

            <strong>Date of Preliminary Approval</strong>
            <p className="mb-2">{data.dateOfPreliminaryApproval ? data.dateOfPreliminaryApproval : 'N/A'}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Financial Details</h2>
            <strong>Company Capital</strong>
            <p className="mb-2">${data.companyCapital!.toLocaleString()}</p>

            <strong>Application Fee</strong>
            <p className="mb-2">${data.applicationFee ? data.applicationFee.toLocaleString() : 'N/A'}</p>

            <strong>Licence Fee</strong>
            <p className="mb-2">${data.licenceFee ? data.licenceFee.toLocaleString() : 'N/A'}</p>

            <strong>Financial Guarantee</strong>
            <p className="mb-2">${data.financialGuarantee ? data.financialGuarantee.toLocaleString() : 'N/A'}</p>
          </div>
        </div>

      </div>
    </>
  );
}