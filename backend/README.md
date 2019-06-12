# What is this?

The backend AWS services for IOT Operations including:

1. IOT Core Services
2. IOT Device Registration
3. IOT Message Processing via [AWS Kinesis](https://aws.amazon.com/kinesis/)

### References
1. https://aws.amazon.com/blogs/iot/deploy-fleets-easily-with-aws-iot-device-management-services/
2. https://docs.aws.amazon.com/iot/latest/developerguide/policy-actions.html
3. https://docs.aws.amazon.com/iot/latest/developerguide/managing-device-certs.html

aws iot start-thing-registration-task --template-body file://provisioning-template.json --input-file-bucket your bucket --input-file-key bulk-provisioning-data.json --role-arn arn:aws:iam:::role/iot_provision

aws iot list-thing-registration-tasks

aws iot describe-thing-registration-task --task-id TASKID
aws iot list-thing-registration-task-reports --task-id TASKID --report-type RESULTS
aws iot list-thing-registration-task-reports --task-id TASKID --report-type ERRORS


aws iot describe-endpoint --endpoint-type iot:Data-ATS


openssl s_client -connect endpoint:8443 -CAfile ROOT_CA -cert DEVICE_CERT -key DEVICE_KEY
