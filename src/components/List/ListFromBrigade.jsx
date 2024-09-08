import React, { createContext } from "react";
import "./Lists.css";
import {NavLink, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUchet, PostUchet } from "../../redux/uchet";
import Loader from "./../Loader/Loader";
import { useForm } from "react-hook-form";
import ListSelector from "./list-item/ListSelector";
import { DeleteUchet } from "../../redux/uchet";
import Calendar from "../Cal.jsx";

export const UuserItemUchet = (props) => {
  const dispatch = useDispatch();

  const DelUchet = (e) => {
    const name = confirm("Подтвердите удаление");
    const id = e.target.id;
    if (name) {
      dispatch(DeleteUchet(id));
      alert("Запись удалена");
    }
  };

  const copiFile = (e) => {
    const id = e.target.id;
    props.fun(id);
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.data.name}</td>
      <td>{props.data.rang}</td>
      <td>{props.data.hour}</td>
      <td>{props.data.cutur}</td>
      <td>{props.data.work}</td>
      <td>{props.data.ism}</td>
      <td>{props.data.norm}</td>
      <td>{props.data.rasrad}</td>
      <td>{props.data.edwork}</td>
      <td>{props.data.paln}</td>
      <td>{props.data.kach}</td>
      <td>{props.data.vred}</td>
      <td>{props.data.iswick}</td>
      <td>{props.data.obem}</td>
      <td>
        <a className="button-control" id={props.data.id} onClick={DelUchet}>
          X
        </a>
        </td>
        <td>
        <a className="button-control" onClick={copiFile} id={props.data.id}>
          &#128205;
        </a>
      </td>
    </tr>
  );
};

