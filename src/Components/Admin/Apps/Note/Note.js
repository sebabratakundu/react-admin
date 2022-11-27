import {
	Button,
	Card,
	CardContent, Divider, FormControl,
	Grid, IconButton, InputAdornment, InputLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemText, ListSubheader, OutlinedInput,
	Stack
} from "@mui/material";
import JoditEditor from "jodit-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNoteRequest, deleteNoteRequest, viewNoteRequest} from "./note.action";
import {toast} from "react-toastify";
import {RESET_NOTE} from "./note.state";

function NoteItem({note, setNote, deleteNote}) {

	const viewNote = () => {
		setNote(note.content);
	};

	const removeNote = () => {
		deleteNote(note._id);
	};

	return (
		<ListItem>
			<ListItemButton>
				<ListItemText primary={note.filename} onClick={viewNote}/>
				<IconButton color="error" onClick={removeNote}>
					<span className="material-icons-outlined">delete</span>
				</IconButton>
			</ListItemButton>
		</ListItem>
	)
}

const Note = () => {
	const [show, setShow] = useState(false);
	const [note, setNote] = useState('');
	const [filename, setFilename] = useState('');
	const dispatch = useDispatch();
	const {noteReducer, adminReducer} = useSelector(res => res);
	const joditConfig = {
		height: 900,
		removeButtons: ['fullsize']
	}

	const newFile = () => {
		setNote('');
		setFilename('');
		setShow(false);
	}

	const saveNote = () => {
		const {userId} = JSON.parse(sessionStorage.getItem('userInfo'));

		const formdata = {
			filename,
			content: note,
			userId
		}

		dispatch(createNoteRequest(formdata));
	};

	const deleteNote = (noteId) => {
		dispatch(deleteNoteRequest(noteId));
		newFile();
	}

	useEffect(() => {

		const checkCreateNote = () => {
			if (noteReducer.createSuccess) {
				toast.success('note saved!');
				newFile();
			} else if (noteReducer.createFailed) {
				toast.error(noteReducer.error.data.message);
			}
		};

		const getNotes = () => {
			const {userId} = JSON.parse(sessionStorage.getItem('userInfo'));

			if (noteReducer.viewSuccess === null) {
				dispatch(viewNoteRequest(userId));
			}
		}
		getNotes();
		checkCreateNote();

		return () => dispatch({type: RESET_NOTE});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noteReducer]);

	return (
		<>
			<Card
				className="shadow-sm p-4"
				sx={{
					bgcolor: adminReducer.dark ? '#1e1e1e' : 'white'
				}}
			>
				<CardContent>
					<Grid container spacing={5}>
						<Grid item xs={12} sm={3}>
							<Stack direction="row" justifyContent="space-between" className="mb-3">
								<Button variant="outlined" color="primary">New File</Button>
								<Button variant="outlined" color="success" onClick={() => setShow(old => !old)}>Save
									File</Button>
							</Stack>
							{
								show ? <FormControl variant="outlined" color="success" fullWidth className="mb-3">
									<InputLabel htmlFor="filename">Filename</InputLabel>
									<OutlinedInput
										type="text"
										name="filename"
										id="filename"
										label="Filename"
										value={filename}
										onChange={(e) => setFilename(e.currentTarget.value)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton edge="end" color="success" onClick={saveNote}>
													<span className="material-icons-outlined">save</span>
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl> : null
							}
							<Divider/>
							<Stack>
								<List subheader={<ListSubheader>Saved Files</ListSubheader>}>
									{
										noteReducer.data.map((note, index) => <NoteItem key={index} note={note} setNote={setNote} deleteNote={deleteNote}/>)
									}
								</List>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={9}>
							<JoditEditor
								value={note}
								onBlur={(data) => setNote(data)}
								config={joditConfig}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	)
}

export default Note;