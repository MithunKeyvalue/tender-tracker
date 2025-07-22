import React from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { statsCards } from '~/constants/data'

export const StatsCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {statsCards.map((stat, index) => (
      <Card key={index} className="relative overflow-hidden border-border bg-card hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-3xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br from-primary/20 to-chart-${index + 1}/20 rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon className={`w-7 h-7 text-primary`} />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className={`text-sm font-semibold flex items-center gap-1 ${stat.positive ? 'text-chart-2' : 'text-chart-5'}`}>
              {stat.positive ? '↑' : '↓'} {stat.trend}
            </span>
            <div className={`h-1 w-20 rounded-full bg-muted overflow-hidden`}>
              <div 
                className={`h-full rounded-full transition-all duration-500 ${stat.positive ? 'bg-chart-2' : 'bg-chart-5'}`}
                style={{ width: `${Math.abs(parseFloat(stat.trend))}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}
