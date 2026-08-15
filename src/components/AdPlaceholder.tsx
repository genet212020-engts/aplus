import ProofTicker from '@/components/ProofTicker';

interface AdPlaceholderProps {
  position: 'header' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

const AdPlaceholder = ({ position, className = '' }: AdPlaceholderProps) => {
  if (position === 'footer') {
    return <ProofTicker className={className} />;
  }

  const sizes = {
    header: { width: '728px', height: '90px', label: 'Header Ad (728x90)' },
    sidebar: { width: '300px', height: '250px', label: 'Sidebar Ad (300x250)' },
    'in-content': { width: '100%', height: '250px', label: 'In-Content Ad (Responsive)' },
    footer: { width: '100%', height: '90px', label: 'Footer Ad (Responsive)' },
  };

  const { width, height, label } = sizes[position];

  return (
    <div
      className={`bg-secondary/60 border border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground text-sm ${className}`}
      style={{ 
        width: position === 'in-content' ? '100%' : width, 
        minHeight: height,
        maxWidth: '100%'
      }}
    >
      <div className="text-center p-4">
        <p className="font-medium">{label}</p>
        <p className="text-xs mt-1">Google AdSense Placeholder</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
