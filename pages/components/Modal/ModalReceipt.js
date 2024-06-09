import {useState, React} from 'react'

export default function ModalReceipt({show , receiptData}) {
    
    const [showDetail, setShowDetail] = useState(false);

    if ( show )
    return (

      <div className='bg-opacity-25 fixed inset-0 z-40 backdrop-blur-sm'>
        <div className="relative w-full my-12 mx-auto max-w-lg">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-3 flex-auto ">
            <svg aria-hidden="true" class="mx-auto mb-1 text-green-700 w-12 h-12 dark:text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="text-center mb-3 text-sm font-normal text-gray-500 dark:text-gray-400">Transaksi anda sudah diproses</h3>
                { ( !showDetail ?
                <div>
                    <div className="flex justify-between pt-1 mt-2 border-b">
                        <div className="sm:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                            Kategori Transaksi
                        </div>
                        <div className="sm:px-4 lg:py-2 m-2 text-xs font-bold text-center text-black-700">
                            Beli Obat
                        </div>
                    </div>
                    <div className="flex justify-between pt-1 mt-1 border-b">
                        <div className="sm:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                            Waktu Transaksi
                        </div>
                        <div className="sm:px-4 lg:py-2 m-2 text-xs font-bold text-center text-black-700">
                            {receiptData.createdAt}
                        </div>
                    </div>
                    <div className="flex justify-between pt-1 mt-1 ">
                        <div className="sm:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                            Detail Transaksi
                        </div>
                        <div className="sm:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                            <button className="text-blue-500 no-underline hover:underline" 
                                onClick={() => setShowDetail(true)}>
                                    Detail
                            </button> 
                        </div>
                    </div> 
                </div> :
                <div>
                    <div className="flex justify-between pt-1 mt-1 ">
                        <div className="sm:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                            Detail Transaksi
                        </div>
                        <div className="xs:px-4 lg:py-2 m-2 text-xs text-center text-gray-800">
                        {receiptData.listMedicine.map((row, index) => (
                            <p key={index}>
                            Beli obat {row.medicineName} sebanyak {row.quantity}Pcs. Transaksi ID : {row._id}
                            </p>
                        ))}
                        </div>
                    </div>
                </div>
                )}
            </div>
            { ( showDetail ?
                <div className="flex items-center justify-start p-3 border-t border-solid border-blueGray-200 rounded-b">
                    <div>
                        <button className="bg-green-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" onClick={() => setShowDetail(false)} > Kembali </button>
                    </div>
                </div> : 
                <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                    <div>
                        <button className="bg-green-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" onClick={() => window.location.reload()} > OK </button>
                    </div>
                </div>
            ) }
          </div>
        </div>
      </div>
    );
}

