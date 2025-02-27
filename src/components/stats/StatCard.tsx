import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { AnimatedCounter } from './AnimatedCounter';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  chartType: 'line' | 'bar' | 'pie';
  chartData: any;
  chartOptions: any;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  chartType,
  chartData,
  chartOptions
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Delay chart expansion for smooth entrance
          setTimeout(() => setIsExpanded(true), 500);
          setTimeout(() => setIsChartVisible(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ChartComponent = {
    line: Line,
    bar: Bar,
    pie: Pie
  }[chartType];

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => setIsChartVisible(true), 300);
    } else {
      setIsChartVisible(false);
    }
  };

  // Enhanced chart options with animations
  const enhancedChartOptions = {
    ...chartOptions,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
      delay: (context: any) => {
        // Stagger animation for elements
        return context.dataIndex * 100;
      },
      onProgress: (animation: any) => {
        // Smooth progress animation
        animation.chart.data.datasets.forEach((dataset: any, i: number) => {
          const meta = animation.chart.getDatasetMeta(i);
          meta.hidden = false;
        });
      },
      onComplete: (animation: any) => {
        // Ensure final state is clean
        animation.chart.data.datasets.forEach((dataset: any, i: number) => {
          const meta = animation.chart.getDatasetMeta(i);
          meta.hidden = false;
        });
      }
    },
    transitions: {
      active: {
        animation: {
          duration: 300
        }
      }
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`
        transform transition-all duration-1000 ease-out
        ${isVisible 
          ? 'translate-y-0 opacity-100 rotate-0 scale-100' 
          : 'translate-y-20 opacity-0 rotate-2 scale-95'
        }
      `}
    >
      <div 
        className={`
          relative overflow-hidden
          bg-black/40 backdrop-blur-xl rounded-2xl border border-[#904af2]/20
          hover:border-[#904af2]/40 transition-all duration-500 ease-in-out
          ${isExpanded ? 'h-[400px]' : 'h-[160px]'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#904af2]/5 via-transparent to-transparent opacity-50 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(144,74,242,0.15),transparent_70%)] transition-opacity duration-500" />
        
        <div className="relative p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[#904af2]/10 transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#904af2]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">
                  {title}
                </h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
            
            <button
              onClick={toggleExpand}
              className="p-2 hover:bg-[#904af2]/10 rounded-lg transition-colors duration-300"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-400 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300" />
              )}
            </button>
          </div>
          
          <div className="text-2xl font-bold text-white mb-4">
            <AnimatedCounter value={value} duration={1500} />
          </div>
          
          <div 
            ref={chartRef}
            className={`
              flex-1 transition-all duration-700 ease-in-out
              ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 h-0'}
            `}
          >
            {isExpanded && isChartVisible && (
              <div className="h-full transition-all duration-700 ease-in-out">
                <ChartComponent 
                  data={{
                    ...chartData,
                    datasets: chartData.datasets.map((dataset: any) => ({
                      ...dataset,
                      // Add transition for dataset appearance
                      opacity: isChartVisible ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out'
                    }))
                  }} 
                  options={enhancedChartOptions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};