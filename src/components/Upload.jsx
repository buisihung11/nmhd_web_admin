import { InboxOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import { storage } from '@/services/firebase';

const Upload = ({ onChange, value }) => {
  const [imageUrl, setImageUrl] = React.useState(value);

  const customUpload = async ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = await storage.ref();
    const imageName = file.name ?? 'Image.png'; //a unique name for the image
    const imgFile = storageRef.child(`images/${imageName}`);
    try {
      const image = await imgFile.put(file, metadata);
      const imageURL = await imgFile.getDownloadURL();
      setImageUrl(imageURL);
      onChange(imageURL);
      onSuccess(imageURL, imageURL);
    } catch (e) {
      console.log(`e`, e);
      onError(e);
    }
  };

  return (
    <Space direction="horizontal">
      {imageUrl && <Image height="100%" width={150} src={imageUrl} />}
      <Dragger style={{ width: '150px' }} name="file" multiple customRequest={customUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Hình ảnh</p>
        <p className="ant-upload-hint">Kéo hoặc chọn ảnh</p>
      </Dragger>
    </Space>
  );
};

export default Upload;
