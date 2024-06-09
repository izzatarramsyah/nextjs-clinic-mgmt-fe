import {useState, React} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CardInputQueue({ isLoading, slcDoctor, dataPatient, addQueue }) {

  const [doctorName, setDoctorName] = useState('');
  const [complaint, setComplaint] = useState('');
  const [visitingTime, setVisitingTime] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [visitingDay, setVisitingDay] = useState('');
  const [visitingShift, setVisitingShift] = useState('');

  const [slcVisitingDay, setSlcVisitingDay] = useState([]);
  const [slcVisitingShift, setSlcVisitingShift] = useState([]);

  const slcSpecialization = [
    { value: 'general', text: 'UMUM' },
    { value: 'dentist', text: 'GIGI', },
    { value: 'pediatric', text: 'IBU DAN ANAK', }
  ];

  const slcDays = [
    { value: 'monday', text: 'Senin'},
    { value: 'tuesday', text: 'Selasa'},
    { value: 'wednesday', text: 'Rabu'},
    { value: 'thursday', text: 'Kamis'},
    { value: 'friday', text: 'Jumat'},
    { value: 'saturday', text: 'Sabtu'},
    { value: 'sunday', text: 'Minggu'}
  ];

  const slcShift = [
    { value: 'SHIFT1', text: '08:00 - 11:00'},
    { value: 'SHIFT2', text: '13:00 - 16:00'},
    { value: 'SHIFT3', text: '19:00 - 22:00'}
  ];

  const handleaddQueue = async(e) => {
    e.preventDefault();
    let foundSpecialization = slcSpecialization.find(d => d.text === specialization);
    addQueue({
      complaint: complaint,
      doctorName: doctorName,
      specialization: foundSpecialization.value,
      visitingShift: visitingShift,
      visitingDay: visitingDay
    });
  }

  const handleSlcDoctor = async(id) => {
    const index = slcDoctor.findIndex(item => item._id === id);
    setDoctorName(slcDoctor[index].fullname);
    let foundSpecialization = slcSpecialization.find(d => d.value === slcDoctor[index].specialization);
    setSpecialization(foundSpecialization.text);
    setVisitingTime(slcDoctor[index].visitingTime);
    const tempSlcVisitingDay = [...slcVisitingDay];
    slcDoctor[index].visitingTime.forEach(item => {
      let foundDay = slcDays.find(d => d.value === item.day);
      tempSlcVisitingDay.push(foundDay);
    });
    setSlcVisitingDay(tempSlcVisitingDay);

  }

  const handleSlcVisitingDay = async(day) => {
    let foundVisitingTime = visitingTime.find(d => d.day === day);
    let itemsArray = foundVisitingTime.shift.split(', ').map(item => item.trim());
    let selection = [];
    for (const item of itemsArray) {
      let foundShift = slcShift.find(d => d.value === item);
      selection.push(foundShift);
    }
    console.log(selection)
    setSlcVisitingShift(selection);
    setVisitingDay(day);
  }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F0F3FE] border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Pendaftaran Antrian</h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-8">
              <form>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Nama Pasien
                      </label>
                      <input placeholder="NAMA PASIEN" value={dataPatient.fullname} disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex lg:w-12/12 px-4 space-x-4">
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Jenis Kelamin
                      </label>
                      <input placeholder="JENIS KELAMIN" value={dataPatient.gender} disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > BPJS NO
                      </label>
                      <input placeholder="BPJS NO" value={dataPatient.bpjs} disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Tanggal Lahir
                      </label>
                      <input placeholder="TANGGAL LAHIR" value={dataPatient.birthDate} disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                </div>
                <div className="flex lg:w-12/12 px-4 space-x-4">
                    <div className="relative w-3/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Dokter
                      </label>
                      <select onChange={(e)=> handleSlcDoctor(e.target.value)} defaultValue="none"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value='none' disabled>-- Silahkan Pilih --</option>
                        {slcDoctor?.map(option => (
                          <option key={option._id} value={option._id}>
                            {option.fullname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative w-3/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Spesialisasi
                      </label>
                      <input placeholder="Spesialisasi" value={specialization} disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                    <div className="relative w-3/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Hari
                      </label>
                      <select onChange={(e)=> handleSlcVisitingDay(e.target.value)} defaultValue="none"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value='none' disabled>-- Silahkan Pilih --</option>
                        {slcVisitingDay?.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative w-3/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Jam Kunjungan
                      </label>
                      <select onChange={(e)=> setVisitingShift(e.target.value)} defaultValue="none"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value='none' disabled>-- Silahkan Pilih --</option>
                        {slcVisitingShift?.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Keluhan
                      </label>
                      <textarea placeholder="KELUHAN PASIEN" value={complaint} onChange={(e) => setComplaint(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
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
                      type="button" onClick={(e)=> handleaddQueue(e)}> DAFTAR 
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

