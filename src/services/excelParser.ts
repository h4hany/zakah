import * as XLSX from 'xlsx';

export interface ExcelRow {
  [key: string]: string | number;
}

export interface ParsedExcelData {
  headers: string[];
  rows: ExcelRow[];
  rawData: any[][];
}

export function parseExcelFile(file: File): Promise<ParsedExcelData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        
        if (jsonData.length === 0) {
          reject(new Error('Excel file is empty'));
          return;
        }
        
        // First row is headers
        const headers = (jsonData[0] as any[]).map((h, i) => h || String.fromCharCode(65 + i));
        const rows = jsonData.slice(1).map((row: any[]) => {
          const rowObj: ExcelRow = {};
          headers.forEach((header, i) => {
            rowObj[header] = row[i] || '';
          });
          return rowObj;
        });
        
        resolve({
          headers,
          rows,
          rawData: jsonData as any[][],
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

export type ColumnType = 'sharesCount' | 'sharePrice' | 'profit' | 'haramRatio' | 'ignore';

export interface ColumnMapping {
  [columnKey: string]: ColumnType;
}

export function mapExcelDataToCalculations(
  rows: ExcelRow[],
  mapping: ColumnMapping
): Array<{ sharesCount?: number; sharePrice?: number; profit: number; haramRatio: number }> {
  return rows.map(row => {
    let sharesCount: number | undefined;
    let sharePrice: number | undefined;
    let profit = 0;
    let haramRatio = 0;
    
    Object.entries(mapping).forEach(([columnKey, type]) => {
      const value = row[columnKey];
      const numValue = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
      
      switch (type) {
        case 'sharesCount':
          sharesCount = numValue;
          break;
        case 'sharePrice':
          sharePrice = numValue;
          break;
        case 'profit':
          profit = numValue;
          break;
        case 'haramRatio':
          haramRatio = numValue;
          break;
      }
    });
    
    // If sharesCount and sharePrice are provided but profit is not, calculate it
    if (sharesCount && sharePrice && !profit) {
      profit = sharesCount * sharePrice;
    }
    
    return {
      sharesCount,
      sharePrice,
      profit,
      haramRatio,
    };
  });
}


