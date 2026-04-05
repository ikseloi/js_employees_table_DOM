// import { columns as SCHEMA } from '../models/employeesStore';
import { KEYS, LABELS, ORDER_FIELDS } from '../constants';

const SCHEMA = [
  { field: KEYS.NAME, label: LABELS.NAME },
  { field: KEYS.POSITION, label: LABELS.POSITION },
  { field: KEYS.OFFICE, label: LABELS.OFFICE },
  { field: KEYS.AGE, label: LABELS.AGE },
  { field: KEYS.SALARY, label: LABELS.SALARY },
];

export const initTheadAttributes = (theadElement) => {
  const tr = document.createElement('tr');

  SCHEMA.forEach((column) => {
    const th = document.createElement('th');

    th.textContent = column.label;
    th.dataset.field = column.field;
    th.tabIndex = 0;
    th.setAttribute('role', 'button');
    tr.appendChild(th);
  });

  theadElement.innerHTML = '';
  theadElement.appendChild(tr);
};

export const initCellAttributes = (tbody, rows) => {
  const frag = document.createDocumentFragment();

  [...rows].forEach((row, index) => {
    const tr = document.createElement('tr');

    tr.dataset.id = index;

    [...row.children].forEach((td, idx) => {
      const elementTd = document.createElement('td');

      elementTd.textContent = td.textContent;
      elementTd.dataset.field = SCHEMA[idx].field;
      tr.appendChild(elementTd);
    });
    frag.appendChild(tr);
  });
  tbody.innerHTML = '';
  tbody.appendChild(frag);
};

export const renderRows = (tbody, employeesArr = []) => {
  const frag = document.createDocumentFragment();

  employeesArr.forEach((employeeObj) => {
    const tr = addRow(employeeObj);

    tr.dataset.id = employeeObj.id;
    frag.appendChild(tr);
  });

  tbody.innerHTML = '';
  tbody.appendChild(frag);
};

export const addRow = (payload, tbody = null) => {
  const tr = document.createElement('tr');

  ORDER_FIELDS.forEach((field) => {
    const td = document.createElement('td');

    if (field === KEYS.SALARY) {
      td.textContent = '$' + payload[field].toLocaleString('en-US');
    } else {
      td.textContent = payload[field];
    }

    td.dataset.field = field;
    tr.appendChild(td);
  });

  if (tbody) {
    tbody.appendChild(tr);
  }

  return tr;
};

export const updateRow = (payload, tbody) => {
  const td = tbody
    .querySelector(`[data-id="${payload.id}"]`)
    ?.querySelector(`[data-field="${payload.field}"]`);

  if (td) {
    td.textContent =
      payload.field === KEYS.SALARY ? '$' + payload.value : payload.value;
  }
};
