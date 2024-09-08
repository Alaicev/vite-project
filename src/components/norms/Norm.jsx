import React from "react";
import "./norms.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreatehNorms, UpdateNorms, featchNorms, featchNormsItem } from "../../redux/norms";
import Loader from "../Loader/Loader";
import NormsItem from "./NormsItem/NormsItem";

export const Norms = (props) => {
const dispatch = useDispatch()

const data = props.norms


  const createNorm = () => {
    const name = prompt("Напишите название");
    if (name) {
      const res = {
        name: name
      }
      dispatch(CreatehNorms(res));
      alert("Норма добавлен");
    }
  };

  

  return (
    <div className="wrapper">
      <div className="list__container">
        <div className="title__container">
          <h2 className="list__title">Нормы</h2>
          <div className="norms__button-container">
            <a onClick={createNorm} className="buttons">
              <p>Создать норму</p>
            </a>
            <NavLink to="/" className="buttons">
              <p>Назад</p>
            </NavLink>
          </div>
        </div>
        <div className="list__content">
          <NormsItem norms={data} />
        </div>
      </div>
    </div>
  );
};

function NormsContainer(props) {
  const { norms } = useSelector((state) => state.norms);

  const isNormsItemsLoading = norms.normsitem.status === "loaded";
  return (
    <>
    {isNormsItemsLoading ? (<Norms norms={norms} />): <Loader/>}
    </>
  );
}

export default NormsContainer;