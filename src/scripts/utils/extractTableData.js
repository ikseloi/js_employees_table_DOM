import { KEYS, NUMERIC_VALUES } from '../constants';

export const extractTableData = (rows) => {
  return Array.from(rows).map((tr) => {
    const dataObj = Array.from(tr.children).reduce((acc, td, idx) => {
      const key = Object.values(KEYS)[idx];
      const value = td.textContent.trim();

      if (NUMERIC_VALUES.includes(key)) {
        const n = Number(value);

        acc[key] = Number.isFinite(n) ? n : value;
        // зберегти число або залишити як строку для валідації
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    return dataObj;
  });
};
