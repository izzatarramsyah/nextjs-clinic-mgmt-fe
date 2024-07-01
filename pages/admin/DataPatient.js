import {useState, useEffect, React} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputPatient from "../components/Cards/CardInputPatient.js";
import CardTable from "../components/Cards/CardTable.js";
import Modal from "../components/Modal/Modal.js";
import ModalForm from "../components/Modal/ModalForm.js";
import ModalConfirmation from "../components/Modal/ModalConfirmation.js";

// serivces
import { restService } from "../../services/RestService.js";
// import { userService } from "../../services/UserServices.js";

export default function DataPatient() {
  
  const menu = 'Data Pasien';

  const [loading, isLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [messageModal, setMessageModal] = useState(null);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [bpjs, setBpjs] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());

  const headerTable = [
    { name: 'Nama', width: "200px",
    cell:(row) => {
      return (
        <div>{row.fullname}</div>
      )
    },  
    sortable: true, center: true
    },
    { name: 'Jenis Kelamin', width: "200px",
      cell:(row) => {
        var gender = row.gender;
        return (
          gender == "pria" ? <div> Pria </div> : <div> Wanita </div>
        )
      }, 
      sortable: true, center: true 
    },
    { name: 'Tanggal Lahir', width: "180px",
      cell:(row) => {
        let birthDate = moment(row.birthDate).format('DD-MM-YYYY hh:mm:ss');
        return (
          <div>{birthDate}</div>
        )
      }, 
      sortable: true, center: true 
    },
    { name: 'BPJS', width: "200px",
      cell:(row) => {
        return (
          <div>{row.bpjs}</div>
        )
      },sortable: true, center: true 
    },
    { name: 'Nomor Telepon', width: "200px",
      cell:(row) => {
        return (
          <div>{row.phoneNo}</div>
        )
      },sortable: true, center: true 
    },
    { name: 'Email', width: "200px",
      cell:(row) => {
        return (
          <div>{row.email}</div>
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

  const handleSave = ( request ) => {
    const containsNull = Object.values(request).some(value => value === null || value === '');
    if (containsNull) {
      setShowModal(true);
      setStatusModal('Gagal')
      setMessageModal('Silahkan lengkapi form terlebih dahulu');
      return;
    }
    isLoading(true);
    try { 
      restService.post(`${process.env.BASE_URL}/patient/savePatient`, request ).then((response) => {
        isLoading(false);
        if ( response.status == '200' ) {
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
    setShowModalDelete(true);
  };

  const deletePatient = () => {
    try { 
      const request = {
        id : id
      }
      restService.post(`${process.env.BASE_URL}/patient/deletePatient`, request ).then((response) => {
        setShowModalDelete(false);
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
    setPhoneNo(row.phoneNo);
    setShowModalEdit(true);
  };

  const editPatient = () => {
    const containsNull = Object.values(request).some(value => value === null || value === '');
    if (containsNull) {
      setShowModal(true);
      setStatusModal('Gagal')
      setMessageModal('Silahkan lengkapi form terlebih dahulu');
      return;
    }
    try { 
      const request = {
        id : id,
        fullname : name,
        bpjs : bpjs,
        gender : gender,
        email : email,
        birthDate : birthDate,
        phoneNo : phoneNo
      }
      restService.post(`${process.env.BASE_URL}/patient/updatePatient`, request ).then((response) => {
        setShowModalForm(false);
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

  const reloadPage = () => {
    setShowModal(false)
    if ( statusModal != 'Gagal' ) {
      window.location.reload();
    }
  }

  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} onClose={() => reloadPage()}></Modal>
      <ModalConfirmation show={showModalDelete} onClose={() => setShowModalDelete(false)} onSubmit={() => deletePatient()} 
        text ='Apakah anda yakin menghapus data ini ?'>
      </ModalConfirmation>
      <ModalForm show={showModalEdit} title='Ubah Data Pasien'
        onClose={() => setShowModalEdit(false)} onSubmit={() => editPatient()}>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pasien</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" disabled
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
          </div>
          <div class="col-span-2">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>
            <select onChange={(e)=> setGender(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option key='1' value='none' disabled='true'>-- Silahkan Pilih--</option>
                <option key='2' value='pria'>Pria</option>
                <option key='3' value='wanita'>Wanita</option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
            <DatePicker wrapperClassName="w-full" selected={birthDate} onChange={(date) => setBirthDate(date)}  
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor BPJS</label>
            <input value={bpjs} onChange={(e) => setBpjs(e.target.value)} type="text" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={email} onChange={(e) => setEamil(e.target.value)} type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon</label>
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
        </div>
      </ModalForm>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInputPatient handleSave={handleSave} isLoading={loading} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable menu={menu} headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}