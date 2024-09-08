import React from "react";
import "./users.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { createUsers, UppdateUsers, DeleteUsers } from "../../redux/users";

export const UserItem = (props) => {
  const dispatch = useDispatch();

  const UpdateUser = (e) => {
    const name = prompt("Напишите имя работника");
    const tabel = prompt("Напишите номер табеля");
    const id = e.target.id;
    if (name  && tabel) {
      const data = {
        id: id,
        name: name,
        tabel: tabel
      };
      dispatch(UppdateUsers(data));
    }
  };

  const DeleteUser = (e) => {
    const name = confirm("Подтвердите удаление");
    const id = e.target.id;
    if (name) {
      dispatch(DeleteUsers(id));
      alert("Пользователь удален");
    }
  };

  return (
    <div className="userItem">
      <div className="user_number str">
        <p>{props.i}</p>
      </div>
      <div className="user_name str">
        <p>{props.name}</p>
      </div>
      <div className="user_name str">
        <p>{props.tabel}</p>
      </div>
      <div className="user_rename str">
        {props.i === "№" ? (
          <p>-</p>
        ) : (
          <button className="user_button" id={props.id} onClick={UpdateUser}>
            Изменить
          </button>
        )}
      </div>
      <div className="user_rename str">
        {props.i === "№" ? (
          <p>-</p>
        ) : (
          <button className="user_button" id={props.id} onClick={DeleteUser}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export const UserContainer = (props) => {
  const dispatch = useDispatch();

  const createUser = () => {
    const name = prompt("Напишите имя работника");
    const tabel = prompt("Напишите номер табеля");
    if (name && tabel) {
      const res = {
        "name": name,
        "tabel": tabel,
      };
      dispatch(createUsers(res));
      alert("Работник добавлен");
    }
  };

  const data = props.data;
  console.log(data)

  return (
    <div className="wrapper">
      <div className="list__container">
        <div className="title__container">
          <h2 className="list__title">Нормы</h2>
          <div className="norms__button-container">
            <div className="buttons">
              <p onClick={createUser}>Добавить работника</p>
            </div>
            <NavLink to="/" className="buttons">
              <p>Назад</p>
            </NavLink>
          </div>
        </div>
        <div className="list__content">
          <UserItem i={"№"} name={"Имя работника"} />
          {data.map((a, i) => (
            <UserItem i={i + 1} name={a.name} tabel={a.tabel} key={i} id={a.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

function Users(props) {
  const { users } = useSelector((state) => state.users);
  const isUsersLoader = users.usersData.status === "loaded";

  return (
    <div>
      {isUsersLoader ? (
        <UserContainer data={users.usersData.items} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Users;
