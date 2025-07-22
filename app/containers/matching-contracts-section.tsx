import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { contracts } from "~/constants/data";

export const MatchingContractsSection = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Matching Contracts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between flex-col">
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-3 w-full">
                    <h3 className="text-xl font-semibold text-gray-900 truncate flex-1 mr-4">
                      {contract.title}
                    </h3>
                    <Badge className="bg-emerald-500 text-white px-3 py-1 text-sm font-medium">
                      {contract.matchScore}
                    </Badge>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="text-[13px]">
                      <p className="text-gray-600 mb-4">
                        {contract.department} • {contract.category}
                      </p>

                      <div className="flex items-center space-x-6 text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{contract.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {contract.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-4">
                      {contract.value}
                    </p>
                  </div>
                </div>

                <div className="text-right flex justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Badge className="text-blue-600 bg-blue-50 px-3 py-1">
                      {contract.priority}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-500 px-3 text-sm font-medium">
                      {contract.daysLeft}
                    </Badge>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
