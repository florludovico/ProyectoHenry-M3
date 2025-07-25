import { registerFormValidates } from "../../helpers/validates";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate} from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useContext(UsersContext);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: registerFormValidates,

    onSubmit: (values) => {

      registerUser(values)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: `¡Registro exitoso!`,
              text: res.data.message || "Tu cuenta fue creada exitosamente.",
            });
            formik.resetForm();
          } 
            navigate("/");
        })
        .catch((err) => {
          
          if (err.response.data.data.includes("email")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el email: ${formik.values.email}`,
              text: "Intentelo nuevamente",
            });
          } else if (err.response.data.data.includes("username")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el username: ${formik.values.username}`,
              text: "Intentelo nuevamente",
            });
          } else if (err.response.data.data.includes("nDni")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el numero de DNI : ${formik.values.nDni}`,
              text: "Intentelo nuevamente",
            });
          }
        });
    },
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Formulario de Registro</h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Nombre:</label>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Tu nombre"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label className={styles.errorLabel}>
          {formik.errors.name ? formik.errors.name : ""}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email:</label>
        <input
          className={styles.formInput}
          type="text"
          name="email"
          placeholder="mail@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label className={styles.errorLabel}>
          {formik.errors.email ? formik.errors.email : ""}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Fecha de nacimiento:</label>
        <input
          className={styles.formInput}
          type="date"
          name="birthdate"
          onChange={formik.handleChange}
          value={formik.values.birthdate}
        />
        <label className={styles.errorLabel}>
          {formik.errors.birthdate ? formik.errors.birthdate : ""}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>nDni:</label>
        <input
          className={styles.formInput}
          type="text"
          name="nDni"
          onChange={formik.handleChange}
          value={formik.values.nDni}
        />
        <label className={styles.errorLabel}>
          {formik.errors.nDni ? formik.errors.nDni : ""}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Username:</label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Tu nombre de usuario"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label className={styles.errorLabel}>
          {formik.errors.username ? formik.errors.username : ""}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password:</label>
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.formInput}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="*****"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            type="button"
            className={styles.togglePasswordButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <label className={styles.errorLabel}>
          {formik.errors.password ? formik.errors.password : ""}
        </label>
      </div>

      <button
        className={styles.formButton}
        type="submit"
        disabled={
          formik.errors.name ||
          formik.errors.email ||
          formik.errors.birthdate ||
          formik.errors.nDni ||
          formik.errors.username ||
          formik.errors.password
        }
      >
        Submit
      </button>
      <br />
      <label>
        ¿Ya tienes una cuenta? <Link to={"/login"}> Login </Link>
      </label>
    </form>
  );
};

export default Register;
