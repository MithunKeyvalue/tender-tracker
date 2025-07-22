import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { contracts } from "~/constants/data";

export const MatchingContractsSection = () => {
  return (
    <Card className="w-full border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Matching Contracts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              <div className="flex items-start justify-between flex-col">
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-3 w-full">
                    <h3 className="text-xl font-semibold text-foreground truncate flex-1 mr-4">
                      {contract.title}
                    </h3>
                    <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 px-3 py-1 text-sm font-medium">
                      {contract.matchScore}
                    </Badge>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="text-[13px]">
                      <p className="text-muted-foreground mb-4">
                        {contract.department} • {contract.category}
                      </p>

                      <div className="flex items-center space-x-6 text-muted-foreground mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{contract.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Deadline: {contract.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-br from-primary to-chart-1 bg-clip-text text-transparent mb-4">
                      {contract.value}
                    </p>
                  </div>
                </div>

                <div className="text-right flex justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                      {contract.priority}
                    </Badge>
                    <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20 px-3 text-sm font-medium">
                      {contract.daysLeft}
                    </Badge>
                  </div>
                  <Button 
                    variant="gradient" 
                    size="default"
                    onClick={() => window.location.href = `/tender-details/${index}`}
                  >
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
