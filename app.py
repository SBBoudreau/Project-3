import os
from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model

app = Flask(__name__)

def load_model():
    global model
    model = load_model("/models/pokemon_trained.h5")

def process_input(data_url):
    pic_url = data_url
    pic_path = tf.keras.utils.get_file("loaded_image",origin=pic_url)
    img = keras.preprocessing.image.load_img(
        pic_path, target_size=(128,128)
    )

    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    return (predictions,score)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_data = request.form.to_dict()
        data = process_input(input_data)
        value = model.predict(data)
        return render_template('index.html', result=value)

    return render_template('index.html')

if __name__ == "__main__":
    load_model()
    app.run(debug=True)