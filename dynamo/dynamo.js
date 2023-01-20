require('dotenv').config();
const uuid = require('uuid-by-string');
const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.getData = async function (username) {
    const params = {
        TableName: 'Leaderboard',
        Key: {
            id: uuid(username)
        }
    };
    console.log(params)
    try {
        const data = await dynamodb.get(params).promise();
        data.Item.score = parseInt(data.Item.score);
        return data.Item;
    } catch (err) {
        console.error("Error", err);
    }
}

exports.putData = async function (data) {
    const params = {
        TableName: 'Leaderboard',
        Item: {
            id: uuid(data.username),
            username: data.username,
            password: data.password,
            score: 0
        }
    };
    try {
        await dynamodb.put(params).promise();
    } catch (err) {
        console.error("Error", err);
    }
}

exports.updateData = async function (data) {
    const params = {
        TableName: 'Leaderboard',
        Key: {
            id: uuid(data.username)
        },
        UpdateExpression: 'set score = :s',
        ExpressionAttributeValues: {
            ':s': String(data.score)
        }
    };
    try {
        await dynamodb.update(params).promise();
    } catch (err) {
        console.error("Error", err);
    }
}
