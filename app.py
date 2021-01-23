import os
from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from pathlib import Path
from keras.preprocessing import image
from keras.preprocessing import image_dataset_from_directory
import numpy as np

app = Flask(__name__)
image_size = (128,128)
images = image_dataset_from_directory(
  Path('dataset'),
  validation_split=0.2,
  subset="training",
  seed=42,
  image_size=(image_size),
  batch_size=32)

class_names = images.class_names

def load_pokemon_model():
    global model
    model = load_model("models/pokemon_trained.h5")

def process_input(data_url):
    pic_url = data_url
    random_name = str(np.random.randint(5**5))

    if "http" in data_url:
        pic_path = tf.keras.utils.get_file(random_name,origin=pic_url)
    else:
        pic_path = Path(data_url).as_posix()

    img = keras.preprocessing.image.load_img(
    pic_path, target_size=(128,128)
    )
    

    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    predict = (f"This image most likely belongs to {class_names[np.argmax(score)]} with a {round(100 * np.max(tf.nn.softmax(predictions[0])),2)} percent confidence.")

    print(predict)
    
    return (predict)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_data = request.form.to_dict()
        print(input_data)
        data = process_input(input_data['url_text'])
        value = data
        return render_template('index.html', predict=value)

    return render_template('index.html')

@app.route('/image', methods=['POST'])
def image2():
    if request.method == 'POST':
        image_url = request.get_data(as_text=True)
        print(image_url)
        data = process_input(image_url)
        value = data
        return jsonify({"prediction":data})

@app.before_first_request
def setup():
    load_model()

if __name__ == "__main__":
    load_pokemon_model()
    app.run(debug=True)