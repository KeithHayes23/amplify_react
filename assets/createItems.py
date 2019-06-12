from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
from random import randint
import uuid
import os

DYNAMODB=""
if "DYNAMODB_TABLE" in os.environ:
    DYNAMODB=os.environ.get('DYNAMODB_TABLE')
else:
    print('Error: DYNAMODB_TABLE environment variable required')
    exit()

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
        table = client.Table(DYNAMODB)
        print(table.table_status)
        i = 0
        while i < 10:
            i += 1
            UUID = str(uuid.uuid4())
            price = randint(1, 1000)
            response = table.put_item(Item= {'id': UUID,'price':  price, 'description': 'Descrption: '+UUID})
            print(json.dumps(response, indent=4, cls=DecimalEncoder))
    except Exception as e:
        print("Unexpected error: %s" % e)
        
lambda_handler('','')
