import Tabs from "@/components/layout-tabs/LayoutTabs";
import Transition from "@/components/transition/Transition";
import styles from "@/components/transition/Transition.module.css"

export default function DashboardLayout({ children }) {
    return (
        <main className={styles.overflow}>
            <Tabs />
            <Transition>
                {children}
            </Transition>
        </main>
    );
}
