import {useState, useEffect, React} from 'react'

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInput from "../components/Cards/CardInput.js";
import CardTable from "../components/Cards/CardTable.js";

// serivces
import { patientService } from "../../services/PatientServices.js";
// import { userService } from "../../services/UserServices.js";

export default function InputPatient() {
  
  const [loading, isLoading] = useState(false);

  const handleSave = ( data ) => {
    isLoading(true);
    try { 
      const request = {
        fullname : data.name,
        nik : data.nik,
        bpjs : data.bpjs,
        gender : data.gender,
        birthDate : data.birthDate
      }
      patientService.savePatient( request ).then((response) => {
        isLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInput handleSave={handleSave} isLoading={loading} />
        </div>
      </div>
    </Admin>
  );
}