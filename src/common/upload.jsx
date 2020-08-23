import React from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import { uploadImage } from '../Models/Util';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		padding: theme.spacing(3)
// 	},
// 	content: {
// 		marginTop: theme.spacing(2)
// 	}
// }));

const Upload = (props) => {
	const [open, setOpen] = React.useState(false);
	const [fileObjects, setFileObjects] = React.useState([]);

	const onSave = async () => {
		const res = await uploadImage(props.directory, fileObjects[0].file);
		if(res && res.data && res.data.uploaded === true) {
			props.onSave(res.data.urlKey)
		}
		setOpen(false);
	}

	return (
		<div>
			<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
				Add Image
  		</Button>

			<DropzoneDialogBase
				acceptedFiles={['image/*']}
				fileObjects={fileObjects}
				cancelButtonText={"cancel"}
				submitButtonText={"submit"}
				maxFileSize={5000000}
				filesLimit={1}
				open={open}
				onAdd={newFileObjs => {
					setFileObjects([]);
					setFileObjects([].concat([], newFileObjs));

				}}
				onDelete={deleteFileObj => {
					setFileObjects([]);
				}}
				onClose={() => setOpen(false)}
				onSave={onSave}
				showPreviews={true}
				showFileNamesInPreview={true}
			/>
		</div>
	);
};

export default Upload;
