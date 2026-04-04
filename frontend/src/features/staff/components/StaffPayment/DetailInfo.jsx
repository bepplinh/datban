function DetailInfo({ totalItems = 3 }) {
    return (
        <div className="flex justify-between items-end py-3">
            <p className="font-bold text-[#1a1b22] text-lg">Chi tiết đơn hàng</p>
            <p className="text-xs font-semibold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded-full">
                {totalItems} món
            </p>
        </div>
    );
}

export default DetailInfo;