import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { parseExcelFile, mapExcelDataToCalculations, ColumnType, ColumnMapping } from '@/services/excelParser';
import { calculatePurificationFromArray } from '@/services/purificationEngine';
import ResultDrawer from '@/app/components/ResultDrawer';
import { PurificationResult } from '@/services/purificationEngine';

export default function ExcelMode() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [zakatSelected, setZakatSelected] = useState(false);
  const [purificationSelected, setPurificationSelected] = useState(false);
  const [result, setResult] = useState<PurificationResult | null>(null);
  const [authority, setAuthority] = useState('AAOIFI Standards');
  const [showResult, setShowResult] = useState(false);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    
    try {
      const parsed = await parseExcelFile(uploadedFile);
      setExcelData(parsed);
      
      // Initialize column mapping
      const initialMapping: ColumnMapping = {};
      parsed.headers.forEach((header, index) => {
        if (index === 0) initialMapping[header] = 'sharesCount';
        else if (index === 1) initialMapping[header] = 'sharePrice';
        else if (index === 2) initialMapping[header] = 'profit';
        else if (index === 3) initialMapping[header] = 'haramRatio';
        else initialMapping[header] = 'ignore';
      });
      setColumnMapping(initialMapping);
    } catch (error) {
      console.error('Error parsing Excel:', error);
      alert('Failed to parse Excel file');
    }
  };
  
  const handleColumnMappingChange = (columnKey: string, type: ColumnType) => {
    setColumnMapping({ ...columnMapping, [columnKey]: type });
  };
  
  const handleCalculate = () => {
    if (!excelData) return;
    
    if (purificationSelected) {
      const mapped = mapExcelDataToCalculations(excelData.rows, columnMapping);
      const purificationResult = calculatePurificationFromArray(
        mapped.map(m => ({ profit: m.profit, haramRatio: m.haramRatio }))
      );
      setResult(purificationResult);
      setShowResult(true);
    }
  };
  
  return (
    <div>
      {/* Upload Zone */}
      <div className="mb-6">
        <label>
          <div className="widget-card rounded-2xl border-2 border-dashed border-yellow-600/30 p-8 text-center hover:border-yellow-600/50 transition-all cursor-pointer">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-yellow-600/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-200 mb-1">{t('common.upload')}</h3>
            <p className="text-xs text-gray-500">{t('common.dragDrop')}</p>
          </div>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      
      {/* Calculation Type Chips */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500">{t('common.select')}</span>
          <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30 cursor-pointer hover:bg-yellow-600/15 transition-all">
            <input
              type="checkbox"
              checked={zakatSelected}
              onChange={(e) => setZakatSelected(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-yellow-600/50 checked:bg-yellow-600"
            />
            <span className="text-xs font-medium text-gray-300">{t('common.zakat')}</span>
          </label>
          <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30 cursor-pointer hover:bg-yellow-600/15 transition-all">
            <input
              type="checkbox"
              checked={purificationSelected}
              onChange={(e) => setPurificationSelected(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-yellow-600/50 checked:bg-yellow-600"
            />
            <span className="text-xs font-medium text-gray-300">{t('common.purification')}</span>
          </label>
        </div>
      </div>
      
      {/* Excel Viewer */}
      {excelData && (
        <div className="mb-6">
          <div className="widget-card rounded-2xl overflow-hidden border border-yellow-600/20">
            <div className="excel-grid max-h-72 overflow-y-auto">
              {/* Header Row */}
              <div className="cell cell-header cell-row-num"></div>
              {excelData.headers.map((header: string, index: number) => (
                <div key={index} className="cell cell-header">
                  <div className="flex flex-col gap-1">
                    <span className="text-yellow-500 text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <select
                      value={columnMapping[header] || 'ignore'}
                      onChange={(e) => handleColumnMappingChange(header, e.target.value as ColumnType)}
                      className="tag-selector w-full appearance-none text-center bg-transparent border-0 p-0"
                    >
                      <option value="sharesCount">{t('excel.sharesCount')}</option>
                      <option value="sharePrice">{t('excel.sharePrice')}</option>
                      <option value="profit">{t('excel.profit')}</option>
                      <option value="haramRatio">{t('excel.haramRatio')}</option>
                      <option value="ignore">{t('excel.ignore')}</option>
                    </select>
                  </div>
                </div>
              ))}
              
              {/* Data Rows */}
              {excelData.rows.map((row: any, rowIndex: number) => (
                <React.Fragment key={rowIndex}>
                  <div className="cell cell-row-num">{rowIndex + 1}</div>
                  {excelData.headers.map((header: string, colIndex: number) => (
                    <div key={colIndex} className="cell text-gray-300 mono">
                      {row[header] || ''}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Calculate Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCalculate}
              disabled={!purificationSelected && !zakatSelected}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold hover:shadow-lg hover:shadow-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('common.calculate')}
            </button>
          </div>
        </div>
      )}
      
      {/* Results Panel */}
      {showResult && result && (
        <div className="grid grid-cols-5 gap-0">
          <div className="col-span-3"></div>
          <ResultDrawer
            purification={result}
            authority={authority}
            onAuthorityChange={setAuthority}
            inputs={{ excelData, columnMapping }}
          />
        </div>
      )}
    </div>
  );
}

