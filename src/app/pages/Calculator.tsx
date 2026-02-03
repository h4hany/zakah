import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExcelMode from './ExcelMode';
import FormMode from './FormMode';

export default function Calculator() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'excel' | 'form'>('excel');
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1.5 bg-black/20 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('excel')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'excel'
              ? 'bg-yellow-600 text-black'
              : 'text-gray-500 hover:bg-white/5'
          }`}
        >
          📊 {t('home.excelCta')}
        </button>
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'form'
              ? 'bg-yellow-600 text-black'
              : 'text-gray-500 hover:bg-white/5'
          }`}
        >
          📝 {t('home.formCta')}
        </button>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'excel' ? <ExcelMode /> : <FormMode />}
      </div>
    </div>
  );
}

