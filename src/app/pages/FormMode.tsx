import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateZakat, ZakatInputs } from '@/services/zakatEngine';
import { calculatePurification, PurificationInput } from '@/services/purificationEngine';
import ResultDrawer from '@/app/components/ResultDrawer';
import { ZakatResult } from '@/services/zakatEngine';
import { PurificationResult } from '@/services/purificationEngine';

export default function FormMode() {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<ZakatInputs>({
    cash: 0,
    bankBalance: 0,
    goldGrams: 0,
    goldPricePerGram: 0,
    silverGrams: 0,
    silverPricePerGram: 0,
    stocks: 0,
    crypto: 0,
    funds: 0,
    inventory: 0,
    receivables: 0,
    businessCash: 0,
    liabilities: 0,
  });
  
  const [purificationInput, setPurificationInput] = useState<PurificationInput>({
    profit: 0,
    haramRatio: 0,
  });
  
  const [zakatResult, setZakatResult] = useState<ZakatResult | null>(null);
  const [purificationResult, setPurificationResult] = useState<PurificationResult | null>(null);
  const [authority, setAuthority] = useState('AAOIFI Standards');
  const [showResult, setShowResult] = useState(false);
  const [calculateZakatFlag, setCalculateZakatFlag] = useState(true);
  const [calculatePurificationFlag, setCalculatePurificationFlag] = useState(true);
  
  const handleInputChange = (field: keyof ZakatInputs, value: number) => {
    setInputs({ ...inputs, [field]: value });
  };
  
  const handlePurificationChange = (field: keyof PurificationInput, value: number) => {
    setPurificationInput({ ...purificationInput, [field]: value });
  };
  
  const handleCalculate = () => {
    if (calculateZakatFlag) {
      const result = calculateZakat(inputs);
      setZakatResult(result);
    }
    
    if (calculatePurificationFlag) {
      const result = calculatePurification(purificationInput);
      setPurificationResult(result);
    }
    
    setShowResult(true);
  };
  
  return (
    <div className="space-y-6">
      {/* Calculation Type Selection */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-medium text-gray-500">{t('common.select')}</span>
        <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30 cursor-pointer hover:bg-yellow-600/15 transition-all">
          <input
            type="checkbox"
            checked={calculateZakatFlag}
            onChange={(e) => setCalculateZakatFlag(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-yellow-600/50 checked:bg-yellow-600"
          />
          <span className="text-xs font-medium text-gray-300">{t('common.zakat')}</span>
        </label>
        <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30 cursor-pointer hover:bg-yellow-600/15 transition-all">
          <input
            type="checkbox"
            checked={calculatePurificationFlag}
            onChange={(e) => setCalculatePurificationFlag(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-yellow-600/50 checked:bg-yellow-600"
          />
          <span className="text-xs font-medium text-gray-300">{t('common.purification')}</span>
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zakat Form */}
        {calculateZakatFlag && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-200">{t('common.zakat')}</h2>
            
            {/* Cash & Bank */}
            <div className="widget-card rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">{t('form.cash')}</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.cashOnHand')}</label>
                <input
                  type="number"
                  value={inputs.cash || ''}
                  onChange={(e) => handleInputChange('cash', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.bankBalance')}</label>
                <input
                  type="number"
                  value={inputs.bankBalance || ''}
                  onChange={(e) => handleInputChange('bankBalance', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Gold & Silver */}
            <div className="widget-card rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">{t('form.goldSilver')}</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.goldGrams')}</label>
                <input
                  type="number"
                  value={inputs.goldGrams || ''}
                  onChange={(e) => handleInputChange('goldGrams', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.goldPrice')}</label>
                <input
                  type="number"
                  value={inputs.goldPricePerGram || ''}
                  onChange={(e) => handleInputChange('goldPricePerGram', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.silverGrams')}</label>
                <input
                  type="number"
                  value={inputs.silverGrams || ''}
                  onChange={(e) => handleInputChange('silverGrams', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.silverPrice')}</label>
                <input
                  type="number"
                  value={inputs.silverPricePerGram || ''}
                  onChange={(e) => handleInputChange('silverPricePerGram', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Investments */}
            <div className="widget-card rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">{t('form.investments')}</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.stocks')}</label>
                <input
                  type="number"
                  value={inputs.stocks || ''}
                  onChange={(e) => handleInputChange('stocks', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.crypto')}</label>
                <input
                  type="number"
                  value={inputs.crypto || ''}
                  onChange={(e) => handleInputChange('crypto', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.funds')}</label>
                <input
                  type="number"
                  value={inputs.funds || ''}
                  onChange={(e) => handleInputChange('funds', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Business Assets */}
            <div className="widget-card rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">{t('form.business')}</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.inventory')}</label>
                <input
                  type="number"
                  value={inputs.inventory || ''}
                  onChange={(e) => handleInputChange('inventory', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.receivables')}</label>
                <input
                  type="number"
                  value={inputs.receivables || ''}
                  onChange={(e) => handleInputChange('receivables', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.businessCash')}</label>
                <input
                  type="number"
                  value={inputs.businessCash || ''}
                  onChange={(e) => handleInputChange('businessCash', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Liabilities */}
            <div className="widget-card rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300">{t('form.liabilities')}</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('form.shortTermDebts')}</label>
                <input
                  type="number"
                  value={inputs.liabilities || ''}
                  onChange={(e) => handleInputChange('liabilities', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Purification Form */}
        {calculatePurificationFlag && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-200">{t('common.purification')}</h2>
            
            <div className="widget-card rounded-xl p-4 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('excel.profit')}</label>
                <input
                  type="number"
                  value={purificationInput.profit || ''}
                  onChange={(e) => handlePurificationChange('profit', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t('excel.haramRatio')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={purificationInput.haramRatio || ''}
                  onChange={(e) => handlePurificationChange('haramRatio', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Calculate Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleCalculate}
          disabled={!calculateZakatFlag && !calculatePurificationFlag}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold hover:shadow-lg hover:shadow-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('common.calculate')}
        </button>
      </div>
      
      {/* Results Panel */}
      {showResult && (zakatResult || purificationResult) && (
        <div className="grid grid-cols-5 gap-0">
          <div className="col-span-3"></div>
          <ResultDrawer
            zakat={zakatResult || undefined}
            purification={purificationResult || undefined}
            authority={authority}
            onAuthorityChange={setAuthority}
            inputs={inputs}
          />
        </div>
      )}
    </div>
  );
}


