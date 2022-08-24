from flask import Flask, request, Response
import py_eureka_client.eureka_client as eureka_client
from pymongo import MongoClient
import os
import py_eureka_client.eureka_client as eureka_client

DB_USER = os.environ.get('DB_USERNAME')
# DB_USER = DB_USER if DB_USER is not None else 'e-commerce'
DB_PASS = os.environ.get('DB_PASSWORD')
# DB_PASS = DB_PASS if DB_PASS is not None else 'P6gbkQPwUZGbGazB'

myclient = MongoClient(f'mongodb+srv://{DB_USER}:{DB_PASS}@cluster0.wexky.mongodb.net/?retryWrites=true&w=majority')
mydb = myclient['ClothingE-Commerce']
mycol = mydb['clothes']

app = Flask(__name__)
your_rest_server_port = 8080
eureka_client.init(eureka_server="http://eureka:8761/eureka", app_name="filter", instance_port=your_rest_server_port)

def create_query_dict(info: dict) -> dict:
    info_keys = list(info.keys())
    if len(info_keys) == 0:
        return {}
    # print(info_keys)
    and_list: list = []
    if 'type' in info_keys:
        and_list.append({"type": info['type']})
    if 'price' in info_keys:
        and_list.append({"price": {"$lte": float(info['price'])}})
    if 'name' in info_keys:
        and_list.append({"name": f"/.*{info['name']}.*/i"})
    if 'color_list' in info_keys:
        color_list = [color for color in info['color_list']]
        and_list.append({"color_list": {"$in":color_list}})
    if 'size_list' in info_keys:
        size_list: list = [size for size in info['size_list']]
        and_list.append({"size_list": {"$in":size_list}})
    return {'$and':and_list}
    
    

@app.route('/filter', methods=['GET'])
def filter():
    info: dict = request.json #{'name': 'name', 'price': float(), 'type': 'type', 'color_list': [], 'size_list': []}
    query_dict: dict = create_query_dict(info)
    # return tuple(mycol.find(query_dict))
    filtered_items = list(mycol.find(query_dict))
    # print(data[0])
    filtered_dict = dict({})
    for i in range(len(filtered_items)):
        del filtered_items[i]['_id']
        filtered_dict[i] = filtered_items[i]
    return filtered_dict
    return 'fuck'

app.run(host='0.0.0.0', port=8080)