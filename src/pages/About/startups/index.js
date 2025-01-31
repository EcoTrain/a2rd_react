import React, {useEffect, useRef, useState} from "react";
import ScrollAnim from "rc-scroll-anim";
import TweenOne from "rc-tween-one";
import {useTranslation} from "react-i18next";

import BannerTextScroller from "../../../components/BannerTextScroller";
import CustomDrawer from "../../../components/Modal/Drawer";
import startupsCardsInfo from "./config";

import "../../../components/CardPage/gridCard.scss";
import "../../../components/CardPage/rowCard.scss";
import "./index.scss";

const ScrollOverPack = ScrollAnim.OverPack;

const Startups = () => {
  const {t} = useTranslation("startups");
  const [activeIndex, setActiveIndex] = useState(null);
  const startupValues = Object.values(startupsCardsInfo);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setActiveIndex(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeIndex]);

  const getLineDelim = () => (
    <ScrollOverPack
      replay
      always={false}
      playScale={0}
      style={{display: "flex", justifyContent: "center"}}
    >
      <TweenOne
        animation={{opacity: 1, duration: 1500}}
        style={{opacity: 0.001}}
        className="spanLineDelim"
      />
    </ScrollOverPack>
  );

  return (
    <section className="section section-white" id="startups">
      <div className="section-content">
        <ScrollOverPack
          className="section-title font-size-2 font-title text-align-center"
          replay
          always={false}
          playScale={0.2}
        >
          <TweenOne animation={{opacity: 1}} style={{opacity: 0.001}}>
            {t("title")}
          </TweenOne>
        </ScrollOverPack>
        <ScrollOverPack
          replay
          always={false}
          playScale={0.2}
          className="font-size-4 text-align-center"
          style={{maxWidth: 700}}
        >
          <TweenOne animation={{opacity: 1}} style={{opacity: 0.001}}>
            We also implement our own start-up initiatives related to impact
            investments aimed at developing a sustainable society
          </TweenOne>
        </ScrollOverPack>
        <div className="gridCards">
          {startupValues.map((x, i) => (
            <>
              {i > 0 && i < startupValues.length && getLineDelim()}
              <StartupItem
                key={i}
                i={i}
                info={x}
                onClick={() => setActiveIndex(i)}
              />
            </>
          ))}
        </div>

        <CustomDrawer open={activeIndex != null}>
          {activeIndex != null && (
            <BannerTextScroller
              cardsConfig={startupsCardsInfo}
              activeIndex={activeIndex}
              close={() => setActiveIndex(null)}
              t={t}
            />
          )}
        </CustomDrawer>
      </div>
    </section>
  );
};

const StartupItem = ({info, i, onClick}) => {
  const {t} = useTranslation("startups");
  const cardRef = useRef();
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onUnHover = () => {
    setHover(false);
  };

  return (
    <ScrollOverPack
      key={i}
      className="gridCard-wrapper"
      replay
      always={false}
      playScale={0.2}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
      onClick={onClick}
    >
      <TweenOne
        ref={cardRef}
        className="gridCard"
        style={{opacity: 0.001}}
        animation={{opacity: 1}}
      >
        <div className="gridCard-view">
          <div className="gridCardViewTitle font-size-3 font-subtitle">
            {t(info.title)}
          </div>
          {hover ? (
            <div className="">{t(info.shortText)}</div>
          ) : (
            <div>{t(info.previewText)}</div>
          )}
          {hover && (
            <div className="btnListWrapper">
              {(!info.links || !info.links.businessCard) && (
                <button className="btn-outline btn-anim" onClick={onClick}>
                  {t("links.readMore")}
                </button>
              )}
              {info.links &&
                Object.keys(info.links).map((key, i) => (
                  <button
                    key={i}
                    className="btn-outline btn-anim"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        info.links[key].link,
                        info.links[key].link.includes("http")
                          ? "_blank"
                          : "_self"
                      );
                    }}
                  >
                    {t(info.links[key].title)}
                  </button>
                ))}
            </div>
          )}
        </div>
      </TweenOne>
    </ScrollOverPack>
  );
};

export default Startups;
