import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUchetUsers } from "../../redux/uchet";
import {ButtonElem, ButtonNav} from "../elements/buttons.jsx";


function UchetList() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [name, setName] = React.useState("")
  const [done, setDone] = React.useState(false)

  const onClick = () => {
    if(!!name) {
      setDone(true)
      dispatch(GetUchetUsers(name))
    }
  }

  return (
    <div>
      <div className="wrapper">
        <div className="list__container">
          <div className="title__container">
            <h2 className="list__title">Учетные листы</h2>
            <div className="inputContainer">
              <input placeholder="Имя работника" value={name} onChange={(e) => setName(e.target.value)} list="mycoollist"/>
              <datalist id="mycoollist">
                {users.usersData.items.map((a, i) => (
                  <option key={i} className="list_item-name">
                    {a.name}
                  </option>
                ))}
              </datalist>
              <ButtonElem fun={onClick} text={"Найти"}/>
            </div>
              <ButtonNav link={"/"} text={"Назад"}/>
          </div>
              {name && done && (<Navigate to="/listUser"/>)}
        </div>
      </div>
    </div>
  );
}

export default UchetList;
