import cv2
import numpy as np
import imutils

protopath = "MobileNetSSD_deploy.prototxt"
modelpath = "MobileNetSSD_deploy.caffemodel"

detector = cv2.dnn.readNetFromCaffe(prototxt=protopath, caffeModel=modelpath)

CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]


def detect_car(file_path):
    image = cv2.imread(file_path)
    image = imutils.resize(image, width=600)

    (H, W) = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 0.007843, (W, H), 127.5)

    detector.setInput(blob)
    car_detections = detector.forward()

    num_car = 0

    for i in np.arange(0, car_detections.shape[2]):
        confidence = car_detections[0, 0, i, 2]
        if confidence > 0.5:
            idx = int(car_detections[0, 0, i, 1])

            if CLASSES[idx] != "car":
                continue

            person_box = car_detections[0, 0, i, 3:7] * np.array([W, H, W, H])
            (startX, startY, endX, endY) = person_box.astype("int")

            cv2.rectangle(image, (startX, startY), (endX, endY), (0, 0, 255), 2)

            num_car += 1

    text = "Number of car: {:}".format(num_car)

    cv2.putText(image, text, (5, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 0, 255), 1)
    cv2.imshow("Results", image)

    print("Number of car:", num_car)

    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return num_car
