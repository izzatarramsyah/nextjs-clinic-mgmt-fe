import {useState, useEffect, React} from 'react'

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardFormSearch from "../components/Cards/CardsFormSearch.js";
import CardTable from "../components/Cards/CardTable.js";

// serivces
import { patientService } from "../../services/PatientServices.js";
// import { userService } from "../../services/UserServices.js";

export default function DataPatient() {
  
  const menu = 'Data Pasien';

  const transaction = [
    { value: 'none', text: '-- Silahkan Pilih --', isDisabled : true, isSelected : true },
    { value: 'dataPasien', text: 'Data Pasien', isDisabled : false, isSelected : false, 
    headerTrans : [
      { name: 'Nama', width: "150px",
      cell:(row) => {
        return (
          <div>{row.fullname}</div>
        )
      },  
      sortable: true 
      },
      { name: 'Jenis Kelamin', width: "150px",
        cell:(row) => {
          var gender = row.gender;
          return (
            gender == "P" ? <div> Pria </div> : <div> Wanita </div>
          )
        }, 
        sortable: true 
      },
      { name: 'Tanggal Lahir', width: "150px",
        cell:(row) => {
          return (
            <div>{row.birthDate}</div>
          )
        }, 
        sortable: true 
      },
      { name: 'NIK', width: "150px",
        cell:(row) => {
          return (
            <div>{row.nik}</div>
          )
        },sortable: true 
      },
      { name: 'BPJS', width: "150px",
        cell:(row) => {
          return (
            <div>{row.bpjs}</div>
          )
        },sortable: true 
      },
      { name: <div>Aksi</div>, width: "150px",
        cell:(row) => {
          return (
          <div class="row-gap: 10px">
            <button onClick={(e)=> handleEditPatient(e, row)}
              className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-edit"/>
            </button> 
            <button onClick={(e)=> handleEditPatient(e, row)}
              className="text-blueGray-500 hover:text-[#002DBB]"> <i className="fas fa-trash"/>
            </button> 
          </div>
          )
        }, sortable: true
      }
    ] }    
  ];

  const [loading, isLoading] = useState(false);

  const [headerTransaction, setHeaderTransaction] = useState([]);
  const [columnTransaction, setColumnTransaction] = useState([]);

  const handleChangeTrans = ( data ) => {
    const trans = transaction.filter(({value}) => value == data);
    setHeaderTransaction(trans[0].headerTrans);
    setColumnTransaction([]);
  }

  const handleSearch = ( data ) => {
    isLoading(true);
    try { 
      const request = {
        fullname : data.name
      }
      patientService.getDataPatient( request ).then((response) => {
        isLoading(false);
        setColumnTransaction(response.data.object); 
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardFormSearch columnTransaction={columnTransaction} handleSearch={handleSearch} isLoading={loading}
            transaction={transaction} transactionType={handleChangeTrans}/>
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable menu={menu} headerTransaction={headerTransaction} columnTransaction={columnTransaction} />
        </div>
      </div>
    </Admin>
  );
}