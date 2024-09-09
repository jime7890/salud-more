import Tab from "@/components/layout-tabs/Tabs";

export default function DashboardLayout({ children }) {
    return (
        <main>
            <Tab />
            {children}
        </main>
    );
}
