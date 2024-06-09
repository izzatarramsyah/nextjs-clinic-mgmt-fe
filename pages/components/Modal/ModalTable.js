import {useState, React} from 'react'
import DataTable from 'react-data-table-component';

export default function ModalTable({show, headerDetail, columnDetail, onClose}) {

    const [keyword, setKeyword] = useState("");

    if ( show )
    return (
      <div className='bg-opacity-25 fixed inset-0 z-40 backdrop-blur-sm w-full h-full'>
        <div className="relative w-full my-12 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <div className="x-4 py-2 m-2">
                <h3 className="text-2xl font-semibold"> Detail </h3>
              </div>
            </div>
            {/*body*/}
            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 px-2">
                <div className="block w-full overflow-x-auto">
                  <DataTable columns={headerDetail} 
                    data = {columnDetail.filter((item) => {
                      if (keyword == null || keyword == '') {
                        return item;
                      } else if ( item.bMsisdn.toLowerCase().includes(keyword.toLowerCase()) ) {
                        return item;
                      }
                    })}
                    highlightOnHover />
                </div>
              </div>
            </div>
            
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button 
                className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose} > OK </button>
            </div>
          </div>
        </div>
      </div>
    );
}

