import {useState, useEffect, React} from 'react'
import { Carousel } from "@material-tailwind/react";

// layout for page
import Admin from "../layouts/Admin.js";

export default function Dashboard() {
  
  return (
    <Admin>
     <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F0F3FE] border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">NEWS CLINIC</h6>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
     
    </Admin>
    
  );
}