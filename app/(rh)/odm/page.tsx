import React from 'react'
import SingleOdm from "./SingleOdm"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ORDRE DE MISSION',
  description: '...',
}


const page = () => {
  return (
    <div className='p-2'>
      <SingleOdm />
    </div>
    
  )
}

export default page