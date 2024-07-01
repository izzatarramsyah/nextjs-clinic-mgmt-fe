import {useState, useEffect, React} from 'react'

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputDoctor from "../components/Cards/CardInputDoctor.js";
import CardTable from "../components/Cards/CardTable.js";
import Modal from "../components/Modal/Modal.js";
import ModalForm from "../components/Modal/ModalForm.js";
import ModalConfirmation from "../components/Modal/ModalConfirmation.js";
import ModalTable from "../components/Modal/ModalTable.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function DataPatient() {
  
  const menu = 'Data Dokter';
  
  const slcSpecialization = [
    { value: 'UMUM', text: 'UMUM', isDisabled : false },
    { value: 'GIGI', text: 'GIGI', isDisabled : false },
    { value: 'IBU DAN ANAK', text: 'IBU DAN ANAK', isDisabled : false }
  ];

  const slcDays = [
    { value: 'Senin', text: 'Senin'},
    { value: 'Selasa', text: 'Selasa'},
    { value: 'Rabu', text: 'Rabu'},
    { value: 'Kamis', text: 'Kamis'},
    { value: 'Jumat', text: 'Jumat'},
    { value: 'Sabtu', text: 'Sabtu'},
    { value: 'Minggu', text: 'Minggu'}
  ];

  const slcShift = [
    { value: '08:00 - 11:00', text: '08:00 - 11:00'},
    { value: '13:00 - 16:00', text: '13:00 - 16:00'},
    { value: '19:00 - 22:00', text: '19:00 - 22:00'}
  ];

  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [messageModal, setMessageModal] = useState(null);
  
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDetailShift, setShowDetailShift] = useState(false);

  const headerTable = [
    { name: 'NIP', width: "250px",
    cell:(row) => {
      return (
        <div>{row.nip}</div>
      )
    },  
    sortable: true, center: true
    },
    { name: 'Nama', width: "250px",
    cell:(row) => {
      return (
        <div>{row.fullname}</div>
      )
    },  
    sortable: true , center: true
    },
    { name: 'Poli', width: "200px",
      cell:(row) => {
        return (
          <div>{row.specialization}</div>
        )
      }, 
      sortable: true , center: true
    },
    { name: 'Waktu Kunjungan', width: "400px",
      cell:(row) => {
        return (
          <button onClick={()=> onOpenDetail(row.schedule)}
            className="text-blue-500 no-underline hover:underline"> Detail
          </button> 
        )
      },sortable: true , center: true
    },
    { name: <div>Aksi</div>, width: "100px",
      cell:(row) => {
        return (
        <div class="row-gap: 150px">
          <button onClick={(e)=> handleUpdateDoctor(e, row)}
            className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-edit"/>
          </button> 
          <button onClick={(e)=> handleDeleteDoctor(e, row)}
            className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-trash"/>
          </button> 
        </div>
        )
      }, sortable: true, center: true
    }
  ];
  const [columnTable, setColumnTable] = useState([]);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [specialization, setSpecialization] = useState('');

  const headerDetailShift = [
    { name: 'Hari', width: "150px",
      cell:(row) => {
        return (
          <div>{row.day}</div>
        )
      }, sortable: true, center: true
    },
    { name: 'Waktu Kunjungan', width: "300px",
    cell:(row) => {
      return (
        <div>{row.shift}</div>
      )
    }, sortable: true, center: true
  }
  ];
  const [columnDetailShift, setColumnDetailShift] = useState([]);

  useEffect(() => {
    const loadDatDoctor = async () => {
      restService.get(`${process.env.BASE_URL}/doctor/getListDoctor`).then((response) => {
        setColumnTable(response.data.object); 
      });
    };
    loadDatDoctor();
  },[]);

  const saveDoctor = ( request ) => {
    const containsNull = Object.values(request).some(value => value === null || value === '');
    if (containsNull) {
      setShowModal(true);
      setStatusModal('Gagal')
      setMessageModal('Silahkan lengkapi form terlebih dahulu');
      return;
    }
    isLoading(true);
    try { 
      restService.post(`${process.env.BASE_URL}/doctor/saveDoctor`, request ).then((response) => {
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

  const handleUpdateDoctor = (e, row) => {
    e.preventDefault();
    setId(row._id)
    setName(row.fullname);
    setNip(row.nip);
    setSpecialization(row.specialization);
    setShowModalEdit(true);
  };

  const handleDeleteDoctor = (e, row) => {
    e.preventDefault();
    setId(row._id)
    setShowModalDelete(true);
  };

  const deleteDoctor = () => {
    try { 
      const request = {
        id : id
      }
      restService.post(`${process.env.BASE_URL}/doctor/deleteDoctor`, request ).then((response) => {
        setShowModalDelete(false);
        if ( response.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data dokter telah dihapus');
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

  const updateDoctor = () => {
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
        name : name,
        nip : nip,
        specialization : specialization,
        shift : shift.join(', ')
      }
      restService.post(`${process.env.BASE_URL}/doctor/updateDoctor`, request ).then((response) => {
        setShowModalEdit(false);
        if ( response.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data dokter berhasil di perbaharui');
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

  const onOpenDetail = ( data ) => {
    setColumnDetailShift(data);
    setShowDetailShift(true);
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
      <ModalTable show={showDetailShift} headerDetail={headerDetailShift} 
        columnDetail={columnDetailShift} onClose={() => setShowDetailShift(false)}></ModalTable>
      <ModalConfirmation show={showModalDelete} onClose={() => setShowModalDelete(false)} onSubmit={() => deleteDoctor()} 
        text ='Apakah anda yakin menghapus data ini ?'>
      </ModalConfirmation>
      <ModalForm show={showModalEdit} title='Ubah Data Pasien'
        onClose={() => setShowModalEdit(false)} onSubmit={() => updateDoctor()}>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Induk Pegawai</label>
            <input value={nip} onChange={(e) => setNip(e.target.value)} type="text" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Dokter</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spesialisasi</label>
            <select onChange={(e)=> setSpecialization(e.target.value)} value={specialization}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              {slcSpecialization?.map(option => (
                <option key={option.value} value={option.value} disabled={option.isDisabled}>
                    {option.text}
                </option>
                ))}
            </select>
          </div>
        </div>
      </ModalForm>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInputDoctor saveDoctor={saveDoctor} slcSpecialization={slcSpecialization} 
          slcShift={slcShift} slcDays={slcDays} isLoading={loading} 
          onOpenDetail={onOpenDetail}/>
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable menu={menu} headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}