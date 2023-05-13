from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import os
import random
from PIL import Image
from .detection_scripts import person_detection_image as detection
# Create your views here.

class ListApiView(APIView):
    
    def post(self, request, plm=None):
        if request.method == 'POST' and request.FILES.get('image'):
            uploaded_image = request.FILES.get('image')

            image = Image.open(uploaded_image)
        #Create file name for the file we are using
            filename = 'uploaded_image{}.jpg'.format(random.randint(0,9999))
            save_path = os.path.join('detection_scripts', filename)
            with open(save_path, 'wb') as f:
                 for chunk in image.chunks():
                    f.write(chunk)

        #call with it
            result = detection.detect_people(filename)
        # Delete file afterwards
            os.remove(save_path)
            return Response({'result': result})
        return Response({'error': 'Invalid request'})
        # file = open('C:\\Git\\The-Public-Plank-Walkers\\recog\\recogapi\\detection_scripts\\people.jpg', 'rb')
        # image = Image.open(file)
        # result = detection.detect_people(image)
        # return Response({"response": result})