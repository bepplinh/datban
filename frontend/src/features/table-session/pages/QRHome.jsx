import React from "react";
import { useParams } from "react-router-dom";
import QRHeader from "@/features/table-session/components/QRHeader";
import QRBanner from "@/features/table-session/components/QRBanner";
import QRWelcome from "@/features/table-session/components/QRWelcome";
import QRPointsCard from "@/features/table-session/components/QRPointsCard";
import QRServiceGrid from "@/features/table-session/components/QRServiceGrid";
import QRMenuAction from "@/features/table-session/components/QRMenuAction";
import QRFab from "@/features/table-session/components/QRFab";
import { useTableStore } from "@/features/table-session/store/useTableStore";

const QRHome = () => {
  const { tableId: urlTableId } = useParams();
  const { tableName } = useTableStore();

  return (
    <div className="min-h-screen bg-background text-text pb-20 max-w-md mx-auto relative">
      <QRHeader />
      <QRBanner />
      <QRWelcome tableName={tableName} />
      <QRPointsCard />
      <QRServiceGrid />
      <QRMenuAction />
      <QRFab />
    </div>
  );
};

export default QRHome;
