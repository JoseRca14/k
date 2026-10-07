import React from 'react'
import { Smartphone, Monitor, ExternalLink } from 'lucide-react'
import { BirthdayExperience } from '../components/BirthdayExperience'

interface PreviewPaneProps {
  mode: 'desktop' | 'mobile'
  onModeChange: (mode: 'desktop' | 'mobile') => void
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex flex-col h-full bg-[#EAE6DF] border-l border-[#34313A]/10">
      {/* Preview toolbar */}
      <div className="p-3 bg-white border-b border-[#34313A]/10 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-[#FFF9F1] p-1 rounded-xl border border-[#34313A]/10">
          <button
            onClick={() => onModeChange('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-custom font-semibold transition-all cursor-pointer ${
              mode === 'desktop'
                ? 'bg-[#34313A] text-white shadow-xs'
                : 'text-[#34313A]/60 hover:text-[#34313A]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => onModeChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-custom font-semibold transition-all cursor-pointer ${
              mode === 'mobile'
                ? 'bg-[#34313A] text-white shadow-xs'
                : 'text-[#34313A]/60 hover:text-[#34313A]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Móvil</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono-custom text-[#34313A]/70 hover:text-[#34313A] px-2 py-1 rounded-lg hover:bg-[#FFF9F1]"
          >
            <span>Abrir en nueva pestaña</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Viewport container */}
      <div className="flex-1 overflow-y-auto p-4 flex items-start justify-center">
        {mode === 'mobile' ? (
          /* Phone Frame simulation (iPhone mockup style) */
          <div className="relative my-4 w-[390px] h-[820px] bg-white rounded-[50px] shadow-2xl border-[10px] border-[#34313A] overflow-hidden flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#34313A] rounded-full z-40 pointer-events-none" />

            {/* Scrollable screen */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-6">
              <BirthdayExperience />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#34313A]/30 rounded-full z-40 pointer-events-none" />
          </div>
        ) : (
          /* Desktop preview */
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-[#34313A]/10 overflow-hidden my-2">
            <div className="overflow-y-auto max-h-[820px]">
              <BirthdayExperience />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
