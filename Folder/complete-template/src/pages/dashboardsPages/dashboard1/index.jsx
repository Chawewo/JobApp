// MUI
import Box from '@mui/material/Box';
import calcLayoutHeight from '@/utils/helpers/layoutHeight';

function WorkInProgress() {
	return (
		<Box
			minHeight={`calc(100vh - ${calcLayoutHeight('header', false) + calcLayoutHeight('footer', false)}px)`}
			p="5%"
			display="grid"
			sx={{
				placeItems: 'center',
				color: 'black',
				opacity: 0.8,
			}}
		>
			test
		</Box>
	);
}

export default WorkInProgress;
