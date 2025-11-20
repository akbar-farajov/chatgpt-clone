import { getUserUsage, getUserUsageStats } from "@/actions/usage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DAILY_TOKEN_LIMIT } from "@/lib/constants";

const UsagePage = async () => {
  const { data: usageData, error: usageError } = await getUserUsage({
    todayOnly: true,
  });
  const { data: stats, error: statsError } = await getUserUsageStats({
    todayOnly: true,
  });

  if (usageError || statsError) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Loading Usage Data</CardTitle>
              <CardDescription>{usageError || statsError}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="flex flex-col h-full">
      {/* <Header
        leftContent={<HeaderLeft title="Usage" />}
        rightContent={
          <Button size="sm" variant="outline" disabled>
            <Sparkles className="size-4  mr-2" />
            <span className="text-sm font-medium">Upgrade Plan</span>
          </Button>
        }
      /> */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader>
                <CardDescription>Today&apos;s Total Tokens</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(stats?.totalTokens || 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Today&apos;s Input Tokens</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(stats?.totalInputTokens || 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Today&apos;s Output Tokens</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(stats?.totalOutputTokens || 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Today&apos;s Reasoning Tokens</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(stats?.totalReasoningTokens || 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Daily Limit</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(DAILY_TOKEN_LIMIT)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Today&apos;s API usage across all chats
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!usageData || usageData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No usage data for today yet. Start chatting to see your usage
                  statistics.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-right">Input</TableHead>
                      <TableHead className="text-right">Output</TableHead>
                      <TableHead className="text-right">Reasoning</TableHead>
                      <TableHead className="text-right">Cached</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageData.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell className="font-medium">
                          {formatDate(usage.created_at)}
                        </TableCell>
                        <TableCell>
                          {usage.model_id ? (
                            <Badge variant="secondary" className="font-mono">
                              {usage.model_id.replace("google:", "")}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              N/A
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(usage.input_tokens)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(usage.output_tokens)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(usage.reasoning_tokens)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(usage.cached_input_tokens)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatNumber(usage.total_tokens)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsagePage;
