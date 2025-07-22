import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export const FilterContractsSection = () => {
  return (
    <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-foreground">Filter Contracts</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">State</label>
          <select className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Price Range</label>
          <select className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
            <option>All Ranges</option>
            <option>₹1Cr - ₹5Cr</option>
            <option>₹5Cr+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
          <select className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
            <option>All Categories</option>
            <option>Construction</option>
            <option>Technology</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Match Score</label>
          <select className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
            <option>All Scores</option>
            <option>90%+</option>
            <option>80%+</option>
          </select>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
