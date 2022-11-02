import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {scroller} from "react-scroll";
import {useTranslation} from "react-i18next";

import PageScroller from "../../components/ScrollPage";
import WellnessIntro from "./intro";
import WellnessTeam from "./cardSections/team";
import WellnessAbout from "./about";
import WellnessFunctional from "./cardSections/functional";
import WellnessStack from "./stack";
import TextPage from "../../components/TextPage";
import {textPageConfig} from "../../components/TextPage/textPageConfig";

const WellnessMonitor = () => {
  const params = useParams();
  const {t} = useTranslation(["wellness"]);

  useEffect(() => {
    params.id &&
      scroller.scrollTo(params.id, {
        duration: 0,
        smooth: "easeOutQuint",
      });
  }, []);

  return (
    <PageScroller t={t}>
      <WellnessIntro />
      <WellnessAbout />
      <WellnessFunctional />
      <WellnessStack />
      <TextPage {...textPageConfig.wellness.healthyLifestyle} t={t} />
      <WellnessTeam />
    </PageScroller>
  );
};

export default WellnessMonitor;
