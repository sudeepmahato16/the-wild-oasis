import React from 'react'
import Filter from '@/components/Filter'

const DashboardFilter = () => {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
    />
  )
}

export default DashboardFilter