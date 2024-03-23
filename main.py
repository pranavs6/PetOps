import cv2
from flask import Flask, Response, request, jsonify
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

app = Flask(__name__)

pump_rate = 100  # litres per hour
pump_gpio = 18
GPIO.setup(pump_gpio, GPIO.OUT)
auger_rate = 10000  # grams per hour
auger_gpio = 22
GPIO.setup(auger_gpio, GPIO.OUT)

def generate_frames():
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

def push(gpio, sec_req):
    GPIO.output(gpio, GPIO.HIGH)
    time.sleep(sec_req)
    GPIO.output(gpio, GPIO.LOW)

@app.route('/video')
def index():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/pump', methods=['POST'])
def pump():
    data = request.get_json()
    print(data)
    if 'value' in data:
        sec_req = int((float(data["value"])* 3600) // 100)
        push(pump_gpio, sec_req)
        return jsonify({'message': f'Pumped {data["value"]} litres in {sec_req} seconds'})
    else:
        return jsonify({'error': 'Invalid input'})

@app.route('/feed', methods=['POST'])
def feed():
    data = request.get_json()
    if "value" in data:
        sec_req = int(float(data["value"]) * auger_rate)
        push(auger_gpio, sec_req)
        return jsonify({'message': f'Pushed {data["value"]} litres in {sec_req} seconds'})
    else:
        return jsonify({'error': 'Invalid input'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
