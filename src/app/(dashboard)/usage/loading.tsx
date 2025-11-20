import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header, HeaderLeft } from "../components";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const UsageLoading = () => {
  return (
    <div className="flex flex-col h-full">
      <Header
        leftContent={<HeaderLeft title="Usage" />}
        rightContent={
          <Button size="sm" variant="outline" disabled>
            <Sparkles className="size-4  mr-2" />
            <span className="text-sm font-medium">Upgrade Plan</span>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
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

          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Detailed breakdown of your API usage across all chats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-4 pb-3 border-b">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>

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
