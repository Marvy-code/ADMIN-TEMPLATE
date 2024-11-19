import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Menu = () => {

    const menuItems = [
        {
            title: "MENU",
            items:[
                {
                    icon: "/assets/images/objective.png",
                    label: "Suivi des Missions",
                    href: "/mission"
                },
                {
                    icon: "/assets/images/lines.png",
                    label: "Suivi des ODM",
                    href: "/nouveau"
                }
            ]
        },
        {
            title: "AUTRES",
            items: [
                {
                    icon: "/assets/images/user.png",
                    label: "Profil",
                    href: "/profile"
                },
                {
                    icon: "/assets/images/adjust.png",
                    label: "Configs",
                    href: "/settings"
                },
                {
                    icon: "/assets/images/logout.png",
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
                            <Image src={item.icon} alt='' width={15} height={15} />
                            <span className='hidden lg:block'>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}

export default Menu