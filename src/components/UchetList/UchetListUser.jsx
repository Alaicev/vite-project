import React,  {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import Loader from '../Loader/Loader';
import instance from '../../api/api';
import {ButtonElem, ButtonNav} from "../elements/buttons.jsx";
import Calendar from '../Cal.jsx';

export const UchetListItems = (props) => {
  const [month, setMonth] = useState(""); // Хранит выбранный месяц
  const [filteredData, setFilteredData] = useState([]); // Хранит отфильтрованные данные

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    setMonth(currentMonth); // Устанавливаем текущий месяц при инициализации
  }, []);

  useEffect(() => {
    if (month) {
      const res = props.data.filter(a => {
        const m = a.date.split(".")[1];
        return m === month;
      });
      setFilteredData(res);
    }
  }, [month, props.data]);

  const getMount = (m) => {
    setMonth(m);
  };

  const getFile = async (d) => {
    if(filteredData[0] == undefined) {
      alert("Файл пуст")
      return
    }
    try {
      const nameUser = { name: filteredData };

      console.log(nameUser);

      const response = await instance.post("./uchetdata", nameUser, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="list__container">
        <div className="title__container">
          <h2 className="list__title">{props.data[0]?.name}</h2>
          <Calendar fun={getMount} />
          <div className="norms__button-container">
            <ButtonElem fun={() => getFile(props.data)} text={"Скачать"} />
            <ButtonNav link={"/"} text={"Назад"} />
          </div>
        </div>
        <div className="list__content">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Дата</th>
                <th rowSpan={2}>Наименование культуры</th>
                <th rowSpan={2}>Выполненная работа</th>
                <th rowSpan={2}>Разряд</th>
                <th rowSpan={2}>Отработано часов</th>
                <th rowSpan={2}>Единица измерения</th>
                <th rowSpan={2}>Норма выработки</th>
                <th colSpan={4}>Расценка (руб)</th>
                <th rowSpan={2}>Объем выполненной работы</th>
                <th colSpan={4}>Оплата труда (руб)</th>
                <th rowSpan={2}>Доплата за выходной</th>
                <th>Всего</th>
              </tr>
              <tr>
                <th>Основная оплата</th>
                <th>За выполнение плана дня</th>
                <th>За качество</th>
                <th>за вредность</th>
                <th>Основная оплата</th>
                <th>За выполнение плана дня</th>
                <th>За качество</th>
                <th>за вредность</th>
                <th>Плата за день (руб)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((a, i) => (
                <tr key={i}>
                  <td>{a.date}</td>
                  <td>{a.cutur}</td>
                  <td>{a.work}</td>
                  <td>{a.rasrad}</td>
                  <td>{a.hour}</td>
                  <td>{a.ism}</td>
                  <td>{a.norm}</td>
                  <td>{a.edwork}</td>
                  <td>{a.paln}</td>
                  <td>{a.kach}</td>
                  <td>{a.vred}</td>
                  <td>{a.obem}</td>
                  <td>{Math.round((a.obem * a.edwork) * 100) / 100}</td>
                  <td>{Math.round((a.obem * a.paln) * 100) / 100}</td>
                  <td>{Math.round((a.obem * a.kach) * 100) / 100}</td>
                  <td>{Math.round((a.obem * a.vred) * 100) / 100}</td>
                  <td>{a.iswick === "да" ? Math.round((a.obem * a.edwork) * 100) / 100 : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function UchetListUser() {
  const { uchetUser } = useSelector((state) => state.uchet);

  const isUchetLoading = uchetUser.uchetUchetUser.status === "loaded";

  return (
    <>
          {isUchetLoading ? (
        <UchetListItems data={uchetUser.uchetUchetUser.items}/>

      ) : (
        <Loader />
      )}
    </>
  );
}

export default UchetListUser;