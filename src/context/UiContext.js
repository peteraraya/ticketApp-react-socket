import React, { createContext, useState } from 'react';

export const UiContext = createContext();


export const UiProvider = ({ children }) => {

  // propiedad para ocultar el menu
  const [ocultarMenu, setOcultarMenu] = useState(false);

  const showMenu = () => {
    setOcultarMenu( false );
  }

  const hideMenu = () => {
    setOcultarMenu( true );
  }

  return (
   <UiContext.Provider value={{
     ocultarMenu,
     showMenu,
     hideMenu
   }}>
     { children }
   </UiContext.Provider>
  )
}
