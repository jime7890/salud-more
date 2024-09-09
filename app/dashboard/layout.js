import Tabs from "@/components/layout-tabs/Tabs";

export default function DashboardLayout({ children }) {
    return (
        <main>
            <Tabs />
            {children}
        </main>
    );
}
