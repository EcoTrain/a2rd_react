import React, { useRef } from "react";
import TextyAnim from "rc-texty";
import ScrollAnim from "rc-scroll-anim";
import { Layout } from "antd";
import "antd/dist/antd.min.css";

import { splitTextByWords } from "../../../fucntions/splitText";

const { Content } = Layout;
const ScrollOverPack = ScrollAnim.OverPack;

const HomeBusinessModel = () => {
  const pageRef = useRef();
  return (
    <Layout className="section" id="homeBusinessModel" ref={pageRef}>
      <Content className="section-content">
        <div
          className="section-content-img"
          style={{ backgroung: "transparent" }}
        ></div>
        <div className="section-content-text  section-white">
          <div className="font-title-h1 text-center">Business model</div>
          <ScrollOverPack replay always={false} playScale={0}>
            <TextyAnim
              className="font-text-big description"
              type="bottom"
              split={splitTextByWords}
              delay={0}
              interval={5}
            >
              The basis of the business model is the expansion of the network of
              partners, providing the exchange of analytical materials and data
              for the sustainable support of our customers (medical sector,
              insurance companies and banks, service, tourism, airlines).
            </TextyAnim>
          </ScrollOverPack>
        </div>
      </Content>
    </Layout>
  );
};

export default HomeBusinessModel;
