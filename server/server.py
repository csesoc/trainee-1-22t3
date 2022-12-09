
from flask import Flask, request
import json
from validate_schema import validateJSON

app = Flask(__name__)



@app.route("/allocate", methods=['POST'])
def get_optimal_allocation():
    res = request.get_json()
    if validateJSON(res):
        print("Valid JSON")
    else:
        print("Invalid JSON")
    
    
    return json.dumps({})

if __name__ == "__main__":
    app.run(port=5000) 