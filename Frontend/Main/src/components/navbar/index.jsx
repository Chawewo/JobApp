/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Hidden from '@mui/material/Hidden';

// Icons
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckIcon from '@mui/icons-material/Check';

function Navbar({ navItems, position, onFilterChange, activeFilters = [] }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElMenus, setAnchorElMenus] = useState({});

  // Function to check if a filter is active
  const isFilterActive = (filter) => {
    return activeFilters.some(item => item.id === filter.id);
  };

  // Toggle filter selection
  const handleFilterToggle = (filter) => {
    if (isFilterActive(filter)) {
      onFilterChange(activeFilters.filter(item => item.id !== filter.id));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenMenu = (event, item) => {
    setAnchorElMenus((prev) => ({
      ...prev,
      [item.id]: event.currentTarget,
    }));
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseMenu = (item) => {
    setAnchorElMenus((prev) => ({
      ...prev,
      [item.id]: null,
    }));
  };

  // Close all menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setAnchorElMenus({});
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <AppBar position={position} color="inherit" variant="outlined" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Mobile Nav */}
          <Hidden mdUp>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <DragHandleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: 'block',
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={handleCloseNavMenu}
                    component={item.href ? RouterLink : 'div'}
                    to={item.href || undefined}
                    sx={{ minWidth: item.menuMinWidth || 'auto' }}
                  >
                    <ListItemIcon>
                      <item.Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {item.type === 'group' && (
                      <ArrowDropDownIcon />
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Hidden>

          {/* Desktop Nav */}
          <Hidden mdDown>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => {
                if (item.type === 'item') {
                  return (
                    <Button
                      key={item.id}
                      component={RouterLink}
                      to={item.href}
                      sx={{ color: 'inherit', display: 'flex', alignItems: 'center', mr: 2 }}
                      startIcon={<item.Icon />}
                    >
                      {item.title}
                    </Button>
                  );
                }

                if (item.type === 'group') {
                  const open = Boolean(anchorElMenus[item.id]);
                  return (
                    <Box key={item.id} sx={{ position: 'relative' }}>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenMenu(e, item);
                        }}
                        sx={{ color: 'inherit', display: 'flex', alignItems: 'center', mr: 2 }}
                        endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        startIcon={<item.Icon />}
                      >
                        {item.title}
                      </Button>
                      <Menu
                        anchorEl={anchorElMenus[item.id]}
                        open={open}
                        onClose={() => handleCloseMenu(item)}
                        onClick={(e) => e.stopPropagation()}
                        PaperProps={{
                          sx: { minWidth: item.menuMinWidth || 200 },
                        }}
                      >
                        {item.menuChildren?.map((child) => {
                          if (item.isFilter) {
                            // This is a filter item
                            const isActive = activeFilters.some(
                              filter => filter.id === child.id
                            );
                            
                            return (
                              <MenuItem 
                                key={child.id || child.title}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFilterToggle(child);
                                }}
                                sx={{ 
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  bgcolor: isActive ? 'action.selected' : 'inherit'
                                }}
                              >
                                {child.title}
                                <Checkbox 
                                  checked={isActive}
                                  size="small"
                                  sx={{ ml: 1 }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </MenuItem>
                            );
                          }
                          
                          // Regular navigation item
                          if (child.type === 'group') {
                            return (
                              <MenuItem
                                key={child.id}
                                sx={{
                                  '&:hover': {
                                    bgcolor: 'action.hover',
                                  },
                                }}
                              >
                                <Typography variant="inherit">{child.title}</Typography>
                                <Box sx={{ ml: 'auto' }}>
                                  <ArrowDropDownIcon />
                                </Box>
                              </MenuItem>
                            );
                          }

                          return (
                            <MenuItem
                              key={child.id || child.title}
                              component={RouterLink}
                              to={child.href}
                              onClick={() => handleCloseMenu(item)}
                            >
                              {child.title}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </Box>
                  );
                }

                return null;
              })}
            </Box>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;