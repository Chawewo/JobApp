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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

/**
 * @example
 * {
 *    id: number,
 *    type: "group" | "item",
 *    title: string,
 *    Icon: NodeElement
 *    menuChildren?: {title: string, href: string, value: string, filterType: string}[]
 *    menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
    {
        id: uuid(),
        type: 'item',
        title: 'Home Page',
        Icon: AccountCircleOutlinedIcon,
        href: '/',
    },
    {
        id: uuid(),
        type: 'group',
        title: 'Salary',
        Icon: WidgetsOutlinedIcon,
        isFilter: true,
        filterType: 'salary',
        menuChildren: [
            {
                title: '$50,000+',
                value: '50000',
                filterType: 'salary',
                id: uuid(),
            },
            {
                title: '$100,000+',
                value: '100000',
                filterType: 'salary',
                id: uuid(),
            },
            {
                title: '$250,000+',
                value: '250000',
                filterType: 'salary',
                id: uuid(),
            },
            {
                title: '$500,000+',
                value: '500000',
                filterType: 'salary',
                id: uuid(),
            },
        ],
    },
    {
        id: uuid(),
        type: 'group',
        title: 'Job Type',
        Icon: WorkOutlineIcon,
        isFilter: true,
        filterType: 'employmentStatus',
        menuChildren: [
            {
                title: 'Full-time',
                value: 'Full-time',
                filterType: 'employmentStatus',
                id: uuid(),
            },
            {
                title: 'Part-time',
                value: 'Part-time',
                filterType: 'employmentStatus',
                id: uuid(),
            },
            {
                title: 'Contract',
                value: 'Contract',
                filterType: 'employmentStatus',
                id: uuid(),
            },
            {
                title: 'Internship',
                value: 'Internship',
                filterType: 'employmentStatus',
                id: uuid(),
            },
        ],
    },
    {
        id: uuid(),
        type: 'group',
        title: 'Experience Level',
        Icon: BusinessCenterOutlinedIcon,
        isFilter: true,
        filterType: 'experienceLevel',
        menuChildren: [
            {
                title: 'Entry Level',
                value: 'Entry',
                filterType: 'experienceLevel',
                id: uuid(),
            },
            {
                title: 'Associate',
                value: 'Associate',
                filterType: 'experienceLevel',
                id: uuid(),
            },
            {
                title: 'Mid-Senior',
                value: 'Mid-Senior',
                filterType: 'experienceLevel',
                id: uuid(),
            },
            {
                title: 'Director',
                value: 'Director',
                filterType: 'experienceLevel',
                id: uuid(),
            },
            {
                title: 'Executive',
                value: 'Executive',
                filterType: 'experienceLevel',
                id: uuid(),
            },
        ],
    },
    {
        id: uuid(),
        type: 'group',
        title: 'Location',
        Icon: LocationOnOutlinedIcon,
        isFilter: true,
        filterType: 'location',
        menuChildren: [
            {
                title: 'Remote',
                value: 'Remote',
                filterType: 'location',
                id: uuid(),
            },
            {
                title: 'In-Person',
                value: 'In-Person',
                filterType: 'location',
                id: uuid(),
            },

        ],
    },
    {
        id: uuid(),
        type: 'group',
        title: 'Date Posted',
        Icon: AccessTimeOutlinedIcon,
        isFilter: true,
        filterType: 'datePosted',
        menuChildren: [
            {
                title: 'Past 24 hours',
                value: '1',
                filterType: 'datePosted',
                id: uuid(),
            },
            {
                title: 'Past week',
                value: '7',
                filterType: 'datePosted',
                id: uuid(),
            },
            {
                title: 'Past month',
                value: '30',
                filterType: 'datePosted',
                id: uuid(),
            },
            {
                title: 'Any time',
                value: 'any',
                filterType: 'datePosted',
                id: uuid(),
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