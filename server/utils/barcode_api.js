// server/utils/barcode_api.js
// Stub for medicine barcode lookup by GTIN/UPC

const barcodeDB = {
  '0123456789012': {
    code: 'MED001',
    name: 'Amoxicillin',
    atcClass: 'J01CA',
    withdrawalPeriodDays: 7,
    mrlMgPerKg: 0.1,
  },
  '0987654321098': {
    code: 'MED002',
    name: 'Tetracycline',
    atcClass: 'J01AA',
    withdrawalPeriodDays: 10,
    mrlMgPerKg: 0.2,
  },
};

function lookupBarcode(gtin) {
  return barcodeDB[gtin] || null;
}

module.exports = { lookupBarcode };
