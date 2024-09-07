import Tabs from "@/components/layout-tabs/tabs";

export default function DashboardLayout({ children }) {
    return (
        <main>
            <Tabs />
            {children}
        </main>
    );
}
