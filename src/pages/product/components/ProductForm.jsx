import Upload from '@/components/Upload';
import { getMasterProd } from '@/services/product';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';

const ProductForm = ({ type = 'master' }) => {
  return (
    <div>
      <ProForm.Group>
        <ProForm.Item name="thumbnail" label="Upload">
          <Upload />
        </ProForm.Item>
        {/* <ProFormUploadDragger
              name="thumbnail"
              label="Hình ảnh"
              title="Ảnh đại diện"
              description="Kéo hoặc chọn ảnh"
              width="md"
              customRequest={customUpload}
            /> */}
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" label="Mã sản phẩm" name="sku" />
        <ProFormText width="md" label="Tên sản phẩm" name="productName" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          fieldProps={{
            tokenSeparators: [','],
            mode: 'tags',
          }}
          name="tags"
          label="Thẻ"
          width="md"
        />
        {type !== 'master' && (
          <ProFormSelect
            rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm' }]}
            request={() =>
              getMasterProd().then((res) =>
                res.map((p) => ({
                  label: p.productName,
                  value: p.id,
                })),
              )
            }
            label="Dòng sản phẩm"
            name="generalProductId"
            width="md"
          />
        )}
      </ProForm.Group>
      <ProFormTextArea label="Miêu tả" name="description" width="md" />
    </div>
  );
};

export default ProductForm;
