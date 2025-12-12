export interface NavItem {
    label: string;
    href: string;
}

export interface StatItem {
    icon: string;
    label: string;
    value: string;
    colorClass: string; // Tailwind text color class for icon
    bgClass: string; // Tailwind bg color class for icon container
}