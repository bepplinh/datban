import React, { useState, useEffect } from 'react';
import api from '@/shared/services/api';
import { toast } from 'sonner';
import { CalendarCheck, Check, X, Bell } from 'lucide-react';
import { useSocket } from "@/shared/providers/SocketProvider";

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

const STATUS_TEXT = {
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  CANCELLED: 'Đã hủy',
  COMPLETED: 'Hoàn thành',
};

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socketService } = useSocket();

  useEffect(() => {
    fetchReservations();

    socketService.on('new_reservation', handleNewReservation);

    return () => {
      socketService.off('new_reservation', handleNewReservation);
    };
  }, [socketService]);

  const handleNewReservation = (newRes) => {
    toast.info(`Bàn mới vừa được đặt: ${newRes.customerName} - ${newRes.time}`);
    setReservations(prev => [newRes, ...prev]);
  };

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      setReservations(response.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách đặt bàn');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/reservations/${id}/status`, { status });
      toast.success('Cập nhật trạng thái thành công');
      setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarCheck className="text-primary w-8 h-8" />
          Quản lý Đặt Bàn
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-sm font-semibold text-gray-600">Khách hàng</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Thời gian</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Số lượng</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Ghi chú</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Trạng thái</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Chưa có đơn đặt bàn nào
                  </td>
                </tr>
              ) : (
                reservations.map(res => (
                  <tr key={res.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold">{res.customerName}</div>
                      <div className="text-sm text-gray-500">{res.phoneNumber}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{res.time}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(res.date).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="p-4">
                      {res.partySize} người
                    </td>
                    <td className="p-4 max-w-[200px] truncate" title={res.notes}>
                      {res.notes || <span className="text-gray-400 italic">Không có</span>}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[res.status]}`}>
                        {STATUS_TEXT[res.status]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        {res.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => updateStatus(res.id, 'CONFIRMED')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                              title="Xác nhận"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => updateStatus(res.id, 'CANCELLED')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Hủy"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {res.status === 'CONFIRMED' && (
                          <button 
                            onClick={() => updateStatus(res.id, 'COMPLETED')}
                            className="text-sm px-3 py-1 bg-green-50 text-green-600 font-semibold rounded-md hover:bg-green-100 transition-colors"
                          >
                            Đã đến
                          </button>
                        )}
                        {res.status === 'CONFIRMED' && (
                          <button 
                            onClick={() => updateStatus(res.id, 'CANCELLED')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Hủy"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
