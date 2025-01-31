import React from "react";
import {useTranslation} from "react-i18next";

import {developersCardsInfo} from "./config/team";

import "../../../components/CardPage/gridCard.scss";

const WellnessTeam = () => {
  const {t} = useTranslation("wellness");
  return (
    <section className="section section-darkWhite" id="wellnessTeam">
      <div className="section-content">
        <div className="section-title font-size-2 font-title text-align-center">
          {t("team.title")}
        </div>
        <div
          className="gridCards"
          style={{padding: "0 2em"}}
        >
          {developersCardsInfo.map((x, i) => renderCard(x, i, t))}
        </div>
      </div>
    </section>
  );
};

const renderCard = (info, i, t) => {
  return (
    <div
      key={i}
      className="gridCard-wrapper"
      style={{flexBasis: "33%", minWidth: 150, minHeight: 150}}
    >
      <div
        className="gridCard"
        style={{
          alignItems: "flex-start",
        }}
      >
        <div className="gridCard-view">
          <img
            src={info.image}
            style={{width: "100%", maxWidth: 150, borderRadius: "50%"}}
          />
          <div
            className="gridCardViewTitle font-size-3 font-subtitle text-align-center"
            style={{marginTop: "1em", marginBottom: 0}}
          >
            {t(info.title)}
          </div>
          <div className="text-align-center">{t(info.previewText)}</div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTeam;
