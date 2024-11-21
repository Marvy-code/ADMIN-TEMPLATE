import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoTrashBin } from "react-icons/io5";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { TbSwitchHorizontal } from "react-icons/tb";

export const odm = [
    {
        participant: "Marvy MOUANDA",
        depart: "10/03/2025",
        retour: "25/03/2025",
        joursMission: 15,
        action: <div>
            <button className="bg-blue-400 text-white p-2 rounded-full mr-1"><LiaEyeSlashSolid /></button>
            <button className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
            <button className="bg-red-950 text-white p-2 rounded-full mr-1"><IoTrashBin /></button>
            <button className="bg-gray-700 text-white p-2 rounded-full"><TbSwitchHorizontal /></button>
        </div>
    },
    {
        participant: "Landy MACK",
        depart: "10/02/2025",
        retour: "15/02/2025",
        joursMission: 5,
        action: <div>
            <button className="bg-blue-400 text-white p-2 rounded-full mr-1"><LiaEyeSlashSolid /></button>
            <button className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
            <button className="bg-red-950 text-white p-2 rounded-full mr-1"><IoTrashBin /></button>
            <button className="bg-gray-700 text-white p-2 rounded-full"><TbSwitchHorizontal /></button>
        </div>
    },
    {
        participant: "Claudin BABELA",
        depart: "20/12/2024",
        retour: "27/12/2024",
        joursMission: 7,
        action: <div>
            <button className="bg-blue-400 text-white p-2 rounded-full mr-1"><LiaEyeSlashSolid /></button>
            <button className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
            <button className="bg-red-950 text-white p-2 rounded-full mr-1"><IoTrashBin /></button>
            <button className="bg-gray-700 text-white p-2 rounded-full"><TbSwitchHorizontal /></button>
        </div>
    }
]