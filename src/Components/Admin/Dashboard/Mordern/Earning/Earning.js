import {Card, Grid} from "@mui/material";
import Chart from "react-apexcharts";
import {useSelector} from "react-redux";

const Earning = () => {
	const { adminReducer } = useSelector(res => res);

	const options = {
		title: {
			text: 'Total Earning',
			style: {
				fontSize: 25,
				color: adminReducer.dark ? 'white' : 'black'
			}
		},
		subtitle: {
			text: '$10,000',
			margin: 20,
			style: {
				fontSize: 18,
				color: adminReducer.dark ? '#00bcd4' : 'black'
			}
		},
		chart: {
			toolbar: {
				tools: {
					download: true,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false
				}
			},
			sparkline: {
				enabled: true
			}
		},
	};
	const series = [
		{
			name: 'Earning',
			data: [12, 550, 125, 232, 660, 213, 121, 5905, 312, 12, 570, 125, 22, 660, 213, 21, 5905, 312]
		}
	];
  return (
	  <>
		  <Grid item xs={12} sm={4}>
			  <Card
				  className="chart-card"
				  sx={{
					  bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
				  }}
			  >
				  <Chart
					  options={options}
					  series={series}
					  type="area"
					  height={180}
					  className="chart"
				  />
			  </Card>
		  </Grid>
	  </>
  )
}

export default Earning;