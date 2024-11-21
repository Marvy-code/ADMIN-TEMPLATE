import React from 'react'
import Jumbotron from '@/components/Jumbotron';
import { BiSolidObjectsVerticalTop } from 'react-icons/bi';
import { MdAccountBalance, MdNavigateNext, MdOutlineAccountBalance, MdOutlineDescription } from 'react-icons/md';
import { TbEyeSearch, TbFlagDiscount } from 'react-icons/tb';
import Link from 'next/link';
import Image from 'next/image';
import NewOdm from "./CreateOdm"

const SingleOdm = () => {
  return (
    <div className='font-primary'>
        <Jumbotron icon='/assets/images/lines.png' title='Enregistrement des odm'/>

        <div className='flex flex-col gap-4 md:flex-row p-2 mt-5'>
            <div className='w-full lg:w-1.5/3 bg-white'>
                <div className='p-4'>
                    <NewOdm showstepNumber={true} />
                </div>
            </div>

            <div className='w-full lg:w-1.5/3 bg-white'>
                <div className='rounded-2xl shadow-2xl'>
                    {/* Card header */}
                    <h3 className='text-gray-500 float-right p-2'>Informations de la mission pour laquelle l'ODM est créé</h3> <br />

                    {/* card body */}
                    <div className='p-4 border-t md:mt-5 mt-8'>
                        <p className='text-red-500 flex'><Image src={'/assets/images/objet.png'} width={20} height={20} alt=''/> Objet de la mission:</p>
                        <p>Formation sur l'IA et la 5G</p>
                    </div>

                    <div className='flex flex-col gap-4 md:flex-row p-4'>
                        <div className='w-full lg:w-1/3'>
                            <p className='text-red-500 flex'><Image src={'/assets/images/planet-earth.png'} width={20} height={20} alt=''/>&nbsp;Continent de la mission:</p>
                            <p>Europe</p>
                        </div>

                        <div className='w-full lg:w-1/3'>
                            <p className='text-red-500 flex'><Image src={'/assets/images/country.png'} width={20} height={20} alt=''/>&nbsp;Pays de la mission:</p>
                            <p>France</p>
                        </div>

                        <div className='w-full lg:w-1/3'>
                            <p className='text-red-500 flex'><Image src={'/assets/images/smart-city.png'} width={20} height={20} alt='' /> &nbsp;Ville de la mission:</p>
                            <p>Paris</p>
                        </div>
                    </div>

                    <div className='w-full p-4'>
                        <p className='text-red-500 flex'><Image src={'/assets/images/description.png'} width={20} height={20} alt='' /> &nbsp;Description de la mission:</p>
                        <p>Ceci est une description de cette mission à Paris</p>
                    </div>

                    {/* Card Footer */}

                    <div className='p-4 border-t md:mt-5 mt-8'>
                        <p className='font-bold'>2 ODM ont été retrouvés pour cette mission <span className='float-end text-blue-700 flex'><Link href={'#'}>Consulter les ODM</Link></span></p>
                    </div>

                    <div className='bg-gradient-to-r  from-[#B2241B] to-[#769C38] p-1'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleOdm