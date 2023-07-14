import tensorflow as tf
from keras.models import load_model
from keras.applications.vgg16 import preprocess_input
import numpy as np

def model_build(name):
    
    
    model=load_model('chest_xray.h5')
    #xray_img
    img=tf.keras.utils.load_img(f'static/{name}.jpg',target_size=(224,224))
        
    x=tf.keras.utils.img_to_array(img)
    x=np.expand_dims(x, axis=0)
    img_data=preprocess_input(x)
    classes=model.predict(img_data)

    result=int(classes[0][0])

    return result