import {useState, React} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CardMedicalRecord({ isLoading, dataVisit, saveMedicalRecord }) {

  const isDisabled = dataVisit != null ? true : false;
  const patientName = dataVisit != null ? dataVisit.patientName : '';
  const bpjsNo = dataVisit != null ? dataVisit.bpjsNo : '';
  const ticketNo = dataVisit != null ? dataVisit.ticketNo : '';

  const [complaint, setComplaint] = useState('');
  const [consul, setConsul] = useState('');
  const [diagnose, setDiagnose] = useState('');
  const [receiptMedicine, setReceiptMedicine] = useState('');

  const handleAddMedicalRecord = async(e) => {
    e.preventDefault();
    saveMedicalRecord({
      id: dataVisit._id,
      doctorName: dataVisit.doctorName,
      patientName: dataVisit.patientName,
      bpjsNo: dataVisit.bpjsNo,
      complaint: complaint,
      consul: consul,
      diagnose: diagnose,
      receiptMedicine : receiptMedicine
    });
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
                <div className="flex lg:w-12/12 px-4 space-x-4">
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Nama Pasien
                      </label>
                      <input placeholder="NAMA PASIEN" value={patientName} disabled={isDisabled}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > BPJS NO
                      </label>
                      <input placeholder="BPJS NO" value={bpjsNo} disabled={isDisabled}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                    <div className="relative w-4/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Nomor Tiket
                      </label>
                      <input placeholder="BPJS NO" value={ticketNo} disabled={isDisabled}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Keluhan
                      </label>
                      <textarea placeholder="Keluhan Pasien" value={complaint} onChange={(e) => setComplaint(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Diagnosa
                      </label>
                      <textarea placeholder="Diagnosa Penyakit Pasien" value={diagnose} onChange={(e) => setDiagnose(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Catatan Konsultasi
                      </label>
                      <textarea placeholder="Catatan Konsultasi Pasien" value={consul} onChange={(e) => setConsul(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Resep Obat
                      </label>
                      <textarea placeholder="Resep Obat" value={receiptMedicine} onChange={(e) => setReceiptMedicine(e.target.value)}
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
                      type="button" onClick={(e)=> handleAddMedicalRecord(e)}> KIRIM 
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

