import React from "react";
import "./Lists.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBrigade,
  GetAllBrigade,
  UpdateBrigade,
} from "../../redux/brigade";
import Loader from "../Loader/Loader";
import {NavLink, useNavigate} from "react-router-dom";
import ListFromBrigade from "./ListFromBrigade";
import {ButtonRep} from "../elements/buttons.jsx";

export const ListBrigade = (props) => {
  const dispatch = useDispatch();
  const data = props.data;
  const [indexUchet, setInsexUchet] = React.useState(0);
  const navigate = useNavigate()


  const CreateBrigadeItem = () => {
    const name  = prompt("Напишите номер бригады");
    if (name) {
      const res = {
        name: name,
      };
      dispatch(CreateBrigade(res));
      alert("Бригада создана ");
    }
  };

  const UpdateBrigadeItem = (e) => {
    const name = prompt("Напишите новый номер");
    const id = e.target.id;
    if (name) {
      const data = {
        id: id,
        name: name,
      };
      dispatch(UpdateBrigade(data));
    }
  };

  const SelectItemsFromBrigade = (e) => {
    const id = e.target.id;
    // setInsexUchet(id);

    console.log(id)

    navigate("/report/" + id); }

  return (
    <>
      {indexUchet ? (
        <ListFromBrigade id={indexUchet} />
      ) : (
        <div className="wrapper">
          <div className="list__container">
            <div className="title__container">
              <h2 className="list__title">Бригады</h2>
              <div className="norms__button-container">
                <a className="buttons" onClick={CreateBrigadeItem}>
                  Добавить
                </a>
                <NavLink to="/" className="buttons">
                  <p>Назад</p>
                </NavLink>
              </div>
            </div>
            <div className="list__content">
              {data.map((a, i) => (
                <div className="btigade__item" key={i}>
                  <p>{i + 1}</p>
                  <button
                    className="user_button cur__brigade"
                    onClick={SelectItemsFromBrigade}
                    id={a.id}
                  >
                    Бригада № {a.name}
                  </button>
                  <ButtonRep fun={UpdateBrigadeItem} text={"Изменить"} id={a.id}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function Lists() {
  const dispatch = useDispatch();
  const { brigade } = useSelector((state) => state.brigade);
  const isNormsLoading = brigade.brigadeData.status === "loaded";

  React.useEffect(() => {
    dispatch(GetAllBrigade());
  }, []);
  return (
    <div>
      {isNormsLoading ? (
        <ListBrigade data={brigade.brigadeData.items} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Lists;
