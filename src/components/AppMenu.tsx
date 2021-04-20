import { IconButton, Menu, MenuItem, MenuProps } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import routes from '../consts/routes';

const AppMenu: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<MenuProps['anchorEl']>(null);
  const closeMenu = () => {
    setMenuAnchor(null);
  };
  return (
    <>
      <IconButton
        color="inherit"
        onClick={(event: React.SyntheticEvent) => {
          setMenuAnchor(event.currentTarget);
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem>
          <Link to={routes.home} onClick={closeMenu}>
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={routes.memories} onClick={closeMenu}>
            Memories
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppMenu;
