import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, AlertTriangle, ListChecks } from 'lucide-react';
import RiskLevelController from '@/actions/App/Http/Controllers/Admin/RiskLevelController';
import RiskFactorController from '@/actions/App/Http/Controllers/Admin/RiskFactorController';
import { index as adminScreeningsIndex } from '@/routes/admin/screenings';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Tingkat Risiko',
        href: RiskLevelController.index.url(),
        icon: AlertTriangle,
    },
    {
        title: 'Faktor Risiko',
        href: RiskFactorController.index.url(),
        icon: ListChecks,
    },
    {
        title: 'Aturan Sistem',
        href: '/admin/rules',
        icon: BookOpen,
    },
    {
        title: 'Riwayat Skrining',
        href: adminScreeningsIndex().url,
        icon: ListChecks, // Using ListChecks as a placeholder icon for history
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
