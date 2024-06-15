import {useState,React} from 'react'
import Image from "next/image";

export default function CardListMedicine({ listMedicine, cartToBuy }) {

  const [keyword, setKeyword] = useState('all');

  const handleAddToCart = (e, row) => {
    cartToBuy({
      id : row._id,
      medicineName : row.name,
      quantity : 1,
      price : row.price,
      ttlBuy : row.price
    })
  };


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-9 shadow-lg rounded">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Beli Obat</h6>
            <select onChange={(e)=> setKeyword(e.target.value)}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-6/12 ease-linear transition-all duration-150">
                <option value='all'>SEMUA</option>
                <option value='Tembak Reguler'>SP REGULER</option>
                <option value='Inject Voucher'>VOUCHER REGULER</option>
                <option value='Inject dan Tembak Voucher Digital'>VOUCHER DIGITAL</option>
                <option value='Tembak SP0K5'>SP5K</option>
                <option value='Tembak SP0K9'>SP9K</option>
            </select>
          </div>
        </div>
          <div className="mt-5 block w-full max-h-screen overflow-y-auto">
          <ul role="list" className="grid md:grid-cols-1">
          {listMedicine?.map((row, index) => (
            <li key={index} >
              <input onChange={(e)=> handleAddToCart(e, row)} type="radio" id={index} name="hosting" value={index} className="hidden peer" required/>
                <label htmlFor={index} className="inline-flex items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                  <div className="flex justify-left ">
                    <div className="w-15">
                      <img alt="captcha image" width="1" height="1" className="h-20 w-full object-cover object-center" src="/img/thumbnail/logo-home.png" />
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
