import React, { useRef } from "react";
import { useStores } from "../stores";
import { Upload, message,Spin, Switch, Alert } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { observer, useLocalStore } from "mobx-react";
import styled from "styled-components";

const { Dragger } = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`;
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const Image = styled.img`
  max-width: 300px;
`;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const ref1 = useRef();
  const ref2 = useRef();

  const store = useLocalStore(() => ({
    width: null,
    setWidth(width) {
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : "";
    },
    height: null,
    setHeight(height) {
      store.height = height;
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : "";
    },
    get fullStr() {
      return (
        ImageStore.serverFile.attributes.url.attributes.url +
        "?imageView2/0" +
        store.widthStr +
        store.heightStr
      );
    },
  }));

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value);
  };

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value);
  };
  const props = {
    showUploadList: false,
    multiple: true,
    beforeUpload: (file, fileList) => {
      ImageStore.setFile(file);
      ImageStore.setFileName(file.name);
      if (UserStore.currentUser === null) {
        message.warning("Please Login ");
        return false;
      }
      // add file limited in here
      ImageStore.upLoader()
        .then((serverFile) => {
        })
      return false;
    },
  };

  return (
    <div>
    <Spin tip="uploading..." spinning={ImageStore.isLoading}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files. Multiple file will not show all.

        </p>
      </Dragger>
      </Spin>
      {ImageStore.serverFile ? 
        <Result>
          <H1>Upload Result</H1>
          <dl>
            <dt>Resource Path</dt>
            <dd>
              <a
                target="_blank"
                href={ImageStore.serverFile.attributes.url.attributes.url}
              >
                {ImageStore.serverFile.attributes.url.attributes.url}
              </a>
            </dd>
            <dt>File Name</dt>
            <dd>{ImageStore.fileName}</dd>
            <dt>Preview</dt>
            <dd>
              <Image
                alt=""
                src={ImageStore.serverFile.attributes.url.attributes.url}
              />
            </dd>
            <dt>Other Size</dt>
            <dd>
              <input
                ref={ref1}
                onChange={bindWidthChange}
                placeholder="Max Width(Option)"
              />
              <input
                ref={ref2}
                onChange={bindHeightChange}
                placeholder="Max Heigh(Option)"
              />
            </dd>
            <dd>
              <a target="_blank" href={store.fullStr}>
                {store.fullStr}
              </a>
            </dd>
          </dl>
        </Result>
      : null}
    </div>
  );
});

export default Component;
