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
import { BookOpen, Folder, LayoutGrid, AlertTriangle, ListChecks, Gavel, History } from 'lucide-react'; // Added Gavel and History icons
import AdminRiskLevelController from '@/actions/App/Http/Controllers/Admin/AdminRiskLevelController';
import AdminRiskFactorController from '@/actions/App/Http/Controllers/Admin/AdminRiskFactorController';
import AdminRuleController from '@/actions/App/Http/Controllers/Admin/AdminRuleController';
import AdminScreeningHistoryController from '@/actions/App/Http/Controllers/Admin/AdminScreeningHistoryController';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Tingkat Risiko',
        href: AdminRiskLevelController.index.url(),
        icon: AlertTriangle,
    },
    {
        title: 'Faktor Risiko',
        href: AdminRiskFactorController.index.url(),
        icon: ListChecks,
    },
    {
        title: 'Rules', // New item
        href: AdminRuleController.index.url(),
        icon: Gavel, // Icon for rules
    },
    {
        title: 'Riwayat Skrining',
        href: AdminScreeningHistoryController.index.url(),
        icon: History,
    },

];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
