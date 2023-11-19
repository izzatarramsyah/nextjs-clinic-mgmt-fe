import {useState, React} from 'react'
import DataTable from 'react-data-table-component';

export default function CardTable({ menu, headerTransaction, columnTransaction }) {

  const [keyword, setKeyword] = useState("");
  
  return (
    <>
      <div className = "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="flex justify-between w-full">
              <div className="x-4 py-2 m-2">
                <div className="x-4 py-2 m-2">
                  <h3 className="font-semibold text-lg text-blueGray-700">{menu}</h3>
              	</div>
              </div>
              <div className="px-4 py-2 m-2">
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
        <div className="block w-full overflow-x-auto">
          <DataTable columns={headerTransaction} 
          data = {columnTransaction?.filter((item) => {
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
    </>
  );
}

