import { useParamsStore } from "@/hooks/useParamsStore";
import { Button } from "flowbite-react";
import Link from "next/link";
import { FaAddressCard } from "react-icons/fa";
// import { AiOutlineSortAscending, AiOutlineClockCircle } from "react-icons/ai"

// const orderButtons = [
//     {
//         label:'Alphabetical',
//         icon: AiOutlineSortAscending,
//         value: 'Company Name'
//     },
//     {
//         label:'Alphabetical',
//         icon: AiOutlineClockCircle,
//         value: 'Code'
//     },
//     {
//         label:'Alphabetical',
//         icon: AiOutlineSortAscending,
//         value: 'Company Name'
//     }
// ]
const PageSizeButtons = [2, 4, 8, 12]

const Filters = () => {

    const pageSize = useParamsStore((state) => state.pageSize);
    const setParams = useParamsStore(state => state.setParams)

    return (
        <div className='flex justify-between items-center mb-4'>
            <Link href={'/company/create'}
                className="
                flex items-center justify-between gap-2
                rounded-md bg-orange-800 hover:bg-slate-900 text-slate-300
                py-2 px-4 text-base">
                    <FaAddressCard />
                    <strong>Add New Company</strong>
            </Link>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>page size</span>
                <Button.Group>
                    {PageSizeButtons.map((value, i) => (
                        <Button
                            key={i}
                            onClick={() => setParams({ pageSize: value })}
                            color={`${pageSize === value ? 'red' : 'gray'}`}
                            className='focus-ring-0' >
                            {value}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    )
}

export default Filters