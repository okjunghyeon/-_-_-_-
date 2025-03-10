"use client";

import { useRouter } from "next/navigation";

type SidebarProps = {
  selectedTab: "items" | "addItem" | "editItem"; // ✅ "sales" 제거
  setSelectedTab: (tab: "items" | "addItem" | "editItem") => void; // ✅ "sales" 제거
};

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("isAuthenticated");
    router.replace("/");
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
      <div>
        <button
          className={`w-full p-4 ${
            selectedTab === "items" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedTab("items")}
        >
          전체 상품 조회
        </button>
        <button
          className={`w-full p-4 ${
            selectedTab === "addItem" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedTab("addItem")}
        >
          상품 등록
        </button>
      </div>

      <button className="w-full bg-red-500 p-4 mt-auto" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
