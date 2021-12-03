from flask import *
from flask_cors import CORS, cross_origin
import base64
import requests
import json
import re

from colageImg import opacidadImagenes

UPLOAD_FOLDER = 'static/uploads'
contador = 0

# PATHS
# PathImagOri = r"./MosaicoPython/public/rel"
PathImagOri = r"./static/uploads"
PathImagenesRe = r"./public/Img"
PathImagenAgua = r"./fondo.jpg"

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
   # return '¡Hola Mundo!'
   return render_template('index.html')

@app.route('/img',methods=['POST'])
@cross_origin()
def img():
    global contador
    image_64_decode = base64.decodebytes(request.data) 
    contador += 1
   #  image_result = open('img.jpg', 'wb')
    image_result = open(UPLOAD_FOLDER+'/'+str(contador)+'.jpg', 'wb')
    # image_result = open(UPLOAD_FOLDER+'/'+str(1)+'.jpg', 'wb')
    image_result.write(image_64_decode)
    opacidadImagenes(PathImagOri, PathImagenesRe, PathImagenAgua, contador)
    return "exito"

@app.route('/display')
def display_image():
    return render_template('index2.html')

# RUTA NO ENCONTRADA
@app.errorhandler(404)
def not_found(error = None):
    response = jsonify({
        'message': 'Dato no encontrado :( ' + request.url,
        'status': 404
    })
    response.status_code = 404
    return response

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=1010, debug=True)