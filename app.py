from distutils.log import debug
import numpy as np
import pandas as pd
from flask import Flask, render_template, url_for, request, jsonify
import pickle

app = Flask(__name__)

filename_dtc = 'dtc.pkl'
filename_gnb = 'gnb.pkl'
filename_lr = 'lr.pkl'
filename_rf = 'rf.pkl'
filename_svm = 'svm.pkl'
filename_scaler = 'scaler.pkl'
dtc = pickle.load(open(filename_dtc, 'rb'))
gnb = pickle.load(open(filename_gnb, 'rb'))
lr = pickle.load(open(filename_lr, 'rb'))
rf = pickle.load(open(filename_rf, 'rb'))
svm = pickle.load(open(filename_svm, 'rb'))
scaler = pickle.load(open(filename_scaler, 'rb'))

@app.route('/', methods=['GET','POST'])
def init():
    return render_template('index.html')

@app.route('/predict_with_ajax', methods=['POST', 'GET'])
def predict_with_ajax():
  if request.method == "POST":
    qtc_data = request.get_json()
    amount = qtc_data[0].get("amount")
    oldbalanceOrig = qtc_data[0].get('oldbalanceOrig')
    newbalanceOrig = qtc_data[0].get('newbalanceOrig')
    oldbalanceDest = qtc_data[0].get('oldbalanceDest')
    newbalanceDest = qtc_data[0].get('newbalanceDest')
    print(oldbalanceOrig)
    print(newbalanceOrig)
    step = qtc_data[0].get('step')
    predict_val = pd.DataFrame(data = [
        [ float(step),
        float(amount),
        float(newbalanceOrig),
        float(newbalanceDest),
        float(oldbalanceOrig) - (float(amount) + float(newbalanceOrig)),
        float(oldbalanceDest) - (float(newbalanceDest) + float(amount))]
    ], columns = ['step', 'amount','newbalanceOrig','newbalanceDest','originError','destError'])
    print(predict_val)
    predict_val = scaler.transform(predict_val)
    print(predict_val)
    return_value = {
        'dtc': int(dtc.predict(predict_val)[0]),
        'gnb': int(gnb.predict(predict_val)[0]),
        'lr': int(lr.predict(predict_val)[0]),
        'rf': int(rf.predict(predict_val)[0]),
        'svm' : int(svm.predict(predict_val)[0])
    }

    return jsonify(return_value)



if __name__ == "__main__":
    app.run(debug = True)   