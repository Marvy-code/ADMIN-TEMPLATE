import Link from 'next/link'
import React from 'react'

const Menu = () => {

    const menuItems = [
        {
            title: "MENU",
            items:[
                {
                    label: "Nouveau ODM",
                    href: "/"
                },
                {
                    label: "Liste des ODM",
                    href: "/nouveau"
                }
            ]
        },
        {
            title: "AUTRES",
            items: [
                {
                    label: "Profil",
                    href: "/profile"
                },
                {
                    label: "Configs",
                    href: "/settings"
                },
                {
                    label: "Déconnexion",
                    href: "/logout"
                }
            ]
        }
    ]

  return (
    <div>
        {menuItems.map(i=>(
            <div className='mt-4 text-sm' key={i.title}>
                <div className='flex flex-col gap-2'>
                    <span className='hidden lg:block text-gray-400 font-light my-4'>{i.title}</span>
                    {i.items.map(item=>(
                        <Link href={item.href} key={item.label} className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2'>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}

export default Menu