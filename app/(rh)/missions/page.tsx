import React from 'react';
import Liste from './Liste';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nouveau ODM',
  description: '...',
}


const page = () => {
  return (
    <div className='p-2'>
      <Liste/>
    </div>
  )
}

export default page