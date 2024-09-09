import Tabs from "@/components/layout-tabs/LayoutTabs";

export default function DashboardLayout({ children }) {
    return (
        <main>
            <Tabs />
            {children}
        </main>
    );
}
