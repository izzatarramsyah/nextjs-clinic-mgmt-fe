import {useState, useRef, React} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CardInputDoctor({ saveDoctor, slcSpecialization, slcShift, slcDays, 
    isLoading, onOpenDetail }) {

    const [showNotif, setShowNotif] = useState(false);

    const [fullname, setFullname] = useState('');
    const [nip, setNip] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [visitingTimeTemp, setVisitingTimeTemp] = useState([]);
    const [visitingTime, setVisitingTime] = useState([]);

    const [day, setDay] = useState('');
    const [shift, setShift] = useState([]);

    const handleSlcShift = (value, index) => {
      const checkbox = document.getElementById(`checkbox-${index}`);
      if (checkbox.checked) {
        setShift((prevItems) => [...prevItems, value]);
      } else {
        setShift((prevItems) => prevItems.filter((item) => item !== value));
      }
    };

    const handleAddShift = (e) => {
      const existing = visitingTime.find(visitingTime => visitingTime.day === day);
      if (!existing) {
        let charShift = '';
        let sft = '';
        for (const item of shift) {
          const index = slcShift.findIndex(slcShift => slcShift.value === item);
          charShift = charShift + slcShift[index].text + ", ";
          sft = sft + slcShift[index].value + ", ";
        }
        const indexDay = slcDays.findIndex(slcDays => slcDays.value === day);
        const temp = {
          day : slcDays[indexDay].text,
          shift : charShift.slice(0, -2)
        };
        setVisitingTimeTemp(prevValue => [...prevValue, temp]);
        const data = {
          nip : nip,
          day : day,
          shift : sft
        };
        setVisitingTime(prevValue => [...prevValue, data]);
        setShowNotif(true);
      }
    };

    const handleSaveDoctor = async(e) => {
      e.preventDefault();
      saveDoctor({
          fullname: fullname,
          nip: nip,
          specialization: specialization,
          status: 'ACTIVE',
          visitingTime : visitingTime
      });
    }

    const handleOpenDetail = async(e) => {
      e.preventDefault();
      onOpenDetail(visitingTimeTemp);
    }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F0F3FE] border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Data Dokter</h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-8">
              <form>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Nomor Induk Pegawai
                      </label>
                      <input placeholder="NOMOR INDUK PEGAWAI" value={nip} onChange={(e) => setNip(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Nama Dokter
                      </label>
                      <input placeholder="NAMA DOKTER" value={fullname} onChange={(e) => setFullname(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Spesialisasi
                      </label>
                      <select onChange={(e)=> setSpecialization(e.target.value)}  defaultValue="none" 
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        {slcSpecialization?.map(option => (
                          <option key={option.value} value={option.value} disabled={option.isDisabled}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex lg:w-12/12 px-4 space-x-4">
                  <div className="relative w-4/12 mb-6">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Hari Kunjungan
                    </label>
                    <select onChange={(e)=> setDay(e.target.value)}  defaultValue="none" 
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        {slcDays?.map(option => (
                          <option key={option.value} value={option.value} disabled={option.isDisabled}>
                            {option.text}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="relative w-8/12 mb-6">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Shift Kunjungan
                    </label>
                    <div class="flex space-x-4">
                      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {slcShift?.map((row, index) => (
                          <li key={index}  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                  <input type="checkbox" id={`checkbox-${index}`} onChange={(e)=> handleSlcShift(row.value, index)} 
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{row.text}</label>
                              </div>
                          </li>
                          )) || []}
                      </ul>
                      <button type="button" onClick={(e)=> handleAddShift(e)} class="px-4 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        TAMBAH
                      </button>
                    </div>
                  </div>
                </div>
                { (  showNotif ? 
                  <div id="alert-3" class="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <div class="ms-3 text-sm font-medium">
                     Jadwal berhasil ditambahkan. Silahkan klik <a href="#" onClick={(e)=> handleOpenDetail(e)} class="font-semibold underline hover:no-underline">disini</a> untuk melihat detail 
                    </div>
                    <button type="button" onClick={()=> setShowNotif(false)} class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
                : null
                )} 
                <div className="flex justify-end">                  
                  <div>
                  { (  isLoading ? 
                    <button
                      className="bg-[#00D2A0] active:bg-[#00D2A0] text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button" disabled>  
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                      Loading...
                    </button> :
                    <button
                      className="bg-[#00D2A0] active:bg-[#00D2A0] text-white font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
                      type="button" onClick={(e)=> handleSaveDoctor(e)} > SIMPAN 
                    </button>
                  )} 
                  </div> 
                </div>
              </form>
            </div>
        </div>
    </>
  );
}

