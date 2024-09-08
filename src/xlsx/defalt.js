import * as XLSX from "xlsx";


export const CreateUchetXSLS = (data) => {

  const workbook = XLSX.readFile("./excel/exel1.xlsx");
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const excelData = data.map(a => [
    { v: a.date, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.cutur, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.work, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.rasrad, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.hour, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.ism, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.norm, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.edwork, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.paln, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.kach, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.vred, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.obem, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: Math.round((a.obem * a.edwork) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: Math.round((a.obem * a.paln) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: Math.round((a.obem * a.kach) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: Math.round((a.obem * a.vred) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.iswick === "да" ? Math.round((a.obem * a.edwork) * 100) / 100 : 0, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: {style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } },
    { v: a.total, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } } } }  // Assuming 'total' field exists in your data
  ]);

  XLSX.utils.sheet_add_aoa(worksheet, excelData, { origin: { r: 19, c: 0 } });

  worksheet['!cols'] = headers[0].map(() => ({ wch: 20 }));

  XLSX.writeFile(workbook, `таблица.xlsx`);
  console.log("Документ создан");
};
