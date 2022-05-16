import React, { useRef, useState } from "react";
import QueueAnim from "rc-queue-anim";
import TextyAnim from "rc-texty";
import ScrollAnim from "rc-scroll-anim";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import { baseUrl } from "../../../config";

import { projectsCardsInfo } from "../../ExtendedPages/projects";

import "./gridCard.scss";
import { splitTextByWords } from "../../../fucntions/splitText";

const ScrollOverPack = ScrollAnim.OverPack;

const HomeProjects = () => {
  const pageRef = useRef();
  return (
    <Layout
      className="section section-lightGray"
      id="homeProjects"
      ref={pageRef}
    >
      <ScrollOverPack replay always={false} playScale={0}>
        <QueueAnim
          type={["left", "right"]}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          delay={300}
          duration={1000}
        >
          <div
            className="font-title-h1 text-center"
            style={{ marginTop: "2em" }}
          >
            Our projects
          </div>
          <TextyAnim
            type="mask-top"
            split={splitTextByWords}
            delay={300}
            interval={10}
            className="text-center"
            style={{ margin: "0 2em" }}
          >
            At the A2 Research and Development lab, we provide analytics,
            cutting-edge reviews, and models to optimize the operating companies
            processes concerning industry specifics, focusing on the best
            available and future-oriented solutions considering ESG and SDG
            trends.
          </TextyAnim>
          <div
            className="gridCardsView"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            {projectsCardsInfo.map((x, i) => renderCard(x, i))}
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </Layout>
  );
};

const renderCard = (info, i) => {
  const cardRef = useRef();
  const [hover, setHover] = useState(false);

  const onHover = () => {
    cardRef.current.style.background = info.bg;
    cardRef.current.style.minWidth = "300px";
    cardRef.current.style.transition = "min-width 1.5s linear;";
    cardRef.current.style.color = "black";
    setHover(true);
  };

  const onUnHover = () => {
    cardRef.current.style.background = `url(${info.icon})  no-repeat center center / cover`;
    cardRef.current.style.minWidth = "150px";
    cardRef.current.style.color = info.color;
    setHover(false);
  };

  return (
    <div key={i} className="gridCardWrapper">
      <div
        className="gridCard"
        ref={cardRef}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}
        style={{
          background: `url(${info.icon})  no-repeat center center / cover`,
          color: info.color,
        }}
      >
        {!hover ? (
          <div className="gridCardPreview">
            {/* <div className="gridCardImg">
              <img src={info.icon} />
            </div> */}
            <div className="font-title-h1">{info.title}</div>
          </div>
        ) : (
          <div className="gridCardView">
            <div className="font-title-h3">{info.title}</div>
            <div className="description">{info.text}</div>
            <button
              className="gridCardViewLink"
              onClick={() =>
                (window.location.href = `${baseUrl}/projects/${info.id}`)
              }
            >
              Read more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProjects;
