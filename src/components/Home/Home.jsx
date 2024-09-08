import React from "react";
import { NavLink } from "react-router-dom";
import "./Index.css";

function Home(props) {
  return (
    <div className="wrapper">
      <div className="index__container">
        <div className="left__bord">
          <NavLink to="/report" className="links">
            <p>Ежедневный отчет</p>
          </NavLink>
          <NavLink to="/lists" className="links">
            <p>Учетный лист</p>
          </NavLink>
          <NavLink to="/card" className="links">
            <p>Зарплатный табель</p>
          </NavLink>
          <NavLink to="/vault" className="links">
            <p>Свод бригад</p>
          </NavLink>
        </div>
        <div className="bottom__bord">
          <div className="bottom__bord-bottoms">
            <NavLink to="/norms" className="links">
              Нормы
            </NavLink>
            <NavLink to="/admins" className="links">
              Пользователи
            </NavLink>
            <NavLink to="/users" className="links">
              Работники
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
