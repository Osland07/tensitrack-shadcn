// resources/js/components/navbar.tsx
import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { type SharedData } from '@/types';
import { dashboard, login, register, logout } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import { edit as profileUserEdit } from '@/routes/profile-user';
import { index as adminScreeningsIndex } from '@/routes/admin/screenings';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Logo, LogoImage, LogoText } from "@/components/logo";

const FullscreenNav = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (!open) return null;

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "#kalkulator-bmi", label: "Kalkulator BMI" },
        { href: "#diagnosis", label: "Skrining" },
        { href: "#alur-interaksi", label: "Alur Kerja" },
        { href: "#artikel", label: "Artikel" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-primary text-primary-foreground animate-in fade-in-20">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                 <Logo url="/" className="flex items-center space-x-2">
                    <LogoImage src="/logo.png" alt="Tensitrack Logo" className="h-10" />
                    <LogoText className="text-xl font-bold">Tensitrack</LogoText>
                </Logo>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="flex flex-col items-center justify-center text-center gap-4" style={{ height: 'calc(100vh - 5rem)' }}>
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-xl font-bold transition-colors hover:text-secondary"
                        onClick={onClose}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};


export default function Navbar({ canRegister = true }: { canRegister?: boolean; }) {
    const { auth } = usePage<SharedData>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const layananLinks: { title: string; href: string }[] = [
        { title: "Kalkulator BMI", href: "#kalkulator-bmi" },
        { title: "Skrining Mandiri", href: "#diagnosis" },
    ];

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-primary text-secondary">
            <div className="container mx-auto flex h-20 items-center justify-between">
                {/* Left side: Logo */}
                <Logo url="/" className="flex items-center space-x-2">
                    <LogoImage src="/logo.png" alt="Tensitrack Logo" className="h-10" />
                    <LogoText className="text-xl font-bold">Tensitrack</LogoText>
                </Logo>

                {/* Middle: Desktop Nav Links */}
                <nav className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Beranda
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-secondary group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors hover:text-white focus:text-secondary focus:outline-none data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent focus-visible:bg-transparent">Layanan</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-primary border-secondary/20">
                                    <ul className="grid w-[200px] gap-1 p-2">
                                        {layananLinks.map((link) => (
                                            <li key={link.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={link.href} className="font-bold block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors text-secondary hover:bg-secondary/10 hover:text-white focus:bg-secondary/20 focus:text-white">
                                                        {link.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="#alur-interaksi" className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Alur Kerja
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Right side: Auth links and Mobile trigger */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={dashboard().url}>Dashboard</Link>
                                </Button>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={adminScreeningsIndex().url}>Riwayat Skrining</Link>
                                </Button>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={profileEdit().url}>Profil</Link>
                                </Button>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={logout()} method="post" as="button">Logout</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="secondary" size="lg" asChild className="font-bold">
                                    <Link href={login()}>Login</Link>
                                </Button>
                                {canRegister && (
                                    <Button variant="secondary" size="lg" asChild className="font-bold">
                                        <Link href={register()}>Register</Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
             <FullscreenNav open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    );
}