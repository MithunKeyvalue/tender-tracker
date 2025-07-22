import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export const FilterContractsSection = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Filter Contracts</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
            <option>All Ranges</option>
            <option>₹1Cr - ₹5Cr</option>
            <option>₹5Cr+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
            <option>All Categories</option>
            <option>Construction</option>
            <option>Technology</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Match Score</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
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
