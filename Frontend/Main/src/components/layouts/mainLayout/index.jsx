import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import withScrollTopFabButton from '@hocs/withScrollTopFabButton';
import WidthPageTransition from '@hocs/widthPageTransition';

import { useSelector } from '@/store';
import { selectThemeConfig } from '@/store/theme/selectors';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import navItems from './navItems';

// Components
import Footer from '@/components/footer';
import MainHeader from '@/components/mainHeader';
import Navbar from '@/components/navbar';

function FabButton() {
	return (
		<Fab size="small" aria-label="scroll back to top" color="primary">
			<KeyboardArrowUpIcon />
		</Fab>
	);
}

function MainLayout({ container = 'lg', pb = true }) {
	const location = useLocation();
	const { pageTransitions } = useSelector(selectThemeConfig);
	const [activeFilters, setActiveFilters] = useState([]);

	const handleFilterChange = (filters) => {
		setActiveFilters(filters);
		// This will be passed down to any component that needs filter data
		// For example to JobApp component
	};

	return (
		<Box display="flex" minHeight="100vh" flexDirection="column">
			<Header 
				activeFilters={activeFilters} 
				onFilterChange={handleFilterChange} 
			/>
			<Container
				maxWidth={container}
				component="main"
				sx={{
					flex: '1 0 auto',
					...(pb && {
						pb: 5,
					}),
				}}
			>
				{pageTransitions ? (
					<WidthPageTransition location={location.key}>
						<Outlet context={{ activeFilters, onFilterChange: handleFilterChange }} />
					</WidthPageTransition>
				) : (
					<Outlet context={{ activeFilters, onFilterChange: handleFilterChange }} />
				)}
			</Container>
			{withScrollTopFabButton(FabButton)}
			<Footer />
		</Box>
	);
}

function Header({ activeFilters, onFilterChange }) {
	const { stickyHeader } = useSelector(selectThemeConfig);

	return (
		<>
			<MainHeader />
			<Navbar 
				navItems={navItems} 
				position={stickyHeader ? 'sticky' : 'static'} 
				activeFilters={activeFilters}
				onFilterChange={onFilterChange}
			/>
		</>
	);
}

export default MainLayout;