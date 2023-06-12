import asyncio
import websockets
import json
import cv2 as cv
import time
import base64

FPS = 30

cam_port = 0
cam = cv.VideoCapture(cam_port)

cam.set(cv.CAP_PROP_FRAME_WIDTH, 1280)
cam.set(cv.CAP_PROP_FRAME_HEIGHT, 720)


def get_jpg_as_b64():
    ret, frame = cam.read()
    ret, buffer = cv.imencode('.jpg', frame)
    jpg_as_text = base64.b64encode(buffer).decode('utf-8')
    js = json.dumps({"type": "DISPLAY_MESSAGE", "data": {"image": jpg_as_text}})
    return js


clients_list = []


async def send_msg(websocket):
    while True:
        # try:
            t1 = time.time()
            await websocket.send(get_jpg_as_b64())
            t2 = time.time()
            t = t2 - t1
            await asyncio.sleep(1 / FPS - t)
        # except Exception as e:
        #     print(e)


async def server(websocket, path):
    print("Client connected")
    send_task = None
    try:
        send_task = asyncio.create_task(send_msg(websocket))
        async for message in websocket:
            print(f"Received message: {message}")
    finally:
        if send_task is not None:
            send_task.cancel()


print("SERVER STARTED>?")
start_server = websockets.serve(server, "0.0.0.0", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
