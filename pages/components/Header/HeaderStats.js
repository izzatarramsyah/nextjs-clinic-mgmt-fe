import {uReact} from 'react'

// components
import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-550 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 xl:w-12/12 px-4">
                <CardStats
                  statSubtitle="Sisa Dompul"
                  // statTitle={dompul}
                  statPercentColor="text-emerald-500"
                  statDescripiron="."
                  statIconName="fa-solid fa-wallet"
                  statIconColor="bg-green-300"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-12/12 px-4">
                <CardStats
                  statSubtitle="Sisa Saldo Add On"
                  // statTitle={addOn}
                  statPercentColor="text-emerald-500"
                  statDescripiron="."
                  statIconName="fa-solid fa-wallet"
                  statIconColor="bg-blue-300"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-12/12 px-4">
                <CardStats
                  statSubtitle="MSISDN"
                  // statTitle={msisdn}
                  statPercentColor="text-red-500"
                  // statDescripiron={masaAktif}
                  statIconName="fa-solid fa-person"
                  statIconColor="bg-yellow-500"
                />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
