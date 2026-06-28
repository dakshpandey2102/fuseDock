import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.1)] bg-black mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-[#a1a1aa]">
            <Shield size={16} />
            <span className="text-sm">© 2026 FuseDock Inc.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a1a1aa] hover:text-[#ededed] transition-colors cursor-pointer">Powered by Groq</span>
            <div className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)]"></div>
            <span className="text-sm text-[#a1a1aa] hover:text-[#ededed] transition-colors cursor-pointer">Client-Side Analysis</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
