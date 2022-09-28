#!/usr/bin/python
# -*- coding:utf-8 -*-
'''
Ce programme permet de mettre en route le ventilateur branché sur un relais 3V
'''
import time
import RPi.GPIO as GPIO


RELAIS_1_GPIO = 21

if __name__ == '__main__':
    # Definition des GPIO
    GPIO.setmode(GPIO.BCM)  # GPIO Numbers instead of board numbers
    GPIO.setwarnings(False)
    GPIO.setup(RELAIS_1_GPIO, GPIO.OUT)  # GPIO Assign mode

    print( "Arret")
    GPIO.output(RELAIS_1_GPIO, GPIO.LOW)  # off