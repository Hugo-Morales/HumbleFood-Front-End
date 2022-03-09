import { AiOutlineLogout } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr'
import { BiEdit, BiMessageRoundedDetail } from 'react-icons/bi'
import { MdCreate, MdDelete } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

import Button from './Button';

export default function SideLeft({ id }) {

    return (
        <div className="bg-gray-700 overflow-y-auto h-screen p-6">
            <div className='p-2 mb-5 text-white uppercase'>
                <h1>Bienvenido {id}</h1>
            </div>
            <div className="text-center bg-white p-2 rounded-lg mb-10">
                <h1>Panel de Control</h1>
            </div>
            {/* <div>
                Mensajes (Opcional)
                - Responder Mensajes
                - Editar Mensajes
                - Borrar Mensajes
                Configuración de Perfil (Opcional)
                Productos,
                - Crear
                - Modificar
                - Borrar
                Filtrar Ordenes por Estado
                . Completa
                . Cancelada
                . Procesada
                . Creada
            </div> */}
            <div>
                <h1 className="text-white uppercase">Opciones</h1>
                <hr></hr>

                {/* Agregar otra Tienda */}
                <Button div='flex bg-green-200 justify-center p-2 rounded-lg mb-10 mt-3 hover:bg-sky-700 cursor-pointer' url='' text='Agregar otra Tienda' buttonClass='flex items-center font-bold' icon={<GrAddCircle className='mr-2' />} f={() => alert("Coming Soon")} />

                {/* Crear Producto */}
                < Button div='flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer' url='' text='Crear Producto' buttonClass='flex items-center font-bold' icon={<MdCreate className='mr-2' />} />

                {/* Modificar Producto */}
                <Button div='flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer' url='' text='Modificar Producto' buttonClass='flex items-center font-bold' icon={<BiEdit className='mr-2' />} />

                {/* Borrar Producto */}
                <Button div='flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer' url='' text='Borrar Producto' buttonClass='flex items-center font-bold' icon={<MdDelete className='mr-2' />} />

                {/* Mensajes */}
                <Button div='flex bg-green-300 justify-center p-2 rounded-lg mt-8 items-center hover:bg-sky-700 cursor-pointer' url='' text='Mensajes' buttonClass='flex items-center justify-center font-bold' icon={<BiMessageRoundedDetail className='mr-2' />} f={() => alert("Perfil")} m={3} mstyles='ml-2 rounded-full bg-red-500 px-1' />

                {/* Configurar Perfil */}
                <Button div='flex bg-green-300 justify-center p-2 rounded-lg mt-8 items-center hover:bg-sky-700 cursor-pointer' url='' text='Configurar Perfil' buttonClass='flex items-center font-bold' icon={<FiSettings className='mr-2' />} f={() => alert("Perfil")} />

                {/* Cerrar Sesión */}
                <Button div='flex bg-red-600 justify-center p-2 rounded-lg mt-9 items-center cursor-pointer' url='' text='Cerrar Sesión' buttonClass='flex items-center font-bold' icon={<AiOutlineLogout className='mr-2' />} f={() => alert("Cerrado")} />
            </div>
        </div>
    )
}