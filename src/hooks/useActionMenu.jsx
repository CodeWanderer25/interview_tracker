import { useState } from "react";

const useActionMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  return {
    openMenu,
    toggleMenu,
    closeMenu,
  };
};

export default useActionMenu;