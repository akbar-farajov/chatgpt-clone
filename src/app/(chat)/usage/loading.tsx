import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

const UsageLoading = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 border-b py-2 px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold">Usage</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardDescription>
                    <Skeleton className="h-4 w-24" />
                  </CardDescription>
                  <CardTitle>
                    <Skeleton className="h-9 w-32" />
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Usage Table Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Detailed breakdown of your API usage across all chats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Table Header Skeleton */}
                <div className="flex gap-4 pb-3 border-b">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Table Rows Skeleton */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex gap-4 py-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsageLoading;
