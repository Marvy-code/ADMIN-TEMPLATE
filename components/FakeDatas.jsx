import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoTrashBin } from "react-icons/io5";
import { LiaEyeSlashSolid } from "react-icons/lia";

export const data = [
    {
        id: 1,
        title: "Formation sur l'IA et la 5G",
        country: "France",
        action: <div>
            <button className="bg-blue-400 text-white p-2 rounded-full mr-1"><LiaEyeSlashSolid /></button>
            <button className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
            <button className="bg-red-950 text-white p-2 rounded-full"><IoTrashBin /></button>
        </div>
    },
    {
        id: 2,
        title: "Rencontre avec le Régulateur Tunisien",
        country: "Tunisie",
        action: <div>
            <button className="bg-blue-400 text-white p-2 rounded-full mr-1"><LiaEyeSlashSolid /></button>
            <button className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
            <button className="bg-red-950 text-white p-2 rounded-full"><IoTrashBin /></button>
        </div>
    }
]