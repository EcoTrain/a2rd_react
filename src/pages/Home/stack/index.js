import React from "react";
import {useTranslation} from "react-i18next";
import {Layout} from "antd";
import "antd/dist/antd.min.css";
import StackIconGrid from "../../../components/StackIconGrid";
import {gridConfig} from "./gridConfig";

const HomeStack = () => {
  const {t} = useTranslation("shared");

  return (
    <Layout className="section section-white" id="homeStack">
      <div className="section-content">
        <div className="section-title font-title-h1 text-center">
          {t("navigation.stack")}
        </div>
        <div
          className="gridCardsView fixRowDirection"
          style={{padding: "0 2em"}}
        >
          <StackIconGrid config={gridConfig} />
        </div>
      </div>
    </Layout>
  );
};

export default HomeStack;
