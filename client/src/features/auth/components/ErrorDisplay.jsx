
export default function ErrorsDisplay({ error }){
    if (!error) return null;
    
    return (
      <div className="mb-6 p-4 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm">
        <p className="text-white text-sm">{error}</p>
      </div>
    );
  };