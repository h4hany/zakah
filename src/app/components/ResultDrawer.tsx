import { useTranslation } from 'react-i18next';
import { ZakatResult } from '@/services/zakatEngine';
import { PurificationResult } from '@/services/purificationEngine';
import { exportToPDF } from '@/services/pdfExporter';
import { getConfig } from '@/widget/config';

interface ResultDrawerProps {
  zakat?: ZakatResult;
  purification?: PurificationResult;
  authority: string;
  onAuthorityChange: (authority: string) => void;
  inputs?: any;
}

export default function ResultDrawer({
  zakat,
  purification,
  authority,
  onAuthorityChange,
  inputs,
}: ResultDrawerProps) {
  const { t } = useTranslation();
  const config = getConfig();
  
  const total = (zakat?.zakat || 0) + (purification?.purification || 0);
  
  const handleExport = () => {
    exportToPDF(
      {
        zakat,
        purification,
        authority,
        date: new Date().toLocaleDateString(),
        inputs,
      },
      {
        logo: config.theme.logo,
        primaryColor: config.theme.primary,
      }
    );
  };
  
  return (
    <div className="col-span-2 border-l border-yellow-600/20 bg-black/30 p-6 slide-up">
      <div className="space-y-4">
        {/* Result Badge */}
        <div className="widget-card rounded-2xl p-5 border border-yellow-600/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {t('common.result')}
            </span>
          </div>
          <p className="text-3xl font-bold text-yellow-500 mono">${total.toFixed(2)}</p>
        </div>
        
        {/* Breakdown */}
        <div className="space-y-2.5">
          {zakat && (
            <div className="flex justify-between items-center py-2.5 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">{t('result.zakatAmount')}</span>
              <span className="text-sm font-semibold text-gray-200 mono">
                ${zakat.zakat.toFixed(2)}
              </span>
            </div>
          )}
          {purification && (
            <div className="flex justify-between items-center py-2.5 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">{t('result.purification')}</span>
              <span className="text-sm font-semibold text-gray-200 mono">
                ${purification.purification.toFixed(2)}
              </span>
            </div>
          )}
          {zakat && (
            <div className="flex justify-between items-center py-2.5 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">{t('result.nisabStatus')}</span>
              <span className="text-sm font-semibold text-gray-200">
                {zakat.nisabMet ? t('result.nisabMet') : t('result.nisabNotMet')}
              </span>
            </div>
          )}
        </div>
        
        {/* Authority Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            {t('common.authority')}
          </label>
          <select
            value={authority}
            onChange={(e) => onAuthorityChange(e.target.value)}
            className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-xs rounded-lg px-3 py-2.5"
          >
            <option>AAOIFI Standards</option>
            <option>Permanent Committee</option>
            <option>Fiqh Academy</option>
          </select>
        </div>
        
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="w-full py-3 rounded-xl border border-yellow-600/50 text-yellow-600 font-semibold text-sm hover:bg-yellow-600/10 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {t('common.export')}
        </button>
      </div>
    </div>
  );
}


