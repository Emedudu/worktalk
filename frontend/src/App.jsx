import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./_screens/HomeScreen.jsx";
import Login from "./_screens/Login";
import Register from "./_screens/Register";
import MessageScreen from "./_screens/MessageScreen";
import ChatRoom from "./_screens/ChatRoom";
import Organization from "./_screens/Organization";
import Navigation from "./_components/atoms/Navigation";
import SideBar from "./_components/molecules/SideBar";
import InfoPopup from "./_components/atoms/InfoPopup";
import { getState } from "./_requests";
import { createContext } from "react";

export const IsSignedInContext = createContext([false, () => {}]);
export const NotificationContext = createContext([[], () => {}]);
export const SideBarContext = createContext([false, () => {}]);
// Refactor whole app with bootstrap
export const App = () => {
  const [isSignedIn, setIsSignedIn] = [
    sessionStorage.getItem("isSignedIn"),
    (key, value) => sessionStorage.setItem(key, value),
  ];
  const [notification, setNotification] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {});
  const popupFadeout = () => {
    setNotification(notification.filter((info) => info != notification[0]));
  };
  notification.length &&
    setTimeout(popupFadeout, notification[0].length * 1000);

  return (
    <IsSignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
      <NotificationContext.Provider value={[notification, setNotification]}>
        <SideBarContext.Provider value={[sideBar, setSideBar]}>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route
                path="/home"
                exact
                element={
                  <HomeScreen
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                }
              />
              <Route path="/messages" exact element={<MessageScreen />} />
              <Route path={`/organization`} exact element={<Organization />} />
              <Route path="/chatRoom" exact element={<ChatRoom />} />
            </Routes>
            {isSignedIn && sideBar && <SideBar />}
            {notification.length && <InfoPopup />}
          </div>
        </SideBarContext.Provider>
      </NotificationContext.Provider>
    </IsSignedInContext.Provider>
  );
};
