// import withAuth from '../../../utils/WithAuth';
import React from 'react';
import Liste from './ListMissions';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'GESTION DES MISSIONS',
//   description: '...',
// }


const page = () => {
  return (
    <div className='p-2'>
      <Liste/>
    </div>
  )
}

export default (page)