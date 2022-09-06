// se coloco un form que mandara el mensaje al administador

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import "./Contact.css";


// se utiliza para inicializar el usuario en EMAILjs
init("user_jDmwI3d9QLBJKrGKJUfUw");

function Contact() {

  // funcion necesaria para el funcionamiento de Emailjs
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_rwgvquj", "template_9v7z345", e.target).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  return (
    <form className="form" onSubmit={sendEmail}>
      <div class="title">
        Contactanos
      </div>
      <label className="text">Name</label>
      <input type="text" class="input" autocomplete="off" name="name" required/>
      <label className="text">Email</label>
      <input type="email" class="input" autocomplete="off" name="email" required/>
      <label className="text">Message</label>
      <textarea name="message" autocomplete="off" class="input" required/>
      <input class="button" type="submit" value="Send Message" />
      <div className="div">
        <span class="span">+502 ####-####</span>
        <span class="span">contact@educasmart.com</span>
      </div>
    </form>
  );
}

export default Contact;
