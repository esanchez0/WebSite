import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MenuIzquierda = ({classes}) => (
    <div className = {classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/solicitud/nueva">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Nueva Solicitud" />
            </ListItem>
            <ListItem component={Link} button to="/solicitud/lista">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{primary: classes.listItemText}} primary ="Lista Solicitudes" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button  to="/usuario/nuevo">
                 <i className="material-icons">person_add</i>
                 <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Usuario" />
            </ListItem>
            <ListItem component={Link} button to="/usuario/nuevo">
                <i className="material-icons">people</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Lista usuarios"/>
            </ListItem>
        </List>
    </div>
);