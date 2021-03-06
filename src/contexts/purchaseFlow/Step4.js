import React from "react";
import { Typography } from "antd";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./constants";
import { getRectSize } from "./utils";
import { CELL_SIZE } from "../../components/Grid";
import QRCode from "qrcode.react";

const { Text, Title, Link } = Typography;

const Step4 = ({ image, link, title, label, selection }) => {
  const { width, height } = getRectSize({
    selection,
    PREVIEW_HEIGHT,
    PREVIEW_WIDTH,
    CELL_SIZE,
  });

  return (
    <>
      <div>
        <div style={{ display: "flex", marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Title level={4}>
              Send your coins to this address to finalize your purchase
            </Title>
            <Text copyable>12341o234mkl123m4l12k3m4k123mlekm12</Text>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: 8,
              width: 140,
              height: 140,
            }}
          >
            <QRCode value="SOME ADDRESS" />
          </div>
        </div>
      </div>
      <div
        style={{
          border: 1,
          margin: 8,
          padding: 8,
          borderStyle: "dashed",
          display: "flex",
        }}
      >
        <img
          width={width}
          height={height}
          style={{ objectFit: "cover" }}
          src={image}
          alt={title}
        />
        <div style={{ padding: 24, display: "flex", flexDirection: "column" }}>
          <Text>{title}</Text>
          <Text>{label}</Text>
          <Link href={link}>Go to link</Link>
        </div>
      </div>
    </>
  );
};

export default Step4;
