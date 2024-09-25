import { utils, writeFileXLSX } from 'xlsx';

export const exportExcel = (data, fielName) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, 'data');
    writeFileXLSX(workbook, `${fielName ? fielName : `list-employee-${Date.now()}`}.xlsx`);
};