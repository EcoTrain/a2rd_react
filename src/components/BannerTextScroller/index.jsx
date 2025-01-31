import React, {useEffect, useRef} from "react";
import TweenOne from "rc-tween-one";
import BannerAnim, {Element} from "rc-banner-anim";
import "rc-banner-anim/assets/index.css";
import {Trans} from "react-i18next";

import "./index.scss";

const BgElement = Element.BgElement;

const BannerTextScroller = ({cardsConfig, activeIndex, close, t}) => {
  const bannerRef = useRef();
  const bgGradient = [
    "linear-gradient(var(--darkWhiteTransparent), var(--darkWhiteTransparent))",
    // "linear-gradient(var(--lightGrayTransparent), var(--lightGrayTransparent))",
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

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, [activeIndex]);

  return (
    <BannerAnim
      ref={bannerRef}
      type="across"
      initShow={activeIndex}
      style={{height: "100vh"}}
      className={"bannerTextScroller"}
    >
      {Object.values(cardsConfig).map((x, i) => (
        <Element key={i} name={i}>
          {x.image && (
            <BgElement
              key={i}
              style={{
                backgroundImage: [bgGradient, `url(${x.image.src})`].join(","),
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            />
          )}
          <StartupCard info={x} close={close} t={t} />
        </Element>
      ))}
    </BannerAnim>
  );
};

const StartupCard = ({info, close, t}) => {
  return (
    <section className="section section-fullscreen bannerTextCard">
      <div className="section-content">
        <div className="bannerTextCard-content">
          <div
            onClick={close}
            className="font-size-2 closeButton"
            style={{zIndex: 2}}
          >
            &#215;
          </div>
          <TweenOne
            className="bannerTextCard-info"
            animation={{opacity: 1, duration: 300}}
            style={{opacity: 0.001}}
          >
            <div
              className="font-subtitle font-size-2 text-align-center"
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
                      key={`linkStartup`}
                      href={
                        (info.links &&
                          info.links.website &&
                          info.links.website.link) ||
                        ""
                      }
                      rel="noreferrer noopener"
                      target="_blank"
                      aria-label={t(info.text)}
                    />,
                  ]}
                />
              </div>
            </div>
            {info.note && <div>{t(info.note)}</div>}
            {info.links && (
              <div className="btnListWrapper" style={{marginTop: "1rem"}}>
                {Object.values(info.links).map((x, i) => (
                  <button
                    key={i}
                    className="btn-outline btn-anim font-size-4"
                    onClick={() => window.open(x.link)}
                  >
                    {t(x.title)}
                  </button>
                ))}
              </div>
            )}
          </TweenOne>
        </div>
      </div>
    </section>
  );
};

export default BannerTextScroller;
