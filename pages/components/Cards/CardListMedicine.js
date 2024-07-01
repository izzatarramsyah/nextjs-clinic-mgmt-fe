import {useState,React} from 'react'
import Image from "next/image";
import { userService } from "../../../services/UserServices.js";

export default function CardListMedicine({ listMedicine, cartToBuy }) {

  const [keyword, setKeyword] = useState('all');
  var filtered = [];

  const handleAddToCart = (e, row) => {
    cartToBuy({
      username : userService.userValue.username, 
      medicineName : row.name,
      quantity : 1,
      price : row.price
    })
  };

  filtered = listMedicine?.filter((item) => {
    if (keyword == null || keyword == '' || keyword == 'all') {
      return item;
    } else if ( item.category.toLowerCase().includes(keyword.toLowerCase()) ) {
      return item;
    }
  });

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-9 shadow-lg rounded">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Beli Obat</h6>
            <select onChange={(e)=> setKeyword(e.target.value)}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-6/12 ease-linear transition-all duration-150">
                <option value='all'>SEMUA</option>
                <option value='Analgesik'>Analgesik</option>
                <option value='Antibiotik'>Antibiotik</option>
                <option value='Antiseptik'>Antiseptik</option>
                <option value='Antihistampin'>Antihistampin</option>
                <option value='Antiinflamasi'>Antiinflamasi</option>
                <option value='Antijamur'>Antijamur</option>
                <option value='Antivirus'>Antivirus</option>
                <option value='Vitamin dan Suplemen'>Vitamin dan Suplemen</option>
            </select>
          </div>
        </div>
          <div className="mt-5 block w-full max-h-screen overflow-y-auto">
          <ul role="list" className="grid md:grid-cols-1">
          {filtered?.map((row, index) => (
            <li key={index} >
              <input onChange={(e)=> handleAddToCart(e, row)} type="radio" id={index} name="hosting" value={index} className="hidden peer" required/>
                <label htmlFor={index} className="inline-flex items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                  <div className="flex justify-left ">
                    <div className="w-15">
                      {/* <img alt="captcha image" width="1" height="1" className="h-20 w-full object-cover object-center" src="/img/thumbnail/logo-home.png" /> */}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="md:text-sm font-medium text-gray-900">{row.name} - {row.notes}</span>
                    <span className="text-xs font-medium text-green-700">Jumlah Tersedia : {row.quantity} </span>
                    <span className="text-xs font-medium text-green-700">Harga Satuan : Rp. {row.price} </span>
                  </div>
                </label>
            </li>
            )) || [] }
          </ul>
        </div>
      </div>
    </>
  );
}
