import {React} from 'react'
import Image from "next/image";

export default function CardBuyMedicine({ cartToConfirm, cartChangeQty, confirmBuy, total, balance }) {

  const handleRemoveToCart = (e, row) => {
    e.preventDefault();
  };

  const handleChangeQty = ( e, row ) => {
    e.preventDefault();
    let quantitiy = e.target.value;
    cartChangeQty({
      id : row.id,
      quantity : Number(quantitiy),
      price : row.price
    }); 
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Keranjang
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full max-h-80 overflow-y-auto">
          <div className="mt-10 flex items-left">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartToConfirm?.map((row, index) => (
                  <li key={index} className="flex py-6">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md  border-gray-200">
                      <img alt="xl image" width="1" height="1" src="/img/thumbnail/logo-home.png" className="h-full w-full object-cover object-center"/>
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between md:text-sm font-medium text-gray-900">
                          <p>{row.medicineName}</p>
                          <p className="ml-2">Rp. {row.ttlBuy}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div><p className="text-gray-500">Jumlah : 
                          <input type="number" onChange={(e)=> handleChangeQty(e, row)} value={row.quantity} className="focus:outline-none bg-gray-100 border h-6 w-12 rounded text-sm px-2 mx-2"/></p></div>
                        <div className="flex">
                          <a href="#" onClick={(e)=> handleRemoveToCart(e, row)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                          <i className="fas fa-trash mr-3 text-sm"></i></a>
                        </div>
                      </div>
                    </div>
                  </li>
                )) || []}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between pt-1 border-b ">
            <div className="sm:px-4 lg:py-2 m-2 text-base font-bold text-center text-gray-800">
              Total Biaya
            </div>
            <div className="sm:px-4 lg:py-2 m-2 text-base font-bold text-center text-gray-900">
              Rp. {total}
            </div>
          </div>
          <div className="flex justify-between pt-1 ">
            <div className="sm:px-4 lg:py-2 m-2 text-base font-bold text-center text-gray-800">
              Sisa Saldo 
            </div>
            <div className="sm:px-4 lg:py-2 m-2 text-base font-bold text-center text-red-700">
              Rp. {balance}
            </div>
          </div>
          <div className="mt-6">
            <button onClick={confirmBuy} className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Beli</button>
          </div>
        </div>
      </div>
    </>
  );
}
