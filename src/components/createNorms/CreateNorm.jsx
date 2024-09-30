import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { CreatehNormsItems } from '../../redux/norms';

function CreateNorm() {

  const currentId = useParams()

  const dispatch = useDispatch()
  const butRef = React.useRef()

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const resData = {
      name: data.name,
      items: data.items,
      normname: data.normname,
      discharge: data.discharge,
      payment: data.payment || "0",
      surcharge1: data.surcharge1 || "0",
      surcharge2: data.surcharge2 || "0",
      surcharge3: data.surcharge3 || "0",
      norms_id: currentId.id
    }

    console.log(resData)
    dispatch(CreatehNormsItems(resData))
    return <Navigate to="/"/>
  }

  
  return (
    <div className="wrapper">
      <div className="list__container">
        <div className="title__container">
          <h2 className="list__title">Введите данные</h2>
          <div className="norms__button-container">
            <a onClick={() => butRef.current.click()}className="buttons">
              <p >Сохранить</p>
            </a>
            <NavLink to="/" className="buttons">
              <p>Назад</p>
            </NavLink>
          </div>
        </div>
        <div className="list__content">
        <form onSubmit={handleSubmit(onSubmit)}>
        <table className="norm__table">
        <thead>
          <tr>
            <th rowSpan="2" >
              Наименование работ
            </th>
            <th rowSpan="2" >
              Ед. изм.
            </th>
            <th rowSpan="2" >
              Норма выработки
            </th>
            <th rowSpan="2" >
              Разряд
            </th>
            <th >Основная з/п, руб</th>
            <th colSpan="3">Доплата, руб</th>
          </tr>
          <tr>
            <th>За единицу выполненной работы</th>
            <th>За выполнение плана дня</th>
            <th>За качество</th>
            <th>За вредность</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <input {
              ...register("name", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input{
              ...register("items", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input type="number" {
              ...register("normname", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input type="number" {
              ...register("discharge", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input step={0.01} type="number" {
              ...register("payment", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input step={0.01} type="number"{
              ...register("surcharge1", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input  step={0.01} type="number" {
              ...register("surcharge2", {
                register: "-----"
              })
            }/>
            </td>
            <td>
            <input step={0.01} type="number" {
              ...register("surcharge3", {
                register: "-----"
              })
            }/>
            </td>
          </tr>
        </tbody>
      </table>
      <button ref={butRef} hidden>send</button>
      </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNorm;