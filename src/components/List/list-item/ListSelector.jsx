import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const ListSelector = (props) => {
  const { norms } = useSelector((state) => state.norms);
  const nameNorms = norms.nameNorms.items;
  const normsitem = norms.normsitem.items;

  const getDataItem = (event) => {
    console.log("change")
    event.persist();
    const id = event.target.value;
    const [normItem] = normsitem.filter((a) => a.id == id);
    const data = { work: nameNorms[normItem.norms_id - 1].name, ...normItem };
    props.getData(data);
  };

  return (
    <div className="list-selector__container">
      <div className="list-selector__block">
        <div className="list-selector-button-container">
          <a className="buttons" onClick={() => props.closeList()}>
            Назад
          </a>
        </div>
        <div className="list-selector__items">
          <div>
            {nameNorms.map((nameNorm, index) => (
              <div key={index} className="list-selector-form">
                <label htmlFor={nameNorm.id}>{nameNorm.name}</label>
                <select name="" id={nameNorm.id} onChange={getDataItem}>
                  <option>-</option>
                  {normsitem
                    .filter((a) => a.norms_id === nameNorm.id)
                    .map((a, i) => (
                      <option key={i} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSelector;
