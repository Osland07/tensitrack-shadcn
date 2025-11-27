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
import { dashboard } from '@/routes/index';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, AlertTriangle, ListChecks } from 'lucide-react';
import AdminTingkatRisikoController from '@/actions/App/Http/Controllers/Admin/AdminTingkatRisikoController';
import AdminFaktorRisikoController from '@/actions/App/Http/Controllers/Admin/AdminFaktorRisikoController';
import { index as screeningsIndex } from '@/routes/screenings';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Tingkat Risiko',
        href: AdminTingkatRisikoController.index.url(),
        icon: AlertTriangle,
    },
    {
        title: 'Faktor Risiko',
        href: AdminFaktorRisikoController.index.url(),
        icon: ListChecks,
    },
    {
        title: 'Aturan Sistem',
        href: '/admin/rules',
        icon: BookOpen,
    },
    {
        title: 'Riwayat Skrining',
        href: screeningsIndex.url(),
        icon: ListChecks,
    },
];

const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Riwayat Skrining',
        href: screeningsIndex.url(),
        icon: ListChecks,
    },
]

export function AppSidebar() {


    const navItems = adminNavItems; // Always show admin items for testing

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
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
