# What is this?

The backend AWS services for IOT Operations including:

1. IOT Core Services
2. IOT Device Registration
3. IOT Message Processing via [AWS Kinesis](https://aws.amazon.com/kinesis/)

# Install Serverless
The backend is deployed via the [Serverless Framework](https://serverless.com/)

```
cd project_root/backend
npm install -g serverless
```
### References
1. https://aws.amazon.com/blogs/iot/deploy-fleets-easily-with-aws-iot-device-management-services/
2. https://docs.aws.amazon.com/iot/latest/developerguide/policy-actions.html
3. https://docs.aws.amazon.com/iot/latest/developerguide/managing-device-certs.html

aws iot start-thing-registration-task --template-body file://provisioning-template.json --input-file-bucket hayes-lambda --input-file-key bulk-provisioning-data.json --role-arn arn:aws:iam::060069385732:role/iot_provision

aws iot list-thing-registration-tasks

aws iot describe-thing-registration-task --task-id fb032b9b-79bf-4e8f-876a-e29f00afaa49
aws iot list-thing-registration-task-reports --task-id fb032b9b-79bf-4e8f-876a-e29f00afaa49 --report-type RESULTS
aws iot list-thing-registration-task-reports --task-id fb032b9b-79bf-4e8f-876a-e29f00afaa49 --report-type ERRORS


aws iot describe-endpoint --endpoint-type iot:Data-ATS

CA_ROOT_CERT_FILE = "root-CA.pem.crt"
PRIVATE_KEY_PATH = "./device_one.key"
CERTIFICATE_PATH = "./device_one.pem.crt"

openssl s_client -connect a256muo6h439m5.iot.us-east-1.amazonaws.com:8443 -CAfile root-CA.pem.crt -cert device_one.pem.crt -key device_one.key
