import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    
    # evnt = json.parse(event)
    name = json.loads(event['body'])['name']
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('customer-table')
    
    response1 = table.scan(FilterExpression=Attr('first_name').eq(name))
    response2 = table.scan(FilterExpression=Attr('last_name').eq(name))
    items = response1['Items']
    items += (response2['Items'])
    resBody = []
    for item in items:
        i = {
            "first_name": item['first_name'],
            "last_name": item["last_name"],
            "phone_no": item["phone_no"],
            "address": item["address"],
            "age": str(item["age"])
        }
        resBody.append(i)
    # print(items)

    # # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
    res = {
        'statusCode': 200,
        'isBase64Encoded': False,
        'headers':{
            "Content-Type": "application/json"
        },
        'body': json.dumps(
            {'users': resBody}
        )
    }
    
    return res