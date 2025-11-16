import React from "react";
import { TextAlignJustify  } from "lucide-react";
import { Button } from "../ui/button";
const Header = ({setOpenSideBar}) => {
  return (
    <div className="border-b border-border bg-card h-16 flex items-center px-4 lg:px-8">
      <Button onClick={() => setOpenSideBar(true)} className="bg-transparent block lg:hidden mr-2 w-[36px] h-[36px] flex hover:bg-accent">
        <TextAlignJustify  className="text-foreground "/>
      </Button>
      <h2 className="text-sm lg:text-lg font-semibold text-foreground truncate">
        Welcome to Rental Management System
      </h2>
    </div>
  );
};

export default Header;
