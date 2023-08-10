import Replicate from "replicate";

import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({auth: process.env.REPLICATE_API_TOKEN});

const destination = 'zeke/nyu-llama-2-7b-chat-training-test';
const trainingDataUrl = 'https://storage.googleapis.com/raanapbot/raanap_all_7_6_23_prepared.jsonl';
const modelOwner = 'a16z-infra';
const modelName = 'llama-2-7b-chat';
const modelVersion = '4f0b260b6a13eb53a6b1891f089d57c08f41003ae79458be5011303d81a394dc'

async function go() {
  const training = await replicate.trainings.create(modelOwner, modelName, modelVersion, {
    destination,
    input: {
      train_data: trainingDataUrl,
    },
  });
  console.log({ training });
  console.log(`URL: https://replicate.com/p/${training.id}`);
}

go();