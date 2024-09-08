import * as XLSX from "xlsx";




const text1 = ["Согласовано:", "письмом Госкомстата России", "от 10 апреля 2003 г. № КЛ-01-21/1381", "", "", "", "", "", "", "", "Организация", "", "Фамилия ,имя, отчество", "Профессия", "Бригадир (Ф.И.О.)", "Ответственный (Ф.И.О.)"];
const text2 = ["Утверждаю :", "Директор ООО «Кошелевский посад»", "_________________________________", "(личная подпись)"]
const text3 = ["Н.Ф. Шаркаев", "(расшифровка подписи)"]
const text4 = ["УЧЕТНЫЙ ЛИСТ№_____", "труда и выполненных работ" , "", "", "", "", "", "", "", "Табельный номер"]
const text5 = ["Утверждено:", "приказом Минсельхоза России", "от 16 мая 2003 г. № 750", "", "Форма № 410-АПК"] 
const text6 = 'ООО"Кошелевский посад", ИНН 6383005442, Самарская обл, Сызранский р-н, Кошелевка п., Южный пер., дом № 1А'
const text7 = [ "Бакиева Татьяна Александровна", "плодоовощевод", "Колганова Т.Н,", "Колганова Т.Н,"]

const text8 = [
  ["Дата", "Наименование культуры", "Выполненная работа", "Разряд", "Отработано часов", "Единица измерения", "Норма выработки", "Основная оплата", "За выполнение плана дня", "За качество", "За вредность", "Объем выполненной работы", "Основная оплата", "За выполнение плана дня", "За качество", "За вредность", "Доплата за выходной", "Всего"],
  ["", "", "", "", "", "", "", "Расценка (руб)", "Расценка (руб)", "Расценка (руб)", "Расценка (руб)", "", "Оплата труда (руб)", "Оплата труда (руб)", "Оплата труда (руб)", "Оплата труда (руб)", "", "Плата за день (руб)"]
];


const tableData = [
  { Name: "John", Age: 30, City: "New York", car: "fdfs", car3: "fdfs", car4: "fdfs", car5: "fdfs", car6: "fdfs", car7: "fdfs", car8: "fdfs", car9: "fdfs", car0: "fdfs", car11: "fdfs", car12: "fdfs", car13: "fdfs", car14: "fdfs", car15: "fdfs", car16: "fdfs", car17: "fdfs", car18: "fdfs"  },
  { Name: "Jane", Age: 25, City: "San Francisco" },
  { Name: "Mike", Age: 35, City: "Chicago" },
];
export const CreateUchetXSLS = (data) => {
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Заполнение второго столбца первых четырех строк
  for (let i = 0; i < text1.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 0, r: i });
    worksheet[cellAddress] = { v: text1[i] };
  }

  for (let i = 0; i < text2.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 3, r: i });
    worksheet[cellAddress] = { v: text2[i] };
  }

  for (let i = 0; i < text3.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 4, r: 2 + i });
    worksheet[cellAddress] = { v: text3[i] };
  }

  for (let i = 0; i < text4.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 8, r: 3 + i });
    worksheet[cellAddress] = { v: text4[i] };
  }

  for (let i = 0; i < text5.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 15, r: 3 + i });
    worksheet[cellAddress] = { v: text5[i] };
  }

  for (let i = 0; i < text7.length; i++) {
    const cellAddress = XLSX.utils.encode_cell({ c: 3, r: 12 + i });
    worksheet[cellAddress] = { v: text7[i] };
  }

  const centeredHeaders = text8.map(row => row.map(cell => ({ v: cell, s: { alignment: { vertical: "center", horizontal: "center" } } })));
  XLSX.utils.sheet_add_aoa(worksheet, centeredHeaders, { origin: { r: 17, c: 0 } });



  
  // Преобразование данных с добавлением границ
  const excelDataWithBorders = data.map(a =>
    [
      { v: a.date, s: { alignment: { vertical: "center", horizontal: "center" }, border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } }, left: { style: "thin", color: { rgb: "000000" } }, right: { style: "thin", color: { rgb: "000000" } } }  } },
      { v: a.cutur, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.work, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.rasrad, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.hour, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.ism, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.norm, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.edwork, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.paln, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.kach, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.vred, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.obem, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: Math.round((a.obem * a.edwork) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: Math.round((a.obem * a.paln) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: Math.round((a.obem * a.kach) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: Math.round((a.obem * a.vred) * 100) / 100, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.iswick === "да" ? Math.round((a.obem * a.edwork) * 100) / 100 : 0, s: { alignment: { vertical: "center", horizontal: "center" } } },
      { v: a.total, s: { alignment: { vertical: "center", horizontal: "center" } } }
    ]
  );
  

  XLSX.utils.sheet_add_aoa(worksheet, excelDataWithBorders, { origin: { r: 19, c: 0 } });


  const cellAddress1 = XLSX.utils.encode_cell({ c: 2, r: 10 });
    worksheet[cellAddress1] = { v: text6 };

    const cellAddress2 = XLSX.utils.encode_cell({ c: 13, r: 12 });
    worksheet[cellAddress2] = { v: "_____" };

  // const startRow = text1.length + 3;


  // XLSX.utils.sheet_add_json(worksheet, tableData, {
  //   origin: { r: startRow, c: 0 },
  //   skipHeader: true,
  // });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  worksheet['!cols'] = text8[0].map(() => ({ wch: 20 }));

  worksheet['!cols'] = [
    { wch: 5 }, 
    { wch: 4 }, 
    { wch: 45 },  
    { wch: 45 },  
    { wch: 5 }, 
    { wch: 5 }, 
    { wch: 5 }, 
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},
    { wch: 9},   
  ];

  worksheet["!merges"] = [
    { s: { r: 17, c: 0 }, e: { r: 18, c: 0 } }, 
    { s: { r: 17, c: 1 }, e: { r: 18, c: 1 } }, 
    { s: { r: 17, c: 2 }, e: { r: 18, c: 2 } },
    { s: { r: 17, c: 3 }, e: { r: 18, c: 3 } }, 
    { s: { r: 17, c: 4 }, e: { r: 18, c: 4 } },
    { s: { r: 17, c: 5 }, e: { r: 18, c: 5 } }, 
    { s: { r: 17, c: 6 }, e: { r: 18, c: 6 } }, 
    { s: { r: 17, c: 7 }, e: { r: 17, c: 10 } }, 
    { s: { r: 17, c: 11 }, e: { r: 18, c: 11 } },
    { s: { r: 17, c: 12 }, e: { r: 17, c: 15 } },
    { s: { r: 17, c: 16 }, e: { r: 18, c: 16 } },
    { s: { r: 17, c: 17 }, e: { r: 18, c: 17 } } 
  ];

  XLSX.writeFile(workbook, `роберто.xlsx`);

  console.log("Документ создан")
};
