import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useSelector } from 'react-redux';

const valueFormatter = (value: number | null) => `${value} Followers`;

const chartSetting = {
  yAxis: [
    {
      label: 'Followers',
    },
  ],
  series: [{ dataKey: 'followers', label: 'followers/Vacation', valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function TickPlacementBars() {
  const followingsPerVacations = useSelector((state: any) => state.followersCount.followers);

  if (!followingsPerVacations || followingsPerVacations.length === 0) {
    return <h1 style={{ display: "flex", justifyContent: "center" }}>No data available</h1>;
  }

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={followingsPerVacations}
        xAxis={[
          { scaleType: 'band', dataKey: 'destination' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
