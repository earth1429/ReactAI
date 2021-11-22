from flask import Flask, flash, request, redirect, url_for
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image
from werkzeug.wrappers import response
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import ImmutableMultiDict
from PIL import Image
import os


os.environ['KMP_DUPLICATE_LIB_OK']='True'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

model_path ="DomeModelpapaya.h5"


app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'


def translate(x):
    return {
        0: "It's Medium",
        1: "It's Ripe",
        2: "It's unripe",
        3: 'error'
    }.get(x, 3)

@app.route('/test', methods=['GET'])
def test():
    return {'test' : 'success'}


# A route to return all of the available entries in our catalog.


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    data = request.files['image']
    data.save('./Image/papaya.png')
    print(request.files['image'])
    
 #   result = predict()
    return {'payload' : '0'}

@app.route('/predict', methods=['GET'])
@cross_origin()
def predict():
    model = tf.keras.models.load_model(model_path)
    img = image.load_img('./Image/papaya.png', target_size=(128, 128, 3))
    x = image.img_to_array(img) / 255.0
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    classes = model.predict(images)
    score = tf.nn.softmax(classes[0])
    print("Status: ", translate(np.argmax(classes[0])))
    print("Confident Level: ", np.max(classes[0])*100)
    
    return {"Status": translate(np.argmax(classes[0])),"ConfidentLevel": np.max(classes[0])*100}

if __name__ == '__main__':
    app.run(debug=True)
    