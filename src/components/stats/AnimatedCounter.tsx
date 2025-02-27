import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return <span>{displayValue}</span>;
};