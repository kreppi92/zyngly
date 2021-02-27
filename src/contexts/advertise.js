import React, { useCallback, useContext, useState, createContext } from "react";
import { Button, Input, Image, Modal, Typography } from "antd";

const { Link } = Typography;

const AdvertiseContext = createContext({
  advertise: () => {},
});

export const AdvertiseProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAdvertisement, setCurrentAdvertisement] = useState();
  const advertise = useCallback(() => setIsModalVisible(true), []);
  const close = useCallback(() => setIsModalVisible(false), []);

  return (
    <AdvertiseContext.Provider
      value={{ currentAdvertisement, setCurrentAdvertisement, advertise }}
    >
      {children}
      {currentAdvertisement && (
        <Modal
          title="View advertiser and NFT"
          okText="Close"
          visible={isModalVisible}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={close}
          width={400}
        >
          {isModalVisible && (
            <>
              <Image width={"100%"} src={currentAdvertisement.image} />
              <Input defaultValue={currentAdvertisement.title} />
              <Input defaultValue={currentAdvertisement.label} />
              <Input
                defaultValue={currentAdvertisement.link}
                addonAfter={
                  <Link href={currentAdvertisement.link}>Go to link</Link>
                }
              />
              <Input
                addonAfter="View NFT"
                defaultValue="SOME_BLOCKCHAIN_TOKEN_GOES_HERE"
                disabled
              />
            </>
          )}
        </Modal>
      )}
    </AdvertiseContext.Provider>
  );
};

export const useAdvertise = () => {
  const {
    currentAdvertisement,
    setCurrentAdvertisement,
    advertise,
  } = useContext(AdvertiseContext);

  return { currentAdvertisement, setCurrentAdvertisement, advertise };
};
