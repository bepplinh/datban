import CategoryTable from '../components/Category/CategoryTable';
import CategoryModal from '../components/Category/CategoryModal';
import CategoryToolbar from '../components/Category/CategoryToolbar';

const CategoryManagement = () => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500 p-6">
      <CategoryToolbar />
      <CategoryTable />
      <CategoryModal />

      <style jsx global>{`
        .ant-table-thead > tr > th {
          background-color: #fafafa !important;
          color: #64748b !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.025em !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc !important;
        }
        .ant-pagination-item-active {
          border-color: #4f46e5 !important;
        }
        .ant-pagination-item-active a {
          color: #4f46e5 !important;
        }
      `}</style>
    </div>
  );
};

export default CategoryManagement;
