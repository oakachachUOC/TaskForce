import React from 'react'
import { Door, Groups, Plus, Gmail } from '../../../images/images'
import './profile.css'


/* Sección de perfil de usuario */

export const Profile = (props) => {
  return (
    <div id="perfil">
      <div id="foto-perfil"></div>
      <div id="nombre-enlaces">
        <UserName sessionName={props.sessionName} handleLogout={props.handleLogout} />
        <Links />
      </div>
    </div>
  )
}

const UserName = (props) => {

  const handleClick = () => {
    props.handleLogout();
  }

  return (
    <div id="perfil-nombre">
      <a>
        <p className="bolder" id="nombre-usuario">
          {props.sessionName}
        </p>
      </a>
      <a onClick={() => handleClick()}>
        <Door />
      </a>
    </div>
  )
}

const Links = () => {
  return (
    <div id="perfil-enlaces">
      <RightLinks />
      <a className="perfil-enlaces-derecha-elemento">
        <Plus />
        <p>Opciones</p>
      </a>
    </div>
  )
}

const RightLinks = () => {
  return (
    <div id="perfil-enlaces-derecha">
      <a className="perfil-enlaces-derecha-elemento">
        <Gmail />
        <p>Buzón</p>
      </a>
      <a className="perfil-enlaces-derecha-elemento">
        <Groups />
        <p>Grupos</p>
      </a>
    </div>
  )
}
