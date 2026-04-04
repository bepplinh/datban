import ProductTable from '../components/Product/ProductTable';
import ProductModal from '../components/Product/ProductModal';
import ProductToolbar from '../components/Product/ProductToolbar';
import useProductStore from '../stores/useProductStore';

const ProductManagement = () => {
  const { isModalVisible, editingProduct, showModal, hideModal } = useProductStore();

  const handleEdit = (product) => {
    showModal(product);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý món ăn</h1>
        <p className="text-slate-500 mt-1">Quản lý thực đơn, giá cả và tình trạng phục vụ của các món ăn</p>
      </div>
      
      <ProductToolbar />
      <ProductTable onEdit={showModal} />
      <ProductModal 
        isVisible={isModalVisible} 
        editingProduct={editingProduct} 
        onClose={hideModal} 
      />
    </div>
  );
};

export default ProductManagement;
