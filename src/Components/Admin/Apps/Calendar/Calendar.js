import {useRef} from "react";
import {Button, ButtonGroup, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css";
import {useSelector} from "react-redux";

const Calendar = () => {
	const calendar = useRef();
	const { adminReducer } = useSelector(res => res);
	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleDateString('default', {month: "short"});
	const year = date.getFullYear();
	const events = [
		{
			title: 'Birthday',
			date: '2022-04-12',
			color: 'red'
		},
		{
			title: 'Meeting',
			date: '2022-04-22',
			color: 'green'
		}
	];

	const prevMonth = () => {
		const calendarApi = calendar.current.getApi();
		calendarApi.prev();
	};

	const nextMonth = () => {
		const calendarApi = calendar.current.getApi();
		calendarApi.next();
	};

	const getToday = () => {
		const calendarApi = calendar.current.getApi();
		calendarApi.today();
	};

	return (
	  <>
		  <Card
			  className="shadow-sm p-4"
			  sx={{
				  bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
			  }}
		  >
			  <CardContent>
				  <Grid container>
					  <Grid item xs={12}>
						  <Stack direction="row" justifyContent="space-between">
							  <ButtonGroup variant="outlined" color="warning">
								  <Button onClick={prevMonth}>Prev</Button>
								  <Button onClick={nextMonth}>Next</Button>
							  </ButtonGroup>
							  <Typography variant="h5">{day + ' ' + month + ' ' + year}</Typography>
							  <Button variant="outlined" color="primary" onClick={getToday}>Today</Button>
						  </Stack>
					  </Grid>
					  <Grid item xs={12}>
						  <FullCalendar
							  ref={calendar}
							  plugins={[dayGridPlugin]}
							  initialView="dayGridMonth"
							  events={events}
							  eventDisplay="list-item"
							  headerToolbar={{
								  start: '',
								  center: '',
								  end: ''
							  }}
						  />
					  </Grid>
				  </Grid>
			  </CardContent>
		  </Card>
	  </>
  )
}

export default Calendar;