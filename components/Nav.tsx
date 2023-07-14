import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import React, { ReactNode, useState } from 'react';

interface MenuState {
  series: boolean;
  chapters: boolean;
  users: boolean;
}

export default function Nav() {
  const { t } = useTranslation();
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg";
  const router = useRouter();
  const { pathname } = router;

  const [showMenu, setShowMenu] = useState({
    series: false,
    chapters: false,
    users: false,
  });

  function toggleMenu(menu: keyof MenuState) {
    setShowMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  }

  React.useEffect(() => {
    if (pathname.includes("series")) {
      setShowMenu((prevState) => ({
        ...prevState,
        series: true,
      }));
    } else if (pathname.includes("chapters" || "chapter")) {
      setShowMenu((prevState) => ({
        ...prevState,
        chapters: true,
      }));
    } else if (pathname.includes("users" || "user")) {
      setShowMenu((prevState) => ({
        ...prevState,
        users: true,
      }));
    }
  }, [pathname]);

  function toggleMenuHandler(menu: keyof MenuState) {
    if (showMenu[menu]) {
      toggleMenu(menu);
    } else {
      if (pathname.includes(menu)) {
        toggleMenu(menu);
      } else {
        setShowMenu({
          series: false,
          chapters: false,
          users: false,
        });
        toggleMenu(menu);
      }
    }
  }

  async function logout() {
    await router.push("/");
    await signOut();
  }
  return (
    <aside className="text-white p-4 pr-0 w-1/7">
      <Link href={"/"} className="flex gap-1 mb-4 mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
          />
        </svg>
        <span className="ml-2">{t("site_title")}</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          {t("dashboard")}
        </Link>
        <div
          className={`flex gap-1 p-1  ${showMenu.series ? "flex-col" : ""}`}
        >
          <div
            className={`flex gap-1 w-full`}
            onClick={() => toggleMenuHandler("series")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <Link href={"/series"}>
              {t("series")}
            </Link>
          </div>
          <ul
            className={`flex flex-col gap-2 ml-4 ${
              showMenu.series ? "flex flex-col gap-2" : "hidden"
            }`}
          >
            <li>
              <Link
                href={"/series"}
                className={pathname === "/series" ? activeLink : inactiveLink}
              >
                <span className="ml-2">{t("all_series")}</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/series/add"}
                className={
                  pathname === "/series/add" ? activeLink : inactiveLink
                }
              >
                <span className="ml-2">{t("add_series")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`flex gap-1 p-1 ${showMenu.chapters ? "flex-col" : ""}`}
        >
          <div
            className={`flex gap-1 w-full`}
            onClick={() => toggleMenuHandler("chapters")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <Link href={"/chapters"}>
              {t("chapters")}
            </Link>
          </div>
          <ul
            className={`flex flex-col gap-2 ml-4 ${
              showMenu.chapters ? "flex flex-col gap-2" : "hidden"
            }`}
          >
            <li>
              <Link
                href={"/chapters"}
                className={pathname === "/chapters" ? activeLink : inactiveLink}
              >
                <span className="ml-2">{t("all_chapters")}</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/chapter/add"}
                className={
                  pathname === "/chapter/add" ? activeLink : inactiveLink
                }
              >
                <span className="ml-2">{t("add_chapter")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`flex gap-1 p-1 ${showMenu.users ? "flex-col" : ""}`}
        >
          <div
            className={`flex gap-1 w-full`}
            onClick={() => toggleMenuHandler("users")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <Link href={"/users"}>
              {t("users")}
            </Link>
          </div>
          <ul
            className={`flex flex-col gap-2 ml-4 ${
              showMenu.users ? "flex flex-col gap-2" : "hidden"
            }`}
          >
            <li>
              <Link
                href={"/users"}
                className={pathname === "/users" ? activeLink : inactiveLink}
              >
                <span className="ml-2">{t("all_users")}</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/user/add"}
                className={
                  pathname === "/user/add" ? activeLink : inactiveLink
                }
              >
                <span className="ml-2">{t("add_user")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-1 p-1">
          <div className="flex gap-1 w-full">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <button
              onClick={logout}
              className="w-full text-left"
            >
              {t("logout")}
            </button>
          </div>
        </div>

      </nav>
    </aside>
  );
}
