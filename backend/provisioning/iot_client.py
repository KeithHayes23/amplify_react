#!/usr/bin/python3
#
# For RPi IOT local connections
#
#
# THIS WORKS BUT ITS FOR CONNECTING DIRECTLY TO AWS IOT
# Import SDK packages
import AWSIoTPythonSDK.MQTTLib as AWSIoTMQTTClient
import time
import logging
import json

ROOT_CA_PATH = ""
PRIVATE_KEY_PATH = ""
CERTIFICATE_PATH = ""
IOT_ENDPOINT_ATS = ""
IOT_ENDPOINT = ""


# Custom MQTT message callback
def customCallback(client, userdata, message):
    print("Received a new message: ")
    print(message.payload)
    print("from topic: ")
    print(message.topic)
    print("--------------\n\n")

def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("connected OK Returned code=",rc)
    else:
        print("Bad connection Returned code=",rc)

###############
# For certificate based connection
###############
def setupClient():
    try:
        mqtt_client = AWSIoTMQTTClient.AWSIoTMQTTClient("device_one")
        mqtt_client.configureEndpoint(IOT_ENDPOINT_ATS, 8883)
        mqtt_client.configureCredentials(ROOT_CA_PATH, PRIVATE_KEY_PATH, CERTIFICATE_PATH)
        mqtt_client.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
        mqtt_client.configureDrainingFrequency(2)  # Draining: 2 Hz
        mqtt_client.configureConnectDisconnectTimeout(10)  # 10 sec
        mqtt_client.configureMQTTOperationTimeout(5)  # 5 sec
        mqtt_client.connect()
        return mqtt_client

    except Exception as e:
        print("Unexpected error: %s" % e)


def publishTestData(mqtt_client):
    topic = "iot"
    mqtt_client.subscribe(topic, 1, customCallback)
    time.sleep(2)
    # Publish to the same topic in a loop forever
    loopCount = 0
    while True:
        msg = json.dumps({"msg":"testing"})
        mqtt_client.publish(topic, msg , 1)
        loopCount += 1
        time.sleep(1)



mqtt_client = setupClient()

publishTestData(mqtt_client)
