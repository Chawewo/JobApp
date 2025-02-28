import { v4 as uuid } from 'uuid';
// Icons
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'group',
		title: 'Home Page',
		Icon: BarChartOutlinedIcon,
		menuChildren: [
			{
				title: 'Dashboard01',
				href: '/pages/wip',
			},
			{
				title: 'Dashboard02',
				href: '/dashboards/dashboard2',
			},
			{
				title: 'Dashboard03',
				href: '/dashboards/dashboard3',
			},
			{
				title: 'Dashboard04',
				href: '/dashboards/dashboard4',
			},
			{
				title: 'Dashboard05',
				href: '/dashboards/dashboard5',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Salary',
		Icon: WidgetsOutlinedIcon,
		menuChildren: [
			{
				title: '$50,000+',
				href: '/components/forms',
			},
			{
				title: '$100,000+',
				href: '/components/forms',
			},
			{
				title: '$250,000+',
				href: '/components/forms',
			},
			{
				title: '$500,000+',
				href: '/components/forms',
			},
		],
	},

	{
		id: uuid(),
		type: 'group',
		title: 'Job Type',
		Icon: GridViewOutlinedIcon,
		menuChildren: [
			{
				title: 'WIP',
				href: '/pages/wip',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Date Posted',
		Icon: AutoStoriesOutlinedIcon,
		menuChildren: [
			{
				title: 'WIP',
				href: '/pages/wip',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Other',
		Icon: PaletteOutlinedIcon,
		menuChildren: [
			{
				id: uuid(),
				title: 'Sign in',
				type: 'group',
				menuChildren: [
					{
						title: 'Sign in',
						href: '/pages/login',
					},
					{
						title: 'Sign in Split',
						href: '/pages/login/split',
					},
				],
			},
			{
				id: uuid(),
				title: 'Sign up',
				type: 'group',
				menuChildren: [
					{
						title: 'Sign up',
						href: '/pages/signup',
					},
					{
						title: 'Sign up Split',
						href: '/pages/signup/split',
					},
				],
			},
			{
				title: 'WIP',
				href: '/pages/wip',
			},
		],
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Profile ',
		Icon: AccountCircleOutlinedIcon,
		href: '/pages/settings',
	},
];

export default NAV_LINKS_CONFIG;
