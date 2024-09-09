import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react"

import Tabs from "@/components/layout-tabs/LayoutTabs";
import Transition from "@/components/transition/Transition";
import styles from "@/components/transition/Transition.module.css"

export default async function DashboardLayout({ children }) {
    const session = await auth();

    if (session === null) {
        redirect("/login");
    }

    return (
        <SessionProvider session={session}>
            <main className={styles.overflow}>
                <Tabs />
                <Transition>
                    {children}
                </Transition>
            </main>
        </SessionProvider>
    );
}
