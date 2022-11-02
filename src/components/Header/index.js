import React, {useEffect, useRef, useState, useContext} from "react";
import {useTranslation} from "react-i18next";
import {Menu} from "antd";

import {ThemeContext, themes} from "../../contexts/ThemeContext";
import Toggle from "../Toggle";
import {useScrollPosition} from "../../hooks/useScrollPosition";
import "./header.scss";

import {ReactComponent as LogoMin} from "../../assets/logo_min.svg";
import {ReactComponent as LogoMax} from "../../assets/logo_max.svg";

const LngSelector = () => {
  const {t, i18n} = useTranslation();

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
  const {t} = useTranslation();
  const hideDelay = 5000;

  const headerWrapperRef = useRef();
  const headerRef = useRef();

  const [visible, setVisible] = useState(true);
  const [isNarrow, setNarrow] = useState(window.innerWidth < 960);
  const {theme, setTheme} = useContext(ThemeContext);
  const visibilityTimer = useRef();

  const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;

  const items = [
    {
      key: `/`,
      label: t("navHeader.about"),
      children: [
        {key: "/homeAbout", label: t("navHeader.main")},
        {key: "/homeProjects", label: t("navHeader.projects")},
        {key: "/homeStartups", label: t("navHeader.startups")},
        {key: "/homeStack", label: t("navHeader.stack")},
        {key: "/homePublications", label: t("navHeader.publications")},
        {key: "/homeContacts", label: t("navHeader.contacts")},
      ],
    },
    {key: `/projects/`, label: t("navHeader.projects")},
    {key: `/startups/`, label: t("navHeader.startups")},
    {
      key: `/modeling/`,
      label: t("navHeader.modeling.main"),
      children: [
        {
          key: "/modeling/multiagent/",
          label: t("navHeader.modeling.multiagent"),
        },
        {
          key: "/modeling/distribution/",
          label: t("navHeader.modeling.distribution"),
        },
      ],
    },
  ];

  const setTimer = () => {
    if (visibilityTimer.current) stopTimer();
    const _timer = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
    visibilityTimer.current = _timer;
  };
  const stopTimer = () => {
    clearTimeout(visibilityTimer.current);
  };

  useScrollPosition({
    effect: ({prevPos, currPos}) => {
      const isScrollUp = currPos.y > prevPos.y;
      if (isScrollUp) {
        setVisible(true);
        setTimer();
      } else {
        setVisible(false);
        stopTimer();
      }
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
        stopTimer();
      }}
      onMouseLeave={() => setTimer()}
    >
      <div ref={headerRef} className="header">
        <div className="headerLogo">
          <a href={`/`} target={"_self"} aria-label={t("navHeader.about")}>
            {isNarrow ? <LogoMin /> : <LogoMax />}
          </a>
        </div>
        <Menu
          className="headerMenu"
          mode="horizontal"
          items={items}
          onClick={(elem) => {
            window.location.href = elem.key;
          }}
        />
        <Toggle
          className="themeToggler"
          onChange={() => {
            if (theme === themes.light) setTheme(themes.dark);
            if (theme === themes.dark) setTheme(themes.light);
          }}
          value={theme === themes.dark}
        />
      </div>
      <div className="headerActivateArea"></div>
    </div>
  );
};

export default Header;
