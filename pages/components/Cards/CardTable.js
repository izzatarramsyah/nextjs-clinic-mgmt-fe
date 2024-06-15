import {useState, React} from 'react'
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

export default function CardTable({ headerTable, columnTable }) {

  const [keyword, setKeyword] = useState("");
  
  const doExport = async(e) => {
    e.preventDefault();
    const worksheet = XLSX.utils.json_to_sheet(columnTable);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, menu + ".xlsx");
  }

  return (
    <>
      <div className = "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="flex justify-end w-full">
              <div className="px-4 py-2 m-2">
                <div className="flex space-x-6">      
                  <button
                      className="bg-blueGray-700 active:bg-indigo-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button" onClick={doExport} > Cetak 
                  </button>
                  <input
                    placeholder="Input Pencarian"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-350 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={keyword} onChange={(e) => setKeyword(e.target.value)}
                    />            
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="block w-full overflow-x-auto">
            <DataTable columns={headerTable} data = {columnTable?.filter((item) => {
              if (keyword == null || keyword == '') {
                return item;
              } else {
                if ( item.fullname.toLowerCase().includes(keyword.toLowerCase()) ) {
                  return item;
                }
              }
            }) || []}
            pagination="true" highlightOnHover />
          </div>
        </div>
      </div>
    </>
  );
}

