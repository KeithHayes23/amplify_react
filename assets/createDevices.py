from __future__ import print_function # Python 2/3 compatibility
import os
import boto3
import json
import decimal
from random import randint
import uuid
import namegenerator
from faker import Faker
import datetime

NUM_DEVICES=100

#########################
# DO NOT EDIT BELOW HERE
#########################
DYNAMODB=os.environ["DYNAMODB_TABLE"]

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if abs(o) % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def lambda_handler(event, context):
    try:
        # this will create dynamodb resource object and
        # here dynamodb is resource name
        client = boto3.resource('dynamodb')

        # this will search for dynamoDB table
        # your table name may be different
        if(DYNAMODB == ''):
            print('You need to set the DYNAMODB_TABLE environment variable to continue.')
            exit(0);

        table = client.Table(DYNAMODB)
        print(table.table_status)
        i = 0
        #serialNumber: '',
        #group: '',
        #deviceId: '',
        #name: '',
        #activationCode: '',
        #activated: '',
        #type: '',
        #endpoint: ''

        fake = Faker()
        while i < NUM_DEVICES:
            i += 1
            id = str(uuid.uuid4())
            name = namegenerator.gen()
            group = fake.country()
            deviceId = randint(10000, 100000)
            serialNumber = randint(10000, 100000)
            createdAt = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
            updatedAt = createdAt
            type = 'Default'
            activated = 'On'
            location = [47, -122]
            response = table.put_item(Item= {
                'id':id,
                'name':name,
                'group':group,
                'deviceId':deviceId,
                'serialNumber':serialNumber,
                'createdAt':createdAt,
                'updatedAt':updatedAt,
                'activated':activated,
                'type':type
            })
            print(json.dumps(response, indent=4, cls=DecimalEncoder))
    except Exception as e:
        print("Unexpected error: %s" % e)


lambda_handler('','')
