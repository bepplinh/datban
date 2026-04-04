import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Switch, message, Select, InputNumber } from 'antd';
import { Save, CookingPot } from 'lucide-react';
import useCategory from '../../hooks/Category/useCategory';
import useProductQueries from '../../hooks/Product/useProductQueries';
import ProductImageUpload from './ProductImageUpload';

const { TextArea } = Input;
const { Option } = Select;

const ProductModal = ({ isVisible, editingProduct, onClose }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { categories } = useCategory();
  
  const addProductMutation = useProductQueries.useAddProduct();
  const updateProductMutation = useProductQueries.useUpdateProduct();

  useEffect(() => {
    if (isVisible) {
      if (editingProduct) {
        form.setFieldsValue(editingProduct);
        setImagePreview(editingProduct.image || null);
      } else {
        form.resetFields();
        form.setFieldsValue({ status: 'active' });
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [isVisible, editingProduct, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('categoryId', values.categoryId);
      formData.append('isAvailable', values.status === 'active' ? 'true' : 'false');
      if (values.description) formData.append('description', values.description);
      if (imageFile) formData.append('image', imageFile);

      if (editingProduct) {
        await updateProductMutation.mutateAsync({ id: editingProduct.id, formData });
        message.success('Cập nhật món ăn thành công');
      } else {
        await addProductMutation.mutateAsync(formData);
        message.success('Thêm món ăn mới thành công');
      }
      onClose();
    } catch (error) {
      message.error('Có lỗi xảy ra khi lưu món ăn');
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <CookingPot size={20} />
          </div>
          <span className="text-lg font-semibold text-slate-800">
            {editingProduct ? 'Cập nhật món ăn' : 'Thêm món ăn mới'}
          </span>
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={600}
      className="custom-modal"
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
        requiredMark={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="name"
            label={<span className="font-medium text-slate-700">Tên món ăn <span className="text-red-500">*</span></span>}
            rules={[
              { required: true, message: 'Vui lòng nhập tên món' },
              { max: 100, message: 'Tên món không được vượt quá 100 ký tự' }
            ]}
          >
            <Input 
              placeholder="VD: Phở bò kobe..." 
              className="rounded-xl px-4 py-2 hover:border-indigo-400 focus:border-indigo-500 shadow-sm"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label={<span className="font-medium text-slate-700">Danh mục <span className="text-red-500">*</span></span>}
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select
              placeholder="Chọn danh mục"
              className="[&>div]:rounded-xl [&>div]:py-1 shadow-sm h-[40px]"
            >
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="price"
            label={<span className="font-medium text-slate-700">Đơn giá (VNĐ) <span className="text-red-500">*</span></span>}
            rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
          >
            <InputNumber
              className="w-full rounded-xl shadow-sm h-[40px] flex items-center"
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/[^\d]/g, '')}
              min={0}
              placeholder="VD: 50,000"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-slate-700">Hình ảnh <span className="text-slate-400 font-normal text-xs">(Không bắt buộc)</span></span>}
          >
            <ProductImageUpload
              preview={imagePreview}
              onFileSelect={(file, previewUrl) => {
                setImageFile(file);
                setImagePreview(previewUrl);
              }}
              onClear={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label={<span className="font-medium text-slate-700">Mô tả món ăn</span>}
          rules={[{ max: 500, message: 'Mô tả không được vượt quá 500 ký tự' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập mô tả chi tiết về món ăn, nguyên liệu, hương vị..." 
            className="rounded-xl px-4 py-3 hover:border-indigo-400 focus:border-indigo-500 shadow-sm resize-none"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label={<span className="font-medium text-slate-700">Trạng thái kinh doanh</span>}
          valuePropName="checked"
          getValueProps={(value) => ({ checked: value === 'active' })}
          getValueFromEvent={(checked) => checked ? 'active' : 'inactive'}
          className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-slate-600 text-sm">Hiển thị món ăn này trên menu cho khách gọi</span>
            <Switch 
              className="bg-slate-300 [&.ant-switch-checked]:bg-indigo-600" 
            />
          </div>
        </Form.Item>

        <Form.Item className="mb-0 mt-8 flex justify-end">
          <Button 
            onClick={onClose}
            className="rounded-xl px-6 h-10 font-medium hover:bg-slate-50 mr-5"
          >
            Hủy bỏ
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={addProductMutation.isPending || updateProductMutation.isPending}
            icon={<Save size={18} />}
            className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl px-6 h-10 font-medium shadow-md shadow-indigo-200"
          >
            {editingProduct ? 'Lưu thay đổi' : 'Tạo món ăn'}
          </Button>
        </Form.Item>
      </Form>

      <style>{`
        .custom-modal .ant-modal-content {
          border-radius: 20px !important;
          padding: 24px !important;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
        }
        .custom-modal .ant-modal-header {
          margin-bottom: 24px !important;
        }
        .custom-modal .ant-modal-close {
          top: 24px !important;
          right: 24px !important;
        }
        .ant-input-number-input {
          height: 100% !important;
        }
        .ant-form-item-label > label {
          margin-bottom: 8px !important;
        }
      `}</style>
    </Modal>
  );
};

export default ProductModal;
