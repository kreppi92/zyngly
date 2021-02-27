import React, { useCallback, useContext, useState, createContext } from "react";
import { Steps, Button, message, Modal } from "antd";
import {
  SelectOutlined,
  UploadOutlined,
  LinkOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Step1, Step2, Step3, Step4 } from "./purchaseFlow";
import { useApi } from "./api";

const PurchaseContext = createContext({
  purchase: () => {},
  select: () => {},
});

export const PurchaseProvider = ({ children }) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const { handleAddCell } = useApi();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selection, setSelection] = useState({});

  const purchase = useCallback(() => setIsModalVisible(true), []);
  const select = useCallback((selection) => setSelection(selection));

  const close = useCallback(() => setIsModalVisible(false), []);
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { Step } = Steps;

  const steps = [
    {
      title: "Size",
      icon: SelectOutlined,
      content: null,
    },
    {
      title: "Logo",
      icon: UploadOutlined,
      content: "Second-content",
    },
    {
      title: "Info",
      icon: LinkOutlined,
      content: "Last-content",
    },
    {
      title: "Pay",
      icon: LoadingOutlined,
      content: "Last-content",
    },
  ];

  const getStep = (current) => {
    if (current === 3) {
      return (
        <Step4
          title={title}
          link={link}
          label={label}
          image={image}
          selection={selection}
        />
      );
    } else if (current === 2) {
      return (
        <Step3
          setTitle={setTitle}
          setLink={setLink}
          setLabel={setLabel}
          image={image}
          selection={selection}
        />
      );
    } else if (current === 1) {
      return <Step2 image={image} setImage={setImage} selection={selection} />;
    }
    return <Step1 selection={selection} />;
  };

  return (
    <PurchaseContext.Provider value={{ purchase, select }}>
      {children}
      <Modal
        title="Purchase NFTs"
        okText="Other"
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={close}
        width={688}
      >
        <Steps current={current}>
          {steps.map((item) => {
            const { icon: Icon } = item;
            return <Step key={item.title} title={item.title} icon={<Icon />} />;
          })}
        </Steps>
        <div>{getStep(current)}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => next()}
              disabled={current > 0 && !image}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              // TODO: swap with the other message experience
              onClick={async () => {
                const { bounds } = selection;
                const newCell = {
                  title,
                  label,
                  link,
                  image,
                  bounds,
                };
                await handleAddCell(newCell);
                close();
                setTitle();
                setLabel();
                setImage();
                setCurrent(0);
                await message.success("Processing complete!");
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => {
  const { purchase } = useContext(PurchaseContext);
  const { select } = useContext(PurchaseContext);

  return { purchase, select };
};
