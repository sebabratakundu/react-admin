import {Card, CardContent, Grid, Skeleton, Typography} from "@mui/material";
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {revenueRequest} from "./revenue.action";

const Revenue = () => {
	const [categories, setCategories] = useState([]);
	const [series, setSeries] = useState([]);
	const dispatch = useDispatch();
	const {revenueReducer, adminReducer} = useSelector(res => res);
	const options = {
		xaxis: {
			categories
		},
		theme: {
			palette: 'palette8'
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
			}
		}
	}

	useEffect(() => {
		const getRevenue = () => {
			dispatch(revenueRequest());
		};

		const setRevenue = () => {
			setSeries([
				{
					name: 'Earning',
					data: revenueReducer.data.earning
				},
				{
					name: 'Expenses',
					data: revenueReducer.data.expenses
				}
			]);
			setCategories(revenueReducer.data.months);
		};

		if (revenueReducer.isLoading === null) {
			getRevenue();
		}

		if (revenueReducer.success) {
			setRevenue();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [revenueReducer]);

  return (
	  <>
		  <Grid item xs={12} sm={6}>
			  <Card
				  sx={{
					  bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
				  }}
			  >
				  <CardContent>
					  <Typography variant="h5" component="div" gutterBottom>Revenue</Typography>
					  {
						  revenueReducer.isLoading ? <Skeleton variant="rectangular" sx={{bgcolor: '#f8f8f8'}} animation="wave" height={300}/> : <Chart height="300" type="line" series={series} options={options}/>
					  }
				  </CardContent>
			  </Card>
		  </Grid>
	  </>
  )
}

export default Revenue;