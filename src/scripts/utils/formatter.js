export const normalizeNumberString = (v) => {
  let s = String(v ?? '')
    .trim()
    .replace(/\s+/g, '')
    .replace(/['\u2019]/g, '');

  if (s === '') {
    return s;
  }

  const sign = s[0] === '-' ? '-' : '';

  if (sign) {
    s = s.slice(1);
  }

  const hasComma = s.includes(',');
  const hasDot = s.includes('.');

  s = hasComma ? s.split(',').filter(Boolean).join(',') : s;
  s = hasDot ? s.split('.').filter(Boolean).join('.') : s;

  if (hasComma && hasDot) {
    // правіший — десятковий
    const lastComma = s.lastIndexOf(',');
    const lastDot = s.lastIndexOf('.');

    if (lastComma > lastDot) {
      // кома — десяткова
      s = s.replace(/\./g, '').replace(/,/g, '.');
    } else {
      // крапка — десяткова
      s = s.replace(/,/g, '');
    }

    return sign + s;
  }

  if (hasComma && !hasDot) {
    const parts = s.split(',');
    const lastPart = parts[parts.length - 1];

    if (lastPart.length === 3) {
      s = s.replace(/,/g, '');
    } else {
      s = s.replace(/,/g, '.');
    }

    return sign + s;
  }

  if (hasDot && !hasComma) {
    const parts = s.split('.');

    if (parts.length > 1) {
      const last = parts.pop();

      if (last.length === 3) {
        // усі точки — тисячні
        s = parts.join('') + last;
      } else {
        // остання — дробова
        s = parts.join('') + '.' + last;
      }
    }

    return sign + s;
  }

  return sign + s;
};
