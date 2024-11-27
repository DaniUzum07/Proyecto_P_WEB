from flask import Flask, request, jsonify, render_template, redirect, url_for, send_from_directory, session
import json
import os
import bcrypt

# Configurar Flask con las carpetas adecuadas y una clave secreta para las sesiones
app = Flask(__name__, template_folder='.', static_folder='.')
app.secret_key = 'clave_secreta_segura'  # Cambia esto por una clave secreta única

# Archivo JSON para almacenar usuarios
ARCHIVO_DATOS = "usuarios.json"

# Función para cargar datos de usuarios
def cargar_datos():
    if os.path.exists(ARCHIVO_DATOS):
        try:
            with open(ARCHIVO_DATOS, "r") as archivo:
                return json.load(archivo)
        except json.JSONDecodeError:
            return {}  # Devuelve un diccionario vacío si el JSON está dañado
    return {}

# Función para guardar datos de usuarios
def guardar_datos(datos):
    with open(ARCHIVO_DATOS, "w") as archivo:
        json.dump(datos, archivo, indent=4)
    app.logger.info(f"Datos guardados: {datos}")

# Ruta principal (redirige según la sesión)
@app.route("/")
def index():
    if 'usuario' in session:
        return render_template("index.html", usuario=session['usuario'])  # Redirige al inicio con sesión activa
    return redirect(url_for("login"))

# Ruta para el registro de usuarios
@app.route("/proceso", methods=["POST", "GET"])
def registro():
    if request.method == "POST":
        usuario = request.form.get("usuario")
        correo_electronico = request.form.get("correo_electronico")
        contrasena = request.form.get("contrasena")

        # Validación de datos
        if not usuario or not correo_electronico or not contrasena:
            return render_template("proceso.html", mensaje="⚠️ Todos los campos son obligatorios.")

        usuarios = cargar_datos()

        if usuario in usuarios:
            return render_template("proceso.html", mensaje="⚠️ Este usuario ya está registrado.")

        # Encriptamos la contraseña antes de guardarla
        hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())

        usuarios[usuario] = {
            "correo_electronico": correo_electronico,
            "contrasena": hashed_password.decode('utf-8')  # Guardamos la contraseña como string
        }
        guardar_datos(usuarios)

        # Inicia sesión automáticamente después del registro
        session['usuario'] = usuario
        return redirect(url_for("index"))  # Redirige a la página principal

    return redirect("index.html")

# Ruta para iniciar sesión
@app.route("/insesion", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form.get("usuario")
        contrasena = request.form.get("contrasena")

        # Validación de datos
        if not usuario or not contrasena:
            return render_template("insesion.html", mensaje="⚠️ Todos los campos son obligatorios.")

        usuarios = cargar_datos()

        # Verifica si el usuario existe y la contraseña es válida
        if usuario in usuarios:
            hashed_password = usuarios[usuario]["contrasena"].encode('utf-8')
            if bcrypt.checkpw(contrasena.encode('utf-8'), hashed_password):
                # Guardar el usuario en la sesión
                session['usuario'] = usuario
                return redirect(url_for("index"))  # Redirige a la página principal

        return render_template("insesion.html", mensaje="⚠️ Usuario o contraseña incorrectos.")

    return redirect("index.html")

# Ruta para cerrar sesión
@app.route("/logout")
def logout():
    session.pop('usuario', None)  # Elimina el usuario de la sesión
    return redirect(url_for("login"))

# Ruta para recuperar la contraseña
@app.route("/rec", methods=["POST"])
def recuperar():
    usuario = request.form.get("usuario")
    usuarios = cargar_datos()

    # Verifica si el usuario existe
    if usuario in usuarios:
        contrasena = usuarios[usuario]["contrasena"]
        return jsonify({"mensaje": f"✅ Tu contraseña encriptada es: {contrasena}"}), 200
    return jsonify({"mensaje": "⚠️ El usuario no existe."}), 404

# Ruta para servir archivos adicionales desde la carpeta actual
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# Ruta de prueba
@app.route("/test")
def test():
    return "La ruta de prueba funciona correctamente."

# Ejecutar la aplicación
if __name__ == "__main__":
    # Ejecuta la aplicación en el puerto 5000
    app.run(debug=True, port=5000)
