import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import ActionButton from "../components/ActionButton";

import logo from "../assets/img/logo.png";
import headers from "../config/headers";
import api from "../config/api";

//Redux
import { connect } from "react-redux";

const Login = (props) => {
  const { user } = props;

  const [typedUser, setTypedUser] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const login = async () => {
    try {
      if (typedUser !== "" && typedPassword !== "") {
        var req = {
          headers,
          body: JSON.stringify({
            typedUser,
            typedPassword,
          }),
          method: "POST",
        };

        const data = await fetch(`${api.host}/login`, req);
        const res = await data.json();
        if (res.error === null) {
          setLoading(true);
          localStorage.setItem("token", res.token);
          navigate(`/asdas`);
        } else {
          setLoading(true);
          setMessage(res.error);
          setDanger(!danger);
        }
      } else {
        setLoading(true);
        setMessage("Datos de inicio incompletos");
        setDanger(!danger);
      }
    } catch (error) {
      console.log(error);
      setMessage("Error de conexión, intenta de nuevo");
      setDanger(!danger);
      setLoading(true);
    }
  };

  return !user.name ? (
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
                  onChange={(e) => setTypedUser(e.target.value)}
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
                  onChange={(e) => setTypedPassword(e.target.value)}
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
                onClick={() => {
                  setLoading(!loading);
                  login();
                }}
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
  };
};

export default connect(mapState, null)(Login);
