import Button from '@mui/material/Button';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useSelector } from 'react-redux';
import { FollowingsDataSetModel } from '../../Models/FollowingsModel';
import { downloadCsvFile } from '../../services/downloadCsvService';

const valueFormatter = (value: number | null) => `${value} Followers`;

const chartSetting = {
  yAxis: [
    {
      label: 'Followers',
    },
  ],
  series: [{ dataKey: 'followers', label: 'Vacations Reports', valueFormatter }],
  height: 500,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function TickPlacementBars() {
  const followingsPerVacations: FollowingsDataSetModel[] = useSelector((state: any) => state.followersCount.followers);

  if (!followingsPerVacations || followingsPerVacations.length === 0) {
    return <h1 style={{ display: "flex", justifyContent: "center" }}>No data available</h1>;
  }

  const handleCsvClick = async () => {
    try {
      const blobData = await downloadCsvFile(followingsPerVacations);
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'destinations.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={followingsPerVacations}
        xAxis={[
          { scaleType: 'band', dataKey: 'destination' },
        ]}
        {...chartSetting}
      />
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: "5px" }}>
        <Button onClick={handleCsvClick} sx={{ width: "200px", alignItems: "center" }} variant="contained" href="#contained-buttons">
          Click to Download csv report file
        </Button>
      </div>
    </div>
  );
}
