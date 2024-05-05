"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdEvent,
  MdSwapHoriz,
  MdAccountCircle,
  MdLocalOffer,
  MdHelp,
  MdSettings,
  MdExitToApp,
  MdChevronLeft,
  MdChevronRight,
  MdConfirmationNumber,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard"); // Set default active page
  const expandedLogo = "/Quick_Eats_Full.png";

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setActivePage("Dashboard");
    } else if (pathname === "/events" || pathname === "/addevent") {
      setActivePage("Events");
    } else if (pathname === "/transactions") {
      setActivePage("Transactions");
    } else if (pathname === "/reservations") {
      setActivePage("Reservations");
    } else if (pathname === "/account") {
      setActivePage("Account");
    } else if (pathname === "/promotions") {
      setActivePage("Promotions");
    } else if (pathname === "/support") {
      setActivePage("Support");
    } else if (pathname === "/settings") {
      setActivePage("Settings");
    } else if (pathname === "/logout") {
      setActivePage("Log Out");
    }
  }, [pathname]); // React to changes in pathname

  // Helper function to determine if the item is the active page
  const isActive = (pageName: string) => {
    return activePage === pageName
      ? "bg-[#F1F5FA] text-brand-blue"
      : "text-white";
  };

  // Additional padding for icons when the sidebar is open
  const iconPadding = isOpen ? "pl-5" : "";

  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col bg-brand-blue transition-all duration-300 items-center justify-between"
        style={{ width: isOpen ? "14rem" : "5rem" }}
      >
        <div
          className={`${
            isOpen ? "justify-start pl-5" : "justify-center"
          } flex items-center w-full`}
        >
          {isOpen ? (
            <h1 className="text-3xl font-bold text-blue-50">Quick Eats</h1>
          ) : (
            <>
              <br /> <br />
              <h1 className="text-3xl font-bold text-blue-50">QE</h1>
            </>
          )}
          <button
            className="p-2 mt-2 rounded focus:outline-none text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <MdChevronLeft size={24} />
            ) : (
              <MdChevronRight size={24} />
            )}
          </button>
        </div>
        <ul className="w-full mt-5">
          <Link href="/dashboard">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Dashboard")}`}
              onClick={() => setActivePage("Dashboard")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdDashboard size={30} />
              </div>
              {isOpen && <span className="pl-2">Dashboard</span>}
            </li>
          </Link>
          <Link href="/items">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Events")}`}
              onClick={() => setActivePage("Events")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdEvent size={30} />
              </div>
              {isOpen && <span className="pl-2">Items</span>}
            </li>
          </Link>
          <Link href="/transactions">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Transactions")}`}
              onClick={() => setActivePage("Transactions")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdSwapHoriz size={30} />
              </div>
              {isOpen && <span className="pl-2">Category</span>}
            </li>
          </Link>
          <Link href="/reservations">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Reservations")}`}
              onClick={() => setActivePage("Reservations")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdConfirmationNumber size={30} />
              </div>
              {isOpen && <span className="pl-2">Orders</span>}
            </li>
          </Link>
          <Link href="/account">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Account")}`}
              onClick={() => setActivePage("Account")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdAccountCircle size={30} />
              </div>
              {isOpen && <span className="pl-2">Users</span>}
            </li>
          </Link>
          <Link href="/promotions">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Promotions")}`}
              onClick={() => setActivePage("Promotions")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdLocalOffer size={30} />
              </div>
              {isOpen && <span className="pl-2">Payments</span>}
            </li>
          </Link>
        </ul>
        <ul className="w-full mb-5">
          <Link href="/settings">
            <li
              className={`flex items-center cursor-pointer ${
                isOpen ? "justify-start pl-5 pr-5" : "justify-center"
              } my-5 ${isActive("Settings")}`}
              onClick={() => setActivePage("Settings")}
              style={{ padding: "5px 0" }}
            >
              <div className={`${iconPadding}`}>
                <MdSettings size={30} />
              </div>
              {isOpen && <span className="pl-2">Settings</span>}
            </li>
          </Link>
          <li
            className={`flex items-center cursor-pointer ${
              isOpen ? "justify-start pl-5 pr-5" : "justify-center"
            } my-5 ${isActive("Log Out")}`}
            onClick={() => setActivePage("Log Out")}
            style={{ padding: "5px 0" }}
          >
            <div className={`${iconPadding}`}>
              <MdExitToApp size={30} />
            </div>
            {isOpen && <span className="pl-2">Log Out</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}
