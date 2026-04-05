import * as data from '../models/employeesStore.js';
import * as render from '../view/tableRender.js';
import * as handlers from './eventsTable.js';
import { tableState } from '../models/TableStore.js';
import { extractTableData } from '../utils/extractTableData.js';
import { createEmployeeStore } from '../models/employeesStore.js';
import { createEmployeeForm } from '../components/form/form.js';
import { ACTION_TYPES } from '../constants.js';

export const init = () => {
  const thead = document.querySelector('thead');
  const tbody = document.querySelector('tbody');

  const employeeStore = createEmployeeStore(extractTableData(tbody.rows));
  const { add, update, getAllSorted } = employeeStore;
  const employeeForm = createEmployeeForm(add);

  employeeStore.subscribe(({ type, payload }) => {
    switch (type) {
      case ACTION_TYPES.UPDATE:
        render.updateRow(payload, tbody);
        break;
      case ACTION_TYPES.ADD:
        render.addRow(payload, tbody);
        break;
      case ACTION_TYPES.SORT:
        render.renderRows(tbody, payload);
        break;
    }
  });

  const ctx = {
    tableState,
    elements: { thead, tbody },
    employeeStore: { update, getAllSorted },
    render,
  };

  document.body.appendChild(employeeForm);
  render.initTheadAttributes(thead);
  render.initCellAttributes(tbody, tbody.rows);

  data.setEmployees(data.extractTableData(tbody.rows));
  handlers.init(ctx);
};
