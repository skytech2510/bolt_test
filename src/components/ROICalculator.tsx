import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Calculator, Clock, Users, TrendingUp, DollarSign, Percent } from 'lucide-react';

interface ROIInputs {
  dailyCalls: number;
  employees: number;
  handleTime: number;
  seasonalVariation: number;
}

const defaultInputs: ROIInputs = {
  dailyCalls: 500,
  employees: 5,
  handleTime: 90,
  seasonalVariation: 0
};

const calculateROI = (inputs: ROIInputs) => {
  // Realistic cost assumptions based on industry standards
  const employeeCostPerHour = 18; // Average customer service wage
  const aiAgentCostPerMonth = 500; // Competitive AI service pricing
  const employeeOverheadMultiplier = 1.3; // Standard overhead costs (benefits, equipment, etc.)
  const workingDaysPerMonth = 21; // Typical working days
  const monthsToProject = 6;
  
  // Realistic time and cost calculations
  const totalCallsPerMonth = inputs.dailyCalls * workingDaysPerMonth;
  const currentHandleTimeHours = (totalCallsPerMonth * inputs.handleTime) / 3600;
  
  // Employee efficiency factors based on team size
  const teamEfficiencyLoss = Math.min(0.08 * Math.log2(inputs.employees + 1), 0.35); // Diminishing efficiency with team size
  const currentLaborCost = currentHandleTimeHours * employeeCostPerHour * 
    employeeOverheadMultiplier * (1 + teamEfficiencyLoss);
  
  // Conservative AI efficiency calculations
  const baseAiEfficiency = 0.7; // Initial efficiency
  const recommendedAgents = Math.ceil(inputs.dailyCalls / 250); // More realistic calls per agent
  const maxEfficiencyGain = 0.15;
  const aiEfficiencyFactor = baseAiEfficiency + 
    (maxEfficiencyGain * Math.min(0.8, recommendedAgents / Math.ceil(inputs.dailyCalls / 150)));
  
  // AI handling calculations
  const aiHandleTimeHours = (totalCallsPerMonth * inputs.handleTime * (1/aiEfficiencyFactor)) / 3600;
  const aiMonthlyCost = recommendedAgents * aiAgentCostPerMonth;
  
  // Realistic learning curve based on industry data
  const learningCurve = (month: number) => {
    const baseImprovement = 1 + (0.03 * Math.log(month + 1)); // Slower initial improvement
    const teamSizeEffect = 1 + (inputs.employees * 0.01); // Modest team size impact
    return baseImprovement * teamSizeEffect;
  };
  
  return Array.from({ length: monthsToProject }, (_, month) => {
    // Seasonal impact on call volume
    const seasonalFactor = 1 + (inputs.seasonalVariation * Math.sin((month / 12) * 2 * Math.PI));
    const efficiencyMultiplier = learningCurve(month);
    
    // Calculate realistic monthly savings
    const monthlySavings = (currentLaborCost - aiHandleTimeHours * employeeCostPerHour) * 
      seasonalFactor * efficiencyMultiplier;
    
    const totalCost = aiMonthlyCost * (month + 1);
    const totalSavings = monthlySavings * (month + 1);
    
    // Conservative ROI calculation
    const baseROI = ((totalSavings - totalCost) / totalCost) * 100;
    const scaleFactor = 1 + (inputs.employees * 0.02); // Modest scale advantage
    const roi = Math.max(2, Math.min(75, baseROI * scaleFactor)); // More conservative cap
    
    return {
      savings: totalSavings,
      costs: totalCost,
      roi: roi
    };
  });
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const [roiData, setRoiData] = useState<any[]>([]);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateAndAnimate = async () => {
      setIsCalculating(true);
      const newData = calculateROI(inputs);
      setRoiData(newData);
      setIsCalculating(false);
    };

    const debounce = setTimeout(calculateAndAnimate, 300);
    return () => clearTimeout(debounce);
  }, [inputs]);

  const chartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'ROI %',
        data: roiData.map(d => d.roi),
        borderColor: '#904af2',
        backgroundColor: 'rgba(144, 74, 242, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Savings ($)',
        data: roiData.map(d => d.savings),
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          padding: 10,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(144, 74, 242, 0.2)',
        borderWidth: 1,
        padding: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            if (context.dataset.yAxisID === 'y') {
              return `ROI: ${context.raw.toFixed(1)}%`;
            }
            return `Savings: $${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        max: 80,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(144, 74, 242, 0.8)',
          callback: (value: number) => `${value}%`,
          font: { size: 10 }
        },
        title: {
          display: true,
          text: 'ROI %',
          color: 'rgba(144, 74, 242, 0.8)',
          font: { size: 10 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'rgba(0, 229, 255, 0.8)',
          callback: (value: number) => `$${(value / 1000).toFixed(0)}k`,
          font: { size: 10 }
        },
        title: {
          display: true,
          text: 'Savings ($)',
          color: 'rgba(0, 229, 255, 0.8)',
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 10 }
        }
      }
    }
  };

  const handleSliderChange = (name: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const renderParameter = (
    name: keyof ROIInputs,
    icon: React.ReactNode,
    label: string,
    min: number,
    max: number,
    step: number,
    unit: string = ''
  ) => (
    <div className={`relative p-4 bg-black/40 backdrop-blur-xl rounded-xl border transition-all duration-300
      ${activeInput === name ? 'border-[#904af2] shadow-lg shadow-[#904af2]/20' : 'border-[#904af2]/20'}
      hover:border-[#904af2]/60`}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-white text-sm">
          {icon}
          <span className="font-medium">{label}</span>
        </label>
        <span className="text-[#904af2] font-medium text-sm">
          {inputs[name]}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={inputs[name]}
        onChange={(e) => handleSliderChange(name, Number(e.target.value))}
        onFocus={() => setActiveInput(name)}
        onBlur={() => setActiveInput(null)}
        className="w-full h-1.5 bg-[#904af2]/20 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#904af2]
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-[#904af2]/25"
      />
    </div>
  );

  return (
    <section className="py-12 px-4 relative overflow-hidden bg-black" ref={calculatorRef}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,74,242,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#904af2]/5 to-black opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-black mb-2">
            <span className="text-white">CALCULATE YOUR</span>{' '}
            <span className="gradient-text">ROI</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            See how AI voice agents can transform your business outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-start">
          <div className="space-y-3">
            {renderParameter(
              'dailyCalls',
              <Calculator className="w-4 h-4 text-[#904af2]" />,
              'Daily Call Volume',
              0,
              1000,
              10
            )}
            {renderParameter(
              'employees',
              <Users className="w-4 h-4 text-[#904af2]" />,
              'Number of Employees',
              1,
              50,
              1
            )}
            {renderParameter(
              'handleTime',
              <Clock className="w-4 h-4 text-[#904af2]" />,
              'Average Handle Time',
              30,
              300,
              5,
              's'
            )}
            {renderParameter(
              'seasonalVariation',
              <TrendingUp className="w-4 h-4 text-[#904af2]" />,
              'Seasonal Variation',
              0,
              0.5,
              0.05,
              '%'
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-[#904af2]/20">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#904af2]" />
                Projected ROI & Savings
              </h3>
              <div className="h-[300px] relative">
                {isCalculating ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-6 h-6 border-3 border-[#904af2]/30 border-t-[#904af2] rounded-full animate-spin" />
                  </div>
                ) : (
                  <Line data={chartData} options={chartOptions} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {roiData[5] && (
                <>
                  <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-[#904af2]/20
                    hover:border-[#904af2]/40 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-1 text-gray-400">
                      <Percent className="w-3 h-3 text-[#904af2]" />
                      <h4 className="text-xs">6-Month ROI</h4>
                    </div>
                    <p className="text-xl font-bold text-white group-hover:text-[#904af2] transition-colors">
                      {roiData[5].roi.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-[#904af2]/20
                    hover:border-[#904af2]/40 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-1 text-gray-400">
                      <DollarSign className="w-3 h-3 text-[#00e5ff]" />
                      <h4 className="text-xs">Total Savings</h4>
                    </div>
                    <p className="text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                      ${Math.round(roiData[5].savings).toLocaleString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}