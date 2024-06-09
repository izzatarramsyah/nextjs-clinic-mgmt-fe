import {useState, useEffect, React} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputPatient from "../components/Cards/CardInputPatient.js";
import CardTable from "../components/Cards/CardTable.js";
import Modal from "../components/Modal/Modal.js";
import ModalSubmit from "../components/Modal/ModalSubmit.js";

// serivces
import { restService } from "../../services/RestService.js";
// import { userService } from "../../services/UserServices.js";

export default function DataPatient() {
  
  const menu = 'Data Pasien';
  const slcGender = [
    { value: 'none', text: '-- Silahkan Pilih --', isDisabled : true },
    { value: 'M', text: 'PRIA', isDisabled : false },
    { value: 'W', text: 'WANITA', isDisabled : false }
  ];
  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [messageModal, setMessageModal] = useState(null);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [messageModalDelete, setMessageModalDelete] = useState(null);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [bpjs, setBpjs] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());

  const headerTable = [
    { name: 'Nama', width: "250px",
    cell:(row) => {
      return (
        <div>{row.fullname}</div>
      )
    },  
    sortable: true, center: true
    },
    { name: 'Jenis Kelamin', width: "250px",
      cell:(row) => {
        var gender = row.gender;
        return (
          gender == "P" ? <div> Pria </div> : <div> Wanita </div>
        )
      }, 
      sortable: true, center: true 
    },
    { name: 'Tanggal Lahir', width: "300px",
      cell:(row) => {
        let birthDate = moment(row.birthDate).format('DD-MM-YYYY hh:mm:ss');
        return (
          <div>{birthDate}</div>
        )
      }, 
      sortable: true, center: true 
    },
    { name: 'BPJS', width: "300px",
      cell:(row) => {
        return (
          <div>{row.bpjs}</div>
        )
      },sortable: true, center: true 
    },
    { name: <div>Aksi</div>, width: "100px",
      cell:(row) => {
        return (
        <div class="row-gap: 150px">
          <button onClick={(e)=> handleEditPatient(e, row)}
            className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-edit"/>
          </button> 
          <button onClick={(e)=> handleDeletePatient(e, row)}
            className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-trash"/>
          </button> 
        </div>
        )
      }, sortable: true, center: true
    }
  ];
  const [columnTable, setColumnTable] = useState([]);

  useEffect(() => {
    const loadDataPatient = async () => {
      restService.get(`${process.env.BASE_URL}/patient/getListPatient`).then((response) => {
        setColumnTable(response.data.object); 
      });
    };
    loadDataPatient();
  },[]);

  const handleSave = ( data ) => {
    isLoading(true);
    try { 
      const request = {
        fullname : data.name,
        nik : data.nik,
        bpjs : data.bpjs,
        email : data.email,
        gender : data.gender,
        birthDate : data.birthDate
      }
      restService.post(`${process.env.BASE_URL}/patient/savePatient`, request ).then((response) => {
        isLoading(false);
        if ( response.data.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data pasien telah ditambahkan');
        } else {
          setShowModal(true);
          setStatusModal('Gagal')
          setMessageModal('Silahkan coba beberapa saat lagi');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeletePatient = (e, row) => {
    e.preventDefault();
    setId(row._id)
    setMessageModalDelete("Apakah anda yakin menghapus data ini ? ");
    setShowModalDelete(true);
  };

  const deletePatient = () => {
    try { 
      const request = {
        id : id
      }
      restService.post(`${process.env.BASE_URL}/patient/deletePatient`, request ).then((response) => {
        setShowModalSubmit(false);
        if ( response.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data pasien telah dihapus');
        } else {
          setShowModal(true);
          setStatusModal('Gagal')
          setMessageModal('Silahkan coba beberapa saat lagi');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditPatient = (e, row) => {
    e.preventDefault();
    setId(row._id)
    setName(row.fullname);
    setGender(row.gender);
    setBpjs(row.bpjs);
    setEmail(row.email);
    setBirthDate(row.birthDate)
    setShowModalEdit(true);
  };

  const editPatient = () => {
    try { 
      const request = {
        id : id,
        fullname : name,
        bpjs : bpjs,
        gender : gender,
        email : email,
        birthDate : birthDate
      }
      restService.post(`${process.env.BASE_URL}/patient/updatePatient`, request ).then((response) => {
        setShowModalSubmit(false);
        if ( response.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data pasien telah dihapus');
        } else {
          setShowModal(true);
          setStatusModal('Gagal')
          setMessageModal('Silahkan coba beberapa saat lagi');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} 
        messageModal={messageModal} onClose={() => setShowModal(false)}></Modal>
      <ModalSubmit show={showModalDelete} title='Konfirmasi'
        onClose={() => setShowModalDelete(false)} onSubmit={() => deletePatient()}>
        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <h3 className="mb-7 text-lg font-bold text-black-500 dark:text-black-400">{messageModalDelete}</h3>
      </ModalSubmit>
      <ModalSubmit show={showModalEdit} title='Ubah Data Pasien'
        onClose={() => setShowModalEdit(false)} onSubmit={() => editPatient()}>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pasien</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>
            <select onChange={(e)=> setGender(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              {slcGender?.map(option => (
                <option key={option.value} value={option.value} disabled={option.isDisabled}>
                    {option.text}
                </option>
                ))}
            </select>
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor BPJS</label>
            <input value={bpjs} onChange={(e) => setBpjs(e.target.value)} type="text" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
            <DatePicker wrapperClassName="w-full" selected={birthDate} onChange={(date) => setBirthDate(date)}  
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={email} onChange={(e) => setEamil(e.target.value)} type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
        </div>
      </ModalSubmit>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInputPatient handleSave={handleSave} slcGender = {slcGender} isLoading={loading} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable menu={menu} headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}