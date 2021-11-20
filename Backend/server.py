from flask import Flask, flash, request, redirect, url_for
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        print(file)
        try:
            return { 'peko' : easyOCRDetection(applyContours(file))} 
        except Exception as e:
            print(e)
        

if __name__ == '__main__':
    app.run()

    import flask
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request
from flask_cors import CORS, cross_origin
from tensorflow import keras
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

def translate(x):
    return {
        1: 'This papaya is medium!',
        2: 'This papaya is ripe!',
        3: 'This papaya is unripe!',
        4: 'error'
    }.get(x, 4)

@app.route('/api', methods=['GET'])
@cross_origin()
def test():
    return {'test' : 'success'}


# A route to return all of the available entries in our catalog.
@app.route('/api/predict', methods=['POST'])
@cross_origin()
def upload_file():
    # data = request.files['file'].stream.read()
    data = request.files['file']
    data.save('C:\Users\KITIKUNPINYOPORN\Desktop\ReactAI\ReactAI\Backend\Image\papaya.png')
    result = predict()
    return {'payload' : result}


def predict():
    model = tf.keras.models.load_model('C:\Users\KITIKUNPINYOPORN\Desktop\ReactAI\DomeModelpapaya.h5')
    result = []
    img = cv2.imread('./static/papaya.png')
    img = cv2.resize(img,(128,128))
    img = img / 255.
    img= img.reshape(128,128,3)
    result.append(img)
    result = np.array(result)
    classes = model.predict(result)
    # print(classes)
    classes = np.array(classes)
    status = ''
    if (np.argmax(classes)==1):
      status = 'This papaya is medium'
    elif (np.argmax(classes)==2):
      status = 'This papaya is ripe'
    else:
      status = 'This papaya is unripe'
    return { 'status': status }
app.run()