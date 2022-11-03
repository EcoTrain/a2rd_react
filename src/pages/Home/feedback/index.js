import React, {useState, useEffect} from "react";
import QueueAnim from "rc-queue-anim";
import ClockLoader from "react-spinners/ClockLoader";
import {useTranslation} from "react-i18next";

import {toast} from "react-toastify";

import "./feedback.scss";
import FormField from "./FormField";
import CustomDrawer from "../../../components/Modal/Drawer";
import CustomModal from "../../../components/Modal/Simple";

const Feedback = ({buttonClass, buttonStyle}) => {
  const {t} = useTranslation("feedback");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const isMobile = window.innerWidth < 960;

  let [loading, setLoading] = useState(false);

  const isFormValid = () => {
    const validateEmail = (email) => {
      return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    if (!email || !name || !text) {
      toast.error(t("feedback.validate.fillAll"));
      return false;
    } else if (!validateEmail(email)) {
      toast.error(t("feedback.validate.incorrectEmail"));
      return false;
    } else return true;
  };

  const handleClose = () => setOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const onSuccess = () => {
      // console.log("Feedback result", res);
      setEmail("");
      setName("");
      setText("");
      toast.success(t("feedback.success"));
    };

    const onError = (err) => {
      console.log("Feedback error", err);
      toast.error(t("feedback.fail"));
    };

    const url = +"/api/send_email";
    const body = {
      email,
      name,
      text,
    };

    if (isFormValid()) {
      setLoading(true);
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      })
        .then(onSuccess)
        .catch(onError)
        .finally(() => setLoading(false));
    }
  };

  const getContent = () => {
    const getForm = () => {
      return (
        <form onSubmit={handleSubmit}>
          <FormField
            tag={"input"}
            title={t("feedback.field.email")}
            type={"email"}
            value={email}
            onChange={setEmail}
          />
          <FormField
            tag={"input"}
            title={t("feedback.field.name")}
            type={"name"}
            value={name}
            onChange={setName}
          />
          <FormField
            tag={"textarea"}
            title={t("feedback.field.text")}
            type={"text"}
            value={text}
            onChange={setText}
          />
          <input type="submit" value={t("feedback.submit")} />
        </form>
      );
    };

    return (
      <QueueAnim type={["left", "right"]} id="feedback">
        <div className="description">{t("feedback.label")}</div>
        {getForm()}
        {loading && (
          <div className="waiter">
            <ClockLoader
              color={"black"}
              loading={loading}
              css={{
                display: "block",
                margin: "0 auto",
                borderColor: "black",
              }}
              size={100}
            />
          </div>
        )}
      </QueueAnim>
    );
  };
  const getTitle = () => (
    <div className="font-title-h1">{t("feedback.title")}</div>
  );

  return (
    <>
      <div
        className={buttonClass}
        style={buttonStyle}
        onClick={() => setOpen(true)}
      >
        {t("feedback.title")}
      </div>
      {isMobile ? (
        <CustomDrawer title={getTitle()} open={open} onClose={handleClose}>
          {getContent()}
        </CustomDrawer>
      ) : (
        <CustomModal title={getTitle()} open={open} onClose={handleClose}>
          {getContent()}
        </CustomModal>
      )}
    </>
  );
};

export default Feedback;
