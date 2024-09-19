import React from "react";
import "./normsitem.css";
import { DeleteNorms, DeleteNormsItems, UpdateNorms } from "../../../redux/norms";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";

export const NormTable = (props) => {

  const dispatch = useDispatch()

  const delNorm = (e) => {
    const name = confirm("Подтвердите удаление");
    const id = e.target.id
    if (name) {
      dispatch(DeleteNormsItems(id))
      alert("Норма удалена")
    }
  }

  return (
    <>
      <tr>
        <td rowSpan="2" className="norm__table-name">
          {props.data.name}
        </td>
        <td rowSpan="2" className="norm__table-item">
          {props.data.items}
        </td>
        <td rowSpan="2" className="norm__table-norm">
          {props.data.normname}
        </td>
        <td rowSpan="2" className="norm__table-discharge">
          {props.data.discharge}
        </td>
        <td className="norm__table-pl">
          {Math.round(props.data.payment * props.data.normname * 100) / 100}
        </td>
        <td className="norm__table-1">
          {Math.round(props.data.surcharge1 * props.data.normname * 100) / 100}
        </td>
        <td className="norm__table-2">
          {Math.round(props.data.surcharge2 * props.data.normname * 100) / 100}
        </td>
        <td className="norm__table-3">
          {
           (Math.round(props.data.surcharge3 * props.data.normname * 100) /
              100)}
        </td>
      </tr>
      <tr>
        <td>{props.data.payment}</td>
        <td>{props.data.surcharge1}</td>
        <td>{props.data.surcharge2}</td>
        <td className="del-but-con">  
          {(Math.round(props.data.surcharge3 * props.data.normname * 100) /
              100)}
      <button id={props.data.id} onClick={delNorm} className="min_button del_but">X</button>

        </td>
      </tr>
    </>
  );
};

export const NormItem = (props) => {
  const dispatch = useDispatch()
  const data = props.data;




  const deleteNormName = (e) => {
    const id = e.target.id
    const name = confirm("Подтвердите удаление");
    if (name) {
      dispatch(DeleteNorms(id))
      alert("Норма удалена")
    }
  }
  const PutNorm = (e) => {
    const name = prompt("Изменить название на:");
    const id = e.target.id;
    if (name) {
      const res = {
        id: id,
        name: name
      }
      dispatch(UpdateNorms(res))
    }
  }

  const filterData = data.filter((a) => a.norms_id === props.id);

  return (
    <>
      <div className="norm__item">
        <div className="norm__name-item">
          <p>{props.name}</p>
          <div className="button__container-norm">

            <button id={props.id} onClick={PutNorm} className='min_button'>
            &#9998;
            </button>
            <button id={props.id} onClick={deleteNormName} className='min_button'>
              X
            </button>
            <NavLink to={`${props.id}`} className='min_button' >
              +
            </NavLink>

          </div>
        </div>
        <div className="norm__table">
          <table className="norm__table">
            {filterData.map((a, i) => (
              <NormTable key={i} data={a} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
};



function NormsItem(props) {
  const data = props.norms;




  return (
    <div>
      <table className="norm__table">
        <thead>
          <tr>
            <th rowSpan="2" className="col1">
              Наименование работ
            </th>
            <th rowSpan="2" className="col2">
              Ед. изм.
            </th>
            <th rowSpan="2" className="col3">
              Норма выработки
            </th>
            <th rowSpan="2" className="col4">
              Разряд
            </th>
            <th className="col5">Основная з/п, руб</th>
            <th colSpan="3">Доплата, руб</th>
          </tr>
          <tr>
            <th>За единицу выполненной работы</th>
            <th>За выполнение плана дня</th>
            <th>За качество</th>
            <th>За вредность</th>
          </tr>
        </thead>
      </table>
      {data.nameNorms.items.map((a, i) => (
        <NormItem
          itemId={a.id}
          name={a.name}
          id={a.id}
          key={i}
          data={data.normsitem.items}
          length={data.length}
        />
      )) } 

      
    </div>
  );
}

export default NormsItem;
