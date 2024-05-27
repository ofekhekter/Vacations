import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


const dataset = [
  {
    followers: 5,
    month: 'Israel',
  },
  {
    followers: 3,
    month: 'Italy',
  },
  {
    followers: 3,
    month: 'France',
  },
  {
    followers: 2,
    month: 'Germany',
  },
  {
    followers: 6,
    month: 'Usa',
  },
  {
    followers: 4,
    month: 'Argentina',
  },
  {
    followers: 8,
    month: 'Canada',
  },
  {
    followers: 6,
    month: 'Egypt',
  },
  {
    followers: 5,
    month: 'Japan',
  },
  {
    followers: 3,
    month: 'Spain',
  },
  {
    followers: 2,
    month: 'Turkey',
  },
  {
    followers: 4,
    month: 'india',
  },
  {
    followers: 1,
    month: 'Brazil',
  },
];

const valueFormatter = (value: number | null) => `${value} Followers`;

const chartSetting = {
  yAxis: [
    {
      label: 'Followers',
    },
  ],
  series: [{ dataKey: 'followers', label: 'Vacations', valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function TickPlacementBars() {

  return (
    <div style={{ width: '100%'}}>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
