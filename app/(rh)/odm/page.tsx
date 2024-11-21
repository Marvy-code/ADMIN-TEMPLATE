import React from 'react'
import ListOdm from "./ListOdm"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ORDRE DE MISSION',
  description: '...',
}


const page = () => {
  return (
    <div className='p-2'>
      <ListOdm />
    </div>
    
  )
}

export default page