import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { parseExcelFile, mapExcelDataToCalculations, ColumnType, ColumnMapping } from '@/services/excelParser';
import { calculatePurificationFromArray } from '@/services/purificationEngine';
import { calculateZakat, ZakatResult } from '@/services/zakatEngine';
import { Authority } from '@/services/authority';
import ResultDrawer from '@/app/components/ResultDrawer';
import { PurificationResult } from '@/services/purificationEngine';
import NeonCheckbox from '@/app/components/NeonCheckbox';

const ITEMS_PER_PAGE = 10;

export default function ExcelMode() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [zakatSelected, setZakatSelected] = useState(false);
  const [purificationSelected, setPurificationSelected] = useState(false);
  const [zakatResult, setZakatResult] = useState<ZakatResult | null>(null);
  const [purificationResult, setPurificationResult] = useState<PurificationResult | null>(null);
  const [authority, setAuthority] = useState<Authority>('AAOIFI');
  const [showResult, setShowResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setCurrentPage(1);
    setShowResult(false);
    setZakatResult(null);
    setPurificationResult(null);
    
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
    
    let zakat: ZakatResult | null = null;
    let purification: PurificationResult | null = null;
    
    const mapped = mapExcelDataToCalculations(excelData.rows, columnMapping);
    
    // Calculate Zakat if selected
    if (zakatSelected) {
      let totalStocks = 0;
      mapped.forEach(m => {
        if (m.sharesCount && m.sharePrice) {
          totalStocks += m.sharesCount * m.sharePrice;
        } else if (m.profit) {
          totalStocks += m.profit;
        }
      });
      
      zakat = calculateZakat({
        cash: 0,
        bankBalance: 0,
        goldGrams: 0,
        goldPricePerGram: 0,
        silverGrams: 0,
        silverPricePerGram: 0,
        stocks: totalStocks,
        crypto: 0,
        funds: 0,
        inventory: 0,
        receivables: 0,
        businessCash: 0,
        liabilities: 0,
      }, authority);
      setZakatResult(zakat);
    }
    
    // Calculate Purification if selected
    if (purificationSelected) {
      purification = calculatePurificationFromArray(
        mapped.map(m => ({ profit: m.profit, haramRatio: m.haramRatio })),
        authority
      );
      setPurificationResult(purification);
    }
    
    // Show result if at least one calculation was performed
    if (zakat || purification) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setFile(null);
    setExcelData(null);
    setZakatSelected(false);
    setPurificationSelected(false);
    setShowResult(false);
    setZakatResult(null);
    setPurificationResult(null);
    setCurrentPage(1);
  };

  // Auto-recalculate when authority changes (if results are already shown)
  useEffect(() => {
    if (showResult && excelData) {
      const mapped = mapExcelDataToCalculations(excelData.rows, columnMapping);
      
      if (zakatSelected) {
        let totalStocks = 0;
        mapped.forEach(m => {
          if (m.sharesCount && m.sharePrice) {
            totalStocks += m.sharesCount * m.sharePrice;
          } else if (m.profit) {
            totalStocks += m.profit;
          }
        });
        
        const zakat = calculateZakat({
          cash: 0,
          bankBalance: 0,
          goldGrams: 0,
          goldPricePerGram: 0,
          silverGrams: 0,
          silverPricePerGram: 0,
          stocks: totalStocks,
          crypto: 0,
          funds: 0,
          inventory: 0,
          receivables: 0,
          businessCash: 0,
          liabilities: 0,
        }, authority);
        setZakatResult(zakat);
      }
      
      if (purificationSelected) {
        const purification = calculatePurificationFromArray(
          mapped.map(m => ({ profit: m.profit, haramRatio: m.haramRatio })),
          authority
        );
        setPurificationResult(purification);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authority]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    if (!excelData) return 1;
    return Math.ceil(excelData.rows.length / ITEMS_PER_PAGE);
  }, [excelData]);

  const paginatedRows = useMemo(() => {
    if (!excelData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return excelData.rows.slice(startIndex, endIndex);
  }, [excelData, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="space-y-4">
      {/* Step 1: Upload */}
      {!file && (
        <div>
          <div className="mb-2">
            <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Step 1</span>
            <h2 className="text-base font-semibold text-gray-200 mt-1">Upload Excel File</h2>
          </div>
          <label>
            <div className="widget-card rounded-xl border-2 border-dashed border-yellow-600/30 p-8 text-center hover:border-yellow-600/50 hover:bg-yellow-600/5 transition-all cursor-pointer group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-600/10 flex items-center justify-center group-hover:bg-yellow-600/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      )}

      {/* Step 2: File Info + Calculation Type Selection */}
      {file && excelData && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Step 2</span>
              <h2 className="text-base font-semibold text-gray-200 mt-1">Select Calculation Type</h2>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
              title="Start over"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
          </div>
          
          <div className="widget-card rounded-xl border border-yellow-600/20 p-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-200 truncate">{file.name}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span>{excelData.rows.length} rows</span>
                  <span>•</span>
                  <span>{excelData.headers.length} columns</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`widget-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
              zakatSelected 
                ? 'border-yellow-600 bg-yellow-600/10 shadow-lg shadow-yellow-600/20' 
                : 'border-yellow-600/20 hover:border-yellow-600/40 hover:bg-yellow-600/5'
            }`}>
              <div className="flex items-center gap-3">
                <NeonCheckbox
                  checked={zakatSelected}
                  onChange={setZakatSelected}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-200">{t('common.zakat')}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{t('common.zakatDescription')}</p>
                </div>
              </div>
            </label>

            <label className={`widget-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
              purificationSelected 
                ? 'border-yellow-600 bg-yellow-600/10 shadow-lg shadow-yellow-600/20' 
                : 'border-yellow-600/20 hover:border-yellow-600/40 hover:bg-yellow-600/5'
            }`}>
              <div className="flex items-center gap-3">
                <NeonCheckbox
                  checked={purificationSelected}
                  onChange={setPurificationSelected}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-200">{t('common.purification')}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{t('common.purificationDescription')}</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Results - Show above table when calculated */}
      {showResult && (zakatResult || purificationResult) && (
        <div className="mb-4">
          <ResultDrawer
            zakat={zakatResult || undefined}
            purification={purificationResult || undefined}
            authority={authority}
            onAuthorityChange={setAuthority}
            inputs={{ excelData, columnMapping }}
          />
        </div>
      )}

      {/* Step 3: Table View + Calculate Button */}
      {file && excelData && (zakatSelected || purificationSelected) && (
        <div>
          <div className="mb-3">
            <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Step 3</span>
            <h2 className="text-base font-semibold text-gray-200 mt-1">Review & Calculate</h2>
          </div>

          {/* Table Container */}
          <div className="widget-card rounded-xl overflow-hidden border border-yellow-600/20 mb-3">
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full border-collapse" style={{ minWidth: `${(excelData.headers.length + 1) * 150}px` }}>
                <thead className="sticky top-0 z-20">
                  <tr>
                    <th className="cell cell-header cell-row-num sticky left-0 z-30 bg-[rgba(201,162,77,0.35)] min-w-[60px] backdrop-blur-sm"></th>
                    {excelData.headers.map((header: string, index: number) => (
                      <th key={index} className="cell cell-header min-w-[150px]">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-yellow-500 text-xs font-bold whitespace-nowrap">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-xs text-gray-400 font-medium truncate flex-1" title={header}>
                              {header}
                            </span>
                          </div>
                          <select
                            value={columnMapping[header] || 'ignore'}
                            onChange={(e) => handleColumnMappingChange(header, e.target.value as ColumnType)}
                            className="tag-selector w-full appearance-none text-center bg-transparent border-0 p-0 text-xs"
                          >
                            <option value="sharesCount">{t('excel.sharesCount')}</option>
                            <option value="sharePrice">{t('excel.sharePrice')}</option>
                            <option value="profit">{t('excel.profit')}</option>
                            <option value="haramRatio">{t('excel.haramRatio')}</option>
                            <option value="ignore">{t('excel.ignore')}</option>
                          </select>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row: any, rowIndex: number) => {
                    const actualRowIndex = (currentPage - 1) * ITEMS_PER_PAGE + rowIndex;
                    return (
                      <tr key={actualRowIndex} className="hover:bg-black/20 transition-colors">
                        <td className="cell cell-row-num sticky left-0 z-10 bg-[rgba(0,0,0,0.4)] min-w-[60px] text-center">
                          {actualRowIndex + 1}
                        </td>
                        {excelData.headers.map((header: string, colIndex: number) => {
                          const value = row[header];
                          const displayValue = value !== null && value !== undefined && value !== '' 
                            ? (typeof value === 'number' ? value.toLocaleString() : String(value))
                            : '';
                          return (
                            <td key={colIndex} className="cell text-gray-300 mono text-sm min-w-[150px]" title={displayValue}>
                              <span className="truncate block w-full">{displayValue}</span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-black/20 border border-yellow-600/10 mb-3">
              <div className="text-xs text-gray-400">
                Page {currentPage} of {totalPages} • {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, excelData.rows.length)} of {excelData.rows.length}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 text-xs font-medium hover:bg-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 rounded bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 text-xs font-medium hover:bg-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Calculate Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCalculate}
              disabled={!purificationSelected && !zakatSelected}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold text-sm hover:shadow-lg hover:shadow-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('common.calculate')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
