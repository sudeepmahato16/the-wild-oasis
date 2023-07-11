import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface DataItemProps{
    icon: IconType,
    children: React.ReactNode,
    label: string
}

const DataItem: FC<DataItemProps> = ({icon: Icon, children, label}) => {
  return (
    <div className="flex items-center gap-4 py-2">
    <span className="flex items-center gap-2 font-medium ">
      <Icon className="w-5 h-5 text-indigo-600" />
      <span>{label}</span>{" "}
    </span>
    {children}
  </div>
  )
}

export default DataItem