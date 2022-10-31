import React, {useEffect, useRef, useState} from "react";
import TextyAnim from "rc-texty";
import ScrollAnim from "rc-scroll-anim";
import {useTranslation} from "react-i18next";
import {Layout} from "antd";
import "antd/dist/antd.min.css";

import {projectsCardsInfo} from "./cardsConfig";

import "../../../components/CardPage/gridCard.scss";
import {splitTextByWords} from "../../../fucntions/splitText";

const ScrollOverPack = ScrollAnim.OverPack;

const HomeProjects = ({filter, text}) => {
  const {t} = useTranslation("projects");
  // TODO: section-content height: "100%" WHAT?? its necessarily? where is the regularity?
  return (
    <Layout className="section section-lightGray" id="homeProjects">
      <div className="section-content" style={{height: "100%"}}>
        <div className="section-title font-title-h1 text-center">
          {t("title")}
        </div>
        <ScrollOverPack replay always={false} playScale={0}>
          <TextyAnim
            type="mask-top"
            split={splitTextByWords}
            interval={10}
            className="description"
            style={{margin: "0 1em", maxWidth: 900}}
          >
            {text || t("label")}
          </TextyAnim>
        </ScrollOverPack>
        <div className="gridCardsView">
          {projectsCardsInfo.map(
            (x, i) => (!filter || (filter && x[filter])) && renderCard(x, i)
          )}
        </div>
      </div>
    </Layout>
  );
};

const renderCard = (info, i) => {
  const {t} = useTranslation("projects");
  const cardRef = useRef();
  const [hover, setHover] = useState(false);

  const isMobile = window.innerWidth < 960;
  const titleShadow = "0px 0px 0.3em black";
  const bg = `url(${
    isMobile ? info.image.min : info.image.src
  })  no-repeat center center / cover`;

  useEffect(() => {
    if (cardRef.current) {
      // cardRef.current.style.transition = "all 0.2s ease-in-out";
    }
  }, [cardRef.current]);

  const onHover = () => {
    cardRef.current.style.background = "var(--darkWhite)";
    cardRef.current.style.textShadow = "";
    setHover(true);
  };

  const onUnHover = () => {
    cardRef.current.style.background = bg;
    cardRef.current.style.textShadow = titleShadow;
    setHover(false);
  };

  return (
    <div key={i} className="gridCardWrapper">
      <div
        className="gridCard gridCardBig "
        ref={cardRef}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}
        style={{
          background: bg,
          textShadow: titleShadow,
        }}
      >
        {!hover ? (
          <div className="gridCardView gridCardBlur">
            <div className="font-title-h1 text-center" style={{color: "white"}}>
              {t(info.title)}
            </div>
          </div>
        ) : (
          <div className="gridCardView">
            <div className="font-title-h3 text-center">{t(info.title)}</div>
            <div className="description">{t(info.preview)}</div>
            <button
              className="linkBtn"
              onClick={() => window.open(`/projects/${info.id}`, "_blank")}
            >
              {t("moreBtn")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProjects;
