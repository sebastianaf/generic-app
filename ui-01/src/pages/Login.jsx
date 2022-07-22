import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import ActionButton from "../components/ActionButton";
import errorCodes from "../config/errorCodes";

import logo from "../assets/img/logo.png";
import headers from "../config/headers";
import api from "../config/api";

//Redux
import { connect } from "react-redux";
import { setModalOpen, setModalOptions, setLoading, setUser } from "../actions";
import { useEffect } from "react";

const Login = (props) => {
  const { user, loading, setUser } = props;

  //Modal props
  const { modalOptions, modalOpen, setModalOpen, setModalOptions, setLoading } =
    props;

  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setUser({ ...user, none: true });
  }, []);

  /**
   * 1. Check if the fields are empty
   * 2. If the fields aren't empty fetch the token
   * 3. If the API response is OK then navigate to dashboart
   */
  const login = async () => {
    try {
      if (alias !== "" && password !== "") {
        const req = {
          headers,
          body: JSON.stringify({
            alias,
            password,
          }),
          method: "POST",
        };
        setLoading(true);
        const data = await fetch(`${api.host}/api/users/login`, req);
        const res = await data.json();
        if (!res.output) {
          setLoading(false);
          localStorage.setItem("token", res.token);
          setUser({ name: res.name, role: "role" });
          navigate(`/dashboart`);
        } else {
          const { data } = res;
          setModalOptions({
            title: data.title,
            description: data.description,
            error: true,
          });
          setModalOpen(!modalOpen);
        }
      } else {
        setLoading(true);
        setModalOptions({
          title: errorCodes.INCOMPLETE_USER_OR_PASSWORD.title,
          description: errorCodes.INCOMPLETE_USER_OR_PASSWORD.description,
          error: true,
        });
        setModalOpen(!modalOpen);
      }
    } catch (error) {
      setLoading(true);
      setModalOptions({
        title: errorCodes.CONECTION_ERROR.title,
        description: errorCodes.CONECTION_ERROR.description,
        error: true,
      });
      setModalOpen(!modalOpen);
      console.log(error);
    }
  };

  return !user ? (
    <div className={`flex items-center justify-center min-h-screen`}>
      <div
        className={`min-h-full max-w-lg mx-4 grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-200 border rounded-lg  shadow-md`}
      >
        <div className={`max-w-md w-full space-y-8`}>
          <div>
            <img
              className={`mx-auto h-32 w-auto cursor-pointer`}
              src={logo}
              alt={`logo`}
            />
            <h2 className={`mt-6 text-center text-3xl font-bold text-gray-900`}>
              Iniciar sesión
            </h2>
            <p className={`mt-2 text-center text-sm text-slate-600`}>
              o también{" "}
              <Link
                to={`#`}
                className={`font-medium text-cyan-600 hover:text-cyan-500`}
              >
                Registratre
              </Link>
            </p>
          </div>
          <form className={`mt-8 space-y-6`} action={`#`} method={`POST`}>
            <input type={`hidden`} name={`remember`} defaultValue={`true`} />
            <div className={`rounded-md shadow-sm -space-y-px`}>
              <div>
                <label htmlFor={`user`} className={`sr-only`}>
                  Usuario
                </label>
                <input
                  id={`user`}
                  name={`user`}
                  type={`user`}
                  autoComplete={`user`}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm`}
                  placeholder={`Usuario`}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor={`password`} className={`sr-only`}>
                  Contraseña
                </label>
                <input
                  id={`password`}
                  name={`password`}
                  type={`password`}
                  autoComplete={`current-password`}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm`}
                  placeholder={`Contraseña`}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center`}>
                <input
                  id={`remember-me`}
                  name={`remember-me`}
                  type={`checkbox`}
                  className={`h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded`}
                />
                <label
                  htmlFor={`remember-me`}
                  className={`ml-2 block text-sm text-gray-900`}
                >
                  Recuerdame
                </label>
              </div>

              <div className={`text-sm`}>
                <Link
                  to={`#`}
                  className={`font-medium text-cyan-600 hover:text-cyan-500`}
                >
                  Olvidaste la contraseña?
                </Link>
              </div>
            </div>

            <div>
              <ActionButton
                onClick={login}
                loading={loading}
                data={{ title: `Iniciar` }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={`/dashboart`} />
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    //Modal props
    modalOpen: state.modalOpen,
    modalOptions: state.modalOpen,
    loading: state.loading,
  };
};

const mapProps = {
  setModalOpen,
  setModalOptions,
  setLoading,
  setUser,
};

export default connect(mapState, mapProps)(Login);
