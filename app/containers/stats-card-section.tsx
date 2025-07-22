import React from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { statsCards } from '~/constants/data'

export const StatsCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {statsCards.map((stat, index) => (
      <Card key={index} className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-orange-600'}`}>
              {stat.trend}
            </span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}
