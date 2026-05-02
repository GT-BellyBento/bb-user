interface LogoProps {
    size?: 'header' | 'footer' | 'large';
}

// Main Logo component - Text only
export default function Logo({ size = 'header' }: LogoProps) {
    const textSize = size === 'large' ? 'text-3xl' : size === 'footer' ? 'text-xl' : 'text-2xl';
    const bellyColor = size === 'footer' ? 'text-white' : 'text-dark';

    return (
        <span className={`font-extrabold ${textSize}`}>
            <span className={bellyColor}>Belly</span>
            <span className="text-primary">Bento</span>
        </span>
    );
}
