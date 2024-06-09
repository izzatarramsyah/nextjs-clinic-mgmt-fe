import React from "react";

export default function Modal({ show, statusModal, messageModal, onClose }) {

    if (!show) {
        return null;
    }

    return (
    <div id="popup-modal" tabIndex="-1" className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 text-center">
                    { ( statusModal == 'Sukses' ? 
                        <svg aria-hidden="true" class="mx-auto mb-1 text-green-700 w-12 h-12 dark:text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        :
                        <svg aria-hidden="true" class="mx-auto mb-1 text-red-700 w-12 h-12 dark:text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    )}
                    <h3 className="mb-5 text-md font-bold text-black-500 dark:text-black-400">{statusModal}</h3>
                    <h3 className="mb-5 text-md font-normal text-black-500 dark:text-black-400">{messageModal}</h3>
                    <button onClick={onClose} data-modal-hide="popup-modal" type="button" 
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-20 py-2.5 text-center">
                        Kembali ke halaman
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}
