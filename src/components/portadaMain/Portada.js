import portada from "../../images/background.png"
import star from "../../images/favorite.svg"
import nave from "../../images/shuttle.svg"
import trophy from "../../images/trophy.svg"
import style from "./Portada.module.css"

function Portada() {
    return (
        <div className={style.portada}>
            <div className={style.img}>
                <img src={portada} alt=""/>
            </div>
            <div className={style.container2}>
                <div className={style.text}>
                    <p>¡Formando mentes brillantes para un futuro brillante!</p>
                </div>
                <div>
                    <ul className={style.icons}>
                        <li><img src={star} alt="" className={style.iconColor}/></li>
                        <li><img src={nave} alt="" className={style.iconColor}/></li>
                        <li><img src={trophy} alt="" className={style.iconColor}/></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Portada;