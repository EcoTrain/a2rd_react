import React from "react";
import {useTranslation} from "react-i18next";

import {renderNextPageBtn} from "../../components/Section/PageScroller";
import {splitTextByWords} from "../../fucntions/splitText";
import "./index.scss";
import TextyAnim from "rc-texty";

const AboutDescription = ({t}) => {
  return (
    <>
      <div
        className="section-title font-title font-size-1 text-align-center"
        style={{
          lineHeight: "1em",
        }}
      >
        {t("about.title")}
      </div>

      <TextyAnim
        type="mask-top"
        split={splitTextByWords}
        interval={10}
        className="font-size-3 text"
        style={{margin: "0 1em"}}
      >
        {t("about.shortText")}
      </TextyAnim>
    </>
  );
};

const WellnessIntro = () => {
  const {t} = useTranslation(["wellness"]);
  const bg = process.env.PUBLIC_URL + "/static/images/wellness/diaries.webp";

  return (
    <section id="wellnessIntro" className="section section-fullscreen">
      <div className="section-content text-align-center">
        <div
          id="wellnessIntroBg"
          style={{
            backgroundImage: "url(" + bg + ")",
          }}
        />
        {AboutDescription({t})}
        {renderNextPageBtn({id: "wellnessAbout"})}
      </div>
    </section>
  );
};

export default WellnessIntro;
