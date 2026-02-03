import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateZakat, ZakatInputs } from '@/services/zakatEngine';
import { calculatePurification, PurificationInput } from '@/services/purificationEngine';
import { Authority } from '@/services/authority';
import ResultDrawer from '@/app/components/ResultDrawer';
import { ZakatResult } from '@/services/zakatEngine';
import { PurificationResult } from '@/services/purificationEngine';
import NeonCheckbox from '@/app/components/NeonCheckbox';

const InputField = ({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) => (
  <div>
    <label className="block text-xs text-gray-400 mb-1">{label}</label>
    <input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-full bg-black/40 border border-yellow-600/30 text-gray-300 text-sm rounded-lg px-3 py-2"
      placeholder="0"
    />
  </div>
);

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
  const [authority, setAuthority] = useState<Authority>('AAOIFI');
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
      const result = calculateZakat(inputs, authority);
      setZakatResult(result);
    }
    
    if (calculatePurificationFlag) {
      const result = calculatePurification(purificationInput, authority);
      setPurificationResult(result);
    }
    
    setShowResult(true);
  };

  // Auto-recalculate when authority changes (if results are already shown)
  useEffect(() => {
    if (showResult) {
      if (calculateZakatFlag) {
        const result = calculateZakat(inputs, authority);
        setZakatResult(result);
      }
      
      if (calculatePurificationFlag) {
        const result = calculatePurification(purificationInput, authority);
        setPurificationResult(result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authority]);
  
  return (
    <div className="space-y-6">
      {/* Results - Show above form when calculated */}
      {showResult && (zakatResult || purificationResult) && (
        <div className="mb-4">
          <ResultDrawer
            zakat={zakatResult || undefined}
            purification={purificationResult || undefined}
            authority={authority}
            onAuthorityChange={setAuthority}
            inputs={inputs}
          />
        </div>
      )}

      {/* Calculation Type Selection */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className={`widget-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
            calculateZakatFlag 
              ? 'border-yellow-600 bg-yellow-600/10 shadow-lg shadow-yellow-600/20' 
              : 'border-yellow-600/20 hover:border-yellow-600/40 hover:bg-yellow-600/5'
          }`}>
            <div className="flex items-center gap-3">
              <NeonCheckbox
                checked={calculateZakatFlag}
                onChange={setCalculateZakatFlag}
                id="zakat-checkbox"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-200">{t('common.zakat')}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t('common.zakatDescription')}</p>
              </div>
            </div>
          </label>

          <label className={`widget-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
            calculatePurificationFlag 
              ? 'border-yellow-600 bg-yellow-600/10 shadow-lg shadow-yellow-600/20' 
              : 'border-yellow-600/20 hover:border-yellow-600/40 hover:bg-yellow-600/5'
          }`}>
            <div className="flex items-center gap-3">
              <NeonCheckbox
                checked={calculatePurificationFlag}
                onChange={setCalculatePurificationFlag}
                id="purification-checkbox"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-200">{t('common.purification')}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t('common.purificationDescription')}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      
      {/* Forms Container - Conditional layout based on selection */}
      {(calculateZakatFlag || calculatePurificationFlag) && (
        <div className={`grid gap-6 ${
          calculateZakatFlag && calculatePurificationFlag 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1'
        }`}>
          {/* Zakat Form */}
          {calculateZakatFlag && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-200">{t('common.zakat')}</h2>
              
              <div className="widget-card rounded-xl p-6 space-y-6">
                {/* Cash & Bank Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">{t('form.cash')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label={t('form.cashOnHand')}
                      value={inputs.cash}
                      onChange={(value) => handleInputChange('cash', value)}
                    />
                    <InputField
                      label={t('form.bankBalance')}
                      value={inputs.bankBalance}
                      onChange={(value) => handleInputChange('bankBalance', value)}
                    />
                  </div>
                </div>
                
                {/* Gold & Silver Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">{t('form.goldSilver')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label={t('form.goldGrams')}
                      value={inputs.goldGrams}
                      onChange={(value) => handleInputChange('goldGrams', value)}
                    />
                    <InputField
                      label={t('form.goldPrice')}
                      value={inputs.goldPricePerGram}
                      onChange={(value) => handleInputChange('goldPricePerGram', value)}
                    />
                    <InputField
                      label={t('form.silverGrams')}
                      value={inputs.silverGrams}
                      onChange={(value) => handleInputChange('silverGrams', value)}
                    />
                    <InputField
                      label={t('form.silverPrice')}
                      value={inputs.silverPricePerGram}
                      onChange={(value) => handleInputChange('silverPricePerGram', value)}
                    />
                  </div>
                </div>
                
                {/* Investments Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">{t('form.investments')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label={t('form.stocks')}
                      value={inputs.stocks}
                      onChange={(value) => handleInputChange('stocks', value)}
                    />
                    <InputField
                      label={t('form.crypto')}
                      value={inputs.crypto}
                      onChange={(value) => handleInputChange('crypto', value)}
                    />
                    <InputField
                      label={t('form.funds')}
                      value={inputs.funds}
                      onChange={(value) => handleInputChange('funds', value)}
                    />
                  </div>
                </div>
                
                {/* Business Assets Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">{t('form.business')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label={t('form.inventory')}
                      value={inputs.inventory}
                      onChange={(value) => handleInputChange('inventory', value)}
                    />
                    <InputField
                      label={t('form.receivables')}
                      value={inputs.receivables}
                      onChange={(value) => handleInputChange('receivables', value)}
                    />
                    <InputField
                      label={t('form.businessCash')}
                      value={inputs.businessCash}
                      onChange={(value) => handleInputChange('businessCash', value)}
                    />
                  </div>
                </div>
                
                {/* Liabilities Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">{t('form.liabilities')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label={t('form.shortTermDebts')}
                      value={inputs.liabilities}
                      onChange={(value) => handleInputChange('liabilities', value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Purification Form */}
          {calculatePurificationFlag && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-200">{t('common.purification')}</h2>
              
              <div className="widget-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-300">{t('common.purification')}</h3>
                <div className="space-y-4">
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
            </div>
          )}
        </div>
      )}
      
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
    </div>
  );
}
