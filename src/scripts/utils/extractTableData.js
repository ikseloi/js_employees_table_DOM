import { NUMERIC_VALUES, ORDER_FIELDS } from '../constants';

export const extractTableData = (rows) => {
  return Array.from(rows).map((tr) => {
    const dataObj = Array.from(tr.children).reduce((acc, td, idx) => {
      const key = ORDER_FIELDS[idx];
      const value = td.textContent.trim();

      if (NUMERIC_VALUES.includes(key)) {
        const n = Number(value);

        acc[key] = Number.isFinite(n) ? n : value;
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    return dataObj;
  });
};
