// GENERAR EMAIL
import nodemailer from 'nodemailer';
import {persona} from '../../models/personaModel.js';
import bcryptjs from 'bcryptjs'

function generarcodigo() {
    let codigo = "";
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const caracteresLength = caracteres.length;
    const longitud = 6; // Longitud deseada para el código generado

    for (let i = 0; i < longitud; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    console.log(codigo);
    return codigo
}

export const recuperar = async (req, res) => {
    
        
        const { email } = req.body
        const codigo_aleatorio = generarcodigo(6);

        // REALIZAR UNA CONSULTA PARA VERIFICAR QUE EL USUARIO SI ESTE REGISTRADO
        // Y REALIZAR UNA CONDICION EN EL CASO DE QUE EXISTA ENVIA EL CORREO
        // SI NO SE LE INFORMA QUE EL EMAIL NO EXISTE

        const transporter = nodemailer.createTransport({
            service: "gmail",
            // PRODUCCION
            // secure: true,
            auth: {
                user: 'sintapujos2023sena@gmail.com', // Cambia esto por tu dirección de correo electrónico desde donde se envia el manseje
                pass: 'ybpltbvlqbylngtx', // Cambia esto por el codigo generado por la cuenta
            },
            // DESARROLLO
            // tls: {
            //     rejectUnauthorized: false // Agrega esta opción para permitir certificados autofirmados en desarrollo
            // }
        });

        //verificacion
        const verificarCorreo = req.body.email
        const verificacion = await persona.findOne({
            where: {email: verificarCorreo}
        });



        const mensaje = {
            from: 'sintapujos2023sena@gmail.com',
            to: email, // Email del destinatario obtenido desde la solicitud
            subject: 'Código de recuperación de contraseña',
            text: `Tu código de recuperación de contraseña es: ${codigo_aleatorio}`,
            html: `<head>
            <title>Recuperación de Contraseña</title>
        </head>
        <body>
    
        <center>
        
        <a href="https://imgur.com/UZ8g03H"><img src="https://i.imgur.com/UZ8g03H.png"style="center" width="200px" alt="Imagen adjunta" /></a>
        
            <h2>Recuperación de contraseña</h2>
            <p>Hola <strong> ${verificacion.nombre +" " + verificacion.apellido}</strong> ,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Ingresa el siguiente código para restablecer la contraseña:</p>
             <h1><strong>${codigo_aleatorio}</strong></h1></center>
             <i><p> Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
            <p>Gracias,</p>
            <p>Equipo Sintapujos CTPI</p></i> 
        </body>`,
        //<img src="https://imgur.com/UZ8g03H" style="center" width="150px" alt="Imagen adjunta"> 
     
        // attachments:[
        //         {
        //             filename: 'logo.png',
        //             path: './public/images/logo.png',
        //             cid: 'logo',
        //         }
        // ]
        };
        transporter.sendMail(mensaje, async (error, info) => {
            if (verificacion) {
                //guardar el codigo en la base de datos
                const codigo = await persona.findByPk(verificacion.id_persona)
                codigo.codigoRecuperar = codigo_aleatorio,
                await codigo.save();

                res.status(200).json({
                    message: 'Correo de recuperacion enviado exitosamente', codigo_aleatorio
                })

            } else {
                console.log('Error al enviar el correo:', error);
                res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
            }
        });
};





export const ActualizarContrasena = async (req, res) => {
    try {
      const { email } = req.params;
      const { codigoRecuperar, contrasena } = req.body;
  
      // Buscar el usuario por su correo electrónico
      const user = await persona.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'No se encontró el usuario' });
      }
  
      const id = user.id_persona;
  
      // Verificar si el código de recuperación coincide
      if (codigoRecuperar !== user.codigoRecuperar) {
        return res.status(400).json({ message: 'Código de recuperación inválido' });
      }
  
      // Hash de la nueva contraseña
      const passHash = await bcryptjs.hash(contrasena, 8);
  
      // Actualizar la contraseña y guardar el usuario
      user.codigoRecuperar = codigoRecuperar;
      user.contrasena = passHash;
      await user.save();
  
      res.status(200).json({ message: 'Se ha actualizado tu contraseña correctamente', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  

