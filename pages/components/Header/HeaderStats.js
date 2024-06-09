import {uReact} from 'react'
import moment from 'moment';

// components
import CardStats from "../Cards/CardStats.js";

export default function HeaderStats({headerStat}) {

  const today = "Data per tanggal : " + moment(new Date()).format('DD MMM YYYY');

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-550 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
            {/* Card stats */}
            <div className="flex flex-wrap">
              {headerStat?.map((row, index) => (
                <div className="w-full lg:w-4/12 xl:w-12/12 px-4">
                  <CardStats
                    statSubtitle={row.statSubtitle}
                    statTitle={row.statTitle}
                    statPercentColor={row.statPercentColor}
                    statDescripiron={today}
                    statIconName={row.statIconName}
                    statIconColor={row.statIconColor}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </>
  );
}
