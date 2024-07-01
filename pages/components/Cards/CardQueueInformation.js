import {useState, React} from 'react'

export default function CardQueueInformation({queueGeneral,queuePediatric,queueDentist}) {

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F0F3FE] border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Informasi Antrian</h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-8">
            <div className="flex flex-wrap mt-4">
              <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                          <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-black-400">Nomor Antrian</h3>
                            <h3 className="mb-5 text-4xl font-bold text-black-500 dark:text-black-400">{queueGeneral != null ? queueGeneral.ticketNo : '000'}</h3>
                            <h3 className="mb-1 text-lg font-normal text-black-500 dark:text-black-400">Poli Umum</h3>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-black-400">Nomor Antrian</h3>
                            <h3 className="mb-5 text-4xl font-bold text-black-500 dark:text-black-400">{queueDentist != null ? queueDentist.ticketNo : '000'}</h3>
                            <h3 className="mb-1 text-lg font-normal text-black-500 dark:text-black-400">Poli Gigi</h3>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-black-400">Nomor Antrian</h3>
                            <h3 className="mb-5 text-4xl font-bold text-black-500 dark:text-black-400">{queuePediatric != null ? queuePediatric.ticketNo : '000'}</h3>
                            <h3 className="mb-1 text-lg font-normal text-black-500 dark:text-black-400">Poli Anak</h3>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    </>
  );
}

