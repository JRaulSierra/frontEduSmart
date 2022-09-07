import img from "../../images/usImage.png";
import style from "./Us.module.css";

function Us() {
  return (
    <div className={style.portada}>
      <div className={style.text}>
        <h1>¿QUIENES SOMOS?</h1>{" "}
        <p>
        Somos una empresa preocupada por el futuro de los niños, donde los niños pueden tomar clases o refuerzos para tener un mejor desempeño escolar fomentando el aprendizaje de los niños con diferentes problemas en el aula para retener o entender la información comunicada.{" "}
        </p>
      </div>
      <div>
        <img src={img} alt="imagen representativa a educacion"></img>
      </div>
    </div>
  );
}

export default Us;
