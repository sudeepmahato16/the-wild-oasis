import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface DataItemProps{
    icon: IconType,
    children: React.ReactNode,
    label: string,
    className?: string;
    iconStyle?: string
}

const DataItem: FC<DataItemProps> = ({icon: Icon, children, label,className='', iconStyle=''}) => {
  return (
    <div className={`flex items-center gap-4 py-2 dark:text-gray-300 ${className}  `}>
    <span className="flex items-center gap-2 font-medium ">
      <Icon className={`w-5 h-5 text-indigo-600 ${iconStyle}`} />
      <span>{label}</span>{" "}
    </span>
    {children}
  </div>
  )
}

export default DataItem