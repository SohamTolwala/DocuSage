import requests
from llama_index import SimpleDirectoryReader, GPTListIndex, GPTVectorStoreIndex, LLMPredictor, PromptHelper
from langchain import OpenAI
import sys
import os
import openai


# os.environ["OPENAI_API_KEY"] = "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"
openai.api_key = "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"
from langchain.schema import document
import openai
def createVectorIndex(path):
  max_input = 4096
  tokens = 200
  chunk_size = 600
  chunk_overlap_ratio = 0.1

  openai.api_key = os.environ["OPENAI_API_KEY"]

  prompt_helper = PromptHelper(max_input, tokens, chunk_overlap_ratio=chunk_overlap_ratio, chunk_size_limit=chunk_size)

  llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003", maxa_tokens = tokens))

  from llama_index import GPTVectorStoreIndex, MockLLMPredictor, SimpleDirectoryReader, ServiceContext
  docs = SimpleDirectoryReader(path).load_data()

  # from llama_index import GPTVectorStoreIndex, MockLLMPredictor, SimpleDirectoryReader, ServiceContext


  llm_predictor = MockLLMPredictor(max_tokens=tokens)
  service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor, prompt_helper=prompt_helper)
  vectorIndex = GPTVectorStoreIndex.from_documents(docs, service_context=service_context)

  vectorIndex.set_index_id("")
  vectorIndex.storage_context.persist(path)
  # vectorIndex.save_to_disk(vectorIndex.json)
  return vectorIndex


# vectorIndex = createVectorIndex(path=os.path.dirname(r'E:\BACKUP\C_drive\QA_bot_proj\Text_data'))


import json
def save_response_to_json(query, response_text):
    # Create a dictionary to hold the prompt and response
    response_data = {
        "query": query,
        "response": response_text
    }

    # Load the existing JSON data if available, or initialize an empty list
    json_data = []
    json_path = '/content/response_data.json'

    if os.path.exists(json_path):
        with open(json_path, 'r') as json_file:
            json_data = json.load(json_file)

    # Append the new response data to the list
    json_data.append(response_data)

    # Save the updated list back to the JSON file
    with open(json_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)




from llama_index.response.schema import Response
from llama_index.indices.loading import load_index_from_storage
from llama_index.storage.storage_context import StorageContext
def answerMe(prompt):
  storage_context = StorageContext.from_defaults(persist_dir='E:\BACKUP\C_drive\QA_bot_proj')
  index = load_index_from_storage(storage_context)
  query_engine = index.as_query_engine()

  # Process the user's input prompt and get a response
  response = query_engine.query(prompt)

  # Return the response text to the front-end

  #jsonify the responses
  response_f = response.response
  response_list = [{
      "question": prompt,
      "answer": response_f
  }]

  response_json = json.dumps(response_list)
  output_filename= 'response.json'
  with open(output_filename, 'w') as json_file:
      json.dump(response_list, json_file)

  return response_json
