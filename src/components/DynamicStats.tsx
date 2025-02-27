
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { StatCard } from './stats/StatCard';
import { stats } from './stats/StatsData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function DynamicStats() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-center mb-16">
          <span className="gradient-text">TRUSTED BY</span> TOP TATTOO<br />
          ARTISTS WORLDWIDE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="md:col-span-1">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}