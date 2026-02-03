import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center mb-4">
          <span className="text-4xl">✦</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-100">{t('home.title')}</h1>
        <p className="text-gray-400">{t('home.subtitle')}</p>
      </div>
      
      {/* CTA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Excel CTA */}
        <button
          onClick={() => navigate('/excel')}
          className="widget-card rounded-2xl p-8 text-left hover:border-yellow-600/50 transition-all border-2 border-yellow-600/30"
        >
          <div className="w-14 h-14 mb-4 rounded-2xl bg-yellow-600/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">📊 {t('home.excelCta')}</h3>
          <p className="text-sm text-gray-400">Upload your Excel file and calculate Zakat & Purification automatically</p>
        </button>
        
        {/* Form CTA */}
        <button
          onClick={() => navigate('/form')}
          className="widget-card rounded-2xl p-8 text-left hover:border-yellow-600/50 transition-all border-2 border-yellow-600/30"
        >
          <div className="w-14 h-14 mb-4 rounded-2xl bg-yellow-600/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">📝 {t('home.formCta')}</h3>
          <p className="text-sm text-gray-400">Fill out the comprehensive form for detailed Zakat & Purification calculation</p>
        </button>
      </div>
      
      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="widget-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">✓</div>
          <p className="text-xs text-gray-400">{t('home.features.aaoifi')}</p>
        </div>
        <div className="widget-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💰</div>
          <p className="text-xs text-gray-400">{t('home.features.goldAssets')}</p>
        </div>
        <div className="widget-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📄</div>
          <p className="text-xs text-gray-400">{t('home.features.pdfReports')}</p>
        </div>
        <div className="widget-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🌐</div>
          <p className="text-xs text-gray-400">{t('home.features.rtlMulti')}</p>
        </div>
      </div>
      
      {/* Trust Footer */}
      <div className="text-center pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500">{t('home.trust')}</p>
      </div>
    </div>
  );
}

