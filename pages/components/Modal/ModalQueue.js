import React from "react";

export default function ModalQueue({ show, dataQueue, onClose }) {

    if (!show) {
        return null;
    }

    return (
    <div id="popup-modal" tabIndex="-1" className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-black-400">Nomor Tiket</h3>
                    <h3 className="mb-5 text-4xl font-bold text-black-500 dark:text-black-400">{dataQueue.ticketNo}</h3>
                    <h3 className="mb-1 text-lg font-normal text-black-500 dark:text-black-400">{dataQueue.specialization}</h3>
                    <h3 className="mb-3 text-md font-normal text-black-500 dark:text-black-400">{dataQueue.visitingTime}</h3>
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
