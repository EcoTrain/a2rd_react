import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Layout} from "antd";
import "antd/dist/antd.min.css";

import {startupsCardsInfo} from "./cardsConfig";

import "../../../components/CardPage/gridCard.scss";
import "../../../components/CardPage/lineGridCard.scss";

const HomeStartups = () => {
  const {t} = useTranslation("startups");
  return (
    <Layout className="section section-white" id="homeStartups">
      <div className="section-content">
        <div className="section-title font-title-h1 text-center">
          {t("title")}
        </div>
        <div className="gridCardsView lineGridCardsViewRow">
          {startupsCardsInfo.map((x, i) => renderCard(x, i))}
        </div>
      </div>
    </Layout>
  );
};

const renderCard = (info, i) => {
  const {t} = useTranslation("startups");
  const cardRef = useRef();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = "all 0.2s ease-in-out";
    }
  }, [cardRef]);

  const onHover = () => {
    if (cardRef.current) {
      cardRef.current.style.background = "var(--darkWhite)";
    }
    setHover(true);
  };

  const onUnHover = () => {
    if (cardRef.current) {
      cardRef.current.style.background = null;
    }
    setHover(false);
  };

  return (
    <div
      key={i}
      className="gridCardWrapper lineGridCardWrapper"
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
    >
      <div className="gridCard lineGridCard">
        <div className="gridCardView">
          <div className="gridCardViewTitle font-title-h3 text-center ">
            {t(info.title)}
          </div>
          {hover ? (
            <div className="description">{t(info.shortText)}</div>
          ) : (
            <div className="text-center">{t(info.previewText)}</div>
          )}
          {hover && (
            <div className="linkBtnListWrapper">
              {(!info.links || !info.links.businessCard) && (
                <button
                  className="linkBtn"
                  onClick={() => window.open(`/startups/${info.id}`, "_blank")}
                >
                  {t("links.readMore")}
                </button>
              )}
              {info.links &&
                Object.values(info.links).map((x, i) => (
                  <button
                    key={i}
                    className="linkBtn"
                    onClick={() => window.open(x.link, "_blank")}
                  >
                    {t(x.title)}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeStartups;
