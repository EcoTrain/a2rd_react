import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { scroller } from "react-scroll";
import { Menu } from "antd";
import "antd/dist/antd.min.css";

import { ThemeContext, themes } from "../../contexts/Theme/ThemeContext";
import Toggle from "../Toggle";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import "./header.scss";

import { ReactComponent as LogoMin } from "../../assets/logo_min.svg";
import { ReactComponent as LogoMax } from "../../assets/logo_max.svg";

const LngSelector = () => {
  const { t, i18n } = useTranslation();

  const onSelect = (e) => {
    console.log("lng change", e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select className={"lngSelector"} onChange={onSelect} value={i18n.language}>
      {Object.entries(i18n.options.lngSelectOptions).map((x, i) => (
        <option key={i} value={x[0]}>
          {x[1]}
        </option>
      ))}
    </select>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const isMobile = window.innerWidth < 960;
  const hideDelay = 2000;

  const headerWrapperRef = useRef();
  const headerRef = useRef();

  const [visible, setVisible] = useState(true);
  const [hideTimer, setVisibleTimer] = useState();
  const [isNarrow, setNarrow] = useState(isMobile);
  const { theme, setTheme } = useContext(ThemeContext);

  const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;

  const items = [
    {
      key: `/`,
      label: t("pages.about"),
      children: [
        { key: "/homeAbout", label: t("pages.main") },
        { key: "/homeProjects", label: t("pages.projects") },
        { key: "/homeStartups", label: t("pages.startups") },
        { key: "/homePublications", label: t("pages.publications") },
        { key: "/homeContacts", label: t("pages.contacts") },
      ],
    },
    { key: `/projects/`, label: t("pages.projects") },
    { key: `/startups/`, label: t("pages.startups") },
  ];

  const setTimer = () => {
    // clear any existing timer
    hideTimer && clearTimeout(hideTimer);

    // visible after `delay` milliseconds
    const _timer = setTimeout(() => {
      setVisible(false);
      setVisibleTimer(null);
    }, hideDelay);
    setVisibleTimer(_timer);
  };

  useScrollPosition({
    effect: ({ prevPos, currPos }) => {
      const isScrollUp = currPos.y > prevPos.y; // pos < 0
      if (isScrollUp) setTimer();
      if (isScrollUp !== visible) setVisible(isScrollUp);
    },
    deps: [visible],
  });

  useEffect(() => {
    setTimer();

    const handleResize = () => {
      setNarrow(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    return window.addEventListener("resize", null);
  }, []);

  return (
    <div
      ref={headerWrapperRef}
      className="headerWraper"
      style={{
        transform: visible
          ? "translateY(0%)"
          : `translateY(${-headerHeight}px)`,
        transition: "transform 400ms ease-out",
      }}
      onMouseEnter={() => {
        headerWrapperRef.current.style.transform = `translateY(0%))`;
        setVisible(true);
        clearTimeout(hideTimer);
      }}
      onMouseLeave={() => setTimer()}
    >
      <div ref={headerRef} className="header">
        <a href={`/`} className="headerLogo" target={"_self"}>
          {isNarrow ? <LogoMin /> : <LogoMax />}
        </a>
        <div className="headerActions">
          <Menu
            className="headerMenu"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            onClick={(elem) => {
              // console.log({ elem });

              const oldPaths = window.location.pathname.split("/");
              const oldURL = oldPaths.slice(0, -1).join("/");

              const newPaths = elem.key.split("/");
              const newURL = newPaths.slice(0, -1).join("/");

              if (oldURL == newURL) {
                scroller.scrollTo(newPaths.slice(-1)[0], {
                  duration: 1000,
                  smooth: "easeInQuint",
                });
              } else window.location.href = elem.key;
            }}
          />
          <Toggle
            onChange={() => {
              if (theme === themes.light) setTheme(themes.dark);
              if (theme === themes.dark) setTheme(themes.light);
            }}
            value={theme === themes.dark}
          />
          {/* <LngSelector /> */}
        </div>
      </div>
      <div
        className="headerActivateArea"
        style={{
          height: 20,
        }}
      ></div>
    </div>
  );
};

export default Header;
