import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuListButton({children, anchorEl, setAnchorEl}) {


  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        
      >
        {children}
      </Menu>
    </div>
  );
}