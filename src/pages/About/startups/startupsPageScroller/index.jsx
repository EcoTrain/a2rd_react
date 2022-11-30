import React, {useEffect, useRef} from "react";
import TweenOne from "rc-tween-one";
import BannerAnim, {Element} from "rc-banner-anim";
import "rc-banner-anim/assets/index.css";
import {Trans} from "react-i18next";

import projectsCardsInfo from "../config";

import "./index.scss";

const BgElement = Element.BgElement;

const StartupScroller = ({activeIndex, close, t}) => {
  const bannerRef = useRef();
  const bgGradient = [
    "linear-gradient(var(--lightGrayTransparent), var(--lightGrayTransparent))",
  ].join(",");

  useEffect(() => {
    const handleKeypress = (event) => {
      // Arrow left
      if (event.keyCode === 37) {
        bannerRef.current.prev();
      }
      // Arrow right
      else if (event.keyCode === 39) {
        bannerRef.current.next();
      }
    };
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [activeIndex]);

  return (
    <BannerAnim
      ref={bannerRef}
      type="across"
      initShow={activeIndex}
      style={{height: "100vh"}}
    >
      {projectsCardsInfo.map((x, i) => (
        <Element key={i} name={i}>
          <BgElement
            key={i}
            style={{
              backgroundImage: [
                bgGradient,
                x.image && `url(${x.image.src})`,
              ].join(","),
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          />
          <StartupCard info={x} close={close} t={t} />
        </Element>
      ))}
    </BannerAnim>
  );
};

const StartupCard = ({info, close, t}) => {
  return (
    <section className="section section-fullscreen startupCard">
      <div className="section-content">
        <div className="startupCard-content">
          <div
            onClick={close}
            className="font-size-3 closeButton"
            style={{zIndex: 2}}
          >
            &#215;
          </div>
          <TweenOne
            className="startupCard-info"
            animation={{opacity: 1, duration: 300}}
            style={{opacity: 0.001}}
          >
            <div
              className="font-title font-size-2 text-align-center"
              style={{marginBottom: "1rem"}}
            >
              {t(info.title)}
            </div>
            <div className="font-size-4 description">
              <div>
                <Trans
                  t={t}
                  i18nKey={t(info.text)}
                  components={[
                    <a
                      key={`linkWM`}
                      href={(info.links && info.links.website) || ""}
                      rel="noreferrer noopener"
                      target="_blank"
                      aria-label={t(info.text)}
                    />,
                  ]}
                />
              </div>
            </div>
            <div>{t(info.note)}</div>
          </TweenOne>
        </div>
      </div>
    </section>
  );
};

export default StartupScroller;
