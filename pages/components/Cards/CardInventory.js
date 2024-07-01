import {useState, React} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from 'xlsx';

export default function CardInventory({ isLoading, inputType, formData }) {

  const [dataExcel, setDataExcel] = useState([]);
  const [trxType, setTrxType] = useState('');

  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [expired, setExpired] = useState(new Date());
  const [price, setPrice] = useState(null);

  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentQty, setEquipmentQty] = useState('');
  const [equipmentLocation, setEquipmentLocation] = useState('');
  const [equipmentNotes, setEquipmentNotes] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [equipmentCategory, setEquipmentCategory] = useState('');

  const [showEquipmentInput, setShowEquipmentInput] = useState(false);
  const [showMedicInput, setShowMedicInput] = useState(false);
  const [showSingle, setShowSingle] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);

  const handleSlcInv = async(value) => {
    setTrxType(value)
    inputType(value);
    if ( value == 'medicine' ) {
      setShowMedicInput(true);
      setShowEquipmentInput(false);
    } else {
      setShowMedicInput(false);
      setShowEquipmentInput(true);
    }
  }

  const handleSlcInput = async(value) => {
    if ( value == 'single' ) {
      setShowSingle(true);
      setShowMultiple(false);
    } else {
      setShowSingle(false);
      setShowMultiple(true);
    }
  }

  const handleUploadExcel  = (e) => {
    if (e.target.files) {
      const files = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = e => {
        const bstr = e.target.result;
        const workBook = XLSX.read(bstr, { type : "binary"});
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];
        const fileData = XLSX.utils.sheet_to_json(workSheet, {header : 1}, {blankrows: false} );
        const headers = fileData[0];
        setDataExcel(getDataExcel(fileData));
      };
      fileReader.readAsBinaryString(files);
    }
  };

  const getDataExcel = (data) => {
    var rows = [];
    for (const row of data) {
      rows.push(row[0])
    }
    return rows;
  }

  const handleAddInventory = async(e) => {
    e.preventDefault();
    if ( trxType == 'medicine' ) {
      formData({
        name: medicineName,
        quantity: quantity,
        notes: notes,
        category: category,
        expired: expired,
        price: price
      });
    } else if ( trxType == 'medicalEq' ) {
      formData({
        name: equipmentName,
        quantity: equipmentQty,
        location: equipmentLocation,
        category: category,
        purchaseDt: purchaseDate,
        category: equipmentCategory
      });
    }
  }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F0F3FE] border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Kelola Inventaris</h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-8">
              <form>
                  <div className="flex lg:w-12/12 px-4 space-x-4">
                    <div className="relative w-8/12 mb-6">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password" > Jenis Inventaris
                      </label>
                      <select onChange={(e)=> handleSlcInv(e.target.value)}  defaultValue="none"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value='none' disabled selected>-- Silahkan Pilih --</option>
                        <option value='medicalEq'>Peralatan Medis</option>
                        <option value='medicine'>Obat - Obatan</option>
                      </select>
                    </div>
                    <div className="relative w-4/12 mb-6">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password" > Jenis Input
                        </label>
                        <select onChange={(e)=> handleSlcInput(e.target.value)} defaultValue="none"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                          <option value='none' disabled selected>-- Silahkan Pilih --</option>
                          <option value='single'>Satuan</option>
                          <option value='multiple'>Excel File</option>
                        </select>
                      </div>
                  </div>
                { (  showMedicInput ? 
                <div>
                  { (  showSingle ? 
                    <div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Nama Obat
                            </label>
                            <input value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder='Nama Obat'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Jenis Obat
                            </label>
                            <select defaultValue="none" onChange={(e)=> setCategory(e.target.value)}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                              <option value='none' disabled selected>-- Silahkan Pilih --</option>
                              <option value='analgesik'>Analgesik</option>
                              <option value='antibiotik'>Antibiotik</option>
                              <option value='antiseptik'>Antiseptik</option>
                              <option value='antihistamin'>Antihistampin</option>
                              <option value='antiinflamasi'>Antiinflamasi</option>
                              <option value='antijamur'>Antijamur</option>
                              <option value='antivirus'>Antivirus</option>
                              <option value='vitaminsuplemen'>Vitamin dan Suplemen</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Tanggal Expired
                            </label>
                            <DatePicker wrapperClassName="w-full" selected={expired} onChange={(date) => setExpired(date)} placeholder='Tanggal Expired'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Jumlah Stok Masuk
                            </label>
                            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Jumlah Stok Masuk'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Harga Satuan
                            </label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Harga Satuan'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Keterangan
                            </label>
                            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Keterangan'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                  </div> : null
                  ) }
                  { ( showMultiple ? 
                    <div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Input File Excel
                            </label>
                            <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-describedby="file_input_help" 
                              id="file_input" type="file" onChange={(e)=> handleUploadExcel(e)}/>
                          </div>
                        </div>
                      </div>
                  </div> : null
                  )}
                </div> : null
                ) }
                { (  showEquipmentInput ? 
                <div>
                  { (  showSingle ? 
                    <div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Nama Peralatan
                            </label>
                            <input value={equipmentName} onChange={(e) => setEquipmentName(e.target.value)} placeholder='Nama Peralatan'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Kategori
                            </label>
                            <select onChange={(e)=> setEquipmentCategory(e.target.value)} defaultValue="none"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                              <option value='none' disabled selected>-- Silahkan Pilih --</option>
                              <option value='diagnosis'>Diagnosis</option>
                              <option value='rehabilitasi'>Rehabilitasi</option>
                              <option value='terpai'>Terapi</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Jumlah Unit
                            </label>
                            <input value={equipmentQty} onChange={(e) => setEquipmentQty(e.target.value)}  placeholder='Jumlah Unit'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Lokasi
                            </label>
                            <input value={equipmentLocation} onChange={(e) => setEquipmentLocation(e.target.value)}  placeholder='Lokasi'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Tanggal Beli
                            </label>
                            <DatePicker wrapperClassName="w-full" selected={purchaseDate} onChange={(date) => setPurchaseDate(date)} placeholder='Tanggal Beli'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Keterangan
                            </label>
                            <input value={equipmentNotes} onChange={(e) => setEquipmentNotes(e.target.value)}  placeholder='Keterangan'
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                          </div>
                        </div>
                      </div>
                  </div> : null
                  ) }
                  { ( showMultiple ? 
                    <div>
                      <div className="flex flex-wrap ">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-6">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password" > Input File Excel
                            </label>
                            <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-describedby="file_input_help" id="file_input" 
                              type="file" onChange={(e)=> handleUploadExcel(e)}/>
                          </div>
                        </div>
                      </div>
                  </div> : null
                  )}
                </div> : null
                ) }
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
                      type="button" onClick={(e)=> handleAddInventory(e)}> SIMPAN 
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

