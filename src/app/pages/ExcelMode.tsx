import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { parseExcelFile, mapExcelDataToCalculations, ColumnType, ColumnMapping } from '@/services/excelParser';
import { calculatePurificationFromArray } from '@/services/purificationEngine';
import { calculateZakat, ZakatResult } from '@/services/zakatEngine';
import ResultDrawer from '@/app/components/ResultDrawer';
import { PurificationResult } from '@/services/purificationEngine';

const ITEMS_PER_PAGE = 20;

export default function ExcelMode() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [zakatSelected, setZakatSelected] = useState(false);
  const [purificationSelected, setPurificationSelected] = useState(false);
  const [zakatResult, setZakatResult] = useState<ZakatResult | null>(null);
  const [purificationResult, setPurificationResult] = useState<PurificationResult | null>(null);
  const [authority, setAuthority] = useState('AAOIFI Standards');
  const [showResult, setShowResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setCurrentPage(1); // Reset to first page when new file is uploaded
    
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
      // Calculate total value from shares (if available) or use profit as investment value
      let totalStocks = 0;
      mapped.forEach(m => {
        if (m.sharesCount && m.sharePrice) {
          totalStocks += m.sharesCount * m.sharePrice;
        } else if (m.profit) {
          totalStocks += m.profit;
        }
      });
      
      // For Excel mode, we'll use stocks as the main asset
      // User can add other assets manually if needed
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
      });
      setZakatResult(zakat);
    }
    
    // Calculate Purification if selected
    if (purificationSelected) {
      purification = calculatePurificationFromArray(
        mapped.map(m => ({ profit: m.profit, haramRatio: m.haramRatio }))
      );
      setPurificationResult(purification);
    }
    
    // Show result if at least one calculation was performed
    if (zakat || purification) {
      setShowResult(true);
    }
  };

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
        <div className="mb-6 space-y-4">
          {/* File Name Display */}
          {file && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-600/10 border border-yellow-600/20">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">{file.name}</span>
              <span className="text-xs text-gray-500 ml-auto">({excelData.rows.length} rows, {excelData.headers.length} columns)</span>
            </div>
          )}

          {/* Table Container with Horizontal Scroll */}
          <div className="widget-card rounded-2xl overflow-hidden border border-yellow-600/20">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full border-collapse" style={{ minWidth: `${(excelData.headers.length + 1) * 150}px` }}>
                <thead className="sticky top-0 z-20">
                  <tr>
                    <th className="cell cell-header cell-row-num sticky left-0 z-30 bg-[rgba(201,162,77,0.15)] min-w-[60px]"></th>
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
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/20 border border-yellow-600/10">
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, excelData.rows.length)} of {excelData.rows.length} rows
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 text-sm font-medium hover:bg-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-yellow-600 text-black'
                            : 'bg-black/20 text-gray-400 hover:bg-yellow-600/20 hover:text-yellow-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 text-sm font-medium hover:bg-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold hover:shadow-lg hover:shadow-yellow-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('common.calculate')}
            </button>
          </div>
        </div>
      )}
      
      {/* Results Panel */}
      {showResult && (zakatResult || purificationResult) && (
        <div className="grid grid-cols-5 gap-0">
          <div className="col-span-3"></div>
          <ResultDrawer
            zakat={zakatResult || undefined}
            purification={purificationResult || undefined}
            authority={authority}
            onAuthorityChange={setAuthority}
            inputs={{ excelData, columnMapping }}
          />
        </div>
      )}
    </div>
  );
}

