import React, { useState } from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";

const Layout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex h-screen bg-background">
      <div
        class={`${
          openSideBar ? "fixed inset-0 z-40 bg-black/50 lg:hidden" : "hidden"
        }`}
      ></div>
      <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setOpenSideBar={setOpenSideBar} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
