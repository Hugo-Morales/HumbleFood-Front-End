import React, { useRef } from "react";
import ButtonExit from "../../../components/buttonExit/buttonexit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postNewShop,
  getdataUser,
  loading,
  stop,
} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import Styles from "./createShop.module.css";
import Swal from "sweetalert2";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../TiendaPanel/right/Create/firebase";
import withReactContent from "sweetalert2-react-content";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
// import { Search, GpsFixed } from "@mui/icons-material";

// const API_KEY = "AIzaSyBMqxvRm89nRHAdTPVmNyS_Q0BeNCEGbXU";
// const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

// function loadAsyncScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     Object.assign(script, {
//       type: "text/javascript",
//       async: true,
//       src,
//     });
//     script.addEventListener("load", () => resolve(script));
//     document.head.appendChild(script);
//   });
// }

// const extractAddress = (place) => {
//   const address = {
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     plain() {
//       const city = this.city ? this.city + ", " : "";
//       const zip = this.zip ? this.zip + ", " : "";
//       const state = this.state ? this.state + ", " : "";
//       return city + zip + state + this.country;
//     },
//   };

//   if (!Array.isArray(place?.address_components)) {
//     return address;
//   }

//   place.address_components.forEach((component) => {
//     const types = component.types;
//     const value = component.long_name;

//     if (types.includes("locality")) {
//       address.city = value;
//     }

//     if (types.includes("administrative_area_level_2")) {
//       address.state = value;
//     }

//     if (types.includes("postal_code")) {
//       address.zip = value;
//     }

//     if (types.includes("country")) {
//       address.country = value;
//     }
//   });

//   return address;
// };

const CreateShop = ({ user }) => {
  //   const searchInput = useRef(null);
  //   const [address, setAddress] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cargando = useSelector((state) => state.isLoading);
  const MySwal = withReactContent(Swal);

  //   console.log(directionShop);
  //   const initMapScript = () => {
  //     // if script already loaded
  //     if (window.google) {
  //       return Promise.resolve();
  //     }
  //     const src = `${mapApiJs}?key=${API_KEY}&libraries=places&v=weekly`;
  //     return loadAsyncScript(src);
  //   };

  //   console.log("API", API_KEY);

  //   const onChangeAddress = (autocomplete) => {
  //     const place = autocomplete.getPlace();
  //     setAddress(extractAddress(place));
  //   };

  //   const initAutocomplete = () => {
  //     if (!searchInput.current) return;

  //     const autocomplete = new window.google.maps.places.Autocomplete(
  //       searchInput.current
  //     );
  //     autocomplete.setFields(["address_component", "geometry"]);
  // 	autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  //   };

  //   useEffect(() => {
  //     initMapScript().then(() => initAutocomplete());
  //   }, []);

  useEffect(() => {
    dispatch(loading());
    dispatch(getdataUser(user?.sub.split("|")[1]));
    dispatch(stop());
  }, [dispatch, user]);

  // console.log(dataUser);
  const [nameI, setNameI] = useState("");
  const [progress, setProgress] = useState(0);
  const [newShop, setNewShop] = useState({
    name: "",
    direction: "",
    description: "",
    image: "",
    userId: user?.sub.split("|")[1],
    email: "",
  });

  const handleInputChange = (e) => {
    setNewShop({
      ...newShop,
      [e.target.name]: e.target.value,
    });
  };

  const handleformSubmit = (e) => {
    e.preventDefault();
    // dispatch(postNewShop(newShop));
    // alert("Tienda registrada con exito!");
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Tu tienda ha sido registrada con exito",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate(`/settings/${user?.sub.split("|")[1]}`);
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `shops/${file.name}`);
    setNameI(file.name);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewShop({
            ...newShop,
            image: downloadURL,
          });
        });
      }
    );
  };

  const modal = (e) => {
    e.preventDefault();
    Swal.fire({
      imageUrl: newShop.image,
      imageAlt: "A tall image",
    });
  };

  const deleteImagen = (e) => {
    e.preventDefault();
    const desertRef = ref(storage, `files/${nameI}`);

    deleteObject(desertRef)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: `Se quito la imagen.`,
        }).then((r) => {
          if (r.isConfirmed) {
            setNameI("");
            setProgress(0);
            setNewShop({
              ...newShop,
              image: "",
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: `Hubo un error.`,
        });
      });
  };

  return (
    <>
      {cargando ? (
        <Loading />
      ) : (
        <div className={`${"h-screen"} ${Styles.bg}`}>
          <div className={` ${"md:grid md:grid-cols-3 md:gap-6"}`}>
            <div className="h-fit  pt-3 pr-1 rounded-md pb-3 pl-3 mt-4 bg-orange-300 md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg  leading-6 text-gray-900 font-bold">
                  Conviertete en Vendedor!
                </h3>
                <p className="mt-1 text-sm text-white-700 font-bold">
                  Registra tu tienda y se parte la comunidad de vendedores de
                  Humblefood.
                </p>
              </div>
            </div>
            <div className="my-5 md:mt-4 md:col-span2">
              <form onSubmit={(e) => handleformSubmit(e)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-gray-200 space-y-6 sm:p-6">
                    {/* Nombre de la tienda */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="font-bold block text-sm  text-gray-700">
                          {" "}
                          Nombre de la tienda:{" "}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Ej: Panaderia Rosalba"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Direccion */}

                    <div className="mt-5 flex flex-col justify-around font-bold">
                      <p> Verificar direccion con google maps: </p>
                      <Link to="/createShop/map">
                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-map-2"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#00b341"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="18" y2="6.01" />
                            <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                            <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                            <line x1="9" y1="4" x2="9" y2="17" />
                            <line x1="15" y1="15" x2="15" y2="20" />
                          </svg>
                        </button>
                      </Link>
                      {/* <div>
                        <div className={Styles.search}>
                          <span>
                            <Search />
                          </span>
                          <input
                            ref={searchInput}
                            type="text"
                            placeholder="Search location...."
                          />
                          <button>
                            <GpsFixed />
                          </button>
                        </div>

                        <div className="address">
                          <p>
                            Cuidad: <span>{address.city}</span>
                          </p>
                          <p>
                            Provincia: <span>{address.state}</span>
                          </p>
                          <p>
                            Zip: <span>{address.zip}</span>
                          </p>
                          <p>
                            País: <span>{address.country}</span>
                          </p>
                        </div>
                      </div> */}
                    </div>
                    {/* Descripcion */}
                    <div>
                      <label className="font-bold block text-sm  text-gray-700">
                        Descripcion de la tienda:{" "}
                      </label>
                      <div className="mt-1">
                        <textarea
                          onChange={(e) => handleInputChange(e)}
                          name="description"
                          rows="3"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none"
                          placeholder="Ej: Panadaria y pasteleria con mas de 20 años de experiencia en el mercado..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Correo asociado al paypal*/}
                    <div className="col-span-3 sm:col-span-2">
                      <label className="font-bold block text-sm  text-gray-700">
                        {" "}
                        Correo de la tienda Asociado a Paypal:{" "}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={(e) => handleInputChange(e)}
                          type="email"
                          name="email"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="Ej: tienda123@gmail.com"
                        />
                      </div>
                    </div>
                    {/* Imagen */}
                    {newShop.image === "" ? (
                      <>
                        <div className="col-span-6 sm:col-span-6">
                          <div className="flex flex-col">
                            <label className="font-bold">Imagen</label>
                            <label className="text-red-500 font-bold">
                              (Nota: Sólo podés subir una imagen.)
                            </label>
                            <input
                              type="file"
                              className="w-full"
                              onChange={(e) => handleImagen(e)}
                            />
                            {progress !== 0 ? (
                              <h2>Subiendo archivo {progress}%</h2>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <label className="font-bold mb-2">Imagen</label>
                        <div className="flex justify-center">
                          <img
                            src={newShop.image}
                            alt="product"
                            className="h-10 w-10 rounded-lg cursor-pointer"
                            onClick={(e) => modal(e)}
                          />
                          <button onClick={(e) => deleteImagen(e)}>
                            <MdDelete className="ml-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between px-4 py-1.5 bg-gray-200 text-right sm:px-6">
                    <ButtonExit
                      text="Volver al panel de usuario"
                      ruta={`/settings/${user?.sub.split("|")[1]}`}
                      className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                    />
                    <button
                      type="submit"
                      className="mt-4 bg-red-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Registrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateShop;
