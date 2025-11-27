
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <Button
            className={cn(
                'fixed bottom-16 right-4 rounded-full p-2 transition-opacity duration-300',
                isVisible ? 'opacity-100' : 'opacity-0',
            )}
            onClick={scrollToTop}
            variant="secondary"
            size="icon"
        >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Go to top</span>
        </Button>
    );
}
