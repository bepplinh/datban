import { useEffect } from 'react';
import { Modal, Form, Input, Select, Space, Button, Typography, message } from 'antd';
import useCategory from '../../hooks/Category/useCategory';

const { Title } = Typography;

const CategoryModal = () => {
  const { 
    isModalVisible, 
    editingCategory, 
    hideModal, 
    addCategory, 
    updateCategory,
    isAdding,
    isUpdating
  } = useCategory();
  
  const [form] = Form.useForm();

  // Sync form with editingCategory when modal opens
  useEffect(() => {
    if (isModalVisible) {
      if (editingCategory) {
        form.setFieldsValue(editingCategory);
      } else {
        form.resetFields();
      }
    }
  }, [isModalVisible, editingCategory, form]);

  const onFinish = async (values) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await addCategory(values);
        message.success('Thêm danh mục mới thành công');
      }
      hideModal();
    } catch (error) {
      // Error handling is partly handled by interceptors, but we can add specific messages here
      message.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </Title>
      }
      open={isModalVisible}
      onCancel={hideModal}
      footer={null}
      width={500}
      centered
      className="rounded-2xl overflow-hidden"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6"
        initialValues={{ status: 'active' }}
      >
        <Form.Item
          name="name"
          label={<span className="font-semibold text-slate-700">Tên danh mục</span>}
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input placeholder="Ví dụ: Món Khai Vị" className="rounded-xl h-11" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="font-semibold text-slate-700">Mô tả</span>}
        >
          <Input.TextArea 
            placeholder="Nhập mô tả cho danh mục này..." 
            rows={4} 
            className="rounded-xl" 
          />
        </Form.Item>

        <Form.Item
          name="status"
          label={<span className="font-semibold text-slate-700">Trạng thái</span>}
        >
          <Select className="rounded-xl h-11 w-full" dropdownClassName="rounded-xl">
            <Select.Option value="active">Đang kinh doanh</Select.Option>
            <Select.Option value="inactive">Ngừng kinh doanh</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item className="mb-0 mt-8">
          <Space className="w-full justify-end">
            <Button onClick={hideModal} className="rounded-xl h-11 px-6">
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isAdding || isUpdating}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-8 border-none"
            >
              {editingCategory ? 'Lưu thay đổi' : 'Thêm mới'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
