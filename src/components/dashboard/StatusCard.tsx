
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { StatusCardProps } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon: Icon,
  status = 'info',
  change
}) => {
  const statusClasses = {
    success: "border-l-green-500",
    warning: "border-l-yellow-500",
    danger: "border-l-red-500",
    info: "border-l-blue-500",
    neutral: "border-l-gray-500"
  };

  const iconClasses = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    neutral: "bg-gray-500 text-white"
  };

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 border-l-4",
      status && statusClasses[status]
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xs font-medium mb-1 text-muted-foreground">{title}</h3>
            <div className="text-xl font-bold">
              <AnimatedCounter value={value} />
            </div>
            
            {change && (
              <div className="flex items-center mt-2 text-xs">
                {change.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1 text-green-600" />}
                {change.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1 text-red-600" />}
                {change.trend === 'neutral' && <Minus className="w-3 h-3 mr-1 text-gray-600" />}
                <span className={cn(
                  "font-medium",
                  change.trend === 'up' ? "text-green-600" : 
                  change.trend === 'down' ? "text-red-600" : "text-gray-600"
                )}>
                  {change.value}% {change.trend === 'up' ? 'increase' : change.trend === 'down' ? 'decrease' : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-2 rounded-lg ml-3",
            status && iconClasses[status]
          )}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
