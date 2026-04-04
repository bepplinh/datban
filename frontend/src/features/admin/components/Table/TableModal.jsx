import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const TableModal = ({ open, onCancel, onSave, editingTable, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editingTable) {
        form.setFieldsValue({
          name: editingTable.name,
          status: editingTable.status,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: "EMPTY" });
      }
    }
  }, [open, editingTable, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title={
        <div className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
          {editingTable ? "Cập nhật thông tin bàn" : "Thêm bàn mới"}
        </div>
      }
      okText={editingTable ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      centered
      classNames={{
        content: "rounded-2xl p-6",
        body: "pt-2",
      }}
      okButtonProps={{
        className: "bg-indigo-600 hover:bg-indigo-700 rounded-lg",
        size: "large",
      }}
      cancelButtonProps={{
        className: "rounded-lg",
        size: "large",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="table_form"
        className="mt-4"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label={<span className="font-medium text-slate-700">Tên bàn</span>}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bàn!",
            },
          ]}
        >
          <Input size="large" placeholder="VD: Bàn 01" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          name="status"
          label={<span className="font-medium text-slate-700">Trạng thái</span>}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trạng thái!",
            },
          ]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="EMPTY">Trống</Option>
            <Option value="OCCUPIED">Đang dùng</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TableModal;
