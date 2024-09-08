import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Home from "./components/Home/Home";
import Lists from "./components/List/Lists";
import NormsContainer from "./components/norms/Norm";
// import CreateNorm from './components/createNorms/CreateNorm';
import Users from "./components/users/Users";
import Loader from './components/Loader/Loader';
import { featchNorms, featchNormsItem } from "./redux/norms";
import { featchUsers } from "./redux/users";
import UchetList from "./components/UchetList/UchetList";
import UchetListUser from "./components/UchetList/UchetListUser";
import ListFromBrigade from "./components/List/ListFromBrigade";
import CreateNorm from "./components/createNorms/CreateNorm";
import Cal from "./components/Cal.jsx";
import Calendar from "./components/Cal.jsx";


export const AppContainer = () => {



  return (
    <>
    <BrowserRouter basename="vite-project">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<UchetList/>} />
        <Route path="/listsBrigade" element={<ListFromBrigade/>} />
        <Route path="/listUser" element={<UchetListUser/>} />
        <Route path="/report" element={<Lists />} />
        <Route path="/report/:id" element={<ListFromBrigade />} />
        <Route path="/cal" element={<Calendar />} />
        <Route path="/norms" element={<NormsContainer />} />
        <Route path="/norms/:id" element={<CreateNorm/>}/>

        {/* <Route path="/createNorm" element={<CreateNorm />} /> */}
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}


function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { norms } = useSelector((state) => state.norms);

  const isNormsLoading = norms.nameNorms.status === "loaded";
  const isNormsItemsLoading = norms.normsitem.status === "loaded";
  const isUsersLoader = users.usersData.status === "loaded";

  React.useEffect(() => {
    dispatch(featchNorms());
    dispatch(featchNormsItem());
    dispatch(featchUsers())
  }, []);

  return (
    <>
          {isNormsLoading && isNormsItemsLoading && isUsersLoader ? (
        <AppContainer/>

      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