export const ListContainer = (props) => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const sendRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [listData, setListData] = React.useState({});

  const data = props.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const OpenListSelectr = () => {
    setIsOpen(true);
  };

  const CloseListSelectr = () => {
    setIsOpen(false);
  };

  const getData = (data) => {
    setListData((prevState) => {
      const newState = { ...prevState, ...data };
      setValue("work", newState.work);
      setValue("ism", newState.items);
      setValue("norm", Number(newState.normname));
      setValue("rasrad", Number(newState.discharge));
      setValue("edwork", Number(newState.payment));
      setValue("paln", Number(newState.surcharge1));
      setValue("kach", Number(newState.surcharge2));
      setValue("vred", Number(newState.surcharge3) || 0);
      return newState;
    });
    CloseListSelectr();
  };

  const onSubmit = (data) => {
    const date = new Date();
    let resData = {
      ...data,
      hour: Number(data.hour),
      obem: Number(data.obem),
      date: date.toLocaleDateString(),
      // edwork: data.iswick == "да" ? data.edwork * 2 : data.edwork,
      // paln: data.iswick == "да" ? data.paln * 2 : data.paln,
      // kach: data.iswick == "да" ? data.kach * 2 : data.kach,
      // vred: data.iswick == "да" ? data.vred * 2 : data.vred,
      brigade_id: props.brig_id
    };

    dispatch(PostUchet(resData));
  };

  const handleItemSelect = (id) => {
    const [res] = data.filter(a => a.id == id) 
    console.log(res)
      // setValue("name", res.name);
      setValue("rang", res.rang);
      setValue("hour", res.hour);
      setValue("cutur", res.cutur);
      setValue("work", res.work);
      setValue("ism", res.ism);
      setValue("norm", res.norm);
      setValue("rasrad", res.rasrad);
      setValue("edwork", res.edwork);
      setValue("paln", res.paln);
      setValue("kach", res.kach);
      setValue("vred", res.vred);
      setValue("iswick", res.iswick);
      setValue("obem", res.obem);

  };

  const copi = (m) => {
    console.log(m)
  }

  return (
    <>
      <div className="wrapper">
        <div className="list__container">
          <div className="title__container">
            <h2 className="list__title">Ежедневный отчет</h2>
            <Calendar />
            <div className="norms__button-container">
              <a className="buttons" onClick={() => sendRef.current.click()}>
                Сохранить
              </a>
              <NavLink to="/" className="buttons">
                <p>Назад</p>
              </NavLink>
            </div>
          </div>
          <div className="list__content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table>
                <thead>
                  <tr>
                    <th rowSpan={2}>№</th>
                    <th rowSpan={2} className="td-name">
                      Ф.И.О.
                    </th>
                    <th rowSpan={2}>Должность</th>
                    <th rowSpan={2}>Отраб.часы</th>
                    <th rowSpan={2}>Наименование культуры</th>
                    <th rowSpan={2}>Выполненная работа согласно технологии</th>
                    <th rowSpan={2}>Ед.изм</th>
                    <th rowSpan={2}>Норма Выроботки</th>
                    <th rowSpan={2}>Разряд</th>
                    <th>Основная з/п, руб</th>
                    <th colSpan={3}>Доплата, руб</th>
                    <th rowSpan={2}>Доплата за выходной</th>
                    <th rowSpan={2}>Обьем выполненной работы</th>
                  </tr>
                  <tr>
                    <th>За единицу выполненной работы</th>
                    <th>За выполнение плана</th>
                    <th>За качество</th>
                    <th>За вредность</th>
                  </tr>
                </thead>
  
                <tbody>
                  {data.map((a, i) => (
                    <UuserItemUchet data={a} id={i + 1} key={i} fun={handleItemSelect} />
                  ))}
                  <tr>
                    <td>+</td>
                    <td>
                      <input
                        {...register("name", {
                          required: "-----",
                        })}
                        list="mycoollist"
                      />
                      <datalist id="mycoollist">
                        {users.usersData.items.map((a, i) => (
                          <option key={i} className="list_item-name">
                            {a.name}
                          </option>
                        ))}
                      </datalist>
                      {errors?.name && <div>{errors.name.message}</div>}
                    </td>
                    <td>
                      <input
                        {...register("rang", {
                          required: "-----",
                        })}
                      />
                      {errors?.rang && <div>{errors.rang.message}</div>}
                    </td>
                    <td>
                      <input
                        step="0.01"
                        {...register("hour", {
                          required: "-----",
                        })}
                        type="number"
                      />
                      {errors?.hour && <div>{errors.hour.message}</div>}
                    </td>
                    <td>
                      <input
                        {...register("cutur", {
                          required: "-----",
                        })}
                      />
                      {errors?.cutur && <div>{errors.cutur.message}</div>}
                    </td>
                    <td>
                      <input
                        onClick={OpenListSelectr}
                        {...register("work", {
                          required: "-----",
                        })}
                      />
                      {errors?.work && <div>{errors.work.message}</div>}
                    </td>
                    <td>
                      <input {...register("ism")} disabled />
                    </td>
                    <td>
                      <input {...register("norm")} type="number" disabled />
                    </td>
                    <td>
                      <input {...register("rasrad")} type="number" disabled />
                    </td>
                    <td>
                      <input {...register("edwork")} type="number" disabled />
                    </td>
                    <td>
                      <input {...register("paln")} type="number" disabled />
                    </td>
                    <td>
                      <input {...register("kach")} type="number" disabled />
                    </td>
                    <td>
                      <input {...register("vred")} type="number" disabled />
                    </td>
                    <td>
                      <select {...register("iswick")} type="number">
                        <option value="нет">Нет</option>
                        <option value="да">Да</option>
                      </select>
                    </td>
                    <td>
                      <input
                        {...register("obem", {
                          required: "-----",
                        })}
                        type="number"
                      />
                      {errors?.obem && <div>{errors.obem.message}</div>}
                    </td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table>
              <button ref={sendRef} hidden>
                send
              </button>
            </form>
          </div>
        </div>
      </div>
      {isOpen ? (
        <ListSelector getData={getData} closeList={CloseListSelectr} />
      ) : null}
    </>
  );
  
};

function ListFromBrigade() {
  const currentId = useParams()
  const dispatch = useDispatch();
  const { uchet } = useSelector((state) => state.uchet);
  const isNormsLoading = uchet.uchetData.status === "loaded";

  React.useEffect(() => {
    dispatch(GetUchet(currentId.id));
  }, []);

  return (
    <>
      {isNormsLoading ? (
        <ListContainer brig_id={currentId.id} data={uchet.uchetData.items} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ListFromBrigade;
