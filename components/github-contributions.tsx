"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Github, Calendar, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface ContributionData {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

interface ContributionStats {
  totalContributions: number;
  averagePerDay: number;
  maxDayContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
}

export function GitHubContributions() {
  const [contributionData, setContributionData] = useState<ContributionCalendar | null>(null);
  const [stats, setStats] = useState<ContributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const username = "mohdUwaish59"; // Your GitHub username
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  useEffect(() => {
    // Set default year to current year
    setSelectedYear(currentYear.toString());
  }, [currentYear]);

  useEffect(() => {
    if (selectedYear) {
      fetchContributions(parseInt(selectedYear));
    }
  }, [selectedYear]);

  const fetchContributions = async (year: number) => {
    try {
      setLoading(true);
      setError(null);

      const fromDate = `${year}-01-01T00:00:00Z`;
      const toDate = `${year}-12-31T23:59:59Z`;

      const query = `
        query($userName: String!, $from: DateTime!, $to: DateTime!) { 
          user(login: $userName) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('/api/github-contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { 
            userName: username,
            from: fromDate,
            to: toDate
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: { data: ContributionData } = await response.json();
      
      if (!data.data?.user) {
        throw new Error('User not found');
      }

      const calendar = data.data.user.contributionsCollection.contributionCalendar;
      setContributionData(calendar);
      setStats(analyzeContributions(calendar));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
    } finally {
      setLoading(false);
    }
  };

  const analyzeContributions = (calendar: ContributionCalendar): ContributionStats => {
    let activeDays = 0;
    let maxDayContributions = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let totalDays = 0;

    // Flatten all days and reverse to start from most recent
    const allDays: ContributionDay[] = [];
    calendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        allDays.push(day);
        totalDays++;
      });
    });

    // Calculate stats
    allDays.forEach((day, index) => {
      const count = day.contributionCount;
      
      if (count > 0) {
        activeDays++;
        tempStreak++;
        
        if (count > maxDayContributions) {
          maxDayContributions = count;
        }
        
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });

    // Calculate current streak (from most recent day backwards)
    const reversedDays = [...allDays].reverse();
    for (const day of reversedDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalContributions: calendar.totalContributions,
      averagePerDay: parseFloat((calendar.totalContributions / totalDays).toFixed(2)),
      maxDayContributions,
      activeDays,
      currentStreak,
      longestStreak,
    };
  };

  const getContributionLevel = (count: number): string => {
    if (count === 0) return "bg-muted";
    if (count <= 3) return "bg-green-200 dark:bg-green-900";
    if (count <= 6) return "bg-green-300 dark:bg-green-700";
    if (count <= 9) return "bg-green-400 dark:bg-green-600";
    return "bg-green-500 dark:bg-green-500";
  };

  const renderContributionGrid = () => {
    if (!contributionData) return null;

    // Group weeks by month for labeling - only show first occurrence of each month
    const monthLabels: { [key: number]: string } = {};
    const monthPositions: { [key: number]: number } = {};
    
    contributionData.weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        const monthName = date.toLocaleDateString('en', { month: 'short' });
        
        // Only record the first week of each month
        if (!monthLabels[month]) {
          monthLabels[month] = monthName;
          monthPositions[month] = weekIndex;
        }
      }
    });

    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
    const totalWeeks = contributionData.weeks.length;
    const gridWidth = totalWeeks * 16; // 12px width + 4px gap per week

    return (
      <div className="flex flex-col items-center space-y-2 overflow-x-auto">
        {/* Month labels container */}
        <div className="flex justify-center" style={{ paddingLeft: '32px' }}>
          <div className="relative" style={{ width: `${gridWidth}px` }}>
            {Object.entries(monthPositions).map(([month, position]) => {
              const leftPosition = (parseInt(position.toString()) * 16) + 6; // Center of the week
              const maxPosition = gridWidth - 24; // Leave space for label width
              const finalPosition = Math.min(leftPosition, maxPosition);
              
              return (
                <div
                  key={month}
                  className="absolute text-xs text-muted-foreground whitespace-nowrap"
                  style={{ 
                    left: `${finalPosition}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {monthLabels[parseInt(month)]}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Contribution grid with day labels - centered */}
        <div className="flex pt-4 justify-center">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2">
            {dayLabels.map((label, index) => (
              <div
                key={index}
                className="w-6 h-3 text-xs text-muted-foreground flex items-center justify-end"
              >
                {label}
              </div>
            ))}
          </div>
          
          {/* Contribution squares */}
          <div className="flex gap-1" style={{ minWidth: `${gridWidth}px` }}>
            {contributionData.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getContributionLevel(day.contributionCount)} transition-all hover:scale-110 cursor-pointer`}
                    title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Unable to load GitHub contributions</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => selectedYear && fetchContributions(parseInt(selectedYear))}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Activity
              </CardTitle>
              <CardDescription>
                My contribution activity for {selectedYear}
              </CardDescription>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">
                    {stats.totalContributions.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-2xl font-bold text-green-500">
                    {stats.activeDays}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Active Days</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-500">
                    {stats.currentStreak}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl font-bold text-orange-500">
                    {stats.maxDayContributions}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Best Day</p>
              </div>
            </div>
          )}

          {/* Contribution Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-sm font-medium">Contribution Activity</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                </div>
                <span>More</span>
              </div>
            </div>
            
            <div className="w-full flex justify-center">
              {renderContributionGrid()}
            </div>
          </div>

          {/* Additional Stats */}
          {stats && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">
                Avg: {stats.averagePerDay} per day
              </Badge>
              <Badge variant="secondary">
                Longest streak: {stats.longestStreak} days
              </Badge>
              <Badge variant="secondary">
                Year: {selectedYear}
              </Badge>
            </div>
          )}

          {/* GitHub Link */}
        </CardContent>
      </Card>
    </motion.div>
  );
}